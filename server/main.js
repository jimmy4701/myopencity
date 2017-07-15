import { Meteor } from 'meteor/meteor'
import {Configuration} from '/imports/api/configuration/configuration'
import '/imports/api/configuration/server/methods'
import '/imports/api/configuration/server/publication'
import '/imports/api/accounts/server/methods'
import '/imports/api/accounts/server/publication'
import '/imports/api/consults/server/methods'
import '/imports/api/consults/server/publication'
import '/imports/api/consult_parts/server/methods'
import '/imports/api/consult_parts/server/publication'
import '/imports/api/consult_part_votes/server/methods'
import '/imports/api/consult_part_votes/server/publication'
import '/imports/api/alternatives/server/methods'
import '/imports/api/alternatives/server/publication'
import '/imports/api/alternative_likes/server/methods'
import '/imports/api/alternative_likes/server/publication'
import '/imports/api/projects/server/methods'
import '/imports/api/projects/server/publication'
import '/imports/api/project_likes/server/methods'
import '/imports/api/project_likes/server/publication'
import '/imports/api/external_api/server/methods'
import '/imports/api/api_authorizations/server/methods'
import '/imports/api/api_authorizations/server/publication'
import '/imports/api/external_opencities/server/methods'
import '/imports/api/external_opencities/server/publication'

Meteor.startup(() => {
  // Initialization of global configuration singleton
  const configuration = Configuration.findOne({})
  if(!configuration){
    console.log("SERVER : Created global configuration singleton")
    Configuration.insert({})
    FlowRouter.go('InitialPresentation')
  }

});
