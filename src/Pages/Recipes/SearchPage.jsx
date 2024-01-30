import React, { useState } from "react";
import AllRecipes from "./AllRecipes";
import Searchbar from "../../components/Searchbar/Searchbar";

function SearchPage() {
  const [search , setSearch] = useState('')
  
  
  return (
    <>
      <Searchbar search={search} setSearch={setSearch}/>
    </>
  );
}

export default SearchPage;
