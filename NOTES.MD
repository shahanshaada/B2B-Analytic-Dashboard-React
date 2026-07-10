# Deployment Notes

## AWS Services Used
- **S3** — static hosting for the build output
- **CloudFront** — CDN + HTTPS; each distribution's origin is set to its S3 bucket
- **IAM** — deploy user/role with scoped S3 + CloudFront permissions


## CI/CD
- Trigger: push to `main`
- Pipeline stages: **build** → **deploy**
  - Build: install deps, `npm run build` (React) / `ng build` (Angular)
  - Deploy: sync build output to S3, then invalidate the CloudFront cache
- Secrets (AWS access key/secret, or role ARN) are stored in **GitHub Secrets** — not committed to source

## Environment Config
- Node [18.x/20.x]
- No app-level env vars/secrets required — app only calls the public JSONPlaceholder API
