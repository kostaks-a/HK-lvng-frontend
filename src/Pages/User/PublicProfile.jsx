/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        `http://localhost:5005/user/profile/${profileUsername}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchFavouriteRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/recipes/favourites/all`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      console.log(response.data);
      setFavouriteRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCreatedRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/recipes/creations/all`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      console.log(response.data);
      setCreatedRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //fetchFavouriteRecipes();
    //fetchCreatedRecipes();
    fetchProfile();
    setIsLoading(false);
  }, []);





  return <div>Profile</div>;
}

export default PublicProfile;
