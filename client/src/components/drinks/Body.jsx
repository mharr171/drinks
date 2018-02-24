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
        { this.display() }
      </Grid.Column>
    );
  }

  display () {
    if (this.props.showDrink){
      return (
        <ShowDrink
          title={this.props.drink.title}
          source={this.props.drink.source}
          description={this.props.drink.description}
          steps={this.props.drink.steps}
        />
      );
    }else if (this.props.editDrink){
      return (
        <EditDrink/>
      );
    }else if (this.props.newDrink){
      return (
        <NewDrink
          post={this.props.postDrink}
        />
      );
    }
  }

}



export default Body
