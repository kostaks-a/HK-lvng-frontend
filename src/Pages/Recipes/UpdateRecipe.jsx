/* eslint-disable no-unused-vars */
import { Button, NumberInput, TextInput } from "@mantine/core";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function UpdateRecipe() {
  const [recipeData, setRecipeData] = useState({
    name: "",
    image: "",
    description: "",
    ingredients: [],
    instructions: [],
    createdBy: "",
    category: {
      cuisines: [],
      mealTypes: [],
    },
  });

const navigate = useNavigate()

const { id } = useParams()

const form = useForm({
  initialValues: recipeData,
  validate: {
    name: isNotEmpty("Name is required"),
    image: isNotEmpty("Image is required"),
    description: isNotEmpty("Description is required"),
    ingredients: isNotEmpty("At least one ingredient is required"),
    instructions: isNotEmpty("At least one instruction is required"),
    category: isNotEmpty("At least one category is required"),
  },
});

const apiRequest = async () => {
  const response = await axios.get(`http://localhost:5005/recipes/${id}`)
  console.log(response.data)
  // form.initialize(response.data)
  setRecipeData(response.data)
}


useEffect(() => {
  apiRequest()
},[])

// const updateRecipe = async () => {

//     console.log(form.values)
//     const response = await axios.put(`http://localhost:5005/recipes/${id}/edit`, form.values ,{
//       headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
//     })
//     console.log(response.data)
//     navigate("/recipes")
// }

const [newIngredient, setNewIngredient] = useState({
  name: "",
  quantity: "",

});

const [customUnit, setCustomUnit] = useState("");

const [newInstruction, setNewInstruction] = useState("");
const [instructionCounter, setInstructionCounter] = useState(1);

const categories = {
  cuisines: ["Italian", "Mexican", "Indian", "Chinese", "Thai", "Greek" , "International" , "Mediterranean" , "British" , "American", "French", "Japanese"],
  mealTypes: ["Breakfast", "Lunch", "Dinner", "Snack", "Appetizer", "Dessert", "Main Dish" , "Stew", "Wrap","Bowl" , "Curry"],
};

// const measurementUnits = [
//   "gr",
//   "kg",
//   "ml",
//   "ltr",
//   "cup",
//   "tsp",
//   "tbsp",
//   "pinch",
//   "handful",
//   "piece",
//   "whole"
// ];

const storedToken = localStorage.getItem("authToken");

const handleCheckboxChange = (categoryKey, option) => {
  const isChecked = recipeData.category[categoryKey].includes(option);
  let updatedCategory = [...recipeData.category[categoryKey]];

  if (isChecked) {
    updatedCategory = updatedCategory.filter((item) => item !== option);
  } else {
    updatedCategory.push(option);
  }

  setRecipeData({
    ...recipeData,
    category: {
      ...recipeData.category,
      [categoryKey]: updatedCategory,
    },
  });
};

const handleNewIngredientChange = (e) => {
  const { name, value } = e.target;
  setNewIngredient({ ...newIngredient, [name]: value })
  // if (name === "unit" && value === "manualUnit") {
  //   setNewIngredient({ ...newIngredient, unit: value , isManualUnit: true });
  // } else {
  //   setNewIngredient({ ...newIngredient, [name]: value });
  // }
};

// const handleCustomUnitChange = (e) => {
//   const { name , value} = e.target
//   setCustomUnit(value);
//   setNewIngredient({ ...newIngredient, unit: value });
// };

const handleNewIngredientSubmit = () => {
  const updatedIngredients = [...recipeData.ingredients, newIngredient];
  setRecipeData({ ...recipeData, ingredients: updatedIngredients });
  setNewIngredient({ name: "", quantity: ""});
  console.log (newIngredient)
  // if (newIngredient.unit === "manualUnit") {
  //   setNewIngredient({ name: "", quantity: 0, unit: "gram", isManualUnit: true });
  // }else {
  //   setNewIngredient({ name: "", quantity: 0, unit: "gram", isManualUnit: false });
  // }    
  // setCustomUnit("");
};

const handleNewInstructionChange = (e) => {
  setNewInstruction(e.target.value);
};

const handleNewInstructionSubmit = () => {
  const updatedInstructions = [...recipeData.instructions, newInstruction];
  setRecipeData({ ...recipeData, instructions: updatedInstructions });
  setNewInstruction("");
  setInstructionCounter(instructionCounter + 1);
};

const handleIngredientDelete = (index) => {
  console.log(index)
  const updatedIngredients = recipeData.ingredients.filter((_, ingredientIndex) => ingredientIndex !== index);
  setRecipeData({ ...recipeData, ingredients: updatedIngredients });
};

const handleInstructionDelete = (index) => {
  console.log(index)
  const updatedInstructions = recipeData.instructions.filter((_, instructionIndex) => instructionIndex !== index);
  setRecipeData({ ...recipeData, instructions: updatedInstructions });
  setInstructionCounter(instructionCounter - 1);
};




const handleChange = (e) => {
  setRecipeData({
    ...recipeData,
    [e.target.name]: e.target.value,
  });
};


const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("file", e.target.image.files[0]);
  formData.append("recipeData", JSON.stringify(recipeData));
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/recipes/${id}/edit` , formData, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    console.log(response.data);
    navigate("/dashboard/recipes");
  } catch (error) {
    console.log(error);
  }
};

return (
  <div>
    <h1>Update Recipe</h1>
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "fit-content",
      }}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={recipeData.name}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={recipeData.description}
        onChange={handleChange}
      />
      <label htmlFor="image">Image</label>
      <input type="file" name="image" id="image" accept=".jpg, .jpeg, .png" />

      {/* Ingredients */}
      <div>
        <h3>Ingredients</h3>
        <ul>
          {recipeData.ingredients.map((ingredient, index) => (
            <li key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  width: "fit-content",
                }}
              >
                <span>{`${ingredient.quantity} ${ingredient.name}`}</span>
                <button
                  type="button"
                  onClick={() => handleIngredientDelete(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Ingredient input form */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "fit-content",
          }}
        >
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={newIngredient.quantity}
            onChange={handleNewIngredientChange}
            placeholder="Quantity"
          />
          <label htmlFor="ingredient">Ingredient:</label>
          <input
            type="text"
            name="name"
            value={newIngredient.name}
            onChange={handleNewIngredientChange}
            placeholder="Ingredient"
          />
          {/* <label htmlFor="unit">Unit:</label>
        <select name="unit" defaultValue={newIngredient.unit} onChange={handleNewIngredientChange} >
          {measurementUnits.map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
          <option value="manualUnit">Manual Unit</option>
        </select>
        {newIngredient.isManualUnit && (
          <input
            type="text"
            name="unit"
            value={customUnit}
            onChange={handleCustomUnitChange}
            placeholder="Custom Unit"
          />
        )} */}
          <button type="button" onClick={handleNewIngredientSubmit}>
            Add Ingredient
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div>
        <h3>Instructions</h3>
        <ol style={{display: "flex", flexDirection: "column", gap: "5px"}}>
          {recipeData.instructions.map((instruction, index) => (
            <li key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  width: "fit-content",
                }}
              >
                <span>{instruction}</span>
                <button
                  type="button"
                  onClick={() => handleInstructionDelete(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>

        {/* Instruction input form */}
        <div>
          <input
            type="text"
            value={newInstruction}
            onChange={handleNewInstructionChange}
            placeholder="New Instruction"
          />
          <button type="button" onClick={handleNewInstructionSubmit}>
            Add Instruction
          </button>
        </div>
      </div>

      {/* Categories */}

      <fieldset>
        <legend>Cuisines</legend>
        {categories.cuisines.map((cuisine) => (
          <div key={cuisine}>
            <input
              type="checkbox"
              id={cuisine.toLowerCase()}
              name={cuisine.toLowerCase()}
              checked={recipeData.category.cuisines.includes(cuisine)}
              onChange={() => handleCheckboxChange("cuisines", cuisine)}
            />
            <label htmlFor={cuisine.toLowerCase()}>{cuisine}</label>
          </div>
        ))}
      </fieldset>

      <fieldset>
        <legend>Meal Types</legend>
        {categories.mealTypes.map((mealType) => (
          <div key={mealType}>
            <input
              type="checkbox"
              id={mealType.toLowerCase()}
              name={mealType.toLowerCase()}
              checked={recipeData.category.mealTypes.includes(mealType)}
              onChange={() => handleCheckboxChange("mealTypes", mealType)}
            />
            <label htmlFor={mealType.toLowerCase()}>{mealType}</label>
          </div>
        ))}
      </fieldset>

      <button type="submit">Update Recipe</button>
    </form>
  </div>
);
}

export default UpdateRecipe;