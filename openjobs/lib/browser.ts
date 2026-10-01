import { chromium } from 'playwright-core';
import type { Browser } from 'playwright-core';

/**
 * Abstraction for browser rendering.
 * Supports Cloudflare Managed and Self-Hosted (Browserless) modes.
 */
export async function getBrowserContext(mode: 'cloudflare' | 'self-hosted'): Promise<Browser> {
  if (mode === 'cloudflare') {
    // Implementation for Cloudflare Browser Rendering API
    throw new Error('Cloudflare Browser Rendering not yet implemented');
  }
  
  // Self-hosted implementation via Playwright connecting to remote browserless
  return await chromium.connect({
    wsEndpoint: process.env.BROWSERLESS_WS_URL || 'ws://localhost:3000',
  });
}
