import axios from 'axios';
import { useEffect, useState } from 'react'
import RecipeCardPreview from '../../components/RecipeCardPreview/RecipeCardPreview';
import { SimpleGrid } from '@mantine/core';
import Searchbar from '../../components/Searchbar/Searchbar';

function FavouriteRecipes() {
 const [favouriteRecipes, setFavouriteRecipes] = useState([]);
 const [search, setSearch] = useState("");
 const [isLoading, setIsLoading] = useState(true);
 const storedToken = localStorage.getItem("authToken");

 const fetchFavouriteRecipes = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipes/favourites/all`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    //console.log(response.data);
    setFavouriteRecipes(response.data);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchFavouriteRecipes();
}, []);


  return (
    <div style={{ marginTop: "50px" ,paddingTop: "50px" , display: "flex", flexDirection: "column", alignItems: "center"}}>
      {isLoading ? <p>Loading...</p> :
       (<>
       <Searchbar search={search} setSearch={setSearch} />
        <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 2, xl: 3, xxl: 4 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {favouriteRecipes
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
      </>)}
    </div>
  )
}

export default FavouriteRecipes