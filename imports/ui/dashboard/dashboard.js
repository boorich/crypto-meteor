import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './dashboard.html';
import '../entity/gitcoin/gitcoin.js';

import { Projects } from '../../api/projects.js';

Template.Dashboard.onCreated(function dashboardOnCreated() {
/*
    Meteor.call('testAPI', (error, response) => {
        if (error) {
          console.log(error.reason, 'danger');
        } else {
          console.log('response', response);
        }
    });
    */
});



Template.Dashboard.helpers({
  devProjects() {
    return Projects.find({coinType: { $eq: "dev" }}, { sort: { createdAt: -1 } });
  },
  revProjects() {
    return Projects.find({coinType: { $eq: "rev" }}, { sort: { createdAt: -1 } });
  }

});