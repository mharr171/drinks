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
    this.patchDrink = this.patchDrink.bind(this)

    this.click_newDrinkButton = this.click_newDrinkButton.bind(this)
    this.click_editDrinkButton = this.click_editDrinkButton.bind(this)
    this.click_editField = this.click_editField.bind(this)
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
              editDrink={editDrink}
              makingEdit={makingEdit}
              postDrink={this.postDrink}
              patchDrink={this.patchDrink}
              updateDrinks={this.updateDrinks}
              click_editField={this.click_editField}
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

  click_editDrinkButton () {
    this.flip_showDrink()
    this.flip_editDrink()
  }

  click_editField () {
    this.flip_makingEdit()
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
