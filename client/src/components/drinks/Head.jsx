import React, { Component } from 'react'
import { Grid, Header, Icon } from 'semantic-ui-react'

class Head extends Component {
  constructor (props){
    super(props)
    this.state = { }
  }

  render () {
    return (
      <Grid.Column>
        <Header as='h2' icon textAlign='center'>
          <Icon name='cocktail' circular />
          <Header.Content>
            <p>List of Ingredients</p>
          </Header.Content>
        </Header>
      </Grid.Column>
    );
  }
}

export default Head
