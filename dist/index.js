import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { serve } from '@hono/node-server';
import { OGImageService } from './services/og-generator/OGImageService';
import { createShopOGImageRoute } from './services/og-generator/routes';
const app = new OpenAPIHono();
app.openapi(createShopOGImageRoute, async (c) => {
    const body = c.req.valid('json');
    try {
        const buffer = await OGImageService.generateShopImageBuffer(body);
        return c.body(new Uint8Array(buffer), 200, {
            'Content-Type': 'image/png',
        });
    }
    catch (error) {
        console.error('Error generating shop OG image:', error);
        return c.json({ error: 'Failed to generate shop OG image' }, 500);
    }
});
app.doc('/doc', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'OG Image Generator API',
        description: 'API for generating Open Graph images for shops with custom branding',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
});
// Swagger UI
app.get('/ui', swaggerUI({
    url: '/doc',
}));
const port = Number(process.env.PORT) || 3000;
serve({
    fetch: app.fetch,
    port,
});
console.log(`
🚀 Server is running on http://localhost:${port}
📚 Swagger UI: http://localhost:${port}/ui
📄 OpenAPI Spec: http://localhost:${port}/doc
🧪 Test endpoint: http://localhost:${port}/og/shop/test
`);
//# sourceMappingURL=index.js.map