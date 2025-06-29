import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrderById,
  selectIngredients,
  selectOrder,
  selectOrders
} from '../../slices/stellarBurgerSlice';

export const OrderInfo: FC = () => {
  const params = useParams<{ number: string }>();
  if (!params.number) {
    redirect('/feed');
    return null;
  }
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);
  const order = useSelector(selectOrder);

  useEffect(() => {
    dispatch(fetchOrderById(Number(order)));
  }, [dispatch]);

  const orderData = orders.find(
    (item) => item.number === parseInt(params.number!)
  );

  const ingredients: TIngredient[] = useSelector(selectIngredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
