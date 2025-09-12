import { z } from '@hono/zod-openapi';
export declare const ErrorResponseSchema: z.ZodObject<{
    error: z.ZodString;
    issues: z.ZodOptional<z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const OGImageShopRequestSchema: z.ZodObject<{
    offerImagesUrls: z.ZodArray<z.ZodString>;
    stylesUrl: z.ZodDefault<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>>;
    logoUrl: z.ZodDefault<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>>;
    shopName: z.ZodString;
    poweredBy: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export type OGImageShopRequest = z.infer<typeof OGImageShopRequestSchema>;
//# sourceMappingURL=schemas.d.ts.map