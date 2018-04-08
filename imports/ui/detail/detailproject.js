import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';


import './detailproject.html';

import { ReactiveDict } from 'meteor/reactive-dict';
import { Projects } from '../../api/projects.js';


Template.DetailProject.onCreated(function revProjectsOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('projects');
});



Template.DetailProject.helpers({

});

Template.DetailProject.events({


});