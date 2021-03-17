import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message, className }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="container">
        {(className === "success" &&
          <Alert variant="success">
            {message}
          </Alert>
        )}
        {(className === "error" &&
          <Alert variant="danger">
            {message}
          </Alert>
        )}
      </div>

    )
  }

export default Notification