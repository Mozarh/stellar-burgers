import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import stellarBurgerSlice, {
  addIngredient,
  clearErrorText,
  closeModal,
  closeOrderRequest,
  deleteIngredient,
  init,
  moveIngredientDown,
  moveIngredientUp,
  openModal,
  removeOrders,
  removeUserOrders,
  selectConstructorItems,
  selectErrorText,
  selectIsInit,
  selectIsModalOpened,
  selectOrderModalData,
  selectOrderRequest,
  selectOrders,
  selectUserOrders,
  setErrorText
} from '../stellarBurgerSlice';
import { mockBun, mockIngredient, mockStore } from '../mockData';

function initStore() {
  return configureStore({
    reducer: {
      stellarBurger: stellarBurgerSlice
    },
    preloadedState: {
      stellarBurger: mockStore
    }
  });
}

describe('тестируем Action', () => {
  test('addIngredient', () => {
    const store = initStore();
    store.dispatch(addIngredient(mockIngredient));
    store.dispatch(addIngredient(mockBun));

    const constructor = selectConstructorItems(store.getState());
    expect(constructor.ingredients.length).toEqual(4);
    expect(constructor.bun.name === 'Флюоресцентная булка R2-D3');
  });

  test('closeOrderRequest', () => {
    const store = initStore();
    store.dispatch(closeOrderRequest());

    const orderRequest = selectOrderRequest(store.getState());
    const orderModalData = selectOrderModalData(store.getState());
    const constructorItems = selectConstructorItems(store.getState());

    expect(orderRequest).toBe(false);
    expect(orderModalData).toBe(null);
    expect(constructorItems).toEqual({
      bun: {
        price: 0
      },
      ingredients: []
    });
  });

  test('removeOrders', () => {
    const store = initStore();
    const initialOrders = selectOrders(store.getState()).length;
    store.dispatch(removeOrders());
    const orders = selectOrders(store.getState()).length;
    expect(initialOrders).toBe(2);
    expect(orders).toBe(0);
  });

  test('removeUserOrders', () => {
    const store = initStore();
    const initialOrders = selectUserOrders(store.getState())!.length;
    store.dispatch(removeUserOrders());
    const orders = selectUserOrders(store.getState());
    expect(initialOrders).toBe(2);
    expect(orders).toBe(null);
  });

  test('init', () => {
    const store = initStore();
    const beforeInit = selectIsInit(store.getState());
    store.dispatch(init());
    const afterInit = selectIsInit(store.getState());
    expect(beforeInit).toBe(false);
    expect(afterInit).toBe(true);
  });

  test('openModal', () => {
    const store = initStore();
    const beforeOpen = selectIsModalOpened(store.getState());
    store.dispatch(openModal());
    const afterOpen = selectIsModalOpened(store.getState());
    expect(beforeOpen).toBe(false);
    expect(afterOpen).toBe(true);
  });

  test('closeModal', () => {
    const store = initStore();
    store.dispatch(closeModal());
    const modalIsOpen = selectIsModalOpened(store.getState());
    expect(modalIsOpen).toBe(false);
  });

  test('deleteIngredient', () => {
    const store = initStore();
    const before = selectConstructorItems(store.getState()).ingredients.length;
    store.dispatch(deleteIngredient(mockIngredient));
    const after = selectConstructorItems(store.getState()).ingredients.length;

    expect(before).toBe(3);
    expect(after).toBe(2);
  });

  test('setErrorText', () => {
    const store = initStore();
    store.dispatch(setErrorText('текст ошибки'));
    const errorText = selectErrorText(store.getState());
    expect(errorText).toBe('текст ошибки');
  });

  test('clearErrorText', () => {
    const store = initStore();
    store.dispatch(setErrorText('ошибка'));
    store.dispatch(clearErrorText());
    const errorText = selectErrorText(store.getState());
    expect(errorText).toBe('');
  });

  test('moveIngredientUp', () => {
    const store = initStore();
    let ingredients = selectConstructorItems(store.getState()).ingredients;
    const lastIngredients = ingredients[ingredients.length - 1];
    store.dispatch(moveIngredientUp(lastIngredients));
    ingredients = selectConstructorItems(store.getState()).ingredients;
    expect(ingredients[ingredients.length - 2]).toEqual(lastIngredients);
  });

  test('moveIngredientDown', () => {
    const store = initStore();
    let ingredients = selectConstructorItems(store.getState()).ingredients;
    const firstIngredients = ingredients[0];
    store.dispatch(moveIngredientDown(firstIngredients));
    ingredients = selectConstructorItems(store.getState()).ingredients;
    expect(ingredients[1]).toEqual(firstIngredients);
  });
});
