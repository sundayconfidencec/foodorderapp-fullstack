import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

function AddFoodModal({
  setIsModal,
  getFoods,
  isEditting,
  selectedFood,
  setSelectedFood,
}) {
  const [foodName, setFoodName] = useState("");
  const [foodQuantity, setFoodQuantity] = useState("");
  const [proteinType, setProteinType] = useState("");
  const [packageType, setPackageType] = useState("");

  const addFood = async (e) => {
    const token = localStorage.getItem("token");
    if (isEditting) {
      e.preventDefault();
      //const token = localStorage.getItem("token");
      try {
        await axios.put(
          `http://localhost:8082/food/${selectedFood._id}`,
          {
            foodName:foodName,
            foodQuantity:foodQuantity,
            proteinType:proteinType,
            packageType:packageType
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFoodName("");
        setFoodQuantity("");
        setProteinType("");
        setPackageType("");
        setIsModal(false);
        setSelectedFood(null);
        getFoods();
      } catch (error) {
        console.log(error);
      }
    } else {
      e.preventDefault();
      try {
        await axios.post(
          "http://localhost:8082/food/",
          {
            foodName:foodName,
            foodQuantity:foodQuantity,
            proteinType:proteinType,
            packageType:packageType
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFoodName("");
        setFoodQuantity("");
        setProteinType("");
        setPackageType("");
        setIsModal(false);
        setSelectedFood(null);
        getFoods();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isEditting) {
      setFoodName(selectedFood.foodName);
      setFoodQuantity(selectedFood.foodQuantity);
      setProteinType(selectedFood.proteinType);
      setPackageType(selectedFood.packageType);
    }
    console.log(selectedFood);
  }, [isEditting, selectedFood]);

  return (
    <section className="modal">
      <div className="addFoodModal">
        <span onClick={() => setIsModal(false)} className="closeBtn">
          <AiOutlineCloseCircle />
        </span>
        <form className="addFoodForm">
          <h3>place order</h3>
          <input
            type="text"
            placeholder="foodname"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
          <input
            type="text"
            placeholder="foodquantity"
            value={foodQuantity}
            onChange={(e) => setFoodQuantity(e.target.value)}
          />
            <input
              type="text"
              placeholder="proteintype"
              value={proteinType}
              onChange={(e) => setProteinType(e.target.value)}
            />
          <input
            type="text"
            placeholder="packageType"
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
          />
        
          <button type="submit" onClick={addFood}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddFoodModal;
