# Technical Caveats & Gotchas

## Next.js Static Export (output: 'export')

### generateStaticParams Requirements
- `generateStaticParams()` CANNOT be in a "use client" component
- Must be in a server component wrapper that imports the client component
- Split dynamic route handlers into server page.tsx + client.tsx pattern to achieve static prerendering

### useSearchParams() Requires Suspense Boundary
- Any component using `useSearchParams()` must be wrapped in `<Suspense>` when exporting for static
- Wrap the entire page in Suspense with a fallback to enable static export compatibility
- Moving search params logic to separate client component solves CSR bailout errors

### GitHub Pages Deployment
- GitHub Pages "legacy" builder cannot build Next.js projects - it just serves static files
- Artifacts from GitHub Actions workflow must be uploaded with `actions/upload-artifact@v4` (not v3)
- Deploy step uses `actions/deploy-pages@v4` to grab the artifact and publish
- **CRITICAL: pnpm creates hardlinks in node_modules that propagate to output artifacts**
  - GitHub Pages deployment fails if artifact contains any hardlinks or symlinks
  - Solution: Use Python to recursively copy all files from output directory, reading+writing each file
  - This breaks hardlinks by creating independent file copies instead of links
  - Place this BEFORE `actions/upload-artifact@v4` in workflow
- No pnpm-lock.yaml required in repo - remove from .gitignore if present, workflow handles fresh install
- Site may take 1-2 minutes after successful build before being served due to CDN propagation

### Suspense + Static Export Pattern (Key Solution)
```tsx
// page.tsx (server component with generateStaticParams)
export function generateStaticParams() { ... }
export default function Page() { return <Suspense><Client /></Suspense> }

// client.tsx (client component with state, useSearchParams, etc.)
"use client"
export function ClientComponent() { ... }
```

This pattern allows dynamic routes + search params + static prerendering to work together.
