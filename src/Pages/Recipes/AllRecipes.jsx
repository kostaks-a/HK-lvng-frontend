/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, SimpleGrid } from "@mantine/core";
import { Link, Route, Routes } from "react-router-dom";
import RecipeCardPreview from "../../components/RecipeCardPreview/RecipeCardPreview";
import Searchbar from "../../components/Searchbar/Searchbar";
import SearchPage from "./SearchPage";

function AllRecipes({
  toggleSearchBar,
  searchBarVisible,
  setSearchBarVisible,
}) {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const storedToken = localStorage.getItem("authToken");

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5005/recipes/all", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      //console.log(response.data);
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // useEffect(() => {
  //   console.log(search);
  // }, [search]);

  return (
    <>
      <h1>All Recipes</h1>
      {/* <Routes>
       <Route path="dashboard/search-recipes" element={<Searchbar />} />       
     </Routes> */}
      {searchBarVisible && <Searchbar search={search} setSearch={setSearch} />}
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
          .map((recipe) => (
            <RecipeCardPreview key={recipe._id} recipe={recipe} />
          ))}
      </SimpleGrid>
    </>
  );
}

export default AllRecipes;
