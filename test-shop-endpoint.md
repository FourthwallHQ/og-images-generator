# Test Endpoint dla Shop OG Image

## Endpoint
```
GET http://localhost:3000/og/shop
```

## Przykładowe parametry testowe

### Podstawowy test
```
http://localhost:3000/og/shop?shopName=MyShop&offerImagesUrls=https://cdn.fourthwall.com/shops/sh_123/themes/assets/image.jpg&poweredBy=true
```

### Pełny test z wszystkimi parametrami
```
http://localhost:3000/og/shop?shopName=Awesome%20Merch%20Store&offerImagesUrls=https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&stylesUrl=https://example.com/styles.css&logoUrl=https://via.placeholder.com/280x120&poweredBy=true
```

### Test z wieloma obrazkami
```
http://localhost:3000/og/shop?shopName=Test%20Shop&offerImagesUrls=https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&offerImagesUrls=https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&offerImagesUrls=https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&poweredBy=false
```

## Parametry

| Parametr | Typ | Wymagany | Opis |
|----------|-----|----------|------|
| shopName | string | ✅ | Nazwa sklepu |
| offerImagesUrls | string[] | ✅ | URL(y) do obrazków produktów (można podać wiele) |
| stylesUrl | string | ❌ | URL do pliku CSS ze stylami sklepu |
| logoUrl | string | ❌ | URL do logo sklepu |
| poweredBy | boolean | ❌ | Czy pokazać "Powered by Fourthwall" (domyślnie: false) |

## Przykładowe wywołanie cURL

```bash
curl "http://localhost:3000/og/shop?shopName=My%20Store&offerImagesUrls=https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&poweredBy=true"
```

## Test lokalny
Po uruchomieniu serwera (`npm run dev`), otwórz w przeglądarce:
```
http://localhost:3000/og/shop?shopName=Test%20Store&offerImagesUrls=https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&poweredBy=true
```