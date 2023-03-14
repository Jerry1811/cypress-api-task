export const requestTemplate = (method, url, key, host) => {
  cy.request({
    method: method,
    url: url,
    failOnStatusCode: false,
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': host,
    },
  }).as('match')
}

export const url = {
  valid: '/api/basketball/match/10247060',
  invalid: '/api/basketball/match/invalid',
}

export const headers = {
  valid: {
    key: '4cdec72919mshc504086a621d27ap117e6fjsn67bb70e06531',
    host: 'basketapi1.p.rapidapi.com',
  },
  invalid: {
    key: 'some_key',
    host: 'some_host',
  },
}
