# Test solution

## Node.js
Check if you have Node.js installed with `node --version`

If you get an error message, or you have older then 7.x version.
You should install the latest version with the following commands: *(This will take a lot of time...)*
```
sudo apt-get update
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install nodejs
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
