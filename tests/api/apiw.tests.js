const fetch = require('node-fetch')

const baseURL = 'http://localhost:3000';

const _fetch = async (method, path, body) => {
    body = typeof body === 'string' ? body : JSON.stringify(body)
    const headers = { 'Content-Type': 'application/json' }
    const res = await fetch(path, { method, body, headers })
    if(res.status < 200 || res.status > 299)
      throw new Error(`API returned status ${res.status}`)
    return res.json()
  }

  describe('API tests', () => {

    test('GET /api/calculator', async () => {
      const vacations = await _fetch('get', 'http://localhost:3000/api/vacations')
      expect(vacations.json).not.toBe("High Risk")
    })
  })