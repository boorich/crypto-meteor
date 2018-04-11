import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';


import './ContractList.html';

import { ReactiveDict } from 'meteor/reactive-dict';
import { Contracts } from '../../../api/contracts.js';


Template.ContractList.onCreated(function devProjectsOnCreated() {
  Meteor.subscribe('contracts');
});

Template.ContractList.helpers({
  contracts() {
    const instance = Template.instance();
    // Otherwise, return all of the Projects
    return Contracts.find({  }, { sort: { createdAt: -1 } });
  }
});

Template.ContractList.events({

  'submit .new-contract'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const title = target.title.value;

    // Insert a task into the collection
    //Meteor.call('projects.insert', title, "dev");

    // Clear form
    target.title.value = '';
  },
  'click .delete'() {
      Meteor.call('contracts.remove', this._id);
  },
  'click .toggle-private'() {
      Meteor.call('contracts.setPrivate', this._id, !this.private);
  }
});