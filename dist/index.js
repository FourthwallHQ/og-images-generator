import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { OGImageService } from './services/og-generator/OGImageService';
import { OGImageShopSchema } from './services/og-generator/types';
const app = new Hono();
app.post('/og/shop', async (c) => {
    try {
        const body = await c.req.json();
        const validationResult = OGImageShopSchema.safeParse(body);
        if (!validationResult.success) {
            return c.json({
                error: 'Validation failed',
                issues: validationResult.error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }))
            }, 400);
        }
        const validatedData = validationResult.data;
        const buffer = await OGImageService.generateShopImageBuffer(validatedData);
        return c.body(new Uint8Array(buffer), 200, {
            'Content-Type': 'image/png',
        });
    }
    catch (error) {
        console.error('Error generating shop OG image:', error);
        // Check if it's a JSON parsing error
        if (error instanceof SyntaxError) {
            return c.json({ error: 'Invalid JSON in request body' }, 400);
        }
        return c.json({ error: 'Failed to generate shop OG image' }, 500);
    }
});
app.get('/og/shop/test', async (c) => {
    // Default test data from sandbox-shop.fourthwall.com
    const testData = {
        offerImagesUrls: [
            'https://imgproxy.fourthwall.com/aCcIsLboesTA8clwEDOgt8BPwY7zwAzjpIMhus9bvvs/w:900/sm:1/enc/ap1S5lrqqHDKNFon/YPHQdEwufVPUPCtV/nFEC_GqkhcrVJotj/YPBL157OJjTlWqar/6JsSxpEvQ_lUR8vY/AtaPA4_cb4NVHNIp/M9t1PHzS_fMry4Xp/Mq98Uo_uKB-V0quh/xdz4l3HLWKVRn3d9/Yq4RlQSPUz8bWWsp/rGdBJQPIr29eZkhX/AEO3YQtaFejrL4q3/Q2n9vr5ahpXCT9cQ/L075yKoYI8vqFKCU/fyQuxB9mS6k',
            'https://imgproxy.fourthwall.com/zKahY5AcHjlOmuvNkvFtTO44d-ABD91g24tq56StHZg/w:720/sm:1/enc/QlgEDT8bu2Uw5o_L/JfQAZ2FWM0KaJbwE/8ysGsQ7MTp7tueIr/851yvRSNOoijQmm-/KdO9h45LPtmhTrkI/o9rP891B8llIXVZR/uMbzfqduF_eNRkBD/BIeYnrDwNBAp4F4J/4rRWpZC02j9lRwox/9bB1w3QTuBAxPGF8/WB04hpZ9t5zbCFau/5eJhiX2lXXOD8K8b/y6mTdEGPuDJ_VWRE/6b912w',
            'https://imgproxy.fourthwall.com/Yih6UMzazcfX4d-v4k9wCVaZPSMKFxc2AO4PjyIovGA/w:900/sm:1/enc/1iKZJCi5yvqS-s-U/BRZRo_wrfImHCR_B/S3W-I-PJM_CiNWNf/21wuEVeHkyREaaDf/1w0ur-9sO_kf0oQp/-g1Ovrj8TwiXl06y/3QZ2RQKMfA3YD5Mf/S6R-oCobe5uXBW1r/AK76WbNmRFXLojkl/qa7jeY_O-zU6W4UI/ohuIVvZKugnXeYVF/0-4p9nn8ytvjQ5g-/PyjgeTQ3xnneQG3P/bW5k7g',
        ],
        stylesUrl: 'https://sandbox-shop.fourthwall.com/platform/style.css',
        logoUrl: 'https://sandbox-shop.fourthwall.com/platform/logo',
        shopName: 'sandbox-shop.fourthwall.com',
        poweredBy: true,
    };
    try {
        // Allow overriding test data with query parameters
        const url = new URL(c.req.url);
        const queryOfferImagesUrls = url.searchParams.getAll('offerImagesUrls');
        const offerImagesUrls = queryOfferImagesUrls.length > 0
            ? queryOfferImagesUrls
            : testData.offerImagesUrls;
        const stylesUrl = c.req.query('stylesUrl') || testData.stylesUrl;
        const logoUrl = c.req.query('logoUrl') || testData.logoUrl;
        const shopName = c.req.query('shopName') || testData.shopName;
        const poweredBy = c.req.query('poweredBy') !== undefined
            ? c.req.query('poweredBy') === 'true'
            : testData.poweredBy;
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
        console.error('Error generating test shop OG image:', error);
        return c.json({ error: 'Failed to generate test shop OG image' }, 500);
    }
});
const port = Number(process.env.PORT) || 3000;
serve({
    fetch: app.fetch,
    port,
});
console.log(`Server is running on http://localhost:${port}`);
//# sourceMappingURL=index.js.map