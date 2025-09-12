export async function parseShopStyles(stylesUrl) {
    try {
        const response = await fetch(stylesUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch styles');
        }
        const cssText = await response.text();
        const extractValue = (patterns, defaultValue) => {
            for (const pattern of patterns) {
                const match = cssText.match(pattern);
                if (match) {
                    return match[1].trim();
                }
            }
            return defaultValue;
        };
        const backgroundColor = extractValue([
            /--color-background:\s*([^;]+);/i,
            /--background-color:\s*([^;]+);/i,
            /--color-surface:\s*([^;]+);/i,
        ], '#ffffff');
        const primaryColor = extractValue([
            /--color-on-background:\s*([^;]+);/i,
            /--color-primary:\s*([^;]+);/i,
            /--primary-color:\s*([^;]+);/i,
            /--color-text:\s*([^;]+);/i,
        ], '#000000');
        const fontFamily = extractValue([
            /--font-family-base:\s*([^;]+);/i,
            /--font-family-heading:\s*([^;]+);/i,
            /--font-family:\s*([^;]+);/i,
        ], 'system-ui, -apple-system, sans-serif');
        const cleanFontFamily = fontFamily.replace(/["']/g, '');
        // console.log('Parsed styles:', {
        //   primaryColor,
        //   backgroundColor,
        //   fontFamily: cleanFontFamily,
        // })
        return {
            primaryColor,
            backgroundColor,
            fontFamily: cleanFontFamily,
        };
    }
    catch (error) {
        console.error('Error parsing styles:', error);
        return {
            primaryColor: '#000000',
            backgroundColor: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
        };
    }
}
//# sourceMappingURL=styles-parser.js.map