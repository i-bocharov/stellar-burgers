import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from 'types';
import { FC } from 'react';
import { useAppSelector } from '@hooks';

export const ProfileOrders: FC = () => {
  // Берём заказы пользователя из стора
  const orders: TOrder[] = useAppSelector((state) => state.orders.userOrders);

  return <ProfileOrdersUI orders={orders} />;
};
