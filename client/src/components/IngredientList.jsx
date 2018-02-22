import React, { Component } from 'react';

class IngredientList extends Component {
  constructor (props) {
    super(props)
    this.state= {}
  }

  render () {
    // Variables
    let {ingredients} = this.props
    // Functions
    let {} = this.props
    return (
      <div className="ui segments">
        {
          ingredients &&
          Object.keys(ingredients).map((key) => {
            return(
              <div className="ui segment" key={key}>
                <p>
                  {ingredients[key].description}
                </p>
              </div>
            )
          })
        }
      </div>
    )
  }

}

export default IngredientList
