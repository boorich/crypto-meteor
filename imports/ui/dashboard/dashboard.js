import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './dashboard.html';


import { Projects } from '../../api/projects.js';

Template.Dashboard.onCreated(function dashboardOnCreated() {
  //Meteor.subscribe('subredditSearch');
/*
  HTTP.call( 'GET', 'http://jsonplaceholder.typicode.com/posts', {
    params: {
      "id": 5
    }
  }, function( error, response ) {
    if ( error ) {
      console.log( error );
    } else {
      console.log( response );
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
  },
  github() {
    /*
    Meteor.call("testAPI", function(error, results) {
      console.log(results); //results.data should be a JSON object
    });
    */

    HTTP.call( 'GET', 'http://jsonplaceholder.typicode.com/posts', {
      params: {
        "id": 5
      }
    }, function( error, response ) {
      if ( error ) {
        console.log( error );
      } else {
        console.log( response );
        return response.data;
      }
    });

  }

});