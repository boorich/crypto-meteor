/**
 * API for contracts
 * Publications and Methods
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Contracts = new Mongo.Collection('contracts');

var insert = function(title, coinType, source, code, abi) {
    check(title, String);
    check(coinType, String);
    // Make sure the user is logged in before inserting a project
    // TODO security issue...
    let user =  this.userId || "admin",
        username = "admin";
    if(this.userId) {
        user =  Meteor.users.findOne(this.userId).username;
    }
    else {
        username = "admin";
    }

    /*
    if (! this.userId) {
        //throw new Meteor.Error('not-authorized');
    }
    */
    Contracts.insert({
        title,
        coinType,
        source,
        code,
        abi,
        private: false,
        owner: user,
        username: username,
        createdAt: new Date()
    });
};


if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish contracts that are public or belong to the current user
    //const fs = require("fs");
    const solc = require("solc");
    Meteor.publish('contracts', function contractsPublication() {
    return Contracts.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });

    Meteor.methods({
        'loadContract'(filename) {
            //var importContractABI = JSON.parse(Assets.getText('abi-contract.json'));
            //console.log("importContractABI", importContractABI);
            /*
                    var importContract = fs.readFileSync('/contracts/DevToken.sol').toString();
                    console.log("importContract", importContract);
            */
            console.log(solc.version());
            let importContract = "";
            //importContract =  Assets.getText('contracts/SimpleStorage.sol');
            importContract =  Assets.getText('contracts/'+ filename + '.sol');
            //importContract =  Assets.getText('contracts/Test.sol');
            console.log("importContract", importContract);

            //var input = "contract x { function g() {} }";
            var output = solc.compile(importContract, 1); // 1 activates the optimiser

            //var output = solc.compileStandardWrapper(importContract, findImports)
            //console.log("output", output.contracts);
            var bytecode = output.contracts[':'+filename].bytecode;
            var interface = output.contracts[':'+filename].interface;

            //var obj = JSON.parse(output);

            console.log("bytecode", bytecode);
            console.log("interface", interface);
            insert(filename, "dev", importContract, bytecode, interface);
        },
        'deleteAllContracts'() {
            Contracts.remove({});
        }
        /*
            loadContractWithFs() {
                //solc.setVersion('0.4.21');
                console.log(solc.version());
                var importContract = fs.readFileSync('/Psysoft/cryptohouse/repo/crypto-meteor/private/contracts/Test.sol', 'utf8').toString();
                console.log("importContract", importContract);
                var compileCode = solc.compile(importContract);

                console.log("compileCode", compileCode);
            }
        */
    });
}

Meteor.methods({
    'contracts.insert'(title, coinType, source, code, abi) {
        insert(title, coinType, source, code, abi);
  },
    /**
     * Remove contract by id. Only owner can remove a contract.
     * @param contractid
     */
    'contracts.remove'(contractid) {
    check(contractid, String);

    const contract = Contracts.findOne(contractid);
    if (contract.owner !== this.userId) {
      // If the contract is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

      Contracts.remove(contractid);
  },
    'contracts.update'(contractid, updateObj) {
    check(contractid, String);
    check(updateObj, Object);

    const contract = Contracts.findOne(contractid);
    if (contract.owner !== this.userId) {
      // If the contract is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

      Contracts.update(contractid, { $set: {
              source: updateObj.source,
              code: updateObj.code,
              abi: updateObj.abi,
              createdAt: new Date()
          } });
  },
    'contracts.setPrivate'(contractid, setToPrivate) {
        check(contractid, String);
        check(setToPrivate, Boolean);

        const contract = Contracts.findOne(contractid);

        // Make sure only the contract owner can make a contract private
        if (contract.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Contracts.update(contractid, { $set: { private: setToPrivate } });
    }
});




