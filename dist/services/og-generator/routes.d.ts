export declare const createShopOGImageRoute: {
    method: "post";
    path: "/og/shop";
    tags: string[];
    summary: string;
    description: string;
    request: {
        body: {
            content: {
                'application/json': {
                    schema: import("zod").ZodObject<{
                        offerImagesUrls: import("zod").ZodArray<import("zod").ZodURL>;
                        stylesUrl: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodUnion<readonly [import("zod").ZodURL, import("zod").ZodLiteral<"">]>>>;
                        logoUrl: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodUnion<readonly [import("zod").ZodURL, import("zod").ZodLiteral<"">]>>>;
                        shopName: import("zod").ZodString;
                        poweredBy: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodBoolean>>;
                    }, import("zod/v4/core").$strip>;
                };
            };
            description: string;
            required: true;
        };
    };
    responses: {
        200: {
            description: string;
            content: {
                'image/png': {
                    schema: {
                        type: "string";
                        format: string;
                    };
                };
            };
        };
        400: {
            description: string;
            content: {
                'application/json': {
                    schema: import("zod").ZodObject<{
                        error: import("zod").ZodString;
                        issues: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                            path: import("zod").ZodString;
                            message: import("zod").ZodString;
                        }, import("zod/v4/core").$strip>>>;
                    }, import("zod/v4/core").$strip>;
                };
            };
        };
        500: {
            description: string;
            content: {
                'application/json': {
                    schema: import("zod").ZodObject<{
                        error: import("zod").ZodString;
                        issues: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
                            path: import("zod").ZodString;
                            message: import("zod").ZodString;
                        }, import("zod/v4/core").$strip>>>;
                    }, import("zod/v4/core").$strip>;
                };
            };
        };
    };
} & {
    getRoutingPath(): "/og/shop";
};
//# sourceMappingURL=routes.d.ts.map