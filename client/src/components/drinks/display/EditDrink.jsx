import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import EditTitle from '../form/EditTitle.jsx'

class EditDrink extends Component {
  constructor (props){
    super(props)
    this.state = { }
  }

  render () {
    return (
      <Segment.Group>
        <EditTitle
          title={this.props.drink.title}
          drinkId={this.props.drink.id}
          makingEdit={this.props.makingEdit}
          click_editField={this.props.click_editField}
          patch={this.props.patch}
        />

        <Segment>
          Source
        </Segment>

        <Segment>
          Description
        </Segment>
        
        <Segment>
          Steps
        </Segment>
      </Segment.Group>
    );
  }
}

export default EditDrink
