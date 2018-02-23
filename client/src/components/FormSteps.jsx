import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

class FormSteps extends Component {
  constructor (props) {
    super(props)
    this.state= {
      steps: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    let {steps} = this.state
    // Variables
    let {drinkId} = this.props
    // Functions
    let {patch, flip_editingSteps} = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.TextArea required
          placeholder='Step by step, how do you make the drink?'
          value={steps}
          onChange={this.handleChange}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }

  componentDidMount () {
    this.setState({steps: this.props.steps})
  }

  handleChange (e) {
    this.setState({steps: e.target.value});
  }

  async handleSubmit (e) {
    e.preventDefault()

    const data = {steps: this.state.steps};
    const patched = await this.props.patch(`api/drinks/${this.props.drinkId}`, data, this.props.drinkId)

    if (patched){
      this.props.flip_editingSteps()
    } else {
      console.log('Error patching steps')
    }
  }
}

export default FormSteps
