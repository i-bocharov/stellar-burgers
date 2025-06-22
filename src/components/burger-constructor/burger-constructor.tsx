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
import {
  clearConstructor,
  moveIngredient,
  removeIngredient
} from '@slices/constructor-product';
import { selectUser } from '@selectors/user';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const bun = useAppSelector(selectConstructorBun);
  const ingredients = useAppSelector(selectConstructorIngredients);
  const orderRequest = useAppSelector(selectOrderRequest);
  const orderModalData = useAppSelector(selectOrderModalData);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  const constructorItems = { bun, ingredients };
  const disabled = !bun || orderRequest;

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientIds)).then(() => {
      dispatch(clearConstructor());
    });
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      dispatch(moveIngredient({ from: index, to: index - 1 }));
    }
  };

  const handleMoveDown = (index: number) => {
    if (
      constructorItems.ingredients &&
      index < constructorItems.ingredients.length - 1
    ) {
      dispatch(moveIngredient({ from: index, to: index + 1 }));
    }
  };

  const handleRemoveIngredient = (id: string) => {
    dispatch(removeIngredient(id));
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
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
      handleClose={handleRemoveIngredient}
      disabled={disabled}
    />
  );
};
