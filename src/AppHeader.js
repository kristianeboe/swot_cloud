import React, { Component } from 'react'
import {
  Menu,
  Container,
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import firebase, {auth} from './firebase'

class AppHeader extends Component {

  constructor(props) {
    super(props)
    const { user, signOut, toggleVisibilityMyProfile } = props
    this.state = {
      visible: false,
      user: null,
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if(user) {
        this.setState({user})
      }
      else {
        {
          this.setState({user})
        }
      }
    })
  }

  signOut = () => {
    auth.signOut()
      .then(() => {
        console.log('logout')
        this.setState({
          user: null,
        });
      });
  }


  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { toggleVisibilityMyProfile } = this.props
    const {user, visible } = this.state
    return (
      <Menu fixed='top' inverted style={{ width: '100vw' }}>
        <Container>
          <Menu.Item header>
            <Link to="/">InsiderList</Link>
          </Menu.Item>
          <Menu.Menu position='right'>
            {user && <Menu.Item onClick={toggleVisibilityMyProfile} > My profile </Menu.Item>}
            {user && <Menu.Item onClick={this.signOut} > <Link to="/">Sign out</Link></Menu.Item>}

          </Menu.Menu>
          
        </Container>
      </Menu>)
  }
}

export default AppHeader