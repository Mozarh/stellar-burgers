import * as Utils from '../cookie';
import { expect, test, describe, jest } from '@jest/globals';

describe('тестируем cookie', () => {
  test('тестируем setCookie', () => {
    global.document = { cookie: '' } as any;
    const spy = jest.spyOn(Utils, 'setCookie');
    Utils.setCookie('test_name', 'test_value');

    expect(spy).toHaveBeenCalledWith('test_name', 'test_value');
    expect(document.cookie).toMatch(/test_name=test_value/g);
  });

  test('тестируем getCookie', () => {
    global.document = { cookie: 'test_name=test_value' } as any;
    const spy = jest.spyOn(Utils, 'getCookie');
    const res = Utils.getCookie('test_name');
    const res2 = Utils.getCookie('test_name_2');

    expect(spy).toHaveBeenCalledWith('test_name');
    expect(spy).toHaveBeenCalledWith('test_name_2');
    expect(spy).toHaveBeenCalledTimes(2);

    expect(res).toBe('test_value');
    expect(res2).toBe(undefined);
  });

  test('тестируем deleteCookie', () => {
    global.document = { cookie: 'test_name=test_value' } as any;
    const spy = jest.spyOn(Utils, 'deleteCookie');
    Utils.deleteCookie('test_name');

    expect(spy).toHaveBeenCalledWith('test_name');
    expect(document.cookie).toMatch(/test_name=;/g);
  });
});
