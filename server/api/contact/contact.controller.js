'use strict';

var _ = require('lodash');
var Contact = require('./contact.model.js');


// Get list of associations
exports.index = function (req, res) {
  Contact.find(function (err, dashboards) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(dashboards);
  });
};

// Get a single contact
exports.show = function (req, res) {
  Contact.findById(req.params.id, function (err, patient) {
    if (err) {
      return handleError(res, err);
    }
    if (!patient) {
      return res.status(404).send('Not Found');
    }
    return res.json(patient);
  });
};

// Creates a new contact in the DB.
exports.create = function (req, res) {

  req.body.updated = Date.now();
  if (!req.body.slug && req.body.info)
    req.body.slug = req.body.info.toString().toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '');

  Contact.create(req.body, function (err, patient) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(patient);
  });
};

// Updates an existing contact in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  req.body.updated = Date.now();
  if (!req.body.slug && req.body.info)
    req.body.slug = req.body.info.toString().toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '');

  Contact.findById(req.params.id, function (err, patient) {
    if (err) {
      return handleError(res, err);
    }
    if (!patient) {
      return res.status(404).send('Not Found');
    }
    var updated = _.extend(patient, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(patient);
    });
  });
};

// Deletes a contact from the DB.
exports.destroy = function (req, res) {
  Contact.findById(req.params.id, function (err, patient) {
    if (err) {
      return handleError(res, err);
    }
    if (!patient) {
      return res.status(404).send('Not Found');
    }
    patient.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
