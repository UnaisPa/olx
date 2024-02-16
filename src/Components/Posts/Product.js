import React from "react";
import Heart from "../../assets/Heart";
import "./Post.css";

const Product = () => {
  return (
    <div className="card border col-3 col-md-3 col-lg-3 m-1">
      <div className="image border">
        <img src="../../../Images/R15V3.jpg" alt="" />
        <div
          style={{ position: "absolute", top: 15, right: 15 }}
          className="favorite"
        >
          <Heart></Heart>
        </div>
      </div>
      <div className="content">
        <h5 className="rate">&#x20B9; 250000</h5>
        <span style={{ fontSize: "15px", fontWeight: 450, opacity: "80%" }}>
          Two wheeler, 98 model
        </span>
        {/* <span className="kilometer">Two Wheeler</span> */}
        <div className="d-flex justify-content-between mt-3">
          <p
            style={{ fontSize: "10px", fontWeight: 450, opacity: "80%" }}
            className="name"
          >
            CHENNAI, TAMILNADU
          </p>
          <span style={{ fontSize: "11px", fontWeight: 450, opacity: "80%" }}>
            Tue May 04 2021
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
