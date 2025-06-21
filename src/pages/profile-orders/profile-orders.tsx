import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from 'types';
import { FC } from 'react';
import { useAppSelector } from '@hooks';
import { selectUserOrders } from '@selectors/orders';

export const ProfileOrders: FC = () => {
  // Берём заказы пользователя из стора
  const orders: TOrder[] = useAppSelector(selectUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
