import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './createProject.html';



Template.CreateProject.onCreated(function devProjectsOnCreated() {
  Meteor.subscribe('projects');
});



Template.CreateProject.helpers({

});

Template.CreateProject.events({

  'submit #new-project'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const title = target.title.value;

    let $form = $("#new-project");

    let newProjectArray = $form.serializeArray(),
        newProject = {};
    for(let i = 0, len = newProjectArray.length; i < len; i++) {
        let name = newProjectArray[i].name;
        newProject[name] = newProjectArray[i].value;
    }
    console.log(newProject);

      // Insert a task into the collection
    Meteor.call('projects.insert', newProject);

    // Clear form
      $form[0].reset();
  }
});