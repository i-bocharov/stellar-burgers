import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from 'types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectUserOrders } from '@selectors/orders';
import { getUserOrders } from '@thunks/orders';
import { selectIsAuthChecked, selectUser } from '@selectors/user';

export const ProfileOrders: FC = () => {
  // Берём заказы пользователя из стора
  const orders: TOrder[] = useAppSelector(selectUserOrders);

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const userOrders = useAppSelector(selectUserOrders);

  useEffect(() => {
    if (isAuthChecked && user) {
      dispatch(getUserOrders());
    }
  }, [dispatch, isAuthChecked, user]);

  return <ProfileOrdersUI orders={userOrders} />;
};
