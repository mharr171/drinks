import React, { Component } from 'react'
import { Container, Dimmer, Loader, Segment } from 'semantic-ui-react'
import Head from './components/Head.jsx';
import DrinkList from './components/DrinkList.jsx';
import Drink from './components/Drink.jsx';
import NewDrink from './components/NewDrink.jsx';
import BottomNav from './components/BottomNav.jsx';

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

    this.post = this.post.bind(this)
    this.postNewDrink = this.postNewDrink.bind(this)

    this.flip_editFormIsOpen = this.flip_editFormIsOpen.bind(this)
    this.setNoDrink = this.setNoDrink.bind(this)
  }

  render () {
    let {drinks, drink, editFormIsOpen} = this.state
    return drinks
    ? <Container text>

        <Head />
        <div className="ui hidden divider"></div>

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
        <div className="ui hidden divider"></div>

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

        {
          !drink &&
          <NewDrink
            post={this.postNewDrink}
          />
        }


        <div className="ui hidden divider"></div>

        <BottomNav
          editFormIsOpen={editFormIsOpen}
          setNoDrink={this.setNoDrink}
        />

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

  async postNewDrink (endpoint, data) {
    const status = await this.post(endpoint, data)
    if (status === 201){
      this.getDrinks();
    }
  }

  flip_editFormIsOpen () {
    (this.editFormIsOpen ? this.setState({editFormIsOpen:false}) : this.setState({editFormIsOpen:true}))
  }

  setNoDrink (){
    this.setState({drink:null})
  }
}

export default App
