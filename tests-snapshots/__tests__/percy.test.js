const puppeteer = require('puppeteer');
const percySnapshot = require("@percy/puppeteer");

describe("Percy test 1", () =>{
    let browser,page;

    beforeAll(async ()=>{
        browser = await puppeteer.launch ({headless : false});

        page = await browser.newPage();
    });

    afterAll(async function () {
        await browser.close();
    });

    test("Captura de pantalla completa", async () =>{
        await page.goto('https://www.example.com');
        await page.waitForSelector('h1')

        await page.evaluate(()=>{
            (document.querySelectorAll('h1') || []).forEach(el => el.remove())
        })

        await percySnapshot(page, "ejemplo primer prueba");
    })

    test.only("MI PRUEBA: Captura de pantalla y quitamos logo de FB",async () =>{
        await page.goto('https://www.facebook.com/login');
        await page.waitForSelector('img._97vu.img')

        //Esto se agrego despues para hacerlo fallar
        await page.evaluate(()=>{
            (document.querySelectorAll('img._97vu.img') || []).forEach(el => el.remove())
        })

        await percySnapshot(page, "ejemplo primer prueba");
    })
})
