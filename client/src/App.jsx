import React, { Component } from 'react'
import { Container, Dimmer, Loader, Segment } from 'semantic-ui-react'
import Head from './components/Head.jsx';
import DrinkList from './components/DrinkList.jsx';
import Drink from './components/Drink.jsx';

class App extends Component {
  constructor () {
    super()
    this.state = {
      drinks: null,
      drink: null,
      editFormIsOpen: false
    }
    this.getDrinks = this.getDrinks.bind(this)
    this.getDrink = this.getDrink.bind(this)
    this.flip_editFormIsOpen = this.flip_editFormIsOpen.bind(this)
  }

  render () {
    let {drinks, drink, editFormIsOpen} = this.state
    return drinks
    ? <Container text>

        <Head />
        <div class="ui hidden divider"></div>

        {
          drinks && drink &&
          <DrinkList
            drinks = {drinks}
            drink = {drink}
            editFormIsOpen = {editFormIsOpen}
            getDrinks= {this.getDrinks}
            getDrink= {this.getDrink}
          />
        }
        <div class="ui hidden divider"></div>

        {
          drink &&
          <Drink
            title={drink.title}
            source={drink.source}
            description={drink.description}
            ingredients={drink.ingredients}
            steps={drink.steps}
          />
        }
        <div class="ui hidden divider"></div>

      </Container>
    : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
  }

  componentDidMount () {
    this.getDrinks()
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

  fetch (endpoint) {
    return new Promise((resolve, reject) => {
      window.fetch(endpoint)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    })
  }

  flip_editFormIsOpen () {
    (this.editFormIsOpen ? this.setState({editFormIsOpen:false}) : this.setState({editFormIsOpen:true}))
  }

}

export default App
