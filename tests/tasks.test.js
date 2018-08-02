/* eslint-env mocha */
import assert from "assert";

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { Tasks } from '../imports/api/tasks';

describe('Tasks', function () {
    describe('methods', function () {

      const userId = Random.id();
      let taskId;

      beforeEach(function () {
        Tasks.remove({});

        taskId = Tasks.insert({
          text: 'test task',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });
      });

      it('can delete owned task', function () {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        deleteTask.apply(invocation, [taskId]);

        // Verify that the method does what we expected
        assert.equal(Tasks.find().count(), 0);
      });
    });
});