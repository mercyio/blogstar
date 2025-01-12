const puppeteer = require('puppeteer');

// test('Adds two numbers', () => {
//     const sum = 1 + 2;

//     expect(sum).toEqual(3);
// });

let browser, page;

beforeEach(async () => {
    try {
      browser = await puppeteer.launch({
        headless: false, 
      });
      page = await browser.newPage();
      await page.goto('http://localhost:3000'); 
    } catch (error) {
      console.error('Error during setup:', error);
    }
  });

  afterEach(async () => {
    if (browser) {
      await browser.close();
    }
  });




test('we can launch a browser', async () => {
    // const browser = await puppeteer.launch({
    // headless: false
    // });
    // const page = await browser.newPage();
    // await page.goto('localhost:3000');

    await page.waitForSelector('a.brand-logo');
    const text = await page.$eval('a.brand-logo', (el) => el.innerHTML);

    expect(text).toEqual('Blogster');
});

