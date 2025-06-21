import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from 'types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectUserOrders } from '@selectors/orders';
import { getUserOrders } from '@thunks/orders';
import { useSelector } from 'react-redux';
import { selectIsAuthChecked, selectUser } from '@selectors/user';

export const ProfileOrders: FC = () => {
  // Берём заказы пользователя из стора
  const orders: TOrder[] = useAppSelector(selectUserOrders);

  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const userOrders = useSelector(selectUserOrders);

  useEffect(() => {
    if (isAuthChecked && user) {
      dispatch(getUserOrders());
    }
  }, [dispatch, isAuthChecked, user]);

  return <ProfileOrdersUI orders={userOrders} />;
};
