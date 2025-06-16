import { FC, useMemo } from 'react';
import { TConstructorIngredient } from 'types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '@hooks';
import { createOrder } from '@thunks/orders';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const bun = useAppSelector((state) => state.constructorProduct.bun);
  const ingredients = useAppSelector(
    (state) => state.constructorProduct.ingredients
  );
  const orderRequest = useAppSelector((state) => state.orders.orderRequest);
  const orderModalData = useAppSelector((state) => state.orders.orderModalData);

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

  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
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
