const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: "new"
    });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    page.on('response', response => {
      if (!response.ok()) {
        console.log('RESPONSE FAILED:', response.url(), response.status());
      }
    });

    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle2' });
    
    // Also take a screenshot to see if it's really white
    await page.screenshot({ path: 'screenshot.png' });
    console.log("Done checking");
    await browser.close();
  } catch (err) {
    console.error("Puppeteer error:", err);
  }
})();
