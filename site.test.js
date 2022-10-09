const puppeteer = require("puppeteer");
const fs = require("fs");


// function that returns the current DD-MM-YYYY HH-MM-SS
function getTime() {
    var current = new Date();
    var date = current.toLocaleDateString() + " " + current.getHours() + ":" + current.getMinutes()+ ":" + current.getSeconds();
    return date
}


// test header and title existance
test("Confirm header and title", async () => {
    fs.writeFile("logs.txt", "["+getTime()+"] Starting test 1 - header and title existance:\n", (err) => { if (err) throw err; });
    const browser = await puppeteer.launch();

    try {
        // go to localhost webpage
        const page = await browser.newPage();
        await page.goto("http://localhost:8080");
        
        // expectation
        let header = await page.$("#title");
        let headerTitle = await header.evaluate((el) => el.textContent);
        expect(headerTitle).toContain("Bug Reporting Tool");
        fs.appendFile("logs.txt", "["+getTime()+"] Header and title check completed.\n", (err) => { if (err) throw err; });
        fs.appendFile("logs.txt", "["+getTime()+"] Successfully completed test 1.\n", (err) => { if (err) throw err; });
    }

    finally {
        await browser.close();
    }
});


// test adding multiple bug
test("Confirm multiple bug addition", async () => {
    fs.appendFile("logs.txt", "\n["+getTime()+"] Starting test 2 - multiple bug addition:\n", (err) => { if (err) throw err; });
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.goto("http://localhost:8080");
        
        // fill in form
        await page.type("#bugTitle", "Foo");
        await page.type("#bugDesc", "Bar");
        await page.click("#addBtn");

        // submitted ID expectation
        let id = await page.$("#sID_1");
        let idVal = await id.evaluate((el) => el.textContent);
        expect(idVal).toContain("1");
        fs.appendFile("logs.txt", "["+getTime()+"] Submitted ID check completed.\n", (err) => { if (err) throw err; });

        // submitted title expectation
        let title = await page.$("#sTitle_1");
        let titleVal = await title.evaluate((el) => el.textContent);
        expect(titleVal).toContain("Foo");
        fs.appendFile("logs.txt", "["+getTime()+"] Submitted title check completed.\n", (err) => { if (err) throw err; });

        // submitted description expectation
        let desc = await page.$("#sDesc_1");
        let descVal = await desc.evaluate((el) => el.textContent);
        expect(descVal).toContain("Bar");
        fs.appendFile("logs.txt", "["+getTime()+"] Submitted description check completed.\n", (err) => { if (err) throw err; });


        // fill in form again
        await page.type("#bugTitle", "Baz");
        await page.type("#bugDesc", "Foo");
        await page.click("#addBtn");

        // incremented submitted ID expectation
        let newID = await page.$("#sID_2");
        let newIDVal = await newID.evaluate((el) => el.textContent);
        expect(newIDVal).toContain("2");
        fs.appendFile("logs.txt", "["+getTime()+"] Incremented ID check completed.\n", (err) => { if (err) throw err; });
        fs.appendFile("logs.txt", "["+getTime()+"] Successfully completed test 2.\n", (err) => { if (err) throw err; });
    }

    finally {
        await browser.close();
    }
},);


// test deleting a bug
test("Confirm bug deletion", async () => {
    fs.appendFile("logs.txt", "\n["+getTime()+"] Starting test 3 - bug deletion:\n", (err) => { if (err) throw err; });
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.goto("http://localhost:8080");
        
        // fill in form and click delete
        await page.type("#bugTitle", "Foo");
        await page.type("#bugDesc", "Bar");
        await page.click("#addBtn");
        await page.click("#deleteBtn");
        
        // removal of submitted and resolved ID expectation
        expect(page).not.toContain("#sID_1");
        expect(page).not.toContain("#rID_1");
        fs.appendFile("logs.txt", "["+getTime()+"] Deletion check completed.\n", (err) => { if (err) throw err; });
        fs.appendFile("logs.txt", "["+getTime()+"] Successfully completed test 3.\n", (err) => { if (err) throw err; });
    }

    finally {
        await browser.close();
    }
},);


// test marking a bug as resolved
test("Confirm bug resoluton", async () => {
    fs.appendFile("logs.txt", "\n["+getTime()+"] Starting test 4 - bug resolution:\n", (err) => { if (err) throw err; });
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.goto("http://localhost:8080");
        
        // fill in form and click resolve
        await page.type("#bugTitle", "Foo");
        await page.type("#bugDesc", "Bar");
        await page.click("#addBtn");
        await page.click("#resolveBtn");
        
        // removal of submitted ID expectation
        expect(page).not.toContain("#sID_1");
        fs.appendFile("logs.txt", "["+getTime()+"] Removed submitted ID check completed.\n", (err) => { if (err) throw err; });

        // resolved ID expectation
        let id = await page.$("#rID_1");
        let idVal = await id.evaluate((el) => el.textContent);
        expect(idVal).toContain("1");
        fs.appendFile("logs.txt", "["+getTime()+"] Resolved ID check completed.\n", (err) => { if (err) throw err; });

        // resolved title expectation
        let title = await page.$("#rTitle_1");
        let titleVal = await title.evaluate((el) => el.textContent);
        expect(titleVal).toContain("Foo");
        fs.appendFile("logs.txt", "["+getTime()+"] Resolved title check completed.\n", (err) => { if (err) throw err; });

        // resolved description expectation
        let desc = await page.$("#rDesc_1");
        let descVal = await desc.evaluate((el) => el.textContent);
        expect(descVal).toContain("Bar");
        fs.appendFile("logs.txt", "["+getTime()+"] Resolved description check completed.\n", (err) => { if (err) throw err; });
        fs.appendFile("logs.txt", "["+getTime()+"] Successfully completed test 4.\n", (err) => { if (err) throw err; });
    }

    finally {
        await browser.close();
    }
},);