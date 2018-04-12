import { Template } from 'meteor/templating';
import '../interface/ContractInterface.js';

import './ContractDetail.html';


Template.ContractDetail.onCreated(function contractDetailOnCreated() {

});

Template.ContractDetail.onRendered(function() {

});


Template.ContractDetail.helpers({
    getContract() {
        //const instance = Template.instance();
    },
    jsonPrint(jsonObject) { // with Latest Javascript ECMAScript 2015+
        return JSON.stringify(jsonObject);
    }
});

Template.ContractDetail.events({

});