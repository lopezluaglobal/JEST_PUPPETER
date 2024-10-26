const puppeteer = require('puppeteer');
const percySnapshot = require("@percy/puppeteer");


describe("Automatizacion de pagina metlife", () => {
    let browser,page;

    beforeAll(async ()=>{
        browser = await puppeteer.launch ({headless : false});

        page = await browser.newPage();
    });

    afterAll(async function () {
        await browser.close();
    });

    test("Login fallido", async () => {
        await page.goto('https://servicios.metlife.com.mx/wps/portal/clientes/');
        await page.waitForSelector('h1')

        const user = "input#usuario";
        const contra = "input#password";
        const botonLogin = "button#btnLogin";
        const mensajeError= "div.errores";

        await page.type(user, 'Luis',{delay: 500});
        await page.type(contra, 'Luis',{delay: 500});

        await page.click(botonLogin);

        await page.waitForSelector(mensajeError);

        await percySnapshot(page, "ejemplo primer prueba");

       
    })
})