import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Contracts } from '../../../api/contracts.js';
import './DeployProject.html';
import {Projects} from "../../../api/projects";


Template.DeployProject.created = function() {
    //const instance = Template.instance();
    this.Ctor = new ReactiveVar([]);
};

Template.DeployProject.onCreated(function DeployProjectOnCreated() {

    Meteor.subscribe('projects');
    Meteor.subscribe('contracts');
    console.log("this", this);
    const instance = Template.instance();


   //this.contractInterface = new ReactiveVar('waiting...');
    let conAdr = this.data.contractAddress ;
    let conAbi = this.data.contractAbi;
    console.log("conAdr", conAdr);
    console.log("contractAbi", conAbi);

    if(conAdr) {
        let con = SmartContract.getContract(conAdr, conAbi);

        console.log("con", con);
        //this.data.abi = con.abi;
    }






    //Meteor.call('loadContract');
    //Meteor.call('loadContractWithFs');
});

Template.DeployProject.onRendered(function() {
    // need for intialization
    $('.select2-dropdown').select2();
});


Template.DeployProject.helpers({
    jsonPrint(jsonObject) { // with Latest Javascript ECMAScript 2015+
        return JSON.stringify(jsonObject);
    },
    birth: function() {
        return Template.instance().birthDate.get();
    },
    Ctor(  ) {
        let contractAbi = Template.instance().Ctor.get();
        //type und inputs
        for(let i=0,len=contractAbi.length; i < len; i++) {
            if(contractAbi[i].type === "constructor") {
                return contractAbi[i].inputs;
            }
        }

    },
    getContracts() {
        // return only non-private contracts
        return Contracts.find({ private: { $ne: true } }, { sort: { title: 1 } });
    },
    getInputType: function(type) {
        if(type === "string") {
            return "text";
        }
        else if(type === "uint256") {
            return "number";
        }
        else {
            return "text";
        }
    },
});

Template.DeployProject.events({
    'click .deployContract'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        const target = event.target;

        let contractId = $("#selectionContract").val();
        console.log("contractId", contractId)
        if(!contractId) {
            alert("Please select a contract");
            return;
        }

        let $form = $("#deploy-project"),
            deployArguments = [];

        let deployProjectArray = $form.serializeArray();
        console.log(deployProjectArray);
        for(let i = 0, len = deployProjectArray.length; i < len; i++) {
            let name = deployProjectArray[i].name;
            console.log(name);
            let inputType = $("#deploy-project #" + name)[0].type;
            console.log(inputType);
            //
            let input =  deployProjectArray[i].value;
            if(inputType === "number") {
                input = parseInt(input, 10);
            }
            else {

            }
            deployArguments.push(input);
        }
        console.log(deployArguments);

        /*
               args = [
                   "DevToken",
                   "DVT",
                   web3.toWei(100, 'ether'),
                   25,
                   5,
                   [SmartContract.getUser()],
                   [web3.toWei(20, 'ether')],
                   60,
                   web3.toWei(1, 'ether'),
                   60,
                   50,
                   30
               ];
               /**/



        //Meteor.call('projects.deployContract',  this._id, this.title);

        //Maybe doing this completely on server is better => include web on server side...

        // 1. get contract by id
        Meteor.call('contracts.getById', contractId, (err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                console.log("contract retrieved", res);
                // Insert a task into the collection
                //let adr = "0x5fe5a1d75076f0b8425d0aa98874b37eef429552";
                let abi = JSON.parse(res.abi),
                    code = res.code;
                console.log("before deploy:", abi, code);
                // 2. deployContract to blockchain
                let gas = 5000000;

                SmartContract.deployContract("", gas, abi, code, deployArguments )  .then( response => {

                    // 3. Update current project with information of deployed contract
                    response.contractId = res._id;
                    response.contractTitle = res.title;
                    response.contractSource = res.source;
                    console.log( response, "success" );


                    Meteor.call('projects.deployContract',  this._id, response, function() {
                        // Clear form and close
                        $form[0].reset();
                        $('#deployModal').modal('hide');
                    });
                }).catch( error => {
                    console.log( error, "error" );
                });
            }
        });
    },
    'change #selectionContract'(event, tmpl) {
        console.log("yes", event);
        console.log("this", this);
        let contractId = $("#selectionContract").val();

        //

        //this.contractInterface = new ReactiveVar(false);

        Meteor.call('contracts.getById', contractId, (err, res) => {

            if (err) {
                console.log("err", err);
            } else {
                console.log("contract retrieved", res);
                console.log(" this",  this);
                console.log(" tmpl",  tmpl);

                let contractAbi = JSON.parse(res.abi);
                tmpl.Ctor.set(contractAbi);
            }
        });
    }
});