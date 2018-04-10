/**
 * Created by psyfreak on 08.04.2018.
 */

Meteor.publish('subredditSearch', function(subreddit) {

});

Meteor.methods({
  isUrl: function(url) {
    if (url.indexOf('http') > -1) { return true; }
    return false;
  }
});

if (Meteor.isServer) {
  Meteor.methods({
    testAPI2: function () {
      this.unblock();
      return HTTP.get('GET', 'http://jsonplaceholder.typicode.com/posts', {
        params: {
          "id": 5
        }
      }).data;

    }
  });
}
