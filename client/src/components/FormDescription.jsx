import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

class FormDescription extends Component {
  constructor (props) {
    super(props)
    this.state= {
      description: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    let {description} = this.state
    // Variables
    let {drinkId} = this.props
    // Functions
    let {patch, flip_editingDescription} = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.TextArea required
          placeholder='Describe your drink'
          value={description}
          onChange={this.handleChange}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }

  componentDidMount () {
    this.setState({description: this.props.description})
  }

  handleChange (e) {
    this.setState({description: e.target.value});
  }

  async handleSubmit (e) {
    e.preventDefault()

    const data = {description: this.state.description};
    const patched = await this.props.patch(`api/drinks/${this.props.drinkId}`, data, this.props.drinkId)

    if (patched){
      this.props.flip_editingDescription()
    } else {
      console.log('Error patching description')
    }
  }
}

export default FormDescription
