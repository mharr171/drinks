import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

class Header extends Component {
  constructor (props){
    super(props)
    this.state = { }
  }

  render () {
    return (
      <Grid.Column>
        <h1>Header.jsx</h1>
      </Grid.Column>
    );
  }
}

export default Header
