# POST Endpoint dla Shop OG Image (z walidacją Zod)

## Endpoint
```
POST http://localhost:3000/og/shop
Content-Type: application/json
```

## Request Body
```json
{
  "shopName": "sandbox-shop.fourthwall.com",
  "offerImagesUrls": [
    "https://imgproxy.fourthwall.com/aCcIsLboesTA8clwEDOgt8BPwY7zwAzjpIMhus9bvvs/w:900/sm:1/enc/ap1S5lrqqHDKNFon/YPHQdEwufVPUPCtV/nFEC_GqkhcrVJotj/YPBL157OJjTlWqar/6JsSxpEvQ_lUR8vY/AtaPA4_cb4NVHNIp/M9t1PHzS_fMry4Xp/Mq98Uo_uKB-V0quh/xdz4l3HLWKVRn3d9/Yq4RlQSPUz8bWWsp/rGdBJQPIr29eZkhX/AEO3YQtaFejrL4q3/Q2n9vr5ahpXCT9cQ/L075yKoYI8vqFKCU/fyQuxB9mS6k"
  ],
  "stylesUrl": "https://sandbox-shop.fourthwall.com/platform/style.css",
  "logoUrl": "https://sandbox-shop.fourthwall.com/platform/logo",
  "poweredBy": true
}
```

## Parametry

| Parametr | Typ | Wymagany | Opis |
|----------|-----|----------|------|
| shopName | string | ✅ | Nazwa sklepu |
| offerImagesUrls | string[] | ✅ | Tablica URL-i do obrazków produktów |
| stylesUrl | string | ❌ | URL do pliku CSS ze stylami sklepu |
| logoUrl | string | ❌ | URL do logo sklepu |
| poweredBy | boolean | ❌ | Czy pokazać "Powered by Fourthwall" (domyślnie: false) |

## Przykład cURL

```bash
curl -X POST http://localhost:3000/og/shop \
  -H "Content-Type: application/json" \
  -d '{
    "shopName": "Test Store",
    "offerImagesUrls": ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"],
    "poweredBy": true
  }' \
  --output test-image.png
```

## Przykład z Node.js/fetch

```javascript
const response = await fetch('http://localhost:3000/og/shop', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    shopName: 'sandbox-shop.fourthwall.com',
    offerImagesUrls: [
      'https://imgproxy.fourthwall.com/zKahY5AcHjlOmuvNkvFtTO44d-ABD91g24tq56StHZg/w:720/sm:1/enc/QlgEDT8bu2Uw5o_L/JfQAZ2FWM0KaJbwE/8ysGsQ7MTp7tueIr/851yvRSNOoijQmm-/KdO9h45LPtmhTrkI/o9rP891B8llIXVZR/uMbzfqduF_eNRkBD/BIeYnrDwNBAp4F4J/4rRWpZC02j9lRwox/9bB1w3QTuBAxPGF8/WB04hpZ9t5zbCFau/5eJhiX2lXXOD8K8b/y6mTdEGPuDJ_VWRE/6b912w'
    ],
    stylesUrl: 'https://sandbox-shop.fourthwall.com/platform/style.css',
    logoUrl: 'https://sandbox-shop.fourthwall.com/platform/logo',
    poweredBy: true
  })
});

const imageBuffer = await response.arrayBuffer();
// Zapisz lub użyj obrazka
```

## Response

### Success (200)
- Content-Type: `image/png`
- Body: Binarny obrazek PNG (1200x630px)

### Validation Error (400)
```json
{
  "error": "Validation failed",
  "issues": [
    {
      "path": "shopName",
      "message": "Shop name is required"
    },
    {
      "path": "offerImagesUrls",
      "message": "At least one image URL is required"
    }
  ]
}
```

### Invalid JSON (400)
```json
{
  "error": "Invalid JSON in request body"
}
```

### Server Error (500)
```json
{
  "error": "Failed to generate shop OG image"
}
```

## Walidacja Zod

Schema walidacji sprawdza:
- `shopName`: wymagany string, min 1 znak
- `offerImagesUrls`: wymagana tablica, min 1 element, każdy element musi być poprawnym URL
- `stylesUrl`: opcjonalny URL lub pusty string
- `logoUrl`: opcjonalny URL lub pusty string
- `poweredBy`: opcjonalny boolean, domyślnie false