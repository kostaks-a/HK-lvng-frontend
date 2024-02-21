/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Grid, SimpleGrid } from "@mantine/core";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import RecipeCardPreview from "../../components/RecipeCardPreview/RecipeCardPreview";
import Searchbar from "../../components/Searchbar/Searchbar";
import SearchPage from "./SearchPage";
import { AuthContext } from "../../context/auth.context";

function AllRecipes({
  toggleSearchBar,
  searchBarVisible,
  setSearchBarVisible,
}) {

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const storedToken = localStorage.getItem("authToken");
  const location = useLocation();

  const { user } = useContext(AuthContext);
  //console.log (user)


  const fetchPersonalRecipes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipes/personal`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipes/all`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      //console.log(response.data);
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.pathname === "/dashboard/recipes") {
      fetchPersonalRecipes()
    }else {
      fetchRecipes();
    }
  }, []);


  return (
    <div style={{ marginTop: "50px" ,paddingTop: "50px" , display: "flex", flexDirection: "column", alignItems: "center"}}>
      {(searchBarVisible || location.pathname === "/recipes") && <Searchbar search={search} setSearch={setSearch} />}
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 2, xl: 3, xxl: 4 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {recipes
          .filter((recipe) => {
            const values = Object.values(recipe);
            const flattenedValues = values.flatMap((val) => {
              if (typeof val === "object" && val !== null) {
                return Object.values(val);
              }
              return val;
            });
            return flattenedValues.some((value) =>
              String(value).toLowerCase().includes(search.toLowerCase())
            );
          })
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((recipe) => (
            <RecipeCardPreview key={recipe._id} recipe={recipe} />
          ))}
      </SimpleGrid>
    </div>
  );
}

export default AllRecipes;
