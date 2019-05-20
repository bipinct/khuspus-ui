describe('User Module', () => {
  let page
  beforeAll(async () => {
    // page = await global.__BROWSER__.newPage()
    page = await global.browser.newPage()
    await page.goto('http://localhost:8080/')
  })

  test('it should be able to Signup', async () => {
    expect(true).toBe(true)
  })

  test('it should be able to login', async () => {
    expect(true).toBe(true)
  })

  test('user should be able to create post', async () => {
    expect(true).toBe(true)
  })

  test('user should be able to edit post', async () => {
    expect(true).toBe(true)
  })

  test('user should be able to follow other user', async () => {
    expect(true).toBe(true)
  })
})
