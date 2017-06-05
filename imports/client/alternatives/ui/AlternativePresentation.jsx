import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Icon, Image, Loader, Button} from 'semantic-ui-react'
import {Alternatives} from '/imports/api/alternatives/alternatives'

export class AlternativePresentation extends TrackerReact(Component){

  /*
    required props:
      - alternative: Object

    facultative props:
      - onGoBackClick: Function
      - goBackLabel: String
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  toggle_like(e){
    e.preventDefault()
    Meteor.call('alternatives.toggle_like', this.props.alternative._id , (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de l'ajout de votre soutien",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }
    });
  }

  go_back(e){
    e.preventDefault()
    this.props.onGoBackClick()
  }

  render(){
    const {load_alternative, user, loading} = this.props

    if(!loading){
      return(
        <Grid stackable className="animated fadeInUp">
          <Grid.Column width={16} className="center-align">
            <Header as="h2">{load_alternative.title}</Header>
            <Header as="h3">Proposé par {load_alternative.anonyous ?
                  "une personne anonyme"
                :
                  <span>
                    <Icon name="user"/>
                    {user.username}
                  </span>
              }</Header>
          </Grid.Column>
          <Grid.Column width={16}>
            <div dangerouslySetInnerHTML={{__html: load_alternative.content }}></div>
          </Grid.Column>
          <Grid.Column width={16} className="center-align">
            <Header as="h3" onClick={(e) => {this.toggle_like(e)}} style={{cursor: 'pointer'}}>
              <Icon name="thumbs up" style={{color: "blue"}} />
              {load_alternative.likes} soutiens
            </Header>
          </Grid.Column>
          {this.props.onGoBackClick ?
            <Grid.Column width={16} className="center-align">
              <Button onClick={(e) => {this.go_back(e)}}>{this.props.goBackLabel ? this.props.goBackLabel : "Ne plus afficher l'alternative"}</Button>
            </Grid.Column>
          : ''}
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement de l'alternative</Loader>
    }
  }
}

export default AlternativePresentationContainer = createContainer(({ alternative }) => {
  const alternativesUserPublication = Meteor.subscribe('alternatives.user')
  const alternativePublication = Meteor.subscribe('alternative', alternative._id)
  const loading = !alternativesUserPublication.ready() || !alternativePublication.ready()
  const user = Meteor.users.findOne({_id: alternative.user}, {username: 1})
  const load_alternative = Alternatives.findOne({_id: alternative._id})
  return {
    loading,
    user,
    load_alternative
  }
}, AlternativePresentation)
