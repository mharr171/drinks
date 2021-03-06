import React, { Component } from 'react'
import { Grid, Form, Button } from 'semantic-ui-react'

class EditIngredient extends Component {
  constructor (props){
    super(props)
    this.state = {
      description: '',
      showForm: false
    }

    this.cancel = this.cancel.bind(this)
    this.editField = this.editField.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    return (
      <span>
        { this.form(this.props) }
      </span>
    );
  }

  componentDidMount () {
    this.setState({description: this.props.description, showForm: false})
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
                    placeholder='insert ingredient'
                    value={this.state.description}
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
        <Grid columns={16}>
          <Grid.Row>
            <Grid.Column width={16} computer={14}>
              <p onClick={this.editField}>{this.state.description}</p>
            </Grid.Column>
            <Grid.Column width={16} computer={2} textAlign='center'>
              <Button onClick={ this.props.click_deleteIngredientButton.bind(this, this.props.id, this.props.description)}>Delete</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return (
        <p>{this.state.description}</p>
      );
    }
  }

  handleChange (e) {
    this.setState({description: e.target.value});
  }

  async handleSubmit (e) {
    e.preventDefault()

    const data = {description: this.state.description};
    const patched = await this.props.patch(`api/ingredients/${this.props.id}`, data, this.props.drinkId)

    this.props.updateDrinks(this.props.drinkId);

    if (patched){
      this.editField()
    } else {
      console.log('Error patching ingredient')
    }
  }

  cancel () {
    this.editField();
    this.setState({description:this.props.description});
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

export default EditIngredient
