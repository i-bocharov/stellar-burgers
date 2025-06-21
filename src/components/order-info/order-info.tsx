import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '@ui/preloader';
import { OrderInfoUI } from '@ui/order-info';
import { TIngredient } from 'types';
import { useAppDispatch, useAppSelector } from '@hooks';
import { useParams } from 'react-router-dom';
import { getOrderByNumber } from '@thunks/orders';
import { selectOrderModalData } from '@selectors/orders';
import { selectIngredients } from '@selectors/ingredients-product';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useAppDispatch();

  // Загружаем заказ по номеру при открытии модалки
  useEffect(() => {
    if (number) {
      dispatch(getOrderByNumber(number));
    }
  }, [dispatch, number]);

  const orderData = useAppSelector(selectOrderModalData);
  const ingredients: TIngredient[] = useAppSelector(selectIngredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
