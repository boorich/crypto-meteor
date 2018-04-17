import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../../chart/chart.js';
import '../../entity/github/overview/github.js';
import '../../entity/github/documentation/githubDocu.js';
import './detailproject.html';
import {Projects} from "../../../api/projects";
import '../deploy/DeployProject.js';



Template.DetailProject.onCreated(function DetailProjectOnCreated() {

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

});

Template.DetailProject.helpers({

    jsonPrint(jsonObject) { // with Latest Javascript ECMAScript 2015+
        return JSON.stringify(jsonObject);
    }
});

Template.DetailProject.events({

});