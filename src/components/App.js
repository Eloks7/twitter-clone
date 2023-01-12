import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading-bar';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
        <LoadingBar />
        <div className='container'>
          <Nav />
          {this.props.loading === true 
            ? null
            : <div>
              <Routes>
                <Route path='/' exact element={<Dashboard />} />
                {/* <Route path='/tweet/:id' element={<TweetPage />}/> */}
                <Route
                  path='/tweet/:id'
                  render={({ match }) => (
                    <TweetPage id={match.params.id} />
                  )}
                />
                <Route path='/new' element={<NewTweet />}/>
              </Routes>
            </div>
          }
        </div>
        </Fragment>
      </Router>
      
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);