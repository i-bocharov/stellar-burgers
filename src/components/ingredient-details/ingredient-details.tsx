import { FC } from 'react';
import { Preloader } from '@ui/preloader';
import { IngredientDetailsUI } from '@ui/ingredient-details';
import { useAppSelector } from '@hooks';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const items = useAppSelector((state) => state.ingredientsProduct.items);

  const ingredientData = items.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
