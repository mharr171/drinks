import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class BottomNav extends Component {
  constructor (props) {
    super(props)
    this.state= {}

    this.preventDefault = this.preventDefault.bind(this)
  }

  render () {
    // Variables
    let {editFormIsOpen} = this.props
    // Functions
    let {setNoDrink} = this.props
    return (
      <div className="ui vertical segment">
        <Button.Group>
          {
            editFormIsOpen &&
            <Button onClick={this.preventDefault}>
              Finish Editing
            </Button>
          }

          {
            !editFormIsOpen &&
            <Button onClick={setNoDrink}>
              New Drink
            </Button>
          }

          {
            !editFormIsOpen &&
            <Button onClick={this.preventDefault}>
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
}

export default BottomNav
