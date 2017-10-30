/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Contact = require('./contact.model.js');

exports.register = function (socket) {
  Contact.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Contact.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}
/**
 * Emits an event which notifies listeners and passes extra
 * arguments.
 *
 * @param {string} eventName Name of the event to fire.
 */

function onSave(socket, doc, cb) {
  socket.emit('contact:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('contact:remove', doc);
}
