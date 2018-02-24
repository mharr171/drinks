import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'

class Navbar extends Component {
  constructor (props){
    super(props)
    this.state = { }
  }

  render () {
    return (
      <Grid.Column>
        { newDrinkButton(this.props) }
        { cancelButton(this.props) }
        { editDrinkButton(this.props) }
        { finishButton(this.props) }
      </Grid.Column>
    );
  }
}

function newDrinkButton(props) {
	if (props.showDrink){
    return (
      <Button
        onClick={props.click_newDrinkButton}
      >
        New Drink
      </Button>
    );
  }
}

function cancelButton(props) {
	if (props.newDrink){
    return (
      <Button
        onClick={props.click_newDrinkButton}
      >
        Cancel
      </Button>
    );
  }
}

function editDrinkButton(props) {
	if (props.showDrink){
    return (
      <Button
        onClick={props.click_editDrinkButton}
      >
        Edit Drink
      </Button>
    );
  }
}

function finishButton(props) {
	if (props.editDrink && !props.makingEdit){
    return (
      <Button
        onClick={props.click_editDrinkButton}
      >
        Finish
      </Button>
    );
  }
}

export default Navbar
