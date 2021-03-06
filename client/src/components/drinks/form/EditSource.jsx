import React, { Component } from 'react'
import { Grid, Segment, Form, Button } from 'semantic-ui-react'

class EditSource extends Component {
  constructor (props){
    super(props)
    this.state = {
      source: '',
      showForm: false
    }

    this.cancel = this.cancel.bind(this)
    this.editField = this.editField.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    return (
      <Segment>
        <h5>Source</h5>
        { this.form(this.props) }
      </Segment>
    );
  }

  componentDidMount () {
    this.setState({source: this.props.source, showForm: false})
  }

  form (props) {
    if (this.state.showForm){
      return (
        <Form onSubmit={this.handleSubmit}>
          <Grid columns={16}>
            <Grid.Row>
              <Grid.Column width={16} computer={12}>
                <Form.Field required>
                  <input
                    autoFocus
                    placeholder='url'
                    value={this.state.source}
                    onChange={this.handleChange}
                    onFocus={function(e) {
                      var val = e.target.value;
                      e.target.value = '';
                      e.target.value = val;
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={8} computer={2} textAlign='center'>
                <Button type='submit'>Save</Button>
              </Grid.Column>
              <Grid.Column width={8} computer={2} textAlign='center'>
                <Button onClick={this.cancel}>Cancel</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      );
    } else if (!props.makingEdit){
      return (
        <p onClick={this.editField}>{props.source}</p>
      );
    } else {
      return (
        <p>{props.source}</p>
      );
    }
  }

  handleChange (e) {
    this.setState({source: e.target.value});
  }

  async handleSubmit (e) {
    e.preventDefault()

    const data = {source: this.state.source};
    const patched = await this.props.patch(`api/drinks/${this.props.drinkId}`, data, this.props.drinkId)

    if (patched){
      this.editField()
    } else {
      console.log('Error patching source')
    }
  }

  cancel () {
    this.editField();
    this.setState({source:this.props.source});
  }

  editField () {
    this.props.click_editField();
    this.flip_showForm();
  }

  flip_showForm () {
    this.state.showForm
    ? this.setState({showForm:false})
    : this.setState({showForm:true})
  }
}

export default EditSource
