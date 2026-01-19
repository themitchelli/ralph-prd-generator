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

## Verify

1. Check container: `docker ps | grep prd-generator`
2. Check logs: `docker logs prd-generator`
3. Test locally: `curl http://localhost:3001`
4. Test via Caddy: `curl https://prd-generator.ddns.net`
