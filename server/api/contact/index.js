'use strict';

var express = require('express');
var controller = require('./contact.controller.js');

var router = express.Router();
/**
 *
 PUT => If user can update all or just a portion of the record, use PUT (user controls what gets updated)

 PUT /users/123/email
 new.email@example.org

 PATCH => If user can only update a partial record, say just an email address (application controls what can be updated), use PATCH.

 PATCH /users/123
 [description of changes]
 *
 */
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
