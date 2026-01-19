# Deployment Configuration

Configuration files for deploying PRD Generator to Raspberry Pi 5.

## Caddy Setup

1. Add the contents of `Caddyfile` to the Pi's existing Caddyfile:
   ```bash
   sudo nano /etc/caddy/Caddyfile
   ```

2. Create log directory if needed:
   ```bash
   sudo mkdir -p /var/log/caddy
   sudo chown caddy:caddy /var/log/caddy
   ```

3. Reload Caddy:
   ```bash
   sudo systemctl reload caddy
   ```

## Container Setup

1. Clone repo on Pi:
   ```bash
   cd /opt
   sudo git clone https://github.com/themitchelli/fade-prd-generator.git
   cd fade-prd-generator
   ```

2. Create environment file:
   ```bash
   echo "ANTHROPIC_API_KEY=your-key-here" | sudo tee .env
   ```

3. Start container:
   ```bash
   sudo docker compose up -d --build
   ```

## GitHub Actions Auto-Deploy

The repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that auto-deploys on push to main/master.

### Required Secrets

Configure these in GitHub repo settings → Secrets and variables → Actions:

| Secret | Description |
|--------|-------------|
| `PI_HOST` | Pi's public IP or hostname (e.g., `prd-generator.ddns.net`) |
| `PI_USERNAME` | SSH username on Pi (e.g., `pi`) |
| `PI_SSH_KEY` | Private SSH key for authentication |
| `PI_PORT` | SSH port (optional, defaults to 22) |

### Generate SSH Key (if needed)

```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/pi_deploy

# Copy public key to Pi
ssh-copy-id -i ~/.ssh/pi_deploy.pub pi@your-pi-host

# Add private key content to PI_SSH_KEY secret
cat ~/.ssh/pi_deploy
```

### Manual Trigger

You can also trigger deployment manually from GitHub Actions tab → "Deploy to Pi" → "Run workflow".

## Verify

1. Check container: `docker ps | grep prd-generator`
2. Check logs: `docker logs prd-generator`
3. Test locally: `curl http://localhost:3001`
4. Test via Caddy: `curl https://prd-generator.ddns.net`
