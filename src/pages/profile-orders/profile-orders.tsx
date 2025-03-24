import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchGetOrders,
  removeUserOrders,
  selectUserOrders
} from '../../slices/stellarBurgerSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeUserOrders());
    dispatch(fetchGetOrders());
  }, [dispatch]);

  const orders = useSelector(selectUserOrders);

  if (!orders) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
