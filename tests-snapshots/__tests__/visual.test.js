const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({toMatchImageSnapshot})
describe("", () => {
    let browser,page;

    beforeAll(async ()=>{
        browser = await puppeteer.launch ({headless : false});

        page = await browser.newPage();
    });

    afterAll(async function () {
        await browser.close();
    });

    test("Captura de pantalla completa", async () => {
        await page.goto('https://www.example.com');
        await page.waitForSelector('h1')
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot({
            failureTresholdType: "pixel",
            failureTreshold:500
        });
    })

    test("Captura de pantalla de un elemento", async () => {
        await page.goto('https://www.example.com');
        const h1 = await page.waitForSelector("h1");
        
        
        const image = await h1.screenshot();

        expect(image).toMatchImageSnapshot({
            failureTresholdType: "percent",
            failureTreshold:0.01
        });
    })

    test("Captura de pantalla removiendo un elemento", async () => {
        await page.goto('https://www.example.com');
        await page.evaluate(()=>{
            (document.querySelectorAll('h1') || []).forEach(el => el.remove())
        })

        await page.waitForTimeout(5000);
        
        
        });

    test.only("Iphone snapshot", async () => {
        await page.goto('https://www.example.com');
        await page.waitForSelector('h1')
        await page.emulate(puppeteer.devices['iPad landscape']);
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot({
            failureTresholdType: "pixel",
            failureTreshold:500
        });
        
        
        });   
    })
