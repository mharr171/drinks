import React, { Component } from 'react';
import FormTitle from './FormTitle.jsx';
import FormSource from './FormSource.jsx';
import IngredientList from './IngredientList.jsx';

class EditDrink extends Component {
  constructor (props) {
    super(props)
    this.state= {
      editingTitle: false,
      editingSource: false
    }

    this.flip_editingTitle = this.flip_editingTitle.bind(this)
    this.flip_editingSource = this.flip_editingSource.bind(this)
  }

  render () {
    let {editingTitle,editingSource} = this.state
    // Variables
    let {drinkId, title, source, description, ingredients, steps} = this.props
    // Functions
    let {patch, flip_editFormIsOpen, flip_editingDrink} = this.props
    return (
        <div className="ui segments">

          {
            title && !editingTitle &&
            <div className="ui segment" onClick={this.flip_editingTitle}>
              <h5>Drink Name</h5>
              <h1>{title}</h1>
            </div>
          }

          {
            title && editingTitle &&
            <div className="ui segment">
              <h5>Drink Name</h5>
              <FormTitle
                drinkId={drinkId}
                title={title}
                patch={patch}
                flip_editingTitle={this.flip_editingTitle}
              />
            </div>
          }

          {
            source && !editingSource &&
            <div className="ui segment" onClick={this.flip_editingSource}>
              <h5>Source</h5>
              <p>{source}</p>
            </div>
          }

          {
            source && editingSource &&
            <div className="ui segment">
              <h5>Source</h5>
              <FormSource
                drinkId={drinkId}
                source={source}
                patch={patch}
                flip_editingSource={this.flip_editingSource}
              />
            </div>
          }


          <div className="ui segment">
            {
              description &&
              <p>{description}</p>
            }
          </div>

          <div className="ui segment">
            <IngredientList
              ingredients={ingredients}
            />
          </div>

          <div className="ui segment">
            {
              steps &&
              <p>{steps}</p>
            }
          </div>

        </div>
    )
  }

  flip_editingTitle (){
    this.state.editingTitle ? this.setState({editingTitle:false}) : this.setState({editingTitle:true})
    this.props.flip_editFormIsOpen()
  }
  flip_editingSource (){
    this.state.editingSource ? this.setState({editingSource:false}) : this.setState({editingSource:true})
    this.props.flip_editFormIsOpen()
  }
}

export default EditDrink
