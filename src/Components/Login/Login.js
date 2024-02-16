import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth ,app,db} from '../../firebase/config';
import Logo from '../../olx-logo.png';
import './Login.css';
import { Spinner } from 'react-bootstrap';
import {useNavigate,Link, Navigate} from "react-router-dom"


function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  const [error,setError]=useState({});
  const [loading,setLoading]=useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    
    e.preventDefault();
    const formErrors = validate(email,password)
    if(Object.keys(formErrors).length==0){
      setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setTimeout(()=>{
          navigate('/')
        },2000)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
    }
  }

  const validate = (email,password) =>{
    const formErrors ={}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^.{5,}$/
    if(email.trim()==''){
      formErrors.email='Email is Required';
    }else if(!emailRegex.test(email)){
      formErrors.email='Invalid Email, Please Provide valid email'
    }

    if(password.trim()==''){
      formErrors.password='Password is required'
    }else if(!passwordRegex.test(password)){
      formErrors.password='Invalid Passoword'
    }

    setError(formErrors);
    return formErrors;
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img className='d-flex justify-content-center' height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit} >
        <label htmlFor="fname">Email</label>
          <small style={{float:'right',color:'red'}} >{error.email}</small>
          <br />
          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="input"
            type="email"
            id="femail"
            name="email"
          
          />
          <br />
          <label htmlFor="lname">Password</label>
          <small style={{float:'right',color:'red'}} >{error.password}</small>
          <br />
          <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="input"
            type="password"
            id="passowrd"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          {loading?<button disabled ><Spinner className='my-auto mx-2' animation="border" size="sm" />Loading</button>:<button>Login</button> }
        </form>
         <Link style={{textDecoration:'none'}} to='/signup'>Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
