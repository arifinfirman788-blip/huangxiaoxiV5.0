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
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText));

    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle2' });
    
    // Wait for a bit
    await new Promise(r => setTimeout(r, 2000));
    
    const html = await page.evaluate(() => document.body.innerHTML);
    console.log('HTML CONTENT:', html.substring(0, 1000));
    
    if (html.includes('<div id="root"></div>') || html.includes('<div id="root"> <!-- --> </div>')) {
      console.log('ROOT IS EMPTY!');
    } else {
      console.log('ROOT HAS CONTENT.');
    }

    await browser.close();
  } catch (err) {
    console.error("Puppeteer error:", err);
  }
})();
