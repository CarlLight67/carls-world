# Deployment Guide - Cloudflare Pages

## Quick Deploy Settings

When setting up your project on Cloudflare Pages:

### Build Settings
| Setting | Value |
|---------|-------|
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

### Environment Variables
| Variable Name | Value |
|--------------|-------|
| `VITE_WEB3FORMS_ACCESS_KEY` | `b5373b8b-b22b-4253-aa93-35b037769c70` |

## Features Included

### Security Headers
The `_headers` file in the `public/` folder includes:
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME-type sniffing
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` - Disables unused browser features
- `Content-Security-Policy` - Restricts resource loading

### SPA Routing
The `_redirects` file handles client-side routing for React Router.

## Local Development

```bash
npm run dev
```

Opens on `http://localhost:3000`

## Build for Production

```bash
npm run build
```

Output goes to `dist/` folder

## Notes

- The `server.ts` file is for **local development only** (runs Express server with custom API)
- For Cloudflare Pages, only the static `dist/` folder is deployed
- The contact form uses Web3Forms (client-side) and works on Cloudflare