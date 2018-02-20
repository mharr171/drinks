import React, { Component } from 'react'
import { Container, Header, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import Drink from './components/Drink.jsx';
import DrinkForm from './components/DrinkForm.jsx';

class App extends Component {
  constructor () {
    super()
    this.state = {}
    this.getDrinks = this.getDrinks.bind(this)
    this.getDrink = this.getDrink.bind(this)
    this.newDrink = this.newDrink.bind(this)
    
    this.post = this.post.bind(this)
    this.postIngredient = this.postIngredient.bind(this)
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
  
  getDrinks () {
    this.fetch('api/drinks')
      .then(drinks => {
        this.setState({drinks: drinks})
        this.getDrink(drinks[0].id)
      })
  }
  
  getDrink (id) {
    this.fetch(`api/drinks/${id}`)
      .then(drink => this.setState({drink: drink}))
  }
  
  newDrink () {
    this.setState({drink: null})
  }
  
  render () {
    let {drinks, drink} = this.state
    return drinks
    ? <Container text>
        <Header as='h2' icon textAlign='center'>
          <Icon name='cocktail' circular />
          <Header.Content>
            List of Ingredients
          </Header.Content>
        </Header>
        
        <Button onClick={() => this.newDrink()}>
          New Drink
        </Button>
      
        <Button.Group fluid widths={drinks.length}>
          {Object.keys(drinks).map((key) => {
            return <Button active={drink && drink.id === drinks[key].id} fluid key={key} onClick={() => this.getDrink(drinks[key].id)}>
              {drinks[key].title}
            </Button>
          })}
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
            postIngredient={this.state.postIngredient}
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
