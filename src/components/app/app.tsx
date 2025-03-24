import '../../index.css';
import styles from './app.module.css';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader, OrderInfo, Modal, IngredientDetails } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { ProtectedRoute } from '../protected-route';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchGetUser,
  fetchIngredients,
  init,
  selectIngredients,
  selectIsAuthenticated
} from '../../slices/stellarBurgerSlice';
import { deleteCookie, getCookie } from '../../utils/cookie';
import { useEffect } from 'react';

export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;
  const token = getCookie('accessToken');
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(fetchGetUser())
        .unwrap()
        .then(() => {
          dispatch(init());
        })
        .catch(() => {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        });
    } else {
      dispatch(init());
    }
  }, [dispatch, isAuthenticated, token]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Описание ингредиента'}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={'Заказ'}
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={'Заказ'}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
