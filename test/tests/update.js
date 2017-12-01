const {expect} = require('chai');
const {test} = require('../browser');

let page, response;

/**
 * Load the page and store it for future tests.
 */
before(test(async (browser, opts) => {
    page = await browser.newPage();
    response = await page.goto(`${opts.appUrl}/story/1`);
}));

describe('Update existing User Story', () => {
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
            ).to.be.equal('Update User Story');
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

            it('should contain the stored data', test(async () => {
                expect(
                    await page.$eval('#title', el => el.value)
                ).to.be.equal('List all User Stories');
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
                expect(
                    await page.$eval('#user_story', el => el.value)
                ).to.be.equal(`As a User,
I want to see all the previously saved User stories,
So I get an overview of all requirements
`);
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
                expect(
                    await page.$eval('#acceptance_criteria', el => el.value)
                ).to.be.equal(`Given that there are any number ({0..n}) of saved User Stories,
When I open the website (\`/\`),
Then ensure I see a table with all the stored data`);
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

    describe('Status select', () => {
        describe('Label', () => {
            it('should be visible', test(async () => {
                expect(
                    await page.$('label[for="status"]')
                ).not.to.be.null;
            }));

            it('should have a proper text', test(async () => {
                expect(
                    await page.$eval('label[for="status"]', el => el.innerHTML.toLowerCase())
                ).to.contain('status');
            }));
        });

        describe('Select', () => {
            it('should have a proper name attribute', test(async () => {
                expect(
                    await page.$('select[name="status"]')
                ).not.to.be.null;
            }));

            it('should have a proper id attribute', test(async () => {
                expect(
                    await page.$('select#status')
                ).not.to.be.null;
            }));

            it('should keep the saved value', test(async () => {
                expect(
                    await page.$eval('#status', el => el.value.toLowerCase())
                ).to.be.equal('in progress');
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
                ).to.be.equal('update user story');
            }));
        });
        describe('Functionality', () => {
            it('should redirect to list page on submit', test(async (browser, opts) => {
                await page.$eval('#title', el => el.value = '');
                await page.type('#title', 'List every User Stories');

                await page.click('button[type="submit"]');
                await page.waitForNavigation();

                expect(
                    await page.url()
                ).to.be.equal(`${opts.appUrl}/`);
            }));

            it('should be possible to change the title', test(async () => {
                expect(
                    await page.$eval('table tr:nth-of-type(2) td:nth-of-type(2)', el => el.innerText)
                ).to.be.equal('List every User Stories')
            }));

            it('should not create a duplicate', test(async () => {
                expect(
                    await page.$eval('table', el => el.innerHTML)
                ).to.not.contain('List all User Stories')
            }));
        });
    });
});
