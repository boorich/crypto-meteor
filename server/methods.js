/**
 * Created by psyfreak on 09.04.2018.
 */
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

const callService = (type, url, options) => new Promise((resolve, reject) => {
  HTTP.call(type, url, options, (error, result) => {
    console.log("result",result);
    console.log("error",error);
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

Meteor.methods({
    testAPI() {
        return callService(
            'GET',
            'http://jsonplaceholder.typicode.com/users'
        )
            .then(
                (result) => result
            ).catch((error) => {

                throw new Meteor.Error('500', `${error.message}`);

            });
    }
});
