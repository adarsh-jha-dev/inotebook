import React from 'react';

function Alert(props) {
  const capitalize = (word) =>{
    if(word === 'Danger'){
      word = 'Error';
    }else{
      return word.charAt(0).toUpperCase() + word.slice(1); 
    }
  }

  return (
    <div className="conatainer my-10" style={{"height" : "200px"}}>
      {props.alert && <div class={`alert alert-${props.alert.type}`} role="alert">
        <strong>{capitalize(props.alert.type)}</strong> : {props.alert.message}
      </div>}
    </div>
  )
}

export default Alert
