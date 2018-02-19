import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'

class Ingredients extends Component {
  render () {
    return (
      <div>
        {
          this.props.ingredients &&
          <Segment.Group>
            {Object.keys(this.props.ingredients).map((key) => {
              return <Segment key={key}>{this.props.ingredients[key].description}</Segment>
            })}
          </Segment.Group>
        }
      </div>
    );
  }
}

export default Ingredients
