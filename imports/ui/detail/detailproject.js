import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../chart/chart.js';
import '../entity/github/github.js';

import './detailproject.html';

import { ReactiveDict } from 'meteor/reactive-dict';
import { Projects } from '../../api/projects.js';


Template.DetailProject.onCreated(function revProjectsOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('projects');
});

Template.DetailProject.onRendered(function() {

});


Template.DetailProject.helpers({
    getContract() {
        const instance = Template.instance();
        console.log("this", this);

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