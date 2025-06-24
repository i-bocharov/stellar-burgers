import { TOrder } from 'types';

export type FeedUIProps = {
  orders: TOrder[];
  handleGetFeeds: () => void;
};
