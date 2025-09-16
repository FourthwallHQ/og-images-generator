import { serve } from '@hono/node-server'
import { app } from './app.js'

const port = Number(process.env.PORT) || 3000

serve({
  fetch: app.fetch,
  port,
})

console.log(`
🚀 Server is running on http://localhost:${port}
📚 Swagger UI: http://localhost:${port}/ui
📄 OpenAPI Spec: http://localhost:${port}/doc
`)
