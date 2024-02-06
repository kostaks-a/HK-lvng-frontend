/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// RecipeCard.jsx
import { useContext, useState } from 'react';
import styles from './Card.module.css';
import { Card, Title, Text, Button, CheckIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import { AuthContext } from '../../context/auth.context';

const RecipeCard = ({recipe , deleteRecipe , storedToken}) => {
  const { _id, name, description, ingredients, instructions, image, category , createdBy} = recipe;
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const { user } = useContext(AuthContext);


  const handleIngredientToggle = (ingredient) => {
    if (checkedIngredients.includes(ingredient)) {
      setCheckedIngredients(checkedIngredients.filter((item) => item !== ingredient));
    } else {
      setCheckedIngredients([...checkedIngredients, ingredient]);
    }
  };

  return (
    <Card className={styles.recipe}>
      <Card.Section>
        <div>
          <img src={image} className={styles.recipe__img} alt="Hearty Keto Hot Chocolate" />
        </div>

        <header className={styles.recipe__header}>
          <div className={styles.recipe__title}>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>

          <div className={styles.recipe__times}>
            <div className={styles.heading}>Prep Time: 5 min</div>
            <div className={styles.heading}>Cook Time: 10 min</div>
            <div className={`${styles.heading} ${styles.bold}`}>Total Time: 15 min</div>
          </div>

          <div className={styles.recipe__share}>
            <Button size="sm" variant="info">
              <span className="fas fa-fw fa-print" />
              Print
            </Button>
            <Button size="sm">
              <span className="fas fa-fw fa-share" />
              Share
            </Button>
            {(user._id === createdBy) && (<>
                <Button component={Link} to={`./edit`}><span className="fa-solid fa-pen-to-square"/><span>edit recipe</span></Button>
                <Button onClick={() => deleteRecipe(_id)} ><span className="fa-solid fa-trash-can"/><span>delete recipe</span></Button> 
            </>)
             
            }
          </div>
        </header>

        <div className={styles.recipe__content}>
          <div className={styles.recipe__ingredients}>
            <h2 className="is-size-4">Ingredients:</h2>
            <ul className={styles.recipe__ingredients__list}>
            {ingredients.map((ingredient, index) => (
              <li key={ingredient.name}>
                <label>
                  <input type="checkbox" onChange={() => handleIngredientToggle('butter, unsalted')} />
                  <span>{ingredient.quantity} {ingredient.measurement} of {ingredient.name}</span>
                  {/* <span className={styles.optional}>, (optional)</span> */}
                </label>
              </li>
            ))}
            </ul>
          </div>

          <div className={styles.recipe__directions}>
            <h2 className="is-size-4">Directions:</h2>
            <ol>
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
            </ol>
          </div>
          {/* <footer className={`${styles.notification} ${styles.italic}`}>
            <h2 className="is-size-6">Notes:</h2>
            <p>Do not add cocoa powder until the milk is completely heated to avoid large, unbreakable clumps from forming.</p>
          </footer> */}
        </div>
      </Card.Section>
    </Card>
  );
};

export default RecipeCard;
