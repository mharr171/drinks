import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

class FormSource extends Component {
  constructor (props) {
    super(props)
    this.state= {
      source: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    let {source} = this.state
    // Variables
    let {drinkId} = this.props
    // Functions
    let {patch, flip_editingSource} = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field required onChange={this.handleChange}>
          <input placeholder='url' value={source} />
        </Form.Field>
      </Form>
    )
  }

  componentDidMount () {
    this.setState({source: this.props.source})
  }

  handleChange (e) {
    this.setState({source: e.target.value});
  }

  async handleSubmit (e) {
    e.preventDefault()

    const data = {source: this.state.source};
    const patched = await this.props.patch(`api/drinks/${this.props.drinkId}`, data, this.props.drinkId)

    if (patched){
      this.props.flip_editingSource()
    } else {
      console.log('Error patching source')
    }
  }
}

export default FormSource
