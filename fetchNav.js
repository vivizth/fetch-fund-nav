const puppeteer = require('puppeteer');
const url = 'https://codequiz.azurewebsites.net/';

(async () => {
    const fundCode = process.argv[2];
    console.log(fundCode);
    if (!fundCode) {
        console.log('Error: No Fund code provide');
        return;
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('input[type=button]');
    await page.click('input[type=button]');
    await page.waitForSelector('table');

    const nav = await page.evaluate((fund) => {
        const foundFund = Array.from(document.querySelectorAll('table tr td')).find(td => td.textContent.trim() === fund.trim());
        if (foundFund) {
            return foundFund.nextElementSibling.innerText;
        } else {
            return 'NAV Not found'
        }
    }, fundCode);
    console.log(`NAV : ${nav}`);

    await browser.close();
  })();