import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchGetFeed,
  removeOrders,
  selectOrders
} from '../../slices/stellarBurgerSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeOrders());
    dispatch(fetchGetFeed());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(removeOrders());
        dispatch(fetchGetFeed());
      }}
    />
  );
};
