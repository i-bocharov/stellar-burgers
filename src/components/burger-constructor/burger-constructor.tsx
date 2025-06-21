import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from 'types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '@hooks';
import { createOrder } from '@thunks/orders';
import { clearOrderModalData } from '@slices/orders';
import {
  selectConstructorBun,
  selectConstructorIngredients
} from '@selectors/constructor-product';
import { selectOrderModalData, selectOrderRequest } from '@selectors/orders';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const bun = useAppSelector(selectConstructorBun);
  const ingredients = useAppSelector(selectConstructorIngredients);
  const orderRequest = useAppSelector(selectOrderRequest);
  const orderModalData = useAppSelector(selectOrderModalData);

  const constructorItems = { bun, ingredients };

  const disabled = !bun || orderRequest;

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      disabled={disabled}
    />
  );
};
