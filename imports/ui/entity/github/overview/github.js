import { Template } from 'meteor/templating';
import './github.html';

Template.GithubOverview.onCreated(function infoOnCreated() {
    console.log("GithubOverview", this);
    this.issues = new ReactiveVar("");
    const temp = Template.instance();

    if(!this.url) {
        this.url = 'https://api.github.com/repos/empea-careercriminal/crypto-meteor/';
    }
    HTTP.call("GET", this.url, {}, function(error, response) {
        console.log("error", error);
        console.log("response", response);
        //Template.instance().issues.get().set(responseObj);
        //tmpl.Ctor.set(contractAbi);
        temp.issues.set(response.data);
    });
});

Template.GithubOverview.helpers({
    issues() {
        const temp = Template.instance();
        return temp.issues.get();
    }
});

Template.GithubOverview.events({

});