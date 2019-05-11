import _ from 'lodash';
import React, { Component } from "react";
// SurveyForm shows a form for a user to add input
import { reduxForm, Field } from "redux-form"; // want to import specific value only which is redux form
import { Link } from 'react-router-dom'; //inorder to navigate inside react app /page -Link
import SurveyField from "./SurveyField";
import validateEmails from '../utils/validateEmails';
//Create array obj called Field that wont changes //return 1 custom field obj
//noValueError: ' you must provide a Title, subject..'
const FIELDS = [
  { label: 'Survey Title', name: 'title'},
  { label: 'Subject Line', name: 'subject'},
  { label: 'Email Body', name: 'body'},
  { label: 'Recipient List', name: 'emails'}
]

class SurveyForm extends Component {
  //handleSubmit provided by redux form authomatically
  renderFields() {
    //iterate through for every obj and run through this name &label run fcn onetime n creat Field
    //map over the fields array and for every fileds that i have return one custom field
    //rather than receiving the entire field obje field _.map(FIELDS, field => { return ... fields.name, fields.label
   //use es6 structuring and pull of the two fields I care about only
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field component= {SurveyField} type="text" label={label} name={name} />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">Cancel
          </Link>

          <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

 errors.emails = validateEmails(values.email || '');
  // if(!values.title) {   errors.title = 'You must provide a title';}
  //use customized  for patricular field errors[name] = noValueError
_.each(FIELDS, ({ name }) => {
  if (!values[name]) {
    errors[name] = 'You must provide a value';

  }
});

  return errors;
}

export default reduxForm({
//  validate: validate using es6 form condence it to validate since they have the same key and value name
  validate,
  form: "surveyForm"
})(SurveyForm);
