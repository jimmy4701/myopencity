import {Mongo} from 'meteor/mongo'

export const ExternalApisConfiguration = new Mongo.Collection('externalapisconfiguration')

const ExternalApisConfigurationSchema = new SimpleSchema({

  amazon_private_key: {
    type: String,
    optional: true
  },
  amazon_public_key: {
    type: String,
    optional: true
  },
  google_private_key: {
    type: String,
    optional: true
  },
  google_public_key: {
    type: String,
    optional: true
  },
  facebook_private_key: {
    type: String,
    optional: true
  },
  facebook_public_key: {
    type: String,
    optional: true
  }
})

ExternalApisConfiguration.attachSchema(ExternalApisConfigurationSchema);
