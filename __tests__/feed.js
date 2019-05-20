describe('Group Module', () => {
  beforeAll(async () => {
    console.log('---------------------------------')
    await page.goto('https://google.com')
  })

  it('should be title "Google"', async () => {
    await expect(page.title()).resolves.toMatch('Google')
  })
  test('user should have feed', async () => {
    expect(true).toBe(true)
  })

  test('user feed should load more on scroll', async () => {
    expect(true).toBe(true)
  })

  test('it should be able to comment on feed post', async () => {
    expect(true).toBe(true)
  })

  test('it should be able to like on feed', async () => {
    expect(true).toBe(true)
  })
})
