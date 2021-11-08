/** @format */

import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { sortingProducts } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const FilterSortingBar = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const viewSorting = ["Price: High to Low", "Price: Low to High"];
  const [stateSort, setSort] = useState("recommended");
  const [sorted, setSorted] = useState();

  useEffect(() => {
    dispatch(sortingProducts(sorted, product));
  }, [sorted]);
  const hamburger = (
    <GiHamburgerMenu
      style={{ fontSize: "2rem", cursor: "pointer", marginRight: "1rem" }}
    />
  );

  return (
    <div className="sortingFiltering show-md z-10">
      <div className="sortingSec">
        {hamburger} <h4 style={{ margin: "0" }}>Filter</h4>
      </div>

      <div
        onMouseEnter={() => showSortingList(1)}
        onMouseLeave={() => showSortingList(0)}
        style={{ position: "relative", border: "1px solid #ddd" }}
        id="viewSorting">
        <button id="sortByBtn">
          Sort By: {stateSort}
          <span className="downArrow">
            <i className="fas fa-chevron-down"></i>
          </span>
        </button>

        <div className="optionList" id="sortByList">
          <ul>
            {viewSorting.map((e, index) => {
              return (
                <li
                  onClick={() => {
                    setSorted(e);
                    showSortingList(0);
                    setSort(e.charAt(0) + e.slice(1));
                  }}
                  key={index}>
                  {e}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* <select name="Category" id="viewSorting">
        <option value="Sort by:">Sort by: Recommended</option>
          <option value="lowHigh"></option>
          <option value="highLow">Popularity</option>
          <option value="newFeature">Better Discount</option>
          <option value="mostPopular">Price: High to Low</option>
          <option value="mostPopular">Price: Low to High</option>
          <option value="mostPopular">Customer Rating</option>
        </select> */}
    </div>
  );
};

function showSortingList(value) {
  const sortingList = document.querySelector("#sortByList");
  value
    ? sortingList.classList.add("active")
    : sortingList.classList.remove("active");
}

export default FilterSortingBar;
