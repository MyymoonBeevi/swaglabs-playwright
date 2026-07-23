import { test, expect } from '../../fixtures/test-base';
import { PRODUCTS } from '../../data/products';
import { CHECKOUT_INFO } from '../../data/users';

test.describe('Checkout', () => {
  test.beforeEach(async ({ authedPage, cartPage }) => {
    await authedPage.addProductToCart(PRODUCTS.backpack);
    await authedPage.addProductToCart(PRODUCTS.boltTShirt);
    await authedPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('completes full checkout flow', async ({ checkoutPage, page }) => {
    await checkoutPage.fillInformation(
      CHECKOUT_INFO.valid.firstName,
      CHECKOUT_INFO.valid.lastName,
      CHECKOUT_INFO.valid.postalCode
    );
    await checkoutPage.continueToOverview();
    await expect(page).toHaveURL(/checkout-step-two.html/);

    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('missing first name blocks checkout', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation(
      CHECKOUT_INFO.missingFirstName.firstName,
      CHECKOUT_INFO.missingFirstName.lastName,
      CHECKOUT_INFO.missingFirstName.postalCode
    );
    await checkoutPage.continueToOverview();
    expect(await checkoutPage.getErrorText()).toContain('First Name is required');
  });

  test('order total reflects item prices plus tax', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation(
      CHECKOUT_INFO.valid.firstName,
      CHECKOUT_INFO.valid.lastName,
      CHECKOUT_INFO.valid.postalCode
    );
    await checkoutPage.continueToOverview();

    const total = await checkoutPage.getTotal();
    expect(total).toMatch(/Total: \$\d+\.\d{2}/);
  });

  test('cancel from overview returns to inventory', async ({ checkoutPage, page }) => {
    await checkoutPage.fillInformation(
      CHECKOUT_INFO.valid.firstName,
      CHECKOUT_INFO.valid.lastName,
      CHECKOUT_INFO.valid.postalCode
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.cancelButton.click();
    await expect(page).toHaveURL(/inventory.html/);
  });
});
