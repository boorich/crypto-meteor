import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../chart/chart.js';
import '../entity/github/github.js';
import { Contracts } from '../../api/contracts.js';
import './detailproject.html';
import {Projects} from "../../api/projects";
//import 'client/lib/soljson-v0.4.5+commit.b318366e.js';

Template.DetailProject.onCreated(function revProjectsOnCreated() {

    Meteor.subscribe('projects');
    Meteor.subscribe('contracts');
    console.log("this", this);
    let conAdr = this.data.contractAddress ;
    let conAbi = this.data.contractAbi ;
    console.log("conAdr", conAdr);
    if(conAdr) {
        let con = SmartContract.getContract(conAdr, conAbi);

        console.log("con", con);
        //this.data.abi = con.abi;
    }

    //Meteor.call('loadContract');
    //Meteor.call('loadContractWithFs');
});

Template.DetailProject.onRendered(function() {
    // need for intialization
    $('.select2-dropdown').select2();
});


Template.DetailProject.helpers({
    getContracts() {
        // return only non-private contracts
        return Contracts.find({ private: { $ne: true } }, { sort: { title: 1 } });
    },
    jsonPrint(jsonObject) { // with Latest Javascript ECMAScript 2015+
        return JSON.stringify(jsonObject);
    }
});

Template.DetailProject.events({
    'click .deployContract'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        const target = event.target;
        console.log(this, "this");
        let contractId = $("#selectionContract").val();
        console.log("contractId", contractId)
        if(!contractId) {
            alert("Please select a contract");
            return;
        }

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
                SmartContract.deployContract("", abi, code )  .then( response => {
                    console.log( response, "success" );
                    // 3. Update current project with information of deployed contract
                    Meteor.call('projects.deployContract',  this._id, response);
                }).catch( error => {
                    console.log( error, "error" );
                });
            }
        });
    }
});