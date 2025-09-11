import React from 'react';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { ImageResponse } from '@vercel/og';
import { OGImageService } from './services/og-generator/OGImageService';
const app = new Hono();
app.get('/', (c) => {
    return c.text('OG Image Generator API - visit /og to generate an image or /og/shop for shop images');
});
app.get('/og', async (c) => {
    const title = c.req.query('title') || 'Hello World';
    const subtitle = c.req.query('subtitle') || 'Generated with @vercel/og';
    try {
        const imageResponse = new ImageResponse((React.createElement("div", { style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '40px',
            } },
            React.createElement("h1", { style: {
                    fontSize: '60px',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '20px',
                    textAlign: 'center',
                } }, title),
            React.createElement("p", { style: {
                    fontSize: '30px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    textAlign: 'center',
                } }, subtitle))), {
            width: 1200,
            height: 630,
        });
        const buffer = await imageResponse.arrayBuffer();
        return c.body(new Uint8Array(buffer), 200, {
            'Content-Type': 'image/png',
        });
    }
    catch (error) {
        console.error('Error generating image:', error);
        return c.json({ error: 'Failed to generate image' }, 500);
    }
});
app.get('/og/shop', async (c) => {
    try {
        const url = new URL(c.req.url);
        const offerImagesUrls = url.searchParams.getAll('offerImagesUrls');
        const stylesUrl = c.req.query('stylesUrl') || '';
        const logoUrl = c.req.query('logoUrl') || '';
        const shopName = c.req.query('shopName');
        const poweredBy = c.req.query('poweredBy') === 'true';
        if (!shopName) {
            return c.json({ error: 'shopName is required' }, 400);
        }
        if (offerImagesUrls.length === 0) {
            return c.json({ error: 'At least one offerImagesUrls is required' }, 400);
        }
        const buffer = await OGImageService.generateShopImageBuffer({
            offerImagesUrls,
            stylesUrl,
            logoUrl,
            shopName,
            poweredBy,
        });
        return c.body(new Uint8Array(buffer), 200, {
            'Content-Type': 'image/png',
        });
    }
    catch (error) {
        console.error('Error generating shop OG image:', error);
        return c.json({ error: 'Failed to generate shop OG image' }, 500);
    }
});
const port = Number(process.env.PORT) || 3000;
serve({
    fetch: app.fetch,
    port,
});
console.log(`Server is running on http://localhost:${port}`);
//# sourceMappingURL=index.js.map