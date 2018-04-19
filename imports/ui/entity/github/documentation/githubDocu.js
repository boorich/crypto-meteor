import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './githubDocu.html';
var md = require('markdown-it')();


Template.GithubDocu.onCreated(function infoOnCreated() {
    console.log("GithubDocu", this);
    this.markdown = new ReactiveVar("");
    const temp = Template.instance();
    console.log("temp", temp);
    console.log("temp.data.url", temp.data.url);
    console.log("temp.data.url", this.data.url);
    console.log("temp.data.url", this.url);


    //'accept': 'application/vnd.github.VERSION.raw'
    let options = {
       "headers": {
           'accept': 'application/vnd.github.VERSION.html'
       }
    };
    if(!this.data.url) {
        //this.url = 'https://api.github.com/repos/empea-careercriminal/crypto-meteor';
        this.data.url = 'https://api.github.com/repos/empea-careercriminal/crypto-meteor/contents/';
    }

    if(!this.data.docuType) {
        this.data.docuType = "README";
    }




    let url = this.data.url + "/" + this.data.docuType;
    console.log("url", url);
    HTTP.call("GET", url, options, function(error, response) {
        console.log("error " + url, error);
        console.log("response " + url, response);
        temp.markdown.set(response.content);
    });
});

Template.GithubDocu.helpers({
    markdown() {
        const temp = Template.instance();
        let mdHelp =  temp.markdown.get();
        return mdHelp; //md.render(mdHelp);
    }
});

Template.GithubDocu.events({

});

