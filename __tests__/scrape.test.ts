describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com');
  });

  it('should display "google" text on page', async () => {
    const pageContent = await page.content();

    // Use toMatch to assert that the page content includes "google"
    expect(pageContent).toMatch('google');
  });
});
