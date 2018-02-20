import React, { Component } from 'react';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

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

class DrinkForm extends Component {
  constructor(props) {
    super(props);
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

    this.props.post('api/drinks', data);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <label>
            Title:
            <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
          </label>
        </p>

        <p>
          <label>
            Description:
            <input type="textarea" value={this.state.description} onChange={this.handleDescriptionChange} />
          </label>
        </p>

        <p>
          <label>
            Steps:
            <input type="textarea" value={this.state.steps} onChange={this.handleStepsChange} />
          </label>
        </p>

        <p>
          <label>
            Source:
            <input type="text" value={this.state.source} onChange={this.handleSourceChange} />
          </label>
        </p>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default DrinkForm
