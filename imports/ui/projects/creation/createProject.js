import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './createProject.html';



Template.CreateProject.onCreated(function devProjectsOnCreated() {
  Meteor.subscribe('projects');
});



Template.CreateProject.helpers({

});

Template.CreateProject.events({

  'submit .new-project'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const title = target.title.value;

    // Insert a task into the collection
    Meteor.call('projects.insert', title, "dev");

    // Clear form
    target.title.value = '';
  }
});