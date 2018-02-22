import React, { Component } from 'react';
import { Header, Icon } from 'semantic-ui-react'

class Head extends Component {
  constructor (props) {
    super(props)
    this.state= {}
  }

  render () {
    return (
      <Header as='h2' icon textAlign='center'>
        <Icon name='cocktail' circular />
        <Header.Content>
          List of Ingredients
        </Header.Content>
      </Header>
    )
  }
}

export default Head
