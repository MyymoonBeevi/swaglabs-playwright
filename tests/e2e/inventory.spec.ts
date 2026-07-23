import { test, expect } from '../../fixtures/test-base';
import { PRODUCTS } from '../../data/products';
import { SORT_OPTIONS } from '../../utils/constants';

test.describe('Inventory', () => {
  test('displays 6 products', async ({ authedPage }) => {
    await expect(authedPage.inventoryItems).toHaveCount(6);
  });

  test('add single product to cart updates badge', async ({ authedPage }) => {
    await authedPage.addProductToCart(PRODUCTS.backpack);
    expect(await authedPage.getCartCount()).toBe(1);
    await expect(authedPage.removeButton(PRODUCTS.backpack)).toBeVisible();
  });

  test('add multiple products updates badge count', async ({ authedPage }) => {
    await authedPage.addProductToCart(PRODUCTS.backpack);
    await authedPage.addProductToCart(PRODUCTS.bikeLight);
    await authedPage.addProductToCart(PRODUCTS.onesie);
    expect(await authedPage.getCartCount()).toBe(3);
  });

  test('remove product from cart decrements badge', async ({ authedPage }) => {
    await authedPage.addProductToCart(PRODUCTS.backpack);
    await authedPage.addProductToCart(PRODUCTS.bikeLight);
    await authedPage.removeProductFromCart(PRODUCTS.backpack);
    expect(await authedPage.getCartCount()).toBe(1);
  });

  test('sort by name Z to A', async ({ authedPage }) => {
    await authedPage.sortBy(SORT_OPTIONS.nameZA);
    const names = await authedPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('sort by price low to high', async ({ authedPage }) => {
    await authedPage.sortBy(SORT_OPTIONS.priceLowHigh);
    const prices = await authedPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('sort by price high to low', async ({ authedPage }) => {
    await authedPage.sortBy(SORT_OPTIONS.priceHighLow);
    const prices = await authedPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('logout returns to login page', async ({ authedPage, page }) => {
    await authedPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
