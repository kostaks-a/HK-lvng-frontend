/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { AppShell } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllRecipes from "./Recipes/AllRecipes";
import classes from '../styles/Dashboard.module.css';
import RecipeDetails from "./Recipes/RecipeDetails";
import UpdateRecipe from "./Recipes/UpdateRecipe";
import CreateRecipe from "./Recipes/CreateRecipe";
import Searchbar from "../components/Searchbar/Searchbar";
import SearchPage from "./Recipes/SearchPage";
import { useEffect, useState } from "react";

function Dashboard() {
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSearchBar = () => {
    setSearchBarVisible(prevState => !prevState)
  }

  useEffect(() => {
    if (searchBarVisible) {
      navigate('/dashboard/recipes');
    }
  }, [searchBarVisible]);


  return (
    <div className={classes.dashboard}>
      <Navbar className={classes.navbar}  toggleSearchBar={toggleSearchBar}/>
      <div className={classes.container}>
          <Routes>
            <Route path="/recipes" element= {<AllRecipes searchBarVisible={searchBarVisible} setSearchBarVisible={setSearchBarVisible}/>} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/recipes/create" element={<CreateRecipe />} />
            <Route path="/recipes/:id/edit" element={<UpdateRecipe />} />
            {/* <Route path="/search-recipes/*" element={<SearchPage />} />   */}
          </Routes>
      </div>
      {/* <div>
        <AppShell
          padding="md"
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
         
        </AppShell>
      </div> */}
    </div>
  );
}

export default Dashboard;
