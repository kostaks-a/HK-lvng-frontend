/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IconHeart } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from './RecipeCardPreview.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../context/auth.context";


export default function RecipeCardPreview({recipe}) {
  const { _id , image , name , description , ingredients , instructions , category , createdBy} = recipe
  const { isLoggedIn, user , logOutUser } = useContext(AuthContext); 

  //console.log(recipe)

  const tags = category?.cuisines.concat(category?.mealTypes).map((tag) => (
    <Badge variant="light" key={tag} leftSection={`🤽`} >
      {tag}
    </Badge>
  ));
  //console.log (tags)


  // function getFlagEmoji(countryCode) {
  //   return countryCode.toUpperCase().replace(/./g, char => 
  //       String.fromCodePoint(127397 + char.charCodeAt())
  //   );
  // }
  
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Link  to={`./${_id}`}>
        <Image src={image} alt={name} className={classes.image} />
        </Link>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {name}
          </Text>
          <Badge size="sm" variant="light">
            {createdBy.username}
          </Badge>
        </Group>
        <Text fz="sm" mt="xs">
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
        <Link  to={`./${_id}`}>
          Recipe details
        </Link>
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
