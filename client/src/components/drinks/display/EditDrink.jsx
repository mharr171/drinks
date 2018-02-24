import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import EditTitle from '../form/EditTitle.jsx'
import EditSource from '../form/EditSource.jsx'

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

        <EditSource
          source={this.props.drink.source}
          drinkId={this.props.drink.id}
          makingEdit={this.props.makingEdit}
          click_editField={this.props.click_editField}
          patch={this.props.patch}
        />

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
