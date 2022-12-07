const puppeteer = require('puppeteer');
const express = require('express');
const app = express()
const port = 4000;
app.use(express.json());
async function getDataFromChrome() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.amazon.com');

    await page.waitForSelector('#nav-xshop');
    const groups = await page.evaluate( () => Array.from( document.querySelectorAll( '#nav-xshop > a' ), element =>  element.innerText));

    await browser.close();
    return { result: groups };
}

app.get('/', async (req, res) => {
  const result = await getDataFromChrome();
    res.send(result);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})