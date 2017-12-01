const fs = require('fs');

const browser = require('./browser');
const options = require('./options');

const DATA_FILE_PATH = process.env.DATA_FILE_PATH || 'data.csv';
const IGNORED_DATA_PATH = 'ignored_data.csv';
const TEST_DATA_PATH = 'test/data.csv';

before((done) => {
    fs.renameSync(DATA_FILE_PATH, IGNORED_DATA_PATH);
    fs.createReadStream(TEST_DATA_PATH).pipe(fs.createWriteStream(DATA_FILE_PATH));
    browser.setOptions(options);
    browser.setUp(done);
});
after(async () => {
    browser.close();
    await fs.unlinkSync(DATA_FILE_PATH);
    await fs.renameSync(IGNORED_DATA_PATH, DATA_FILE_PATH);
});
