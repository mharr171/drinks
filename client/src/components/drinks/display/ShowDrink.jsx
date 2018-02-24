import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

class ShowDrink extends Component {
  constructor (props){
    super(props)
    this.state = { }
  }

  render () {
    let {title,source,ingredients,description,steps} = this.props
    return (
      <Segment.Group>
          <Segment>
            {
              title &&
              <a href={source}>
                <h1>{title}</h1>
              </a>
            }
          </Segment>
          <Segment>
            {
              description &&
              <p>{description}</p>
            }
          </Segment>
          <Segment>
            {
              ingredients &&
              <Segment.Group>
                {Object.keys(ingredients).map((key) => {
                  return (
                    <Segment key={key}>
                      <p>{ingredients[key].description}</p>
                    </Segment>
                  )})
                }
              </Segment.Group>
            }
          </Segment>
          <Segment>
            {
              steps &&
              <p>{steps}</p>
            }
          </Segment>
        </Segment.Group>
    );
  }
}

export default ShowDrink
