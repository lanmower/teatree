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
- Artifacts from GitHub Actions workflow must be uploaded with `actions/upload-pages-artifact@v3` action
- Deploy step uses `actions/deploy-pages@v4` to grab the artifact and publish
- **CRITICAL: pnpm creates hardlinks in node_modules that propagate to output artifacts**
  - GitHub Pages deployment fails if artifact contains any hardlinks or symlinks
  - Solution: After build, break hardlinks by reading each file with `cat` into a new directory
  - Working approach:
    ```bash
    mkdir -p /tmp/pages
    cd out
    find . -type f | while read f; do
      mkdir -p "/tmp/pages/$(dirname "$f")"
      cat "$f" > "/tmp/pages/$f"
    done
    cd ..
    rm -rf out
    mv /tmp/pages out
    ```
  - This creates independent file copies, completely breaking hardlinks
  - Place this step immediately after `pnpm build` and before artifact upload
- Optional: Use `pnpm install --store-dir=/tmp/pnpm-store` to isolate pnpm cache
- No pnpm-lock.yaml required in repo - workflow handles fresh install
- Site goes live within 5-10 seconds after successful deploy action

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
