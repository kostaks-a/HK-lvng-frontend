/* eslint-disable no-unused-vars */
import { Button } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DetailedRecipeCard from "../../components/DetailedRecipeCard/DetailedRecipeCard";
import { AuthContext } from "../../context/auth.context";

function RecipeDetails() {
  const [recipe, setRecipe] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipes/${id}`);
      //console.log(response.data);
      setRecipe(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);


  const deleteRecipe = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipes/${id}/delete`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      console.log(response.data);
      navigate("/dashboard/recipes");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (<DetailedRecipeCard recipe={recipe}  deleteRecipe={deleteRecipe} storedToken={storedToken} />)}
    </div>
  );
}

export default RecipeDetails;
