import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

class ShowDrink extends Component {
  constructor (props){
    super(props)
    this.state = { }
  }

  render () {
    let {title,source,description,steps} = this.props
    return (
      <div className="ui segments">
          <div className="ui segment">
            {
              title &&
              <a href={source}>
                <h1>{title}</h1>
              </a>
            }
          </div>
          <div className="ui segment">
            {
              description &&
              <p>{description}</p>
            }
          </div>

          <div className="ui segment">
            {
              steps &&
              <p>{steps}</p>
            }
          </div>
        </div>
    );
  }
}

export default ShowDrink
