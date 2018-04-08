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

});

Template.DetailProject.events({


});