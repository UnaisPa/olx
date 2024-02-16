import React,{useContext, useEffect, useState} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../context/firebaseContext';
import { onSnapshot, updateDoc,getDoc, doc } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { db,auth } from '../../firebase/config';
import { Link ,useNavigate} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
function Header() {
  const {user} = useContext(AuthContext)
  const [name,setName] = useState();
  const navigate =useNavigate()
  const getUserData = async (email) => {
    try {
      const userDocRef = doc(db, 'users', email);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        // Document exists, extract user data
        const userData = userDocSnapshot.data();
        console.log('User Data:', userData);
  
        // You can now access specific fields, for example:
        const displayName = userData.displayName;
        const phoneNumber = userData.phoneNumber;
        console.log('Display Name:', displayName);
        console.log('Phone Number:', phoneNumber);
        setName(displayName)
        // Do something with the user data...
      } else {
        console.log('User document does not exist');
        // Handle the case where the document doesn't exist
      }
    } catch (error) {
      console.error('Error getting user data:', error.message);
      // Handle the error appropriately
    }}

    getUserData(user?.email);
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {/* <span style={{fontWeight:600}}>{user?name:'Login'} </span> */}
          { <Dropdown>
      <Dropdown.Toggle variant="" id="dropdown-basic">
      <span style={{fontWeight:600}}>{user?name:'Login'} </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {user? <Dropdown.Item onClick={()=>signOut(auth).then(()=>navigate('/login'))}>Log Out</Dropdown.Item>:
        <Link className='mx-3 my-1' to='/login'>Login</Link>}<br/>
        {!user&&<Link className='mx-3 my-1' to='/signup'>Sign Up</Link>}
      </Dropdown.Menu>
    </Dropdown>}
          
        </div>
       
        
         <Link to='/create'>   
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
