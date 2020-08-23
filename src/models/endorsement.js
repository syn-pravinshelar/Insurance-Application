const mongoose = require('mongoose');

const endorsementScehma = new mongoose.Schema({
  // endorsementId: {
  //   type: Number,
  //   indexes: true,
  // },
  endorsementName: {
    type: String,
    required: [true, 'Please add an endorsementName']
  },
  endorsementCode: {
    type: String,
    required: [true, 'Please add an endorsementCode'],
    enum: ['Employee Only', 'Employee + Spouse', 'Employee + Dependents', 'Family']
  },
  lineOfBusiness: {
    type: String,
    required: [true, 'Please add an lineOfBusiness'],
    enum: ['Life and Annuities', 'Property']
  },
  jurisdiction: [{
    type: String,
    default: undefined,
  } ],
  effectiveDate: {
    type: Date,
    default: Date.now
  },
  expirationDate: {
    type: Date,
    default: Date.now
  },
  endorsementDescription: {
    type: String,
    required: [true, 'Please add an endorsementDescription']
  },
  status: {
    type: String,
    required: [true, 'Please add a status'],
    enum: ['Draft', 'Pending Approval', 'Active', 'Deactivated']
  },
  endorsementType: {
    type: String,
    required: [true, 'Please add an endorsementType'],
    enum: ['Policy', 'Risk']
  },
  allowMultipleEndorsements: {
    type: Boolean,
    default: false
  },
  limits: [{
    type: mongoose.Schema.ObjectId,
    default: undefined,
    ref: 'Limit',
  }],
  deductibles: {
    type: mongoose.Schema.ObjectId,
    ref: 'Deductible',
    required: true
  },
  version: Number,
}, {
  versionKey: false
});

const Endorsement = mongoose.model('Endorsement', endorsementScehma);

module.exports = Endorsement;
