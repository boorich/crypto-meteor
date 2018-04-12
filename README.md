# Meteor Crypto Project

The app for bitches.
This demo demonstrates a test for login into a system to create contracts either for dev or for rev.

Learn how to build this app by following the [Meteor Tutorial](http://www.meteor.com/install).

Read more about building apps with Meteor in the [Meteor Guide](http://guide.meteor.com).

## Overview
The system provides the following functions:
- Dummy dashboard showing all projects with dummy elements (only name is retrieved from database)
- Solidity contracts
  - Load contracts
  - List contracts
  - Show contract details i.e. their code, abi, and interface
- Projects (dev and rev)
  - Create projects (currently only dummy with name)
  - Deploy a particular contract for a project
  - List projects
  - Show project details i.e. if deployed and if so deploy data such as contract address, abi, transaction hash

# Artefacts
1. Install testrpc or ganache (in the case of canache change either the port to 8545 or change the web provider port here: imports/startup/init.js)
2. Install meteor. Maybe you need to install some additional NPM packages.
3. test if installation worked out well. Just type in meteor.


# Start environment
1. Start ganache or testrpc.
2. Switch to project root folder and type in meteor

Additional information:
- goto lib/globals.js and change import to false, so that contracts are deleted and imported (change it back only for the first time- currently there is no check if contract is already loaded).
- you have to define which contracts are imported in imports/startup/server/fixtures.js i.e. if you have further contract you would like to try out.  

# Repo hygiene
- use develop branch for any kind of development
- work with feature branches and don't push directly to development branch
- master is for the master bitch only and later for production.

#ToDos
- better readme
- automated loading of all contracts provided in /private/contracts
- load real contract and show contract data
- build UI based on interface/ABI and provide setters and getters
... a lot more stuff too late for bitches...
