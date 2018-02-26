import React, { Component } from 'react'
import { Grid, Form, Button } from 'semantic-ui-react'

class NewIngredient extends Component {
  constructor (props){
    super(props)
    this.state = {
      data: null,
      description: ''
    };

    this.cancel = this.cancel.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render () {
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
  }


  cancel () {
    this.props.click_cancelNewIngredientButton();
  }

  handleChange (e) {
    this.setState({description: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault();

    const data = {
      description: this.state.description
    };

    this.props.post(`api/drinks/${this.props.drinkId}/ingredients`, data, this.props.drinkId);
  }
}


export default NewIngredient
