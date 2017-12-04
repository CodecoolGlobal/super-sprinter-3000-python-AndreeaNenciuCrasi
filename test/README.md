# Test solution

## Node.js
Check if you have Node.js installed with `node --version`

If you get an error message, or you have older then 9.x version.
You should install the latest version with the following commands: *(This will take a lot of time...)*
```
sudo apt-get update
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install nodejs
npm install
```

Source: https://gist.github.com/isaacs/579814#file-node-and-npm-in-30-seconds-sh


## Run tests

### From PyCharm
The repository includes running configurations for PyCharm.
If everything is in order, You should find an "All tests" option in the top right corner.
Just select this option, and click the green play button.


### From Terminal
If you can't deal with the PyCharm way, you can run the tests from the terminal with the following command:
```
npm test
```


## Troubleshooting

### Timout error

The tests may fail with timeout error if your machine is slow. This happens because the test assumes your server crashed, when it's just slow. If you encounter this issue. Please try close some running applications.


### First before hook fails

Either your project is not started in another session/terminal or your installation needs some more packages:

If you don't have Google Chrome installed on Ubuntu, the tests might require the following dependencies. You can install them by running the following command:
```
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```
