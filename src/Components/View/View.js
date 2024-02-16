import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../context/postContext';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { auth,db } from '../../firebase/config';
function View() {
  const [userDetails,setUserDetails] = useState();
  const {postDetails} = useContext(PostContext);
  useEffect(() => {
    const { userId } = postDetails;
  
    // Ensure userId is available before querying
    if (userId) {
      console.log('userId :'+userId)
      const q = query(collection(db, 'users'), where('uid', '==', userId));
  
      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setUserDetails(doc.data());
              console.log(doc.data())
            });
          } else {
            console.log('No matching documents found.');
          }
        })
        .catch((error) => {
          console.error('Error retrieving user data:', error.message);
        });
    }
  }, [postDetails]);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails&&<div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.displayName}</p>
          <p>{userDetails.phoneNumber}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
