import logo from './logo.svg';
import './App.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './firebase.init';
//bootstrap ar styling use ar jnno
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { useState } from 'react';


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name,setName]=useState('')
  //for validation
  const [validated, setValidated] = useState(false);
  //error show if password validation na pass korey
  const [error, setError] = useState('')
  const [sucess,setSucess]=useState('')
  //user registed or not sheita r state 
  const [registered, setRegistered] = useState(false)


  const userEmail = (event) => {
    setEmail(event.target.value) //event.target.value ar help a we can get the input value from user
  }
  const userPassword = (event) => {
    setPassword(event.target.value)
  }
  const userName=(e)=>{
    setName(e.target.value)
  }
  const handleRegisted = (event) => {
    //console.log(event.target.checked) //event.target.checked=>check box a tick diley true return ar tick na diley false return
    setRegistered(event.target.checked)
  }


  const formSubmitHandle = (event) => {
    event.preventDefault();  //page reload prevent korey form submit korley

    //for validation purpose
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();  //form a email pass na diley submit click korleo kaj hobey na
      return
    }
    //fancy validation(passwod a 1 ta special charecter must thaka lagbey)
    //jodi password a special charecter na thakey tahley alert show hobey user k
    if (!(/(?=.*?[#?!@$%^&*-])/).test(password)) {
      //alert('put atleast one special charecter')
      setError('put atleast one special charecter')
      return
    }

    setValidated(true);
    //password jodi fancy validation pass korey tahley
    setError('')

    //user ar email,pass jodi firebase a thakey means sey registered so again register kora dorkar nai sei kaj ta aikhaney dekhano hoisey if part a and new user holey  tar registration else part handle korbey
    if (registered) { //user k sign in korabey jodi user agey thekey registed thakey
      //console.log(email, password);
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    }
    else {//new user created if user not registed yet
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setSucess('Account created successfully')
          setEmail('')
          setPassword('')
          //new user create hober por tar email a ekta varification mail jabey
          varifyEmail()
          updateUserInfo()
        })
        .catch(error => {
          setSucess('')
          console.error(error);
          setError(error.message);
        })
    }

    //console.log('sumitted',email,password)

    //event.preventDefault()  //page reload prevent korey form submit korley
  }

  //new user create ar por varify email ar kaj kora hoisey 
  const varifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert('varification mail send')
      });
  }
  //password bhuley geley reset password ar system kora hoisey
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    console.log('pass reset mail send to ur email')
    // ..
  })
  .catch((error) => {
    
    const errorMessage = error.message;
    setError(errorMessage)
    // ..
  });
  }

  const updateUserInfo=()=>{
    updateProfile(auth.currentUser, {
      displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!
      console.log('profile update')
      // ...
    }).catch((error) => {
      // An error occurred
      setError(error)
      // ...
    });
  }


  return (
    <div>
      <div className="registration w-50 mx-auto">
        <h1 className='text-primary'>{registered ? 'Please Login!!' : 'Please Register!!'}</h1>
        {/*submit btn a click korley formSubmitHandle() ar kaj hobey */}
        <Form noValidate validated={validated} onSubmit={formSubmitHandle}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={userEmail} type="email" placeholder="Enter email" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>

          {/*user name field shudu registration ar somoy dekhabo */}
         {!registered &&
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control onClick={userName} type="text" placeholder="Enter Name" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid userName.
          </Form.Control.Feedback>
        </Form.Group>
         }

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={userPassword} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisted} type="checkbox" label="Already registered" />
          </Form.Group>
          <p className='text-danger'>{sucess}</p>
          <p className='text-danger'>{error}</p>
          <Button onClick={handlePasswordReset}  variant="link">forgot password?</Button>
          <br />
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>

        </Form>
      </div>
    </div>
  );
}

export default App;
