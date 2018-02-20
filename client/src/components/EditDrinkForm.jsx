import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

function toTitleCase(str)
{
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function forceHttp(str)
{
  if (str.length > 7){
    return str;
  }else{
    return "http://" + str;
  }
}

class EditDrinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      title: '',
      description: '',
      steps: '',
      source: ''
    };
    this.setAttributes = this.setAttributes.bind(this)

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStepsChange = this.handleStepsChange.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount () {
    this.setAttributes()
  }

  setAttributes () {
    this.setState({
      title: this.props.title,
      description: this.props.description,
      steps: this.props.steps,
      source: this.props.source
    });
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
    this.setState({source: forceHttp(e.target.value)});
  }

  handleSubmit (e) {
    e.preventDefault();

    const data = {
      title: this.state.title,
      description: this.state.description,
      steps: this.state.steps,
      source: this.state.source
    };

    console.log(data);

    this.props.flipEditState();
    this.props.flipButtonsDisabled();
    this.props.patchDrink(`api/drinks/${this.props.drinkId}`, data, this.props.drinkId);
  }

  cancel (e) {
    e.preventDefault();
    console.log('cancel called');
    this.props.flipEditState();
    this.props.flipButtonsDisabled();
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

        <Button type="submit" className="ui-button">Save</Button>
        <Button onClick={this.cancel} className="ui-button">Cancel</Button>
      </Form>
    );
  }
}

export default EditDrinkForm
