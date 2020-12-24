import React from 'react';

const PersonForm = (props) => {
  return(
    <>
      <div>
        name: <input onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={props.addPerson}>add</button>
      </div>
  </>
  )
}

export default PersonForm;