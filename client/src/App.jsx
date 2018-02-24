import React, { Component } from 'react'
import './App.css'
import { Container } from 'semantic-ui-react'
import DrinkView from './components/drinks/Layout.jsx';

class App extends Component {
  constructor () {
    super()
    this.state = {}

  }

  componentDidMount () {
  }

  render () {
    return(
      <Container>
        <DrinkView />
      </Container>
    );
  }

}
export default App
