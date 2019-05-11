//export component so we use upper case ,// initial view which is react
import React, { Component } from 'react'; //Componnets stands for component base class
import { BrowserRouter, Route} from 'react-router-dom'; // BrowerRouter is brains of react router, tells how to behaive
import { connect } from 'react-redux'; // the ability to call action creators
import * as actions from '../actions'; // take all actions creator defined and assigned it to action
//looks the current url and changes set of components visitble at given time
// set of component actually visible in the route
//using weback and bable so we use import from front side makes use of
//gives us acees 2015 module , whereas from back end we use node js which has support for common js module , require syntax
// create functional app component return jsx
//header is dummy component
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import SurveyForm from './surveys/SurveyForm';

class App extends Component {
  componentDidMount() { //might be called multiple times authomaticall
    // by convention ,make any type of initial ajax request
    //the instant mount componentis rendered on screen ,going to attempt to fetch the current user
   this.props.fetchUser();
  }

  render() {
  return (
    <div className="container">
      <BrowserRouter>
        <div>
           <Header />
           <Route exact path="/" component = {Landing} />
           <Route exact path="/surveys" component = {Dashboard} />
           <Route path="/surveys/new" component = {SurveyNew} />
            <Route path="/surveys/new" component = {SurveyForm} />
        </div>
      </BrowserRouter>
    </div>
  );
};
};

export default  connect(null,actions)(App);
