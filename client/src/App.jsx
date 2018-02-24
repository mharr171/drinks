import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Drink from './components/drinks/Drink.jsx';

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
        <Drink />
      </Container>
    );
  }

}
export default App
