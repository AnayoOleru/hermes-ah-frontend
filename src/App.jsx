import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import store from './store/store';
import Homepage from './components/presentations/Homepage/Homepage';
import Login from './components/presentations/Login/Login';
import Notfound from './components/presentations/Notfound/Notfound';
import Footer from './components/shared/Footer/Footer';
import NavBar from './components/shared/NavBar/NavBar';
import Profilepage from './components/containers/profile.container';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const navLinks = [
      {
        link: '/about',
        text: 'About',
      },
      {
        link: '/categories',
        text: 'Categories',
      },
      {
        link: '/login',
        text: 'Login',
      },
      {
        link: '/signup',
        text: 'Signup',
        className: 'active',
      },
    ];
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <NavBar navLinks={navLinks} />
            <Switch>
              <Route path="/profile" component={Profilepage} />
              <Route path="/login" component={Login} />
              <Route path="/not-found" component={Notfound} />
              <Route path="/" exact component={Homepage} />
              <Redirect to="/not-found" />
            </Switch>
            <Footer />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

Provider.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default App;
