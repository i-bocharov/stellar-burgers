import { FC } from 'react';
import { Preloader } from '@ui/preloader';
import { IngredientDetailsUI } from '@ui/ingredient-details';
import { useAppSelector } from '@hooks';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '@selectors/ingredients-product';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const items = useAppSelector(selectIngredients);

  const ingredientData = items.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
