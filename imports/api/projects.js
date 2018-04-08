import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish projects that are public or belong to the current user
  Meteor.publish('projects', function projectsPublication() {
    return Projects.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'projects.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a project
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Projects.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'projects.remove'(projectid) {
    check(projectid, String);

    const project = Projects.findOne(projectid);
    if (project.private && project.owner !== this.userId) {
      // If the project is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Projects.remove(projectid);
  },
  'projects.setChecked'(projectid, setChecked) {
    check(projectid, String);
    check(setChecked, Boolean);

    const project = Projects.findOne(projectid);
    if (project.private && project.owner !== this.userId) {
      // If the project is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Projects.update(projectid, { $set: { checked: setChecked } });
  },
  'projects.setPrivate'(projectid, setToPrivate) {
    check(projectid, String);
    check(setToPrivate, Boolean);

    const project = Projects.findOne(projectid);

    // Make sure only the project owner can make a project private
    if (project.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Projects.update(projectid, { $set: { private: setToPrivate } });
  }
});
