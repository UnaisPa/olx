import React, { useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import Skeletonn from './skeleton';
import Product from './Product';
import Card from './Card'
import { auth ,db} from '../../firebase/config';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
function Posts() {
  const [products,setProducts] = useState([])
  const nums=[1,1,1,1,1,1]
  const [loading,setLoading] =useState(true)
  useEffect(()=>{
    const productsCollection = collection(db, 'products');

getDocs(productsCollection)
  .then((snapshot) => {
    const allPosts = snapshot.docs.map((product) => ({
      ...product.data(),
      id: product.id
    }));
   setProducts(allPosts);
   console.log(allPosts)
  })
  .catch((error) => {
    console.error('Error retrieving data from Firestore:', error.message);
  });

    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])
  return (
//     <div className="postParentDiv">
//       <div className="moreView">
//         <div className="heading">
//           <p style={{fontSize:'24px'}}>Fresh Recommendations</p>
//         </div>

//         <div className=''>
//         <div style={{display:'flex',flexFlow:'wrap'}} className="d-flex m-1 p-1">
//           {
//             nums.map((num)=>{
//               return(
//                 loading?<Skeletonn/>:<Product/>
//               )
//             })
//           }
          
          
//         </div>
//         </div>


//       </div>
//       <div className="recommendations">
//         <div className="heading">
//           <span>Fresh recommendations</span>
//         </div>
//         <div className="cards">
//           <div className="card">
//             <div className="favorite">
//               <Heart></Heart>
//             </div>
//             <div className="image">
//               <img src="../../../Images/R15V3.jpg" alt="" />
//             </div>
//             <div className="content">
//               <p className="rate">&#x20B9; 250000</p>
//               <span className="kilometer">Two Wheeler</span>
//               <p className="name"> YAMAHA R15V3</p>
//             </div>
//             <div className="date">
//               <span>10/5/2021</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
<>
<div>
    
</div>
<div className='container'>
<h4 className='ml-1 mt-2'>Fresh Recomentations</h4>
    <div className='row mx-auto center-div'>
    {
        products.map((product)=>{
          return(
            loading?<Skeletonn/>:<Card product={product} />
          )
        })
    }
    </div>
</div>
</>
   );
 }

export default Posts;
