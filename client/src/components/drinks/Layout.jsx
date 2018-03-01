import React, { Component } from 'react'
import { Grid, Dimmer, Loader } from 'semantic-ui-react'
import Head from './Head.jsx';
import DrinkBar from './DrinkBar.jsx';
import Body from './Body.jsx';
import Navbar from './Navbar.jsx';

class Layout extends Component {
  constructor (props){
    super(props)
    this.state = {
      drinks : null,
      drink : null,
      showDrink : true,
      newDrink : false,
      editDrink : false,
      makingEdit : false,
      newIngredient : false
    }

    this.getDrinks = this.getDrinks.bind(this)
    this.updateDrinks = this.updateDrinks.bind(this)
    this.getDrink = this.getDrink.bind(this)

    this.postDrink = this.postDrink.bind(this)
    this.postIngredient = this.postIngredient.bind(this)
    this.patchDrink = this.patchDrink.bind(this)
    this.delete = this.delete.bind(this)
    this.deleteDrink = this.deleteDrink.bind(this)

    this.click_newDrinkButton = this.click_newDrinkButton.bind(this)
    this.click_deleteDrinkButton = this.click_deleteDrinkButton.bind(this)
    this.click_editDrinkButton = this.click_editDrinkButton.bind(this)
    this.click_editField = this.click_editField.bind(this)
    this.click_newIngredientButton = this.click_newIngredientButton.bind(this)
    this.click_cancelEditIngredientButton = this.click_cancelEditIngredientButton.bind(this)
  }

  componentDidMount () {
    this.getDrinks()
  }

  render () {
    let {drinks, drink, showDrink, newDrink, editDrink, makingEdit, newIngredient} = this.state
    return drinks

    ? <Grid column={1}>
        <Grid.Row>
          <Head />
        </Grid.Row>

        <Grid.Row>
          {
            drinks && drink &&
            <DrinkBar
              drinks={drinks}
              drink={drink}
              showDrink={showDrink}
              getDrink={this.getDrink}
            />
          }
        </Grid.Row>

        <Grid.Row>
          {
            drink &&
            <Body
              drink={drink}
              showDrink={showDrink}
              newDrink={newDrink}
              newIngredient={newIngredient}
              editDrink={editDrink}
              makingEdit={makingEdit}
              postDrink={this.postDrink}
              postIngredient={this.postIngredient}
              patchDrink={this.patchDrink}
              updateDrinks={this.updateDrinks}
              click_editField={this.click_editField}
              click_newIngredientButton={this.click_newIngredientButton}
              click_cancelEditIngredientButton={this.click_cancelEditIngredientButton}
            />
          }
        </Grid.Row>

        <Grid.Row>
          <Navbar
            showDrink={showDrink}
            newDrink={newDrink}
            makingEdit={makingEdit}
            editDrink={editDrink}
            click_newDrinkButton={this.click_newDrinkButton}
            click_deleteDrinkButton={this.click_deleteDrinkButton}
            click_editDrinkButton={this.click_editDrinkButton}
          />
        </Grid.Row>
      </Grid>

    : <Grid>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Grid>
  }

  fetch (endpoint) {
    return new Promise((resolve, reject) => {
      window.fetch(endpoint)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    })
  }

  async post (endpoint, data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    };

    const request = new Request(endpoint, options);
    const response = await fetch(request);
    const status = await response.status;

    return status
  }

  async postDrink (endpoint, data) {
    const status = await this.post(endpoint, data)
    if (status === 201){
      this.getDrinks();
      this.flip_editDrink();
      this.flip_newDrink();
    }
  }

  async postIngredient (endpoint, data, drinkId) {
    const status = await this.post(endpoint, data)
    if (status === 201){
      this.getDrink(drinkId);
      this.flip_makingEdit();
      this.flip_newIngredient();
    }
  }

  async patch (endpoint, data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data)
    };

    const request = new Request(endpoint, options);
    const response = await fetch(request);
    const status = await response.status;

    return status
  }

  async patchDrink (endpoint, data, drinkId) {
    const status = await this.patch(endpoint, data)
    if (status === 202){
      await this.getDrinks()
      await this.getDrink(drinkId)
      return true
    }else{
      console.log('status: ' + status)
      return false
    }
  }

  async delete (endpoint) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'DELETE',
      headers
    };

    const request = new Request(endpoint, options);
    const response = await fetch(request);
    const status = await response.status;

    return status
  }

  async deleteDrink (endpoint) {
    const status = await this.delete(endpoint)
    if (status === 204){
      this.getDrinks()
      this.flip_showDrink()
      this.flip_editDrink()
    }else{
      console.log('status: ' + status)
    }
  }

  getDrinks () {
    this.fetch('api/drinks')
      .then(drinks => {
        this.setState({drinks: drinks})
        this.getDrink(drinks[0].id)
      })
  }

  updateDrinks (drinkId) {
    this.fetch('api/drinks')
      .then(drinks => {
        this.setState({drinks: drinks})
        this.getDrink(drinkId)
      })
  }

  getDrink (id) {
    this.fetch(`api/drinks/${id}`)
      .then(drink => this.setState({drink: drink}))
  }

  click_newDrinkButton () {
    this.flip_showDrink()
    this.flip_newDrink()
  }

  click_deleteDrinkButton () {
    this.deleteDrink('api/drinks/'+this.state.drink.id)
  }

  click_editDrinkButton () {
    this.flip_showDrink()
    this.flip_editDrink()
  }

  click_editField () {
    this.flip_makingEdit()
  }

  click_newIngredientButton () {
    this.flip_makingEdit()
    this.flip_newIngredient()
  }

  click_cancelEditIngredientButton () {
    this.flip_makingEdit()
    this.flip_newIngredient()
  }

  flip_showDrink () {
    this.state.showDrink
    ? this.setState({showDrink:false})
    : this.setState({showDrink:true})
  }

  flip_newDrink () {
    this.state.newDrink
    ? this.setState({newDrink:false})
    : this.setState({newDrink:true})
  }

  flip_newIngredient () {
    this.state.newIngredient
    ? this.setState({newIngredient:false})
    : this.setState({newIngredient:true})
  }

  flip_editDrink () {
    this.state.editDrink
    ? this.setState({editDrink:false})
    : this.setState({editDrink:true})
  }

  flip_makingEdit () {
    this.state.makingEdit
    ? this.setState({makingEdit:false})
    : this.setState({makingEdit:true})
  }
}

export default Layout
