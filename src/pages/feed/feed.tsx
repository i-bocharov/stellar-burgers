import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getFeeds } from '@thunks/feed';

export const Feed: FC = () => {
  const orders = useAppSelector((state) => state.feed.orders);
  const loading = useAppSelector((state) => state.feed.loading);
  const error = useAppSelector((state) => state.feed.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!orders.length) {
    return <div>Нет заказов</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
