# Plan Migracji Generatora Obrazków OG

## Przegląd
Migracja funkcjonalności generowania obrazków OpenGraph z projektu Fourthwall (Next.js) do standalone serwisu opartego na Hono.

## Źródło
- **Lokalizacja oryginalna**: `/Users/michallester/fourthwall/upscaler/pages/api/og-image-shop.tsx`
- **Framework źródłowy**: Next.js z Edge Runtime
- **Framework docelowy**: Hono z Node.js

## Architektura docelowa

### Struktura katalogów
```
og-images-generator/
├── index.tsx                 # Główny plik aplikacji (routing Hono)
├── migration-plan.md         # Ten dokument
├── package.json             # Zależności projektu
├── tsconfig.json            # Konfiguracja TypeScript
└── services/
    └── og-generator/
        ├── OGImageService.ts    # Główny serwis generowania
        ├── components.tsx        # Komponenty React dla layoutu
        ├── styles-parser.ts      # Parser stylów CSS
        └── types.ts             # Definicje TypeScript

```

## Zakres migracji

### Elementy przenoszone
1. **Parsowanie stylów CSS** (`parseShopStyles`)
   - Ekstrakcja kolorów (background, primary)
   - Ekstrakcja czcionek
   - Obsługa błędów z wartościami domyślnymi

2. **Komponenty React**
   - `ShopLogo` - wyświetlanie logo sklepu
   - `ShopInfo` - informacje o sklepie
   - `PoweredBySection` - sekcja Fourthwall branding
   - `LeftColumn` - lewa kolumna z brandingiem
   - `RightColumn` - prawa kolumna z obrazkiem produktu

3. **Logika generowania** (`generateOGImage`)
   - Integracja komponentów
   - Konfiguracja ImageResponse
   - Wymiary obrazka (1200x630)

4. **Typy danych**
   - `OGImageShopParameters` - parametry wejściowe

### Elementy pomijane
- Next.js specific imports (NextRequest, NextResponse)
- Edge Runtime configuration
- Next.js API handler
- Walidacja specyficzna dla Next.js

## Mapowanie endpointów

### Oryginalny (Next.js)
```
GET /api/og-image-shop?offerImagesUrls=...&stylesUrl=...&logoUrl=...&shopName=...&poweredBy=...
```

### Docelowy (Hono)
```
GET /og/shop?offerImagesUrls=...&stylesUrl=...&logoUrl=...&shopName=...&poweredBy=...
```

## Zależności

### Wymagane pakiety
- `@vercel/og` - generowanie obrazków
- `hono` - framework webowy
- `@hono/node-server` - adapter Node.js
- `react` - komponenty React
- `typescript` - wsparcie TypeScript

## Etapy implementacji

### Faza 1: Przygotowanie struktury
- [x] Utworzenie planu migracji
- [ ] Utworzenie struktury katalogów
- [ ] Konfiguracja TypeScript

### Faza 2: Migracja logiki
- [ ] Przeniesienie definicji typów
- [ ] Migracja parsera stylów
- [ ] Przeniesienie komponentów React
- [ ] Implementacja głównego serwisu

### Faza 3: Integracja
- [ ] Refaktoryzacja index.tsx
- [ ] Dodanie endpointu /og/shop
- [ ] Obsługa parametrów query

### Faza 4: Testowanie
- [ ] Test parsowania stylów
- [ ] Test generowania obrazków
- [ ] Test różnych parametrów wejściowych

## Różnice implementacyjne

### Obsługa błędów
- **Next.js**: `NextResponse.json()`
- **Hono**: `c.json()`

### Parsowanie parametrów
- **Next.js**: `searchParams.get()` / `searchParams.getAll()`
- **Hono**: `c.req.query()` / custom parsing dla array

### Zwracanie obrazka
- **Next.js**: Direct ImageResponse return
- **Hono**: Konwersja do Buffer + odpowiednie headers

## Notatki
- Zachowano kompatybilność z oryginalnymi parametrami
- Serwis jest modularny i łatwy w rozszerzeniu
- Możliwość dodania kolejnych typów obrazków OG w przyszłości