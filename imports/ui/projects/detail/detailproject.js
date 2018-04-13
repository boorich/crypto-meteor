import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../../chart/chart.js';
import '../../entity/github/github.js';
import './detailproject.html';
import {Projects} from "../../../api/projects";
import '../deploy/DeployProject.js';

var md = require('markdown-it')();


Template.DetailProject.onCreated(function DetailProjectOnCreated() {

    Meteor.subscribe('projects');
    Meteor.subscribe('contracts');
    console.log("this", this);
    let conAdr = this.data.contractAddress ;
    let conAbi = this.data.contractAbi ;
    console.log("conAdr", conAdr);
    if(conAdr) {
        let con = SmartContract.getContract(conAdr, conAbi);

        console.log("con", con);
        //this.data.abi = con.abi;
    }

    //Meteor.call('loadContract');
    //Meteor.call('loadContractWithFs');
});

Template.DetailProject.onRendered(function() {

});


Template.DetailProject.helpers({

    jsonPrint(jsonObject) { // with Latest Javascript ECMAScript 2015+
        return JSON.stringify(jsonObject);
    },
    getMarkdown() {
        //let mdjo = Assets.getText('md/PROJECTS.md');
        console.log("mdjo", jo);
        var result = md.render(jo);
        console.log(result);
        return result;
    }
});

Template.DetailProject.events({

});


jo = "This demo illustrated the use of the PROJECT.md file. This file is used to generate a website for your project. You are free to use any markdown.\n" +
    "\n" +
    "Learn some basics about [Markdown](https://www.markdownguide.org).\n" +
    "\n" +
    "# Project Name\n" +
    "Bounty Boards\n" +
    "\n" +
    "# Project Goal\n" +
    "Competitive Boardsports Sponsoring dApp on the Ethereum Virtual Machine\n" +
    "\n" +
    "# Overview\n" +
    "The system is build with the boardsports community in mind:\n" +
    "Bounty Boards democratizes the professional boardsports sector and hands it back to those who deserve it. We allow passionate boarders to become professional athletes while generating the funds they need to pursue their dreams. On top any fan can become a sponsor and invest in his / her favorite athlete directly.\n" +
    "\n" +
    "# References\n" +
    "Best practice from 2 worlds in sports analytics shape the future of professional sports.\n" +
    "1. Learn from eSports and fuse successful strategies from both worlds into one product.\n" +
    "2. Implement state-of-the-art analytics hard-/software.\n" +
    "\n" +
    "\n" +
    "# Product Description\n" +
    "![alt text](https://github.com/empea-careercriminal/crypto-meteor/blob/develop/bb.png \"Bounty Boards\")\n" +
    "\n" +
    "## Hardware Components\n" +
    "The core of the system is a sensor bluetooth beacon that records the boarder’s movement. \n" +
    "\n" +
    "## Software Components\n" +
    "Provided data is analyzed to identify tricks, skills and personal progress. The main UI for the user is provided by a dApp for smartphones.\n" +
    "\n" +
    "### Software Features\n" +
    "- Submit your tricks\n" +
    "- Browse leaderboards\n" +
    "- Manage your career\n" +
    "- Administrate your funds\n" +
    "- Sponsor other boarders\n" +
    "\n" +
    "# Mission\n" +
    "Allow boarders to practice, compete and succeed together while doing their favourite boardsports.\n" +
    "\n" +
    "# Technology\n" +
    "\n" +
    "## Open Source Components\n" +
    "- OS Sensor to analyze the movement of the board\n" +
    "- OS Smartphone App to connect the sensor to the internet\n" +
    "- Open Ethereum Blockchain to keep the records\n" +
    "- OS Webserver to manage the community\n" +
    "\n" +
    "## Closed Source Components\n" +
    "- Ethereum Smart Contract to execute and govern the rules of the competition\n" +
    "- Analytics Engine to evaluate sensor data\n" +
    "\n" +
    "# System Architecture\n" +
    "Link technical documentation or repo here.\n" +
    "\n" +
    "# Market\n" +
    "Talk about your market here.\n" +
    "\n" +
    "## Volume\n" +
    "\n" +
    "Snowboard\n" +
    "\n" +
    "| Global        | USA           | GER       |\n" +
    "| ------------- |:-------------:| ---------:|\n" +
    "| n/a           | 5.28 Mio.     | 1.98 Mio. |\n" +
    "\n" +
    "Skateboard\n" +
    "\n" +
    "| Global        | USA           | GER       |\n" +
    "| ------------- |:-------------:| ---------:|\n" +
    "| 20 Mio.       | 6.44 Mio.     | n/a\n" +
    "\n" +
    "[Source](https://brandongaille.com/20-good-skateboard-sales-statistics/) data for market size estimations.\n" +
    "\n" +
    "## Community Building\n" +
    "\n" +
    "- Sponsor sensors to boarders\n" +
    "- Promote competitions on social media\n" +
    "- Enable micro sponsoring of athletes\n" +
    "- Embed data to unlock achievements inside video games\n" +
    "- Implement corporate sponsors (use community tools)\n" +
    "\n" +
    "# Roadmap\n" +
    "\n" +
    "Snowboard\n" +
    "\n" +
    "- Q1 - Prototype Sensor / Prototype Webservice / Prototype App / Data Analytics / Smart Contract / Prototype Dronecasting\n" +
    "- Q2 - Open Source everything expect Smart Contract and Data Analytics / Finalize Sensor / Hardware / Consumer V.01\n" +
    "\n" +
    "Skateboard\n" +
    "\n" +
    "- Q3 - Build Network of Hardware Retailers / Find media partners\n" +
    "- Q4 - Allow Sponsors in to advertise their products\n" +
    "\n" +
    "Snowboard\n" +
    "\n" +
    "- Q1 - Partner with X-Games\n" +
    "\n" +
    "# Team\n" +
    "\n" +
    "Talk about the team here so your audience gets to know you better.\n" +
    "\n" +
    "Product Team\n" +
    "\n" +
    "- Product Lead\n" +
    "- Product Developer\n" +
    "\n" +
    "Technology Team\n" +
    "\n" +
    "- Hardware Lead\n" +
    "- Software Developer\n" +
    "\n" +
    "Business Team\n" +
    "\n" +
    "- Business Lead\n" +
    "- ...";