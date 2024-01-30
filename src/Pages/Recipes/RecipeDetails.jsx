/* eslint-disable no-unused-vars */
import { Button } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

function RecipeDetails() {
  const [recipe, setRecipe] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/recipes/${id}`);
      console.log(response.data);
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
      const response = await axios.get(`http://localhost:5005/recipes/${id}/delete`, {
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
      ) : (<RecipeCard recipe={recipe}  deleteRecipe={deleteRecipe} storedToken={storedToken} />)}
      {/* <h1>{recipe.name}</h1>
          <Button component={Link} to={`/recipes/${id}/edit`}>update recipe</Button>
          <Button onClick={() => deleteRecipe(id)} >delete recipe</Button> */}
    </div>
  );
}

export default RecipeDetails;
