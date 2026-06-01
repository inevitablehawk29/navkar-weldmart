import puppeteer from 'puppeteer';

(async () => {
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 375, height: 812 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  await new Promise(r => setTimeout(r, 2000));

  console.log('Evaluating elements...');
  const offenders = await page.evaluate(() => {
    const out = [];
    const elements = document.querySelectorAll('*');
    for (const el of elements) {
      if (['HEAD', 'SCRIPT', 'STYLE', 'META', 'TITLE', 'LINK', 'NOSCRIPT'].includes(el.tagName)) continue;
      
      const rect = el.getBoundingClientRect();
      const ww = window.innerWidth;
      
      if (rect.right > ww + 1) {
        out.push({
          tagName: el.tagName.toLowerCase(),
          className: el.className || '',
          width: rect.width,
          right: rect.right,
          viewportWidth: ww
        });
      }
    }
    return out;
  });

  console.log('--- OFFENDERS ---');
  console.log(JSON.stringify(offenders, null, 2));
  console.log('-----------------');

  await browser.close();
})();
