import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './github.html';



Template.Github.onCreated(function infoOnCreated() {
  //console.log("this", this);
  this.issues = new ReactiveVar("");
  var iss = this.issues,
    request = new XMLHttpRequest(),
    githubUrl = this.data.gitUrl || 'https://api.github.com/repos/empea-careercriminal/crypto-meteor';

  console.log("githubUrl", githubUrl)

  function httpAnswer() {
    var responseObj = JSON.parse(this.responseText);
    iss.set(responseObj);
  }

  request.onload = httpAnswer;
  request.open('get', githubUrl, true)
  request.send();
});

Template.Github.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
  issues() {
    return Template.instance().issues.get();
  }
});

Template.Github.events({

});
