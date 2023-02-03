import React, { useEffect, useState } from "react";
import axios from "axios";
import AddFoodModal from "../components/AddFoodModal";
import {
    AiOutlineSearch,
    AiOutlinePlus,
    AiFillDelete,
    AiFillEdit,
  } from "react-icons/ai";

function Home() {
    const [foods, setFoods] = useState([]);
    const [selectedFood, setSelectedFood] =  useState(null);
    const [search, setSearch] = useState("");
    const [isModal, setIsModal] = useState(false);
    const [isEditting, setIsEditting] = useState(false);
  
    const getFoods = async () => {
      const token = localStorage.getItem("token");
      try {
        const {data} = await axios.get("http://localhost:8082/food/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        //console.log(data.orders)
        setFoods(data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    const deleteFood = async (id) => {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`http://localhost:8082/food/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFoods(foods?.filter((food) => food._id !== id));
      } catch (error) {
        console.log(error);
      }
    };
  
    const searchFood = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(
          `http://localhost:8082/food/${search}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFoods(data.food);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (!search) getFoods();
    }, [search]);
  
    const editFood = (food) => {
      setSelectedFood(food);
      setIsEditting(true);
      setIsModal(true);
    };
  
    if (search && foods.length === 0) {
      return <h1>results not found {search}</h1>;
    }
  
    return (
      <>
        {/* <div className="search">
          <input
            type="text"
            placeholder="Search for book"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="searchIcon">
            <AiOutlineSearch />
          </span>
          <button className="searchBtn" onClick={searchBook}>
            Search
          </button>
        </div> */}
        <div className="addFood">
          <button className="addFoodBtn" onClick={() => setIsModal(true)}>
            <AiOutlinePlus /> place an order
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th className="foodname">food name</th>
              <th className="foodquantity">food quantity</th>
              <th className="proteintype">protein Type</th>
              <th className="packagetype">package Type</th>
            </tr>
          </thead>
          <tbody>
            {foods?.map((food) => {
              return (
                <tr key={food._id}>
                  <td className="foodname">{food.foodName}</td>
                  <td className="foodquantity">{food.foodQuantity}</td>
                  <td className="proteintype">{food.proteinType}</td>
                  <td className="lpackagetype">{food.packageType}</td>
                  <td>
                    <AiFillDelete
                      onClick={() => deleteFood(food._id)}
                      style={{ cursor: "pointer", width: "1.5rem" }}
                    />
                    <AiFillEdit
                      onClick={() => editFood(food)}
                      style={{ cursor: "pointer", width: "1.5rem" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isModal && (
          <AddFoodModal
            setIsModal={setIsModal}
            getFoods={getFoods}
            isEditting={isEditting}
            selectedFood={selectedFood}
            setSelectedFood={setSelectedFood}
          />
        )}
      </>
    );
  }
  
  export default Home;