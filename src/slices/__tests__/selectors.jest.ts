import { configureStore } from '@reduxjs/toolkit';
import stellarBurgerSlice, {
  selectConstructorItems,
  selectErrorText,
  selectIngredients,
  selectIsAuthenticated,
  selectIsInit,
  selectIsModalOpened,
  selectLoading,
  selectOrderModalData,
  selectOrderRequest,
  selectOrders,
  selectTotalOrders,
  selectTotalToday,
  selectUser,
  selectUserOrders
} from '../stellarBurgerSlice';
import { mockStore } from '../mockData';
import { expect, test, describe, jest } from '@jest/globals';

let store = configureStore({
  reducer: {
    stellarBurger: stellarBurgerSlice
  },
  preloadedState: {
    stellarBurger: mockStore
  }
});

describe('selectors', () => {
  test('selectIngredients', () => {
    const ingredients = selectIngredients(store.getState());
    expect(ingredients).toEqual(mockStore.ingredients);
  });

  test('selectLoading', () => {
    const loading = selectLoading(store.getState());
    expect(loading).toBe(false);
  });

  test('selectConstructorItems', () => {
    const constructorItems = selectConstructorItems(store.getState());
    expect(constructorItems).toEqual(mockStore.constructorItems);
  });

  test('selectOrderRequest', () => {
    const orderRequest = selectOrderRequest(store.getState());
    expect(orderRequest).toBe(false);
  });

  test('selectOrderModalData', () => {
    const orderModalData = selectOrderModalData(store.getState());
    expect(orderModalData).toEqual(mockStore.orderModalData);
  });

  test('selectUser', () => {
    const user = selectUser(store.getState());
    expect(user).toEqual({
      name: 'testUser',
      email: 'ttest@test.ru'
    });
  });

  test('selectOrders', () => {
    const orders = selectOrders(store.getState());
    expect(orders).toEqual(mockStore.orders);
  });

  test('selectTotalOrders', () => {
    const totalOrders = selectTotalOrders(store.getState());
    expect(totalOrders).toBe(73411);
  });

  test('selectTotalToday', () => {
    const totalToday = selectTotalToday(store.getState());
    expect(totalToday).toBe(111);
  });

  test('selectUserOrders', () => {
    const userOrders = selectUserOrders(store.getState());
    expect(userOrders).toEqual(mockStore.userOrders);
  });

  test('selectIsAuthenticated', () => {
    const isAuthenticated = selectIsAuthenticated(store.getState());
    expect(isAuthenticated).toBe(true);
  });

  test('selectIsInit', () => {
    const isInit = selectIsInit(store.getState());
    expect(isInit).toBe(false);
  });

  test('selectIsModalOpened', () => {
    const isModalOpened = selectIsModalOpened(store.getState());
    expect(isModalOpened).toBe(false);
  });

  test('selectErrorText', () => {
    const errorText = selectErrorText(store.getState());
    expect(errorText).toBe('текст ошибки');
  });
});
