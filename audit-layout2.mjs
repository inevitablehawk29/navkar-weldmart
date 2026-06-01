import puppeteer from 'puppeteer';

(async () => {
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 375, height: 812 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  await new Promise(r => setTimeout(r, 2000));

  console.log('Evaluating document scroll width...');
  const scrollInfo = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('Scroll Info:', scrollInfo);

  if (scrollInfo.hasHorizontalScroll) {
    const rootOffender = await page.evaluate(() => {
      // Find the deepest element whose right edge equals the scrollWidth
      const sw = document.documentElement.scrollWidth;
      
      let offender = null;
      let minDepth = -1;
      
      const elements = document.querySelectorAll('*');
      for (const el of elements) {
        if (['HEAD', 'SCRIPT', 'STYLE', 'META', 'TITLE', 'LINK', 'NOSCRIPT'].includes(el.tagName)) continue;
        
        // Skip elements that have overflow-hidden or are inside overflow-hidden parents
        // (Wait, actually we want to find the element that pushes the body out.
        // It must NOT have a parent with overflow: hidden clipping it, except body/html)
        
        let isClipped = false;
        let parent = el.parentElement;
        while(parent && parent.tagName !== 'BODY') {
          const style = window.getComputedStyle(parent);
          if (style.overflow === 'hidden' || style.overflowX === 'hidden') {
            isClipped = true;
            break;
          }
          parent = parent.parentElement;
        }
        
        if (isClipped) continue;

        const rect = el.getBoundingClientRect();
        const rightEdge = rect.right + window.scrollX;
        
        if (rightEdge >= sw - 5 && rightEdge > window.innerWidth) { // within 5px of total scroll width
          offender = {
            tagName: el.tagName,
            className: el.className,
            rightEdge,
            scrollWidth: sw
          };
        }
      }
      return offender;
    });

    console.log('--- ROOT OFFENDER ---');
    console.log(JSON.stringify(rootOffender, null, 2));
  } else {
    console.log('No horizontal scroll detected on initial load. The scroll might only happen when a menu opens or an animation fires.');
  }

  await browser.close();
})();
