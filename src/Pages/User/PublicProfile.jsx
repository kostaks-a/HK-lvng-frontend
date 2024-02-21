/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel } from '@mantine/carousel';
import RecipeCardPreview from "../../components/RecipeCardPreview/RecipeCardPreview";
import { Image } from "@mantine/core";

function PublicProfile() {
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const storedToken = localStorage.getItem("authToken");

  const profileUsername = useParams().username;
  console.log (profileUsername);



  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/profile/${profileUsername}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      console.log(response.data.creations);
      setFavouriteRecipes(response.data.favourites);
      setCreatedRecipes(response.data.creations);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProfile();
    console.log(favouriteRecipes)
    console.log(createdRecipes)
  }, []);



  return (
    <div style={{margin:"30px", padding: '5px' }}>
      <h1>{profileUsername}</h1>
      {isLoading ? <p>Loading...</p> : (
      <div style={{marginLeft: '10px' , marginRight: '10px'}}>
      <h2>Favourites:</h2>
      <Carousel  autosize="true" slideSize="34%" loop dragFree slideGap="md">
     {favouriteRecipes.map(recipe => 
      <Carousel.Slide key={recipe._id}>
        <h3>{recipe.name}</h3>
        <Link to={`/recipes/${recipe._id}`}>
          <Image src={recipe.image} />
        </Link>          
        </Carousel.Slide>
      )} 
      </Carousel>

      <h2>Creations:</h2>
      <Carousel  autosize="true" slideSize="34%" loop dragFree slideGap="md">
      {createdRecipes.map(recipe =>
        <Carousel.Slide key={recipe._id}>
        <h3>{recipe.name}</h3>
        <Link to={`/recipes/${recipe._id}`}>
          <Image src={recipe.image} />
        </Link>          
        </Carousel.Slide>
      )}
      </Carousel>
      </div>)}
          
    </div>
  );
}

export default PublicProfile;
