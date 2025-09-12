import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { serve } from '@hono/node-server';
import { OGImageService } from './services/og-generator/OGImageService';
import { createShopOGImageRoute, testShopOGImageRoute } from './services/og-generator/routes';
// Create OpenAPIHono app instead of regular Hono
const app = new OpenAPIHono();
// Register the shop OG image generation route
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
// Register test endpoint
app.openapi(testShopOGImageRoute, async (c) => {
    // Default test data from sandbox-shop.fourthwall.com
    const testData = {
        offerImagesUrls: [
            'https://imgproxy.fourthwall.com/aCcIsLboesTA8clwEDOgt8BPwY7zwAzjpIMhus9bvvs/w:900/sm:1/enc/ap1S5lrqqHDKNFon/YPHQdEwufVPUPCtV/nFEC_GqkhcrVJotj/YPBL157OJjTlWqar/6JsSxpEvQ_lUR8vY/AtaPA4_cb4NVHNIp/M9t1PHzS_fMry4Xp/Mq98Uo_uKB-V0quh/xdz4l3HLWKVRn3d9/Yq4RlQSPUz8bWWsp/rGdBJQPIr29eZkhX/AEO3YQtaFejrL4q3/Q2n9vr5ahpXCT9cQ/L075yKoYI8vqFKCU/fyQuxB9mS6k',
            'https://imgproxy.fourthwall.com/zKahY5AcHjlOmuvNkvFtTO44d-ABD91g24tq56StHZg/w:720/sm:1/enc/QlgEDT8bu2Uw5o_L/JfQAZ2FWM0KaJbwE/8ysGsQ7MTp7tueIr/851yvRSNOoijQmm-/KdO9h45LPtmhTrkI/o9rP891B8llIXVZR/uMbzfqduF_eNRkBD/BIeYnrDwNBAp4F4J/4rRWpZC02j9lRwox/9bB1w3QTuBAxPGF8/WB04hpZ9t5zbCFau/5eJhiX2lXXOD8K8b/y6mTdEGPuDJ_VWRE/6b912w',
        ],
        stylesUrl: 'https://sandbox-shop.fourthwall.com/platform/style.css',
        logoUrl: 'https://sandbox-shop.fourthwall.com/platform/logo',
        shopName: 'sandbox-shop.fourthwall.com',
        poweredBy: true,
    };
    try {
        const buffer = await OGImageService.generateShopImageBuffer(testData);
        return c.body(new Uint8Array(buffer), 200, {
            'Content-Type': 'image/png',
        });
    }
    catch (error) {
        console.error('Error generating test shop OG image:', error);
        return c.json({ error: 'Failed to generate test shop OG image' }, 500);
    }
});
// Add OpenAPI documentation endpoint
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
// Add Swagger UI
app.get('/ui', swaggerUI({
    url: '/doc',
}));
// Root endpoint with links to documentation
app.get('/', (c) => {
    const port = process.env.PORT || 3000;
    return c.html(`
    <html>
      <head>
        <title>OG Image Generator API</title>
        <style>
          body { 
            font-family: system-ui, -apple-system, sans-serif; 
            max-width: 800px; 
            margin: 50px auto; 
            padding: 20px;
            background: #f5f5f5;
          }
          h1 { color: #333; margin-bottom: 30px; }
          .card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .card h2 { 
            margin-top: 0; 
            color: #667eea;
            font-size: 1.5rem;
          }
          .card p { color: #666; margin: 10px 0; }
          a { 
            color: #667eea; 
            text-decoration: none;
            font-weight: 500;
          }
          a:hover { text-decoration: underline; }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background: #667eea;
            color: white;
            border-radius: 5px;
            margin-top: 10px;
          }
          .button:hover {
            background: #764ba2;
            text-decoration: none;
          }
          code {
            background: #f0f0f0;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 0.9em;
          }
        </style>
      </head>
      <body>
        <h1>🖼️ OG Image Generator API</h1>
        
        <div class="card">
          <h2>📚 Documentation</h2>
          <p>Interactive API documentation with Swagger UI</p>
          <a href="/ui" class="button">Open Swagger UI</a>
        </div>
        
        <div class="card">
          <h2>📄 OpenAPI Specification</h2>
          <p>Raw OpenAPI 3.0 specification in JSON format</p>
          <p><code>GET /doc</code></p>
          <a href="/doc" target="_blank">View OpenAPI Spec</a>
        </div>
        
        <div class="card">
          <h2>🧪 Test Endpoint</h2>
          <p>Quick test with pre-configured Fourthwall sandbox data</p>
          <p><code>GET /og/shop/test</code></p>
          <a href="/og/shop/test" class="button">Generate Test Image</a>
        </div>
        
        <div class="card">
          <h2>🚀 Main Endpoint</h2>
          <p>Generate shop OG images via POST request</p>
          <p><code>POST /og/shop</code></p>
          <p>Use Swagger UI to test with custom data</p>
        </div>
      </body>
    </html>
  `);
});
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
//# sourceMappingURL=index-openapi.js.map