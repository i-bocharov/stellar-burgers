import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getFeeds } from '@thunks/feed';
import {
  selectFeedError,
  selectFeedLoading,
  selectFeedOrders
} from '@selectors/feed';

export const Feed: FC = () => {
  const orders = useAppSelector(selectFeedOrders);
  const loading = useAppSelector(selectFeedLoading);
  const error = useAppSelector(selectFeedError);
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
