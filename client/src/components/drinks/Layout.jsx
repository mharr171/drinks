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
      drinks: null,
      drink: null,
      showDrink : false,
      newDrink : false,
      editDrink : false,
      makingEdit : false,
      newIngredient : false
    }

    this.getDrinks = this.getDrinks.bind(this)
    this.getDrink = this.getDrink.bind(this)
  }

  componentDidMount () {
    this.getDrinks()
  }

  render () {
    let {drinks, drink} = this.state
    return drinks
    ? <Grid column={1}>
        <Grid.Row>
          <Head />
        </Grid.Row>

        <Grid.Row>
          <DrinkBar
            drinks={drinks}
            drink={drink}
            getDrink={this.getDrink}
          />
        </Grid.Row>

        <Grid.Row>
          <Body />
        </Grid.Row>

        <Grid.Row>
          <Navbar />
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
}

export default Layout
