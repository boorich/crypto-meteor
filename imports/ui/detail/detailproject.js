import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../chart/chart.js';
import '../entity/github/github.js';

import './detailproject.html';


Template.DetailProject.onCreated(function revProjectsOnCreated() {
    Meteor.subscribe('projects');
    console.log("this", this);
    let conAdr = this.data.contractAddress ;
    console.log("conAdr", conAdr);
    if(conAdr) {
        let con = getContract(conAdr);
        console.log("con", con);
        this.data.abi = con.abi;
    }
});

Template.DetailProject.onRendered(function() {

});


Template.DetailProject.helpers({
    getContract() {
        //const instance = Template.instance();
    },
    jsonPrint(jsonObject) { // with Latest Javascript ECMAScript 2015+
        return JSON.stringify(jsonObject);
    }
});

Template.DetailProject.events({
    'click .createContract'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;

        // Insert a task into the collection
        let adr = "0x5fe5a1d75076f0b8425d0aa98874b37eef429552";

        createContract(  ).then( response => {
            console.log( response, "success" );

            if ( true ) {
                Meteor.call('projects.createContract',  this._id, response);
            }
        }).catch( error => {
            console.log( error, "error" );
        });

        /*
        console.log("contract", contract);
        console.log("contractAdr", contract.address);
        Meteor.call('projects.createContract',  this._id, contract);

        if(contract && contract.address) {

        }
        */
    }

});