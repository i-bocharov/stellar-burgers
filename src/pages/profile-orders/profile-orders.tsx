import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from 'types';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};
