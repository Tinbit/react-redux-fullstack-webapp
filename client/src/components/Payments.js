//Stripe billing/wraoper
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
   render() {
     //to see the actual js statement return by below statement
    // debugger;

     return (
        <StripeCheckout
           name="Emaily"
           description="$5 for 5 email credits"
           amount={500}
           token= {token => this.props.handleToken(token)}//expecting to receive call back fcn revive from stripe
           stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
        <button className="btn">
            Add credits
        </button>
        </StripeCheckout>
     );
   }
}

export default connect(null, actions)(Payments);
