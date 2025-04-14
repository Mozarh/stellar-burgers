import * as API from '../burger-api';

async function getMockResponse(data: any, ok: boolean = true) {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve(data)
  });
}

const originalFetch = global.fetch;

afterAll(() => {
  global.fetch = originalFetch;
});

describe('тестируем burger-api', () => {
  global.document = { cookie: 'accessToken=test_value' } as any;
  global.localStorage = { getItem: () => 'testItem', setItem: () => {} } as any;

  const mockData = {
    success: true,
    data: 'testData',
    orders: ['test1', 'test2']
  };

  const mockErorr = {
    success: false,
    name: 'error',
    message: 'jwt expired'
  };

  test('тестируем refreshToken', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    const spy = jest.spyOn(API, 'refreshToken');
    const res = await API.refreshToken();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('тестируем refreshToken fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockErorr)) as any;

    await API.refreshToken().catch((err) => {
      expect(err).toEqual(mockErorr);
    });
  });

  test('тестируем registerUserApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    const mockUser = {
      email: 'ttest@test.ru',
      name: 'testUser',
      password: 'test123'
    };
    const spy = jest.spyOn(API, 'registerUserApi');
    const res = await API.registerUserApi(mockUser);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('тестируем registerUserApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockErorr)) as any;

    const mockUser = {
      email: 'ttest@test.ru',
      name: 'testUser',
      password: 'test123'
    };
    await API.registerUserApi(mockUser).catch((err) => {
      expect(err).toEqual(mockErorr);
    });
  });

  test('тестируем getUserApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    const spy = jest.spyOn(API, 'getUserApi');
    const res = await API.getUserApi();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('тестируем loginUserApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    const mockUser = { email: 'ttest@test.ru', password: 'test123' };
    const spy = jest.spyOn(API, 'loginUserApi');
    const res = await API.loginUserApi(mockUser);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('тестируем loginUserApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockErorr)) as any;

    const mockUser = { email: 'ttest@test.ru', password: 'test123' };
    await API.loginUserApi(mockUser).catch((err) => {
      expect(err).toEqual(mockErorr);
    });
  });

  test('тестируем updateUserApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    const mockUser = { name: 'testUser', email: 'ttest@test.ru' };
    const spy = jest.spyOn(API, 'updateUserApi');
    const res = await API.updateUserApi(mockUser);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('тестируем resetPasswordApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    const mockUser = { password: 'test123', token: 'tokenTest' };
    const spy = jest.spyOn(API, 'resetPasswordApi');
    const res = await API.resetPasswordApi(mockUser);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('тестируем resetPasswordApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockErorr)) as any;

    const mockUser = { password: 'test123', token: 'tokenTest' };
    await API.resetPasswordApi(mockUser).catch((err) => {
      expect(err).toEqual(mockErorr);
    });
  });

  test('тестируем forgotPasswordApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    const mockUser = { email: 'ttest@test.ru' };
    const spy = jest.spyOn(API, 'forgotPasswordApi');
    const res = await API.forgotPasswordApi(mockUser);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('тестируем forgotPasswordApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockErorr)) as any;

    const mockUser = { email: 'ttest@test.ru' };
    await API.forgotPasswordApi(mockUser).catch((err) => {
      expect(err).toEqual(mockErorr);
    });
  });

  test('тестируем logoutApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    const spy = jest.spyOn(API, 'logoutApi');
    const res = await API.logoutApi();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('тестируем getOrderByNumberApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    const spy = jest.spyOn(API, 'getOrderByNumberApi');
    const res = await API.getOrderByNumberApi(100);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('тестируем orderBurgerApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    const burger = ['testId1', 'testId2', 'testId1'];
    const spy = jest.spyOn(API, 'orderBurgerApi');
    const res = await API.orderBurgerApi(burger);

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('тестируем orderBurgerApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockErorr)) as any;

    const burger = ['testId1', 'testId2', 'testId1'];
    await API.orderBurgerApi(burger).catch((err) => {
      expect(err).toEqual(mockErorr);
    });
  });

  test('тестируем getOrdersApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    const spy = jest.spyOn(API, 'getOrdersApi');
    const res = await API.getOrdersApi();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData.orders);
  });

  test('тестируем getOrdersApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockErorr)) as any;

    await API.getOrdersApi().catch((err) => {
      expect(err).toEqual(mockErorr);
    });
  });

  test('тестируем getFeedsApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    const spy = jest.spyOn(API, 'getFeedsApi');
    const res = await API.getFeedsApi();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData);
  });

  test('тестируем getFeedsApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockErorr)) as any;

    await API.getFeedsApi().catch((err) => {
      expect(err).toEqual(mockErorr);
    });
  });

  test('тестируем getIngredientsApi', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockData)) as any;

    const spy = jest.spyOn(API, 'getIngredientsApi');
    const res = await API.getIngredientsApi();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockData.data);
  });

  test('тестируем getIngredientsApi fail', async () => {
    global.fetch = jest.fn(() => getMockResponse(mockErorr)) as any;

    await API.getIngredientsApi().catch((err) => {
      expect(err).toEqual(mockErorr);
    });
  });
});
