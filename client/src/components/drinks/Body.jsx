import React, { Component } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import ShowDrink from './display/ShowDrink.jsx'
import EditDrink from './display/EditDrink.jsx'
import NewDrink from './display/NewDrink.jsx'

class Body extends Component {
  constructor (props){
    super(props)
    this.state = { }
  }

  render () {
    return (
      <Grid.Column>
        { display(this.props) }
      </Grid.Column>
    );
  }
}

function display(props) {
  if (props.showDrink){
    return (
      <ShowDrink/>
    );
  }else if (props.editDrink){
    return (
      <EditDrink/>
    );
  }else if (props.newDrink){
    return (
      <NewDrink/>
    );
  }

}

export default Body
