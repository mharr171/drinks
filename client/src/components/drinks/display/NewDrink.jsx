import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class NewDrink extends Component {
  constructor (props){
    super(props)
    this.state = {
      data: null,
      title: '',
      description: '',
      steps: '',
      source: ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStepsChange = this.handleStepsChange.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Title:</label>
          <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
        </div>

        <div className="field">
          <label>Description:</label>
          <textarea rows="4" value={this.state.description} onChange={this.handleDescriptionChange} />
        </div>

        <div className="field">
          <label>Steps:</label>
          <textarea rows="4" value={this.state.steps} onChange={this.handleStepsChange} />
        </div>

        <div className="field">
          <label>Source:</label>
          <input type="text" value={this.state.source} onChange={this.handleSourceChange} />
        </div>

        <Button type="submit" className="ui-button">Submit</Button>
      </Form>
    );
  }

  handleTitleChange (e) {
    this.setState({title: toTitleCase(e.target.value)});
  }

  handleDescriptionChange (e) {
    this.setState({description: e.target.value});
  }

  handleStepsChange (e) {
    this.setState({steps: e.target.value});
  }

  handleSourceChange (e) {
    this.setState({source: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault();

    const data = {
      title: this.state.title,
      description: this.state.description,
      steps: this.state.steps,
      source: this.state.source
    };

    this.props.post('api/drinks', data);
  }
}

function toTitleCase(str){
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export default NewDrink
