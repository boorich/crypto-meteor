/**
 * Created by psyfreak on 08.04.2018.
 */
import './ui/layout/layout.js';


Router.configure({
  // the default layout
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('Dashboard');
  this.layout('layout', {data: {title: 'Dashboard'}});
});


Router.route('/Projects', function () {
  this.render('Projects');
  this.layout('layout', {data: {title: 'Projects'}});
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