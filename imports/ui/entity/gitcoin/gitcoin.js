import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './gitcoin.html';



Template.Gitcoin.onCreated(function infoOnCreated() {
  //console.log("this", this);
  this.issues = new ReactiveVar("");
  var iss = this.issues,
    request = new XMLHttpRequest(),
    gitcoinUrl = "https://gitcoin.co/api/v0.1/bounties/87";
      //'https://gitcoin.co/api/v0.1/universe' ;
      //'https://gitcoin.co/api/v0.1/bounties';

  console.log("gitcoinUrl", gitcoinUrl)

  function httpAnswer() {
    var responseObj = JSON.parse(this.responseText);
    iss.set(responseObj);
  }

  request.onload = httpAnswer;
  request.open('get', gitcoinUrl, true)
  request.send();
});

Template.Gitcoin.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
  issues() {
    return Template.instance().issues.get();
  }
});

Template.Gitcoin.events({

});
