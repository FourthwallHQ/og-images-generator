import React from 'react';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { ImageResponse } from '@vercel/og';
const app = new Hono();
app.get('/', (c) => {
    return c.text('OG Image Generator API - visit /og to generate an image');
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
        return c.body(Buffer.from(buffer), 200, {
            'Content-Type': 'image/png',
        });
    }
    catch (error) {
        console.error('Error generating image:', error);
        return c.json({ error: 'Failed to generate image' }, 500);
    }
});
const port = Number(process.env.PORT) || 3000;
serve({
    fetch: app.fetch,
    port,
});
console.log(`Server is running on http://localhost:${port}`);
//# sourceMappingURL=index.js.map