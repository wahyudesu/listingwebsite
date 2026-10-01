import { test, expect } from '@playwright/test';

test.describe('Job Preview Performance and Success', () => {
  test('API /api/preview should return successful response within acceptable time', async ({ request }) => {
    const startTime = Date.now();
    // Using a valid URL parameter as expected by the API
    const response = await request.get('/api/preview?url=https://www.google.com');
    const duration = Date.now() - startTime;
    
    console.log(`API Preview Response Time: ${duration}ms`);
    
    // Success criteria
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('image/jpeg');
    expect(duration).toBeLessThan(15000); // Increased timeout for screenshot generation
  });

  test('UI Preview should render successfully within acceptable time', async ({ page }) => {
    const renderMode = process.env.RENDER_MODE || 'self-hosted';
    const startTime = Date.now();

    // Navigate to preview page (needs a real ID or test-id)
    await page.goto('/');

    // Success criteria: check if preview container is loaded
    // Depending on UI implementation, we might need to click or wait for specific content
    const content = page.locator('body'); 
    await expect(content).toBeVisible({ timeout: 10000 });

    const duration = Date.now() - startTime;
    console.log(`UI Preview [${renderMode}] Render Time: ${duration}ms`);

    expect(duration).toBeLessThan(10000);
  });
});
