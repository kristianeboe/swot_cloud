import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Grid,
  Button,
  Container,
  Menu,
  Segment,
  Input,
  List,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import ItemList from './components/ItemList'
import ItemRow from './components/ItemRow'
import SignUp from './SignUp'
import AppHeader from './AppHeader'
import uuidv4 from 'uuid/v4'
import firebase, { auth, provider } from './firebase.js';
import Calc from './Calc'

class App extends Component {
  constructor() {
    super();
    this.unsubscribe1 = null
    this.state = {
      'strengths': [],
      'weaknesses': [],
      'description': '',
    }
    // this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  googleSignIn = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        console.log('login')
        const user = result.user;
        this.setState({
          user
        });
      });
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const item = {
      id: uuidv4(),
      description: this.state.description,
      weight: 1
    }
    this.state.strengths.push(item)
    this.setState({
      description: '',
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({
        user,
        loading: true,
      })
      if (user) {
      //   console.log('did mount auth state log in')
        this.unsubscribe1 = firebase.firestore().collection("strengths").onSnapshot((snapshot) => {
          const strengths = []
          snapshot.forEach((doc => {
            const { text, weight } = doc.data()
            strengths.push({
              key: doc.id,
              text,
              weight,
              doc,
            })
          }))
          this.setState({
            strengths,
            loading: false,
          })
        })
      } else {
        this.setState({
          loading: false
        })
        console.log('did mount auth state log out')
      }
    });

  }

  render() {

    const {user, loading, strengths} = this.state
    console.log(this.state)
    if (loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>)
    }

    if (!user) {
      return (
        <div className="App">
          <AppHeader user={user} signOut={this.signOut} />
          <SignUp googleSignIn={this.googleSignIn} />
        </div>
      )
    }

    return (
      <div className="App">
        <AppHeader />
        <div className="App-body">
          <Grid container stackable centered columns={2} style={{ paddingTop: '5em'}}>
            <Grid.Row>
              <Grid.Column width={8}>
                <Segment raised clearing>
                  <ItemList name="Strengths" data={this.state.strengths} />
                </Segment>
              </Grid.Column>
              <Grid.Column width={8}>
                <Segment raised clearing>
                  <ItemList name="Weaknesses" data={this.state.weaknesses} />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Calc strengths={strengths} weaknesses={[]} opportunities={[]} threats={[]} />
            <Grid.Row>
              <Grid.Column width={8}>
                <Segment raised clearing>
                  <h1>Oportunities</h1>
                </Segment>
              </Grid.Column>
              <Grid.Column width={8}>
                <Segment raised clearing>
                  <h1>Threats</h1>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}


export default App;
