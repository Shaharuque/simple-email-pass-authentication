import logo from './logo.svg';
import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';
//bootstrap ar styling use ar jnno
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { useState } from 'react';


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


function App() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const userEmail = (event) => {
    setEmail(event.target.value)
  }
  const userPassword = (event) => {
    setPassword(event.target.value)
  }
  const formSubmitHandle = (event) => {
    console.log('sumitted',email,password)
    event.preventDefault()  //page reload prevent korey form submit korley
  }
  return (
    <div>
      <div className="registration w-50 mx-auto">
        <h1 className='text-primary'>Please Register</h1>
        {/*submit btn a click korley formSubmitHandle() ar kaj hobey */}
        <Form onSubmit={formSubmitHandle}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={userEmail} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={userPassword} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
