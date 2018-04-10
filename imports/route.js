/**
 * Created by psyfreak on 08.04.2018.
 */
import './ui/layout/layout.js';
import { Projects } from './api/projects.js';

Router.configure({
  // the default layout
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('Dashboard');
  this.layout('layout', {data: {title: 'Dashboard'}});
});

Router.route('/CreateProject', function () {
    this.render('CreateProject');
    this.layout('layout', {data: {title: 'Create Project'}});
});

Router.route('/RevProjects', function () {
  this.render('RevProjects');
  this.layout('layout', {data: {title: 'Rev Projects'}});
});
Router.route('/DevProjects', function () {
  this.render('DevProjects');
  this.layout('layout', {data: {title: 'Dev Projects'}});
});

Router.route('/projects/:_id', function () {
  this.render('DetailProject', {
    data: function () {
      return Projects.findOne({_id: this.params._id});
    }
  });
  this.layout('layout', {data: {title: 'Projects'}});
});

Router.route('/Tasks', function () {
  this.render('Dashboard');
  this.layout('layout', {data: {title: 'Tasks'}});
});
Router.route('/Account', function () {
  this.render('Dashboard');
  this.layout('layout', {data: {title: 'Account'}});
});

/*
Router.route('/Projects', function () {
  this.layout('body', {
    //set a data context for the whole layout
    data: {
      title: 'Master Title'
    }
  });

  // will just get the data context from layout
  this.render('Projects', {data: {title: 'Projects'}});
});
*/
/*
Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Dashboard', {data: {title: 'Dashboard'}});
});
*/

// name defaults to 'one' based on the path
//Router.route('/Projects');