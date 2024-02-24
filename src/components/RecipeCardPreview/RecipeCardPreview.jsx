/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IconHeart  , IconHeartFilled , IconChefHat} from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon, Stack } from '@mantine/core';
import classes from './RecipeCardPreview.module.css';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/auth.context";
import axios from 'axios';


export default function RecipeCardPreview({recipe}) {
  const { _id , image , name , description , ingredients , instructions , category , createdBy} = recipe
  const { isLoggedIn, user , setUser, logOutUser } = useContext(AuthContext); 
  const storedToken = localStorage.getItem("authToken");
  const [isFavourite, setIsFavourite] = useState(false);


  useEffect(() => {
    if (user?.favourites.length > 0){
    if (user?.favourites.includes(_id)) {
      setIsFavourite(true);
    }}
  },[user])

  const tags = category?.cuisines.concat(category?.mealTypes).map((tag) => (
    <Badge variant="light" key={tag} leftSection={`🤽`} >
      {tag}
    </Badge>
  ));

const addRecipeToFavourites = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipes/${_id}/save`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    console.log(response.data);
    const favourites = response.data.favourites
    setUser(previousUser => ({ ...previousUser, favourites })) /*...prevData, { favourites: favourites } */
    console.log (user)
    setIsFavourite(true)
  } catch (error) {
    console.log(error)
    ;
  }
}

const removeRecipeFromFavourites = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipes/${_id}/remove`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    console.log(response.data);
    const favourites = response.data.favourites
    setUser(previousUser => ({ ...previousUser, favourites }))
    console.log (user)
    setIsFavourite(false)
  } catch (error) {
    console.log(error);
  }
}

function renderActionIcon(createdBy, user, isFavourite) {
  if (createdBy.username !== user.username && !isFavourite ) {
    return (
      <ActionIcon variant="default" radius="md" size={36} onClick={addRecipeToFavourites}>
        <IconHeart className={classes.like} stroke={1.5} />
      </ActionIcon>
    );
  } else if (createdBy.username !== user.username && isFavourite ) {
    return (
      <ActionIcon variant="filled" radius="md" size={36} onClick={removeRecipeFromFavourites}>
        <IconHeartFilled className={classes.like} stroke={1.5} />
      </ActionIcon>
    );
  }
}


  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Link to={`./${_id}`}>
          <Image src={image} alt={name} className={classes.image} />
        </Link>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Stack justify="apart">
          <Badge
            variant="gradient"
            gradient={{ from: "grape", to: "violet", deg: 90 }}
            leftSection={<IconChefHat size={16} />}
          >
            <Link to={`/profile/${createdBy.username}`}>
              {createdBy.username}
            </Link>
          </Badge>

          <Text fz="lg" fw={500}>
            {name}
          </Text>
        </Stack>
        <Text fz="sm" mt="xl">
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          TAGS
        </Text>
        <Group gap={7} mt={5}>
          {tags}
        </Group>
      </Card.Section>

      <Group mt="xs">
        
        <Button radius="md" style={{ flex: 1 }}>
         <Link to={`./${_id}`}>Recipe details</Link>
        </Button>
        {/* <Button
        radius="md" style={{ flex: 1 }}
      component='a'
      href={`./recipes/${_id}`}
      onClick={(event) => event.preventDefault()}
           
    >
      Recipe details
    </Button> */}
        {renderActionIcon(createdBy, user, isFavourite)}
      </Group>
    </Card>
  );
}
