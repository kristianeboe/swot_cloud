import React, { Component } from 'react';
import {List, Input} from 'semantic-ui-react';
import uuidv4 from 'uuid/v4'
import ItemRow from './ItemRow'
import firebase, { auth, provider } from '../firebase.js';

class ItemList extends Component {
    constructor() {
        super();
        this.state = {
        }
        // this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
      }

      handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
    
      handleSubmit(e) {
        e.preventDefault();
        const item = {
          text: this.state.description,
          weight: 1
        }
        firebase.firestore().collection('strengths').add(item)
        this.setState({
          description: '',
        });
      }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>{this.props.name}</h1>
                <Input name="description" action='Add' placeholder='Search...' onChange={this.handleChange} value={this.state.description}/>
                <List divided verticalAlign='middle' >
                    {this.props.data.map( item => (
                    <ItemRow key={item.key} description={item.text} weight={item.weight} />
                ))}
                </List>
            </form>
        )

    }
}

export default ItemList