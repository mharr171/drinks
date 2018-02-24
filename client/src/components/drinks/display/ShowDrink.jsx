import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

class ShowDrink extends Component {
  constructor (props){
    super(props)
    this.state = { }
  }

  render () {
    return (
      <Segment.Group>
        <p>ShowDrink.jsx</p>
      </Segment.Group>
    );
  }
}

export default ShowDrink
