const {expect} = require('chai');
const {test} = require('../browser');

let page, response;

const fillForm = (async (page) => {
    await page.$eval('#title', el => el.value = '');
    await page.type('#title', 'Another,;?-| User Story');

    await page.$eval('#user_story', el => el.value = '');
    await page.type('#user_story', `As a User Story,
I would like to be saved in the database
So users can see me`);

    await page.$eval('#acceptance_criteria', el => el.value = '');
    await page.type('#acceptance_criteria', `When I write things here
It should be saved`);

    await page.$eval('#business_value', el => el.value = '');
    await page.type('#business_value', '1400');

    await page.$eval('#estimation', el => el.value = '');
    await page.type('#estimation', '7.5');

    await page.click('button[type="submit"]');
    await page.waitForNavigation();
});

/**
 * Load the page and store it for future tests.
 */
before(test(async (browser, opts) => {
    page = await browser.newPage();
    response = await page.goto(`${opts.appUrl}/story`);
}));

describe('Add User Story', () => {
    describe('Page', () => {
        it('should load without Exception', test(async () => {
            // Check for Flask debug messages
            expect(await page.$('.traceback')).to.be.null;
            expect(await page.$('.debugger')).to.be.null;
        }));

        it('should load without Error outside debug mode', test(async () => {
            expect(await response.ok).to.be.true;
            expect(await response.text()).not.to.contain('Server Error');
        }));

        it('should show a header', test(async () => {
            expect(
                await page.$eval('h1', el => el.innerText)
            ).to.be.equal('Add User Story');
        }));

        it('should contain a form', test(async () => {
            expect(
                await page.$('form')
            ).not.to.be.null;
        }));

        it('should submit the form with post method', test(async () => {
            expect(
                await page.$eval('form', el => el.getAttribute('method').toLowerCase())
            ).to.contain('post');
        }));

        it('should submit the form to the same/similar route', test(async () => {
            expect(
                await page.$eval('form', el => el.getAttribute('action').toLowerCase())
            ).to.contain('story');
        }));

    });

    describe('Story title input', () => {
        describe('Label', () => {
            it('should be visible', test(async () => {
                expect(
                    await page.$('label[for="title"]')
                ).not.to.be.null;
            }));

            it('should have a proper text', test(async () => {
                expect(
                    await page.$eval('label[for="title"]', el => el.innerHTML.toLowerCase())
                ).to.contain('story').and.contain('title');
            }));
        });

        describe('Input', () => {
            it('should have a proper name attribute', test(async () => {
                expect(
                    await page.$('input[name="title"]')
                ).not.to.be.null;
            }));

            it('should have a proper id attribute', test(async () => {
                expect(
                    await page.$('input#title')
                ).not.to.be.null;
            }));

            it('should have a proper type attribute', test(async () => {
                expect(
                    await page.$eval('#title', el => el.getAttribute('type'))
                ).to.be.equal('text');
            }));

            it('should have a length validation', test(async () => {
                expect(
                    await page.$eval('#title', el => el.getAttribute('minlength'))
                ).to.be.equal('5');
            }));

            it('should be editable', test(async () => {
                await page.type('#title', 'Test User Story');

                expect(
                    await page.$eval('#title', el => el.value)
                ).to.be.equal('Test User Story');
            }));
        });
    });

    describe('User Story input', () => {
        describe('Label', () => {
            it('should be visible', test(async () => {
                expect(
                    await page.$('label[for="user_story"]')
                ).not.to.be.null;
            }));

            it('should have a proper text', test(async () => {
                expect(
                    await page.$eval('label[for="user_story"]', el => el.innerHTML.toLowerCase())
                ).to.contain('user').and.contain('story');
            }));
        });

        describe('Input', () => {
            it('should have a proper name attribute', test(async () => {
                expect(
                    await page.$('textarea[name="user_story"]')
                ).not.to.be.null;
            }));

            it('should have a proper id attribute', test(async () => {
                expect(
                    await page.$('textarea#user_story')
                ).not.to.be.null;
            }));

            it('should have a rows attribute specified', test(async () => {
                expect(
                    await page.$eval('#user_story', el => el.getAttribute('rows'))
                ).not.to.be.null;
            }));

            it('should have a cols attribute specified', test(async () => {
                expect(
                    await page.$eval('#user_story', el => el.getAttribute('cols'))
                ).not.to.be.null;
            }));

            it('should be editable', test(async () => {
                await page.type('#user_story', 'Test User Story description');

                expect(
                    await page.$eval('#user_story', el => el.value)
                ).to.be.equal('Test User Story description');
            }));
        });
    });

    describe('Acceptance Criteria input', () => {
        describe('Label', () => {
            it('should be visible', test(async () => {
                expect(
                    await page.$('label[for="acceptance_criteria"]')
                ).not.to.be.null;
            }));

            it('should have a proper text', test(async () => {
                expect(
                    await page.$eval('label[for="acceptance_criteria"]', el => el.innerHTML.toLowerCase())
                ).to.contain('acceptance').and.contain('criteria');
            }));
        });

        describe('Input', () => {
            it('should have a proper name attribute', test(async () => {
                expect(
                    await page.$('textarea[name="acceptance_criteria"]')
                ).not.to.be.null;
            }));

            it('should have a proper id attribute', test(async () => {
                expect(
                    await page.$('textarea#acceptance_criteria')
                ).not.to.be.null;
            }));

            it('should have a rows attribute specified', test(async () => {
                expect(
                    await page.$eval('#acceptance_criteria', el => el.getAttribute('rows'))
                ).not.to.be.null;
            }));

            it('should have a cols attribute specified', test(async () => {
                expect(
                    await page.$eval('#acceptance_criteria', el => el.getAttribute('cols'))
                ).not.to.be.null;
            }));

            it('should be editable', test(async () => {
                await page.type('#acceptance_criteria', 'Test User Story description');

                expect(
                    await page.$eval('#acceptance_criteria', el => el.value)
                ).to.be.equal('Test User Story description');
            }));
        });
    });

    describe('Business value input', () => {
        describe('Label', () => {
            it('should be visible', test(async () => {
                expect(
                    await page.$('label[for="business_value"]')
                ).not.to.be.null;
            }));

            it('should have a proper text', test(async () => {
                expect(
                    await page.$eval('label[for="business_value"]', el => el.innerHTML.toLowerCase())
                ).to.contain('business').and.contain('value');
            }));
        });

        describe('Input', () => {
            it('should have a proper name attribute', test(async () => {
                expect(
                    await page.$('input[name="business_value"]')
                ).not.to.be.null;
            }));

            it('should have a proper id attribute', test(async () => {
                expect(
                    await page.$('input#business_value')
                ).not.to.be.null;
            }));

            it('should have a proper type attribute', test(async () => {
                expect(
                    await page.$eval('#business_value', el => el.getAttribute('type'))
                ).to.be.equal('number');
            }));

            it('should have a min attribute specified', test(async () => {
                expect(
                    await page.$eval('#business_value', el => el.getAttribute('min'))
                ).not.to.be.null;
            }));

            it('should have a correct min attribute specified', test(async () => {
                expect(
                    await page.$eval('#business_value', el => el.getAttribute('min'))
                ).to.be.equal('100');
            }));

            it('should have a max attribute specified', test(async () => {
                expect(
                    await page.$eval('#business_value', el => el.getAttribute('max'))
                ).not.to.be.null;
            }));

            it('should have a correct max attribute specified', test(async () => {
                expect(
                    await page.$eval('#business_value', el => el.getAttribute('max'))
                ).to.be.equal('1500');
            }));

            it('should have a step attribute specified', test(async () => {
                expect(
                    await page.$eval('#business_value', el => el.getAttribute('step'))
                ).not.to.be.null;
            }));

            it('should have a correct step attribute specified', test(async () => {
                expect(
                    await page.$eval('#business_value', el => el.getAttribute('step'))
                ).to.be.equal('100');
            }));

            it('should be editable', test(async () => {
                await page.$eval('#business_value', el => el.value = '');
                await page.type('#business_value', '200');

                expect(
                    await page.$eval('#business_value', el => el.value)
                ).to.be.equal('200');
            }));
        });
    });

    describe('Estimation input', () => {
        describe('Label', () => {
            it('should be visible', test(async () => {
                expect(
                    await page.$('label[for="estimation"]')
                ).not.to.be.null;
            }));

            it('should have a proper text', test(async () => {
                expect(
                    await page.$eval('label[for="estimation"]', el => el.innerHTML.toLowerCase())
                ).to.contain('estim');
            }));
        });

        describe('Input', () => {
            it('should have a proper name attribute', test(async () => {
                expect(
                    await page.$('input[name="estimation"]')
                ).not.to.be.null;
            }));

            it('should have a proper id attribute', test(async () => {
                expect(
                    await page.$('input#estimation')
                ).not.to.be.null;
            }));

            it('should have a proper type attribute', test(async () => {
                expect(
                    await page.$eval('#estimation', el => el.getAttribute('type'))
                ).to.be.equal('number');
            }));

            it('should have a min attribute specified', test(async () => {
                expect(
                    await page.$eval('#estimation', el => el.getAttribute('min'))
                ).not.to.be.null;
            }));

            it('should have a correct min attribute specified', test(async () => {
                expect(
                    await page.$eval('#estimation', el => el.getAttribute('min'))
                ).to.be.equal('0.5');
            }));

            it('should have a max attribute specified', test(async () => {
                expect(
                    await page.$eval('#estimation', el => el.getAttribute('max'))
                ).not.to.be.null;
            }));

            it('should have a correct max attribute specified', test(async () => {
                expect(
                    await page.$eval('#estimation', el => el.getAttribute('max'))
                ).to.be.equal('40');
            }));

            it('should have a step attribute specified', test(async () => {
                expect(
                    await page.$eval('#estimation', el => el.getAttribute('step'))
                ).not.to.be.null;
            }));

            it('should have a correct step attribute specified', test(async () => {
                expect(
                    await page.$eval('#estimation', el => el.getAttribute('step'))
                ).to.be.equal('0.5');
            }));

            it('should be editable', test(async () => {
                await page.$eval('#estimation', el => el.value = '');
                await page.type('#estimation', '10');

                expect(
                    await page.$eval('#estimation', el => el.value)
                ).to.be.equal('10');
            }));
        });
    });

    describe('Submit button', () => {
        describe('Layout', () => {
            it('should have a proper tag', test(async () => {
                expect(
                    await page.$$('button')
                ).to.have.lengthOf(1);
            }));

            it('should have a proper type', test(async () => {
                expect(
                    await page.$eval('button', el => el.getAttribute('type'))
                ).to.be.equal('submit');
            }));

            it('should have a proper text', test(async () => {
                expect(
                    await page.$eval('button', el => el.innerHTML.toLowerCase())
                ).to.be.equal('add new user story');
            }));
        });
        describe('Functionality', () => {
            it('should redirect to list page on submit', test(async (browser, opts) => {
                await fillForm(page);

                expect(
                    await page.url()
                ).to.be.equal(`${opts.appUrl}/`);
            }));

            it('should show the new data\'s title in the list page', test(async () => {
                expect(
                    await page.$eval('table tr:nth-of-type(5) td:nth-of-type(2)', el => el.innerText)
                ).to.be.equal('Another,;?-| User Story')
            }));

            it('should show the new data\'s user story in the list page', test(async () => {
                expect(
                    await page.$eval('table tr:nth-of-type(5) td:nth-of-type(3)', el => el.innerText)
                ).to.be.equal(`As a User Story,
I would like to be saved in the database
So users can see me`)
            }));

            it('should show the new data\'s acceptance criteria in the list page', test(async () => {
                expect(
                    await page.$eval('table tr:nth-of-type(5) td:nth-of-type(4)', el => el.innerText)
                ).to.be.equal(`When I write things here
It should be saved`)
            }));

            it('should show the new data\'s business value in the list page', test(async () => {
                expect(
                    await page.$eval('table tr:nth-of-type(5) td:nth-of-type(5)', el => el.innerText)
                ).to.be.equal('1400 point')
            }));

            it('should show the new data\'s estimation in the list page', test(async () => {
                expect(
                    await page.$eval('table tr:nth-of-type(5) td:nth-of-type(6)', el => el.innerText)
                ).to.be.equal('7.5h')
            }));


            it('should show the first story\'s estimation in the list page', test(async () => {
                expect(
                    await page.$eval('table tr:nth-of-type(5) td:nth-of-type(7)', el => el.innerText.toLowerCase())
                ).to.contain('planning')
            }));

            /**
             * The newly generated story should get the next positive number as an id.
             */
            it('should show the new data\'s generated id in the list page', test(async () => {
                //await page.waitForNavigation({timeout: 0});

                expect(
                    await page.$eval('table tr:nth-of-type(5) td:nth-of-type(1)', el => el.innerText)
                ).to.be.equal('4')
            }));
        });
    });
});
