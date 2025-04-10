const API_URL = Cypress.env('BURGER_API_URL');

Cypress.on('uncaught:exception', () => false);

beforeEach(() => {
  window.localStorage.setItem('refreshToken', 'testRefreshToken');
  cy.setCookie('accessToken', 'testAccessToken');

  //  моковые данные для ingredients
  cy.fixture('ingredients.json').then((ingredients) => {
    cy.intercept(
      {
        method: 'GET',
        url: `${API_URL}/ingredients`
      },
      {
        statusCode: 200,
        body: ingredients
      }
    ).as('getIngredients');
  });

  //моковые данные для orders
  cy.fixture('orders.json').then((orders) => {
    cy.intercept(
      {
        method: 'GET',
        url: `${API_URL}/orders/all`
      },
      {
        statusCode: 200,
        body: orders
      }
    ).as('getOrders');
  });

  //моковые данные для user
  cy.fixture('user.json').then((user) => {
    cy.intercept(
      {
        method: 'GET',
        url: `${API_URL}/auth/user`
      },
      {
        statusCode: 200,
        body: user
      }
    ).as('getUser');
  });
  cy.visit('/');
  cy.wait('@getIngredients', { timeout: 10000 });
});

afterEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
});

describe('тест на работоспособность приложения', () => {
  const noBunSelector1 = `[data-cy=no_bun_text_1]`;
  const noBunSelector2 = `[data-cy=no_bun_text_2]`;
  const noIngredientsSelector = `[data-cy=no_ingredients]`;
  const bunSelector = `[data-cy=bun_0]`;
  const ingredientSelector = `[data-cy=ingredient_0]`;

  it('сервис должен быть доступен по адресу localhost:4000', () => {
    cy.visit('/');
    cy.url().should('eq', 'http://localhost:4000/');
  });

  it('тест на добавление булок и добавление начинки', () => {
    cy.get(noBunSelector1).as('noBunText1');
    cy.get(noBunSelector2).as('noBunText2');
    cy.get(noIngredientsSelector).as('noIngredients');
    cy.get(bunSelector + `button`).as('bun');
    cy.get(ingredientSelector + 'button').as('ingredient');

    cy.get('@noBunText1').contains('Выберите булки');
    cy.get('@noIngredients').contains('Выберите начинку');
    cy.get('@noBunText2').contains('Выберите булки');
    cy.get('@bun').click();
    cy.get('@ingredient').click({ multiple: true });

    cy.get(`[data-cy=burger_constructor]`).contains('Булка');
    cy.get(`[data-cy=ingredient_element]`);
  });

  it('тест на закрытие и открытие модалки', () => {
    const ingredient = cy.get(bunSelector);
    ingredient.click();

    cy.get(`[data-cy=modal]`).should('be.visible');
    cy.get(`[data-cy=close_modal]`).click();
    cy.get(`[data-cy=modal]`).should('not.exist');
  });

  it('тест на создание заказа', () => {
    const bun = cy.get(bunSelector + `button`);
    const ingredient = cy.get(ingredientSelector + `button`);
    bun.click();
    ingredient.click({ multiple: true });

    cy.get(`[data-cy=new_order_total] button`).click();

    //мокируем данные для нового заказа
    cy.fixture('newOrder.json').then((newOrder) => {
      cy.intercept(
        {
          method: 'POST',
          url: `${API_URL}/orders`
        },
        {
          statusCode: 200,
          body: newOrder
        }
      ).as('newOrder');

      cy.get(`[data-cy=order_number]`).contains(newOrder.order.number);
      cy.get(`[data-cy=close_modal]`).click();

      cy.get(noBunSelector1).as('noBunText1');
      cy.get(noBunSelector2).as('noBunText2');
      cy.get(noIngredientsSelector).as('noIngredientsText');

      cy.get('@noBunText1').contains('Выберите булки');
      cy.get('@noIngredientsText').contains('Выберите начинку');
      cy.get('@noBunText2').contains('Выберите булки');
    });
  });
});
