import { FC } from 'react';

import { TOrder } from 'types';
import { FeedInfoUI } from '@ui/feed-info';
import { useAppSelector } from '@hooks';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useAppSelector((state) => state.feed.orders);
  const total = useAppSelector((state) => state.feed.total);
  const totalToday = useAppSelector((state) => state.feed.totalToday);

  const feed = { total, totalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
