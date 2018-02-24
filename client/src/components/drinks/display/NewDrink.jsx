import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

class NewDrink extends Component {
  constructor (props){
    super(props)
    this.state = { }
  }

  render () {
    return (
      <Segment.Group>
        <p>NewDrink.jsx</p>
      </Segment.Group>
    );
  }
}

export default NewDrink
