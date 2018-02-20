import React, { Component } from 'react'
import { Container, Header, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import Drink from './components/Drink.jsx';
import DrinkForm from './components/DrinkForm.jsx';

class App extends Component {
  constructor () {
    super()
    this.state = {
      drinks: null,
      drink: null,
      buttonsDisabled: false
    }
    this.getDrinks = this.getDrinks.bind(this)
    this.getDrink = this.getDrink.bind(this)
    this.getDrinksAndGetDrink = this.getDrinksAndGetDrink.bind(this)
    this.newDrink = this.newDrink.bind(this)

    this.post = this.post.bind(this)
    this.delete = this.delete.bind(this)
    this.patchDrink = this.patchDrink.bind(this)
    this.postIngredient = this.postIngredient.bind(this)
    this.deleteIngredient = this.deleteIngredient.bind(this)

    this.flipButtonsDisabled = this.flipButtonsDisabled.bind(this)
  }

  componentDidMount () {
    this.getDrinks()
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

    if (status === 201){
      this.getDrinks();
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

    if (status){
      console.log('status: ' + status)
    }
    if (status === 204){
      this.getDrinks(1);
    }
  }

  async deleteIngredient (endpoint, drinkId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'DELETE',
      headers
    };

    const request = new Request(endpoint, options);
    const response = await fetch(request);
    const status = await response.status;

    if (status){
      console.log('status: ' + status)
    }
    if (status === 204){
      this.getDrink(drinkId);
    }
  }

  async patchDrink (endpoint, data, drinkId) {
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

    if (status === 202){
      this.getDrinksAndGetDrink(drinkId);
    }
  }

  async postIngredient (endpoint, data, drinkId) {
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

    if (status === 201){
      this.getDrink(drinkId);
    }
  }

  getDrinks (id = -1) {
    this.fetch('api/drinks')
      .then(drinks => {
        this.setState({drinks: drinks})
        if (!this.state.drink){
          this.getDrink(drinks[0].id)
        }
        if (id !== -1){
          this.getDrink(drinks[0].id)
        }
      })
  }

  getDrink (id) {
    this.fetch(`api/drinks/${id}`)
      .then(drink => this.setState({drink: drink}))
  }

  getDrinksAndGetDrink (id) {
    this.getDrinks();
    this.getDrink(id);
  }

  newDrink () {
    this.setState({drink: null})
  }

  flipButtonsDisabled () {
    this.setState(this.state.buttonsDisabled ? {buttonsDisabled:false} : {buttonsDisabled:true})
  }

  render () {
    let {drinks, drink, buttonsDisabled} = this.state
    return drinks
    ? <Container text>
        <Header as='h2' icon textAlign='center'>
          <Icon name='cocktail' circular />
          <Header.Content>
            List of Ingredients
          </Header.Content>
        </Header>

        {
          !buttonsDisabled &&
          <Button onClick={() => this.newDrink()}>
            New Drink
          </Button>
        }
        {
          buttonsDisabled &&
          <Button disabled onClick={() => this.newDrink()}>
            New Drink
          </Button>
        }

        <Button.Group fluid widths={drinks.length}>
          {
            !buttonsDisabled &&
            Object.keys(drinks).map((key) => {
              return (
                <Button active={drink && drink.id === drinks[key].id} fluid key={key} onClick={() => this.getDrink(drinks[key].id)}>
                  {drinks[key].title}
                </Button>
              );
            })
          }
          {
            buttonsDisabled &&
            Object.keys(drinks).map((key) => {
              return (
                <Button active={drink && drink.id === drinks[key].id} fluid disabled key={key} onClick={() => this.getDrink(drinks[key].id)}>
                  {drinks[key].title}
                </Button>
              );
            })
          }
        </Button.Group>

        <Divider hidden />

        {!drink &&
          <DrinkForm post={this.post}/>
        }

        {drink &&
          <Drink
            title={this.state.drink.title}
            description={this.state.drink.description}
            ingredients={this.state.drink.ingredients}
            steps={this.state.drink.steps}
            source={this.state.drink.source}
            drinkId={this.state.drink.id}
            postIngredient={this.postIngredient}
            flipButtonsDisabled={this.flipButtonsDisabled}
            patchDrink={this.patchDrink}
            buttonsDisabled={this.state.buttonsDisabled}
            delete={this.delete}
            deleteIngredient={this.deleteIngredient}
          />
        }
      </Container>
    : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
  }
}

export default App
