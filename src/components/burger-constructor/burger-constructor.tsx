import { FC, useMemo } from 'react';
import { TConstructorIngredient } from 'types';
import { BurgerConstructorUI } from '@ui';
import { useAppSelector } from '@hooks';

export const BurgerConstructor: FC = () => {
  const bun = useAppSelector((state) => state.constructorProduct.bun);
  const ingredients = useAppSelector(
    (state) => state.constructorProduct.ingredients
  );
  const orderRequest = useAppSelector((state) => state.orders.loading);
  // const orderModalData = useAppSelector((state) => state.orders.orderModalData);

  const constructorItems = { bun, ingredients };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
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
      // orderModalData={orderModalData}
      orderModalData={null}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
