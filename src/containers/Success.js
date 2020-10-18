import React from 'react';

const Success = (props) => {
  const {name, email, password} = props.location.state
  return (
    <ul>
      <li>Name: {name}</li>
      <li>Email: {email}</li>
      <li>Password: {password}</li>
    </ul>
  )
}

export default Success;
