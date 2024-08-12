# Group Food Order Platform

This is the front-end (Web) project for Group Food Order Platform.

## System Design

The application is a single-page web application using `Vue.js`.

<!-- TODO: Considering using the webpack for package, sass for styling and jest for unit testing -->

## Project setup

### Prerequisites

#### Node.js

*Node.js* is used as part of the build system. In order to make it possible to switch between Node versions in the
system, install Node Version Manger for Windows first.

**if you have nodeJS installed in your machine already, you will have to uninstall it, and remove the npm Roaming
folders as well.**

**NVM setup can be found in the Assets section in the release note
in https://github.com/coreybutler/nvm-windows/releases (latest release note is marked with label). File
name is nvm-setup.exe.**

Follow the steps in the readme file => https://github.com/coreybutler/nvm-windows#installation\--upgrades

Once NVM is installed follow the following steps:

The currently used version is `LTS v20.11.X`, and you must install this version by running.

* $ nvm install 20.11.0

In order to use the node version 20.11.X make sure to switch to it by using following command in the **command prompt
** :

* $ nvm use 20.11.0

The project uses the *node package manager* (npm) to download tools and packages used for development. NPM version
related to node version should be automatically installed.

* Open *git bash* and check that you have successfully installed *Node.js* and *npm*:

  $npm –version

The command should respond with a valid version.

### Steps

- Project cloned to your machine.

- Project dependencies installed by executing the following commands:
   - `$cd <project-root>`
   - `$npm install`

- Configure the sandbox by running
  - `$npm run config`

The project is now ready to run.

- Project dependencies installed by executing the following commands:
   - `$npm run serve`


### How to Configure Frontend github CICD - INFORMATION TO UPDATE
Build dist:
1, build Product version in folder dist:
sudo npm run build

2, Configure Github Secrets
Go to Setting -> Secrets and variables -> Actions -> Secrets add:
- AWS_REGION
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- SNYK_API_TOKEN (value is from Snyk Account Settings -> General -> Auth Token)

Notes:
The mapping value please refer to google drive file CICD_Github_Secrets.
Synk Code scanning for private repositories is part of GitHub Advanced Security, have to pay.
The SNYK_API_TOKEN is different from backend SNYK_TOKEN

3, Create AWS S3 bucket
bucekt name: grouporder

4, create github workflow yml
frontend_cicd.yml

### How to swich from localhost to cloud
- Update below 2 js files to run on localhost:
1, vue.config.js
proxy: 'http://localhost:8081'

2, baseAPI.js
baseURL: 'http://localhost:8081/'

- Update below 2 js files to run on S3:
1, vue.config.js
proxy: 'http://3.211.129.88'

2, baseAPI.js
baseURL: 'http://3.211.129.88/'
