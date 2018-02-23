import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class BottomNav extends Component {
  constructor (props) {
    super(props)
    this.state= {}

    this.preventDefault = this.preventDefault.bind(this)
    this.newDrink = this.newDrink.bind(this)
    this.editDrink = this.editDrink.bind(this)
  }

  render () {
    // Variables
    let {editFormIsOpen, editingDrink} = this.props
    // Functions
    let {setNoDrink, flip_editFormIsOpen} = this.props
    return (
      <div className="ui vertical segment">
        <Button.Group>
          {
            editingDrink && !editFormIsOpen &&
            <Button onClick={this.preventDefault}>
              Finish Editing
            </Button>
          }

          {
            !editingDrink && !editFormIsOpen &&
            <Button onClick={this.newDrink}>
              New Drink
            </Button>
          }

          {
            !editingDrink && !editFormIsOpen &&
            <Button onClick={this.editDrink}>
              Edit Drink
            </Button>
          }
        </Button.Group>
      </div>
    )
  }

  preventDefault (e){
    e.preventDefault()
  }

  newDrink (){
    this.props.setNoDrink()
    this.props.flip_editFormIsOpen()
  }

  editDrink (){
    this.props.flip_editingDrink()
  }
}

export default BottomNav
