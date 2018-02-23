import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

class NewDrink extends Component {
  constructor (props) {
    super(props)
    this.state= {
      title: '',
      source: '',
      description: '',
      steps: ''
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSourceChange = this.handleSourceChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleStepsChange = this.handleStepsChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    let {title, source, description, steps} = this.state
    // Variables
    let {} = this.props
    // Functions
    let {} = this.props
    return (
      <div className="ui segments">
        <Form onSubmit={this.handleSubmit}>

          <Form.Field required onChange={this.handleTitleChange}>
            <label>Drink Name</label>
            <input placeholder='Name your drink' value={title} />
          </Form.Field>

          <Form.Field required onChange={this.handleSourceChange}>
            <label>Source</label>
            <input placeholder='url' value={source} />
          </Form.Field>

          <Form.TextArea required
            label='Description'
            placeholder='Describe your drink'
            value={description}
            onChange={this.handleDescriptionChange}
          />

          <Form.TextArea required
            label='Steps'
            placeholder='Step by step, how do you make the drink?'
            value={steps}
            onChange={this.handleStepsChange}
          />

          <p>Ingredients will be added in the next step.</p>

          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }

  submitForm (e){


  }

  handleTitleChange (e) {
    this.setState({title: e.target.value});
  }

  handleSourceChange (e) {
    this.setState({source: e.target.value});
  }

  handleDescriptionChange (e) {
    this.setState({description: e.target.value});
  }

  handleStepsChange (e) {
    this.setState({steps: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault()

    const data = {
      title: this.state.title,
      source: this.state.source,
      description: this.state.description,
      steps: this.state.steps
    };

    this.props.flip_editFormIsOpen()
    this.props.post('api/drinks', data)
  }

}

export default NewDrink
