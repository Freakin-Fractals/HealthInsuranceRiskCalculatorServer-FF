const fetch = require('node-fetch')



const _fetch = async (method, path, body) => {
    const baseUrl = 'http://localhost:3000'
    body = typeof body === 'string' ? body : JSON.stringify(body)
    const headers = { 'Content-Type': 'application/json' }
    const res = await fetch(baseUrl + path, { method, body, headers })
    if(res.status < 200 || res.status > 299)
      throw new Error(`API returned status ${res.status}`)
    return res.json()
  }

  describe('API tests', () => {

    test('GET /api/calculator', async () => {
      const vacations = await _fetch('get', '/api/vacations')
      expect(vacations.json).not.toBe("High Risk")
    })
  })