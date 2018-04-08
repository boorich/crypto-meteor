import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './project.html';

Template.project.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.project.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('projects.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('projects.remove', this._id);
  },
  'click .toggle-private'() {
    Meteor.call('projects.setPrivate', this._id, !this.private);
  },
});
