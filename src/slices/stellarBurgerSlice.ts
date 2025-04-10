import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TIngredient,
  TOrder,
  TUser,
  TConstructorItems,
  TIngredientUnique
} from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import {
  getIngredientsApi,
  orderBurgerApi,
  loginUserApi,
  TLoginData,
  TRegisterData,
  registerUserApi,
  getUserApi,
  getFeedsApi,
  getOrdersApi,
  logoutApi,
  updateUserApi,
  getOrderByNumberApi
} from '@api';

type TStellarBurger = {
  ingredients: TIngredient[];
  loading: boolean;
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  user: TUser;
  orders: TOrder[];
  totalOrders: number;
  totalToday: number;
  userOrders: TOrder[] | null;
  isAuthenticated: boolean;
  isInit: boolean;
  isModalOpened: boolean;
  errorText: string;
  orderByNumber: TOrder[] | [];
};

export const initialState: TStellarBurger = {
  ingredients: [],
  loading: false,
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  user: {
    email: '',
    name: ''
  },
  orders: [],
  totalOrders: 0,
  totalToday: 0,
  userOrders: null,
  isAuthenticated: false,
  isInit: false,
  isModalOpened: false,
  errorText: '',
  orderByNumber: []
};

export const stellarBurgerSlice = createSlice({
  name: 'stellarBurger',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: uuidv4()
        });
      }
    },
    closeOrderRequest(state) {
      state.orderRequest = false;
      state.orderModalData = null;
      state.constructorItems = {
        bun: {
          price: 0
        },
        ingredients: []
      };
    },
    removeOrders(state) {
      state.orders.length = 0;
    },
    removeUserOrders(state) {
      state.userOrders = null;
    },
    init(state) {
      state.isInit = true;
    },
    openModal(state) {
      state.isModalOpened = true;
    },
    closeModal(state) {
      state.isModalOpened = false;
    },
    deleteIngredient(state, action: PayloadAction<TIngredientUnique>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (_, index) => index !== ingredientIndex
        );
    },
    setErrorText(state, action: PayloadAction<string>) {
      state.errorText = action.payload;
    },
    clearErrorText(state) {
      state.errorText = '';
    },
    moveIngredientUp(state, action: PayloadAction<TIngredientUnique>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const prevItem = state.constructorItems.ingredients[ingredientIndex - 1];
      state.constructorItems.ingredients.splice(
        ingredientIndex - 1,
        2,
        action.payload,
        prevItem
      );
    },
    moveIngredientDown(state, action: PayloadAction<TIngredientUnique>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const nextItem = state.constructorItems.ingredients[ingredientIndex + 1];
      state.constructorItems.ingredients.splice(
        ingredientIndex,
        2,
        nextItem,
        action.payload
      );
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData,
    selectUser: (state) => state.user,
    selectOrders: (state) => state.orders,
    selectOrder: (state) => state.orderByNumber[0],
    selectTotalOrders: (state) => state.totalOrders,
    selectTotalToday: (state) => state.totalToday,
    selectUserOrders: (state) => state.userOrders,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsInit: (state) => state.isInit,
    selectIsModalOpened: (state) => state.isModalOpened,
    selectErrorText: (state) => state.errorText
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchGetFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchGetFeed.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchGetOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchGetOrders.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(fetchNewOrder.rejected, (state, action) => {
        state.orderRequest = false;
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.errorText = action.error.message || 'Ошибка. Попробуйте еще раз';
      })
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.errorText = action.error.message || 'Ошибка. Попробуйте еще раз';
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.isAuthenticated = true;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = { name: '', email: '' };
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user.name = action.payload.user.name;
          state.user.email = action.payload.user.email;
        }
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.isAuthenticated = false;
          state.user = { name: '', email: '' };
        }
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

export const fetchGetFeed = createAsyncThunk('user/feed', getFeedsApi);

export const fetchGetOrders = createAsyncThunk('user/orders', getOrdersApi);

export const fetchNewOrder = createAsyncThunk(
  'orders/newOrder',
  orderBurgerApi
);

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  registerUserApi
);

export const fetchLogin = createAsyncThunk('user/login', loginUserApi);

export const fetchGetUser = createAsyncThunk('user/get', getUserApi);

export const fetchUpdateUser = createAsyncThunk('user/update', updateUserApi);

export const fetchLogout = createAsyncThunk('user/logout', logoutApi);

export const fetchOrderById = createAsyncThunk(
  'orders/getOrderByNumber',
  async (orderNumber: number) => await getOrderByNumberApi(orderNumber)
);

export const {
  selectIngredients,
  selectLoading,
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  selectUser,
  selectOrders,
  selectTotalOrders,
  selectTotalToday,
  selectUserOrders,
  selectIsAuthenticated,
  selectIsInit,
  selectIsModalOpened,
  selectErrorText,
  selectOrder
} = stellarBurgerSlice.selectors;

export const {
  addIngredient,
  closeOrderRequest,
  removeOrders,
  removeUserOrders,
  init,
  openModal,
  closeModal,
  deleteIngredient,
  setErrorText,
  clearErrorText,
  moveIngredientUp,
  moveIngredientDown
} = stellarBurgerSlice.actions;

export default stellarBurgerSlice.reducer;
