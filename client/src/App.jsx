import React, { Component } from 'react'
import { Container, Dimmer, Loader, Segment } from 'semantic-ui-react'
import Head from './components/Head.jsx';
import DrinkList from './components/DrinkList.jsx';
import Drink from './components/Drink.jsx';
import NewDrink from './components/NewDrink.jsx';
import EditDrink from './components/EditDrink.jsx';
import BottomNav from './components/BottomNav.jsx';

class App extends Component {
  constructor () {
    super()
    this.state = {
      drinks: null,
      drink: null,
      editFormIsOpen: false,
      editingDrink: false
    }
    this.getDrinks = this.getDrinks.bind(this)
    this.getDrink = this.getDrink.bind(this)

    this.post = this.post.bind(this)
    this.postDrink = this.postDrink.bind(this)

    this.patch = this.patch.bind(this)
    this.patchDrink = this.patchDrink.bind(this)

    this.flip_editFormIsOpen = this.flip_editFormIsOpen.bind(this)
    this.flip_editingDrink = this.flip_editingDrink.bind(this)
    this.setNoDrink = this.setNoDrink.bind(this)
  }

  render () {
    let {drinks, drink, editFormIsOpen, editingDrink} = this.state
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
          drink && !editingDrink &&
          <Drink
            title={drink.title}
            source={drink.source}
            description={drink.description}
            ingredients={drink.ingredients}
            steps={drink.steps}
          />
        }

        {
          drink && editingDrink &&
          <EditDrink
            drinkId={drink.id}
            title={drink.title}
            source={drink.source}
            description={drink.description}
            ingredients={drink.ingredients}
            steps={drink.steps}
            patch={this.patchDrink}
            flip_editFormIsOpen={this.flip_editFormIsOpen}
            flip_editingDrink={this.flip_editingDrink}
          />
        }

        {
          !drink &&
          <NewDrink
            post={this.postDrink}
            flip_editFormIsOpen={this.flip_editFormIsOpen}
          />
        }


        <div className="ui hidden divider"></div>

        <BottomNav
          editFormIsOpen={editFormIsOpen}
          editingDrink={editingDrink}
          flip_editFormIsOpen={this.flip_editFormIsOpen}
          flip_editingDrink={this.flip_editingDrink}
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

  async postDrink (endpoint, data) {
    const status = await this.post(endpoint, data)
    if (status === 201){
      this.getDrinks();
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
      this.getDrink(drinkId)
      return true
    }else{
      console.log('status: ' + status)
      return false
    }
  }

  flip_editFormIsOpen () {
    (this.editFormIsOpen ? this.setState({editFormIsOpen:false}) : this.setState({editFormIsOpen:true}))
  }

  flip_editingDrink () {
    (this.editingDrink ? this.setState({editingDrink:false}) : this.setState({editingDrink:true}))
  }

  setNoDrink (){
    this.setState({drink:null})
  }
}

export default App
