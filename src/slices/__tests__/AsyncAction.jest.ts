import { expect, test, describe, jest } from '@jest/globals';
import stellarBurgerSlice, {
  initialState,
  fetchGetUser,
  fetchIngredients,
  fetchNewOrder,
  fetchLogin,
  fetchRegisterUser,
  fetchGetFeed,
  fetchGetOrders,
  fetchLogout,
  fetchUpdateUser
} from '../stellarBurgerSlice';

describe('asyncAction', () => {
  test('fetchGetUser pending', () => {
    const state = stellarBurgerSlice(initialState, fetchGetUser.pending(''));
    expect(state.loading).toBe(true);
  });

  test('fetchGetUser fulfilled', () => {
    const mockResponse = {
      success: true,
      user: { name: 'testUser', email: 'ttest@test.ru' }
    };
    const state = stellarBurgerSlice(
      initialState,
      fetchGetUser.fulfilled(mockResponse, '')
    );
    expect(state.user).toEqual(mockResponse.user);
  });

  test('fetchGetUser rejected', () => {
    const mockAnswer = { name: 'testUser', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchGetUser.rejected(mockAnswer, '')
    );
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toEqual({ name: '', email: '' });
  });

  test('fetchIngredients pending', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchIngredients.pending('')
    );
    expect(state.loading).toBe(true);
  });

  test('fetchIngredients fulfilled', () => {
    const mockResponse = [
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      }
    ];
    const state = stellarBurgerSlice(
      initialState,
      fetchIngredients.fulfilled(mockResponse, '')
    );
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockResponse);
  });

  test('fetchIngredients rejected', () => {
    const mockAnswer = { name: 'testUser', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchIngredients.rejected(mockAnswer, '')
    );
    expect(state.loading).toBe(false);
  });

  test('fetchNewOrder pending', () => {
    const mockOrder = ['testid1', 'testid2', 'testid3'];
    const state = stellarBurgerSlice(
      initialState,
      fetchNewOrder.pending('', mockOrder)
    );
    expect(state.loading).toBe(true);
  });

  test('fetchNewOrder fulfilled', () => {
    const mockResponse = {
      success: true,
      name: 'testname',
      order: {
        _id: '67f4ece1e8e61d001cec107f',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-04-08T09:31:13.293Z',
        updatedAt: '2025-04-08T09:31:13.995Z',
        number: 73785
      }
    };
    const state = stellarBurgerSlice(
      initialState,
      fetchNewOrder.fulfilled(mockResponse, '', [''])
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockResponse.order);
  });

  test('fetchNewOrder rejected', () => {
    const mockAnswer = { name: 'testUser', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchNewOrder.rejected(mockAnswer, '', [''])
    );
    expect(state.orderRequest).toBe(false);
  });

  test('fetchLogin pending', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchLogin.pending('', { email: 'ttest@test.ru', password: 'Avangard24' })
    );
    expect(state.loading).toBe(true);
  });

  test('fetchLogin fulfilled', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchLogin.fulfilled(
        {
          success: true,
          refreshToken: 'testtoken',
          accessToken: 'testaccess',
          user: { name: 'testUser', email: 'ttest@test.ru' }
        },
        '',
        { password: 'Avangard24', email: 'ttest@test.ru' }
      )
    );
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(true);
  });

  test('fetchLogin rejected', () => {
    const mockAnswer = { name: 'testUser', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchLogin.rejected(mockAnswer, '', {
        email: 'ttest@test.ru',
        password: 'Avangard24'
      })
    );
    expect(state.loading).toBe(false);
    expect(state.errorText).toBe('error');
  });

  test('fetchRegisterUser pending', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchRegisterUser.pending('', {
        name: 'testUser',
        email: 'ttest@test.ru',
        password: 'Avangard24'
      })
    );
    expect(state.loading).toBe(true);
  });

  test('fetchRegisterUser fulfilled', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchRegisterUser.fulfilled(
        {
          success: true,
          refreshToken: 'testtoken',
          accessToken: 'testaccess',
          user: { name: 'testUser', email: 'ttest@test.ru' }
        },
        '',
        { name: 'testUser', password: 'Avangard24', email: 'ttest@test.ru' }
      )
    );
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(true);
  });

  test('fetchRegisterUser rejected', () => {
    const mockAnswer = { name: 'testUser', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchRegisterUser.rejected(mockAnswer, '', {
        name: 'testUser',
        password: 'Avangard24',
        email: 'ttest@test.ru'
      })
    );
    expect(state.loading).toBe(false);
    expect(state.errorText).toBe('error');
  });

  test('fetchGetFeed pending', () => {
    const state = stellarBurgerSlice(initialState, fetchGetFeed.pending(''));
    expect(state.loading).toBe(true);
  });

  test('fetchGetFeed fulfilled', () => {
    const mockResponse = {
      success: true,
      total: 73411,
      totalToday: 111,
      orders: [
        {
          _id: '67f4ece1e8e61d001cec107f',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-04-08T09:31:13.293Z',
          updatedAt: '2025-04-08T09:31:13.995Z',
          number: 73785
        }
      ]
    };
    const state = stellarBurgerSlice(
      initialState,
      fetchGetFeed.fulfilled(mockResponse, '')
    );
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockResponse.orders);
    expect(state.totalOrders).toEqual(mockResponse.total);
    expect(state.totalToday).toEqual(mockResponse.totalToday);
  });

  test('fetchGetFeed rejected', () => {
    const mockAnswer = { name: 'testUser', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchGetFeed.rejected(mockAnswer, '')
    );
    expect(state.loading).toBe(false);
  });

  test('fetchGetOrders pending', () => {
    const state = stellarBurgerSlice(initialState, fetchGetOrders.pending(''));
    expect(state.loading).toBe(true);
  });

  test('fetchGetOrders fulfilled', () => {
    const mockResponse = [
      {
        _id: '67f4ece1e8e61d001cec107f',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-04-08T09:31:13.293Z',
        updatedAt: '2025-04-08T09:31:13.995Z',
        number: 73785
      }
    ];
    const state = stellarBurgerSlice(
      initialState,
      fetchGetOrders.fulfilled(mockResponse, '')
    );
    expect(state.loading).toBe(false);
    expect(state.userOrders).toEqual(mockResponse);
  });

  test('fetchGetOrders rejected', () => {
    const mockAnswer = { name: 'testUser', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchGetOrders.rejected(mockAnswer, '')
    );
    expect(state.loading).toBe(false);
  });

  test('fetchLogout pending', () => {
    const state = stellarBurgerSlice(initialState, fetchLogout.pending(''));
    expect(state.loading).toBe(true);
  });

  test('fetchLogout fulfilled', () => {
    const mockAnswer = { success: true };
    const state = stellarBurgerSlice(
      initialState,
      fetchLogout.fulfilled(mockAnswer, '')
    );
    expect(state.loading).toBe(false);
    expect(state.user).toEqual({ name: '', email: '' });
    expect(state.isAuthenticated).toBe(false);
  });

  test('fetchLogout rejected', () => {
    const mockError = { name: 'testUser', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchLogout.rejected(mockError, '')
    );
    expect(state.loading).toBe(false);
  });

  test('fetchUpdateUser pending', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchUpdateUser.pending('', { name: 'testUser' })
    );
    expect(state.loading).toBe(true);
  });

  test('fetchUpdateUser fulfilled', () => {
    const mockUser = { name: 'testUser', email: 'Newttest@test.ru' };
    const mockResponse = { success: true, user: mockUser };
    const state = stellarBurgerSlice(
      initialState,
      fetchUpdateUser.fulfilled(mockResponse, '', mockUser)
    );
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
  });

  test('fetchUpdateUser rejected', () => {
    const mockError = { name: 'testUser', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchUpdateUser.rejected(mockError, '', { name: 'testUser' })
    );
    expect(state.loading).toBe(false);
  });
});
