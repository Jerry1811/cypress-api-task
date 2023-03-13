describe('API test cases for a GET request', () => {
  it('send a valid GET request', () => {
    cy.request({
      method: 'GET',
      url: 'https://basketapi1.p.rapidapi.com/api/basketball/match/10247060',
      headers: {
        'X-RapidAPI-Key': '4cdec72919mshc504086a621d27ap117e6fjsn67bb70e06531',
        'X-RapidAPI-Host': 'basketapi1.p.rapidapi.com',
      },
    }).as('match')
    cy.get('@match').its('status').should('eq', 200)
    cy.get('@match').then((response) => {
      cy.log(JSON.stringify(response.body))
    })
  })

  it('send a valid GET request with invalid endpoint', () => {
    cy.request({
      method: 'GET',
      url: 'https://basketapi1.p.rapidapi.com/api/basketball/match/invalid',
      failOnStatusCode: false,
      headers: {
        'X-RapidAPI-Key': '4cdec72919mshc504086a621d27ap117e6fjsn67bb70e06531',
        'X-RapidAPI-Host': 'basketapi1.p.rapidapi.com',
      },
    }).as('match')
    cy.get('@match').then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal('Bad Request')
      expect(response.body._links.self.href).to.equal('/api/basketball/match/invalid?')
    })
  })

  it('send a valid GET request with invalid headers', () => {
    cy.request({
      method: 'GET',
      url: 'https://basketapi1.p.rapidapi.com/api/basketball/match/10247060',
      failOnStatusCode: false,
      headers: {
        'X-RapidAPI-Key': 'some_key',
        'X-RapidAPI-Host': 'some_host',
      },
    }).as('match')
    cy.get('@match').then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.messages).to.include("The host you've provided is invalid.")
      expect(response.allRequestResponses[0]['Request Headers']['X-RapidAPI-Key']).to.equal('some_key')
      expect(response.allRequestResponses[0]['Request Headers']['X-RapidAPI-Host']).to.equal('some_host')
    })
  })
})
