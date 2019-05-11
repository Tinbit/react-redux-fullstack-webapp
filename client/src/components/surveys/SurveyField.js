//SurveyField contains logic to render a single lable and txt input
import React from 'react';

//console.log(props.input);
//{}...input} equivalent to onBlur ={input.onBlur} onChange={input.onchange}
//includs everything not a specific fcn in that prop
//export default ({ input, label , meta}) => {   //console.log(meta);
export default ({ input, label , meta: { error, touched } }) => {
  return (
    <div>
    <label>{label}</label>
    <input {...input} style={{ marginBottom: '5px' }} />
    <div className="red-text" style={{ marginBottom: '20px' }}>
      {touched && error}
      </div>
      </div>
  )
}
