import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext ,FirebaseContext} from '../../context/firebaseContext'; 
import {storage,auth,db} from '../../firebase/config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const {user} = useContext(AuthContext);
  const {firebase} =useContext(FirebaseContext)
  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('');
  const [image,setImage]=useState(null)
  const [error,setError] = useState({});
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const date = new Date()
  
  const handleSubmit =(e)=>{
    e.preventDefault();
    const formErrors = validate(name,category,price,image);
    if(Object.keys(formErrors).length==0){
      setLoading(true)
      const storageRef = ref(storage, `/image/${image.name}`);

uploadBytesResumable(storageRef, image)
  .then((snapshot) => {
    return getDownloadURL(snapshot.ref);
  })
  .then((downloadURL) => {
    console.log('File available at', downloadURL);
    addDoc(collection(db, 'products'), {
      name,
      category,
      price,
      url: downloadURL,
      userId:user.uid,
      createdAt:date.toDateString()
    })
      .then((docRef) => {
        console.log('Product added with ID:', docRef.id);
        setTimeout(()=>{
          setLoading(false);
          navigate('/')
        },2000)
      })
  })
  .catch((error) => {
    console.error('Error uploading file:', error.message);
  });
    }
  }

  const validate =(name,category,price)=>{
    const formErrors = {};
    if(name.trim()==''){
      formErrors.name='Field is required'
    }

    if(category.trim()==''){
      formErrors.category='Field is required'
    }

    if(price.trim()==''){
      formErrors.price='Field is required'
    }

    if(!image){
      formErrors.image='Upload an Image!'
    }
    setError(formErrors)
    return formErrors;
  }
  return (
    <Fragment>
      
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <small style={{float:'right',color:'red'}} >{error.name}</small>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <small style={{float:'right',color:'red'}} >{error.category}</small>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <small style={{float:'right',color:'red'}} >{error.price}</small>
            <br />
            <input className="input" value={price} onChange={(e)=>setPrice(e.target.value)} type="number" id="fname" name="Price" />
            <br />
          </form>
          <br />
          <small style={{float:'right',color:'red'}} >{error.image}</small>

          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
          <form onSubmit={handleSubmit} >
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            {loading?<button className="uploadBtn" disabled ><Spinner className='my-auto mx-2' animation="border" size="sm" />Loading</button>:<button className="uploadBtn">upload and Submit</button>}
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
