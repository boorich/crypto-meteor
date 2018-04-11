import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './ContractInterface.html';


Template.ContractInterface.onCreated(function contractDetailOnCreated() {
    /*
    const instance = Template.instance();
    console.log(instance, "instance");
    */
    console.log("this", this);


});

Template.ContractInterface.onRendered(function() {

});

Template.ContractInterface.helpers({


    interfaceElements() { // with Latest Javascript ECMAScript 2015+
        if(this && this.abi) {
            let obj = JSON.parse(this.abi);
            console.log("obj", obj);
            return obj;
        }
        return [];
    },
    jsonPrint(jsonObject) { // with Latest Javascript ECMAScript 2015+
        return JSON.stringify(jsonObject);
    }
});

Template.ContractInterface.events({

});
