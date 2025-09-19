# Plan implementacji modułu Bundles Generator

## Opis funkcjonalności
Moduł będzie generował pojedynczy obrazek (bundle image) na podstawie listy obrazków produktów. Obrazek będzie miał rozmiar 1536x2048px (proporcje 3:4, format pionowy) i będzie prezentował kompozycję kilku produktów.

## Struktura request body
```json
[
  "https://cdn.staging.fourthwall.com/customizations/...webp",
  "https://storage.googleapis.com/popshop-staging-orders-customizations-single/...webp",
  "https://cdn.staging.fourthwall.com/customizations/...webp"
]
```
Request body to prosta lista URL-i obrazków (array of strings).

## Przykładowy request
```json
[
  "https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/14bbd894-30f5-452f-928a-86efe6919e4a.webp",
  "https://storage.googleapis.com/popshop-staging-orders-customizations-single/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/720dced4-a1bd-4b24-9842-2e31f316f8b7.webp",
  "https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e97d3a33-477e-42da-ae4c-7fd90f1a7bdb.webp",
  "https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e1517ac2-88e2-4463-9ea0-9edb93d4d02c.webp",
  "https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/b9378402-27cf-4b5c-ac1c-bedd0ba43732.webp"
]
```

## Architektura modułu (analogicznie do og-generator)

### 1. Struktura katalogów
```
services/bundles-generator/
├── BundleImageService.tsx       # Główny serwis generujący obrazki
├── schemas.ts                   # Definicje schematów Zod z OpenAPI
├── routes.ts                    # Definicje tras OpenAPI
└── components/                  # Komponenty React dla różnych układów
    ├── BundleGridComponent.tsx  # Komponent układu siatki produktów
    └── shared/                  # Współdzielone komponenty
        └── ProductImage.tsx     # Komponent pojedynczego produktu
```

### 2. Kroki implementacji

#### Krok 1: Utworzenie schematów (schemas.ts)
- `BundleImageRequestSchema` - schemat z array of URLs (z.array(z.string().url()))
- Wykorzystanie `ErrorResponseSchema` z og-generator

#### Krok 2: Definicja tras (routes.ts)
- `POST /bundles/generate` - synchroniczny endpoint zwracający obrazek
- `POST /bundles/generate/async` - asynchroniczny endpoint (opcjonalnie)
- Przykłady w dokumentacji OpenAPI z rzeczywistymi URL-ami

#### Krok 3: Serwis generujący (BundleImageService.tsx)
- `generateBundleImageBuffer()` - główna metoda generująca Buffer
- `checkImageAvailability()` - sprawdzenie dostępności obrazków
- Obsługa różnych ilości produktów (1-9 obrazków)
- **Rozmiar obrazka: 1536x2048px (3:4)**

#### Krok 4: Komponenty React (components/)
- `BundleGridComponent.tsx` - główny komponent układający produkty w pionowej siatce
  - Format pionowy 3:4 wymaga innego układu niż OG
  - 1 produkt: centrowany, duży
  - 2 produkty: jeden nad drugim
  - 3 produkty: układ pionowy 1+2 lub 3 w kolumnie
  - 4 produkty: siatka 2x2
  - 5-6 produktów: siatka 2x3 (2 kolumny, 3 rzędy)
  - 7-9 produktów: siatka 3x3
  - 10-12 produktów: siatka 3x4
- `ProductImage.tsx` - komponent pojedynczego produktu z obsługą błędów

#### Krok 5: Integracja w app.ts
- Import nowych tras i serwisu
- Dodanie handlerów dla `/bundles/generate`
- Opcjonalna integracja z GCP (jeśli skonfigurowane)

#### Krok 6: Testy
- Testy integracyjne w `tests/integration/bundles.test.ts`
- Mockowanie `BundleImageService`
- Testowanie różnych ilości produktów

#### Krok 7: Storybook
- Stories dla różnych układów w `BundleImageStories.stories.tsx`
- Przykłady z 1-12 produktami
- Obsługa błędnych URL-i
- Wrapper dla rozmiaru 1536x2048px

## Szczegóły implementacji

### Obsługa obrazków
- Sprawdzanie dostępności każdego URL przed generowaniem
- Obsługa formatów .webp, .png, .jpg
- Fallback na placeholder dla niedostępnych obrazków
- Optymalizacja rozmiaru i jakości

### Układy dla formatu pionowego (3:4)
- Wykorzystanie pionowej przestrzeni
- Automatyczne dopasowanie układu do liczby produktów
- Zachowanie proporcji obrazków
- Marginesy i odstępy między produktami dostosowane do formatu pionowego

### Stylowanie
- Czyste tło (białe lub przezroczyste)
- Równe odstępy między produktami
- Opcjonalne cienie dla głębi
- Spójność wizualna

## Zgodność z istniejącą architekturą
- Wykorzystanie `@vercel/og` do generowania
- React JSX z inline styles
- Analogiczna struktura do og-generator
- Zgodność z konwencjami kodu (TypeScript, formatowanie)

## Rozważania dodatkowe
- Cache'owanie wygenerowanych obrazków
- Limity ilości produktów (max 12 dla formatu 3:4)
- Obsługa błędów i timeoutów
- Logowanie dla debugowania
- Obsługa różnych formatów wejściowych (.webp, .png, .jpg)

## Kolejność implementacji
1. Schemas i routes (z prostym array schematem)
2. Podstawowy serwis z prostym komponentem
3. Integracja w app.ts i test manualny
4. Rozbudowa komponentów o różne układy pionowe
5. Testy automatyczne
6. Storybook dla podglądu (z wrapperem 1536x2048)
7. Dokumentacja i przykłady

## Uwagi z CLAUDE.md
- Pamiętać o ograniczeniach @vercel/og z CSS
- Używać prostych struktur dla obrazków
- Testować w rzeczywistym środowisku, nie tylko Storybook
- Unikać skomplikowanych flexboxów
- Używać `objectFit: 'contain'` dla obrazków

## ✅ ROZWIĄZANE: Obsługa formatu WebP
Początkowo **@vercel/og nie obsługuje natywnie formatu WebP**, ale problem został rozwiązany poprzez implementację automatycznej konwersji:

### Implementacja konwersji WebP → PNG
1. **Biblioteka Sharp** - używana do konwersji obrazków
2. **ImageConverter** (`services/bundles-generator/image-converter.ts`):
   - Automatycznie wykrywa obrazki WebP po URL
   - Konwertuje WebP na PNG data URL w locie
   - Cache'uje skonwertowane obrazki dla wydajności
3. **Transparentna obsługa** - moduł akceptuje teraz wszystkie formaty:
   - WebP (automatycznie konwertowane)
   - PNG (natywnie obsługiwane)
   - JPEG/JPG (natywnie obsługiwane)
   - SVG (z ograniczeniami)

### Przykład użycia z WebP:
```bash
curl -X POST http://localhost:3000/bundles/generate \
  -H "Content-Type: application/json" \
  -d '[
    "https://example.com/image1.webp",
    "https://example.com/image2.png",
    "https://example.com/image3.jpg"
  ]' \
  --output bundle.png
```

## Specyfika formatu 3:4 (1536x2048)
- Format pionowy wymaga innych układów niż standardowy OG (16:9)
- Więcej miejsca w pionie - możliwość układania produktów w kolumny
- Idealne proporcje dla mobile/tablet viewing
- Możliwość pokazania więcej produktów (do 12) bez zatłoczenia