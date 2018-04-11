
if(cryptoBitch.import) {
    Meteor.call('deleteAllContracts');

    Meteor.call('loadContract', "Test");
    Meteor.call('loadContract', "SimpleStorage");
    Meteor.call('loadContract', "DevToken");
}
