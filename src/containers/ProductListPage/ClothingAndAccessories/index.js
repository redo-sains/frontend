/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug, getAllProduct } from "../../../actions";
import Card from "../../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import banner1 from "../../../images/logo/banner-3.jpg";
import banner2 from "../../../images/logo/women-banner.jpg";
import banner3 from "../../../images/kidBanner.jpeg";
import item1 from "../../../images/3.png";
import kid1 from "../../../assets/dress image/blazer.jpg";
import kid2 from "../../../assets/dress image/boy shirt.jfif";
import kid3 from "../../../assets/dress image/black jeans.jpg";
import kid4 from "../../../assets/dress image/belt.jpeg";
import kid5 from "../../../assets/dress image/bag2.jpg";
import kid6 from "../../../assets/dress image/bottle.jpg";
import midBanner from "../../../images/1.png";
import "../../../components/filter/filter.css";
import Filter from "../../../components/filter/Filter";
import FilterSortingBar from "../../../components/filter/FilterSortingBar";
import FilterComp from "../../../components/filter/FilterComp";
import FilterBar from "../../../components/filter/FilterBar";

import "./style.css";

/**
 * @author
 * @function ClothingAndAccessories
 **/

const ClothingAndAccessories = (props) => {
  const product = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    const { slug } = props.match.params;

    dispatch(getProductsBySlug(slug));
  }, []);

  console.log("this slug");
  console.log(props.match.params.slug);

  const filter = ["price", "size", "color"];
  const [filterState, setFilter] = useState("");
  const [filterRevealState, setFilterReveal] = useState(false);

  let filterReveal = "";
  if (!filterRevealState) {
    filterReveal = "none";
  }

  return (
    <>
      <Carousel className="carousel slide carousel-inner">
        <Carousel.Item>
          <img className="d-block w-100" src={banner3} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner3} alt="Second slide" />
        </Carousel.Item>
      </Carousel>
      {/* <div className="undefinedFlex1">
   
        {product.products.map((product) => (
          <div className="caContainer">
            <Link
              className="caImgContainer"
              to={`/${product.slug}/${product._id}/p`}
            >
              <img src={generatePublicUrl(product.productPictures[0])} />
            </Link>
            <div>
              <div className="caProductName">{product.name}</div>
              <div className="caProductPrice">
                <BiRupee />
                {product.price}
              </div>
            </div>
          </div>
        ))}
    
    </div> */}

      <br />

      <FilterSortingBar
        setFilterReveal={setFilterReveal}
        filterRevealState={filterRevealState}
      />
      <div className="ProductsContainer">
        <div style={{ overflow: "hidden" }}>
          <div className="filterSection">
            <div style={{ display: "flex", width: "40%" }}>
              <FilterBar
                filter={filter}
                filterState={filterState}
                setFilter={setFilter}
              />
              <Filter
                products={product}
                filter={filter}
                filterState={filterState}
                setFilter={setFilter}
              />
            </div>
            <div className="productSection">
              <div className="undefinedFlex1 kidhidden">
                <FilterComp product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* <SortingMobile /> */}
      </div>

      {/* <section className="undefinedMidBanner">
 
<div className="kid-mid-banner">
<div className="kidMidImg">
            <img src={midBanner} alt="" />
           </div>
          <div className="kidMidText">
             <h5>Keep your lil ones safe</h5>
             <p className="kidMidText-p">Kids Masks</p>
             <h3>Upto <span style={{color:'#466886'}}>30%</span>  off</h3>
             <button>Shop Now</button>
          </div>
         
        </div> */}
      {/* <div className="ml-po">
          <div className="ml-sub-main">
          <div className="ml-sub">
          <img src={item1} alt="" />
          <h5>Starting at 458</h5>
          </div>
          <div className="ml-sub">
          <img src={item1} alt="" />
          <h5>Starting at 358</h5>
          </div>
          <div className="ml-sub">
          <img src={item1} alt="" />
          <h5>Starting at 258</h5>
          </div>
          </div>
        </div>
      */}
      {/* </section> */}

      <section>
        <Container>
          <div className="kid-last-container">
            <div className="upperFlex">
              <div className="kidNewContainer">
                <div className="kidLastImg kid1">
                  <img src={kid1} alt="" />
                </div>
                <div className="kidLastImg kid2">
                  <img src={kid2} alt="" />
                </div>
              </div>
              <div className="kidNewTextContainer">
                <h2>Topwear</h2>
                <p>More Cuddly In These Cute Topwear</p>
                <button>SHOP NOW</button>
              </div>
            </div>
            <div className="kidNewRightside">
              <div className="rightCard">
                <img src={kid3} alt="" />
                <p>Rompers</p>
              </div>
              <div className="rightCard">
                <img src={kid4} alt="" />
                <p>Rompers</p>
              </div>
            </div>
            <div className="kidNewRightside">
              <div className="rightCard">
                <img src={kid5} alt="" />
                <p>Rompers</p>
              </div>
              <div className="rightCard">
                <img src={kid6} alt="" />
                <p>Rompers</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* <section>
      <div className="card">
      <div className="undefinedFlex1">
   
   {product.products.map((product) => (
     <div className="caContainer">
       <Link
         className="caImgContainer"
         to={`/${product.slug}/${product._id}/p`}
       >
         <img src={generatePublicUrl(product.productPictures[0])} />
       </Link>
       <div>
         <div className="caProductName">{product.name}</div>
         <div className="caProductPrice">
           <BiRupee />
           {product.price}
         </div>
       </div>
     </div>
   ))}
</div>
      </div>
      </section> */}
    </>
  );
};

export default ClothingAndAccessories;
