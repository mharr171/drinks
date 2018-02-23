import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

class FormTitle extends Component {
  constructor (props) {
    super(props)
    this.state= {
      title: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    let {title} = this.state
    // Variables
    let {drinkId} = this.props
    // Functions
    let {patch, flip_editingTitle} = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field required onChange={this.handleChange}>
          <input placeholder='Name your drink' value={title} />
        </Form.Field>
      </Form>
    )
  }

  componentDidMount () {
    this.setState({title: this.props.title})
  }

  handleChange (e) {
    this.setState({title: e.target.value});
  }

  async handleSubmit (e) {
    e.preventDefault()

    const data = {title: this.state.title};
    const patched = await this.props.patch(`api/drinks/${this.props.drinkId}`, data, this.props.drinkId)

    if (patched){
      this.props.flip_editingTitle()
    } else {
      console.log('Error patching title')
    }
  }
}

export default FormTitle
