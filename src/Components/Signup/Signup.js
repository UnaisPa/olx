import React, { useContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth ,app,db} from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore'
import Logo from '../../olx-logo.png';
import './Signup.css';
import {useNavigate} from "react-router-dom";
import { FirebaseContext} from '../../context/firebaseContext';
import {Spinner} from 'react-bootstrap';
import {setDoc,doc} from "firebase/firestore"
//import { auth } from '../../firebase/config'; 
export default function Signup() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError]=useState({})
  const {firebase}= useContext(FirebaseContext)
  const navigate = useNavigate()
  //const auth = getAuth();
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const formErrors = validate(name,phone,email,password);
    if (Object.keys(formErrors).length === 0) {
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Additional logic after successful signup
      await setDoc(doc(db,'users',email),{
        uid: user.uid,
        displayName: name,
        phoneNumber: phone,
      }).then(()=>{
        
        setTimeout(()=>{
          navigate('/login');
        },2000)
      });
      
      
    } catch (error) {
      setLoading(false)
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // Handle signup error
    }
    
  }
  }
  
  const validate =(name,mobile,email,password)=>{
    const nameRegex = /^[a-zA-Z\s]+$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^.{5,}$/
    const mobileRegex = /^\d{10}$/;

    const formErrors = {}
    if(name.trim()==''){
      formErrors.name="Name field is Required";
    }else if(!nameRegex.test(name)){
      formErrors.name="Invalid Name, Please write a valid name";
    }
    if(email.trim()==''){
      formErrors.email='Email field is Required';
    }else if(!emailRegex.test(email)){
      formErrors.email='Invalid Email, Please Provide valid email'
    }

    if(mobile.trim()==''){
      
      formErrors.phone="Name filed is Required";
    }else if(!mobileRegex.test(mobile)){
      formErrors.phone='Invalid Mobile number!'
    }

    if(password.trim()==''){
      formErrors.password='Password field is Required'
    }else if(!passwordRegex.test(password)){
      formErrors.password='Passowrd should have atleast 6 characters.'
    }
    setError(formErrors);
    return formErrors;
  }
  
  return (
    <div>
      <div className="signupParentDiv">
        <img className='d-flex justify-content-center' width="" height="180px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          
          <label  >Username</label>
          <small style={{float:'right',color:'red'}} >{error.name}</small>
         
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            id="fname"
            name="name"
            
          />
          <br />
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
         
          <label htmlFor="lname">Phone</label>
          <small style={{float:'right',color:'red'}} >{error.phone}</small>
          <br />
          <input
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            className="input"
            type="number"
            id="phone"
            name="phone"
            defaultValue="Doe"
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
          {loading?<button disabled ><Spinner className='my-auto mx-2' animation="border" size="sm" />Signing up</button>:<button>Signup</button> }
        </form>
        <a>Login</a>
      </div>
     
    </div>
  );
}
