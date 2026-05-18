import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Login via API to get token
const resp = await page.request.post('http://127.0.0.1:3500/admin/auth/login', {
  data: { username: 'admin', password: 'admin123' }
});
const result = await resp.json();
console.log('Login:', result.code === 0 ? 'OK' : 'FAILED', result.msg);

// Set token and go to dashboard
await page.goto('http://127.0.0.1:3500');
await page.evaluate(token => {
  localStorage.setItem('token', token);
}, result.data.token);

// Reload to pick up token
await page.goto('http://127.0.0.1:3500', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

// Screenshot
await page.screenshot({ path: 'admin-screen.png', fullPage: false });
console.log('Screenshot saved to admin-screen.png');
console.log('Page title:', await page.title());
console.log('URL:', page.url());

// Check for menus
const menuItems = await page.$$eval('.n-menu-item', els => els.length);
console.log('Menu items found:', menuItems);

// Check console errors
const errors = [];
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
await page.waitForTimeout(500);
if (errors.length) console.log('Console errors:', errors);

await browser.close();
