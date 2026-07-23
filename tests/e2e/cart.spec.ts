import { test, expect } from '../../fixtures/test-base';
import { PRODUCTS } from '../../data/products';

test.describe('Cart', () => {
  test('added items appear in cart', async ({ authedPage, cartPage }) => {
    await authedPage.addProductToCart(PRODUCTS.backpack);
    await authedPage.addProductToCart(PRODUCTS.fleeceJacket);
    await authedPage.goToCart();

    const names = await cartPage.getItemNames();
    expect(names).toContain(PRODUCTS.backpack);
    expect(names).toContain(PRODUCTS.fleeceJacket);
    await expect(cartPage.cartItems).toHaveCount(2);
  });

  test('remove item from cart page', async ({ authedPage, cartPage }) => {
    await authedPage.addProductToCart(PRODUCTS.backpack);
    await authedPage.goToCart();
    await cartPage.removeItem(PRODUCTS.backpack);
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test('continue shopping returns to inventory', async ({ authedPage, cartPage, page }) => {
    await authedPage.goToCart();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('empty cart cannot proceed to checkout with items', async ({ authedPage, cartPage, page }) => {
    await authedPage.addProductToCart(PRODUCTS.backpack);
    await authedPage.goToCart();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });
});
