import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './topbar.html';


Template.Topbar.events({
  'click .toggle-menue'(event, instance) {
    console.log("test");

    event.preventDefault();
    $("#wrapper").toggleClass("toggled");
  }
});