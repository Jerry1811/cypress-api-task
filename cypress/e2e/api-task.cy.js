import { requestTemplate, headers, url } from '../fixtures/api-task.util'

describe('API test cases for a GET request', () => {
  it('send a valid GET request', () => {
    requestTemplate('GET', url.valid, headers.valid.key, headers.valid.host)
    cy.get('@match').its('status').should('eq', 200)
    cy.get('@match').then((response) => {
      cy.log(JSON.stringify(response.body))
    })
  })

  it('send a valid GET request with invalid endpoint', () => {
    requestTemplate('GET', url.invalid, headers.valid.key, headers.valid.host)
    cy.get('@match').then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal('Bad Request')
      expect(response.body._links.self.href).to.equal('/api/basketball/match/invalid?')
    })
  })

  it('send a valid GET request with invalid headers', () => {
    requestTemplate('GET', url.valid, headers.invalid.key, headers.invalid.host)
    cy.get('@match').then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.messages).to.include("The host you've provided is invalid.")
      expect(response.allRequestResponses[0]['Request Headers']['X-RapidAPI-Key']).to.equal('some_key')
      expect(response.allRequestResponses[0]['Request Headers']['X-RapidAPI-Host']).to.equal('some_host')
    })
  })

  it('send a GET request with wrong request method', () => {
    requestTemplate('PATCH', url.valid, headers.valid.key, headers.valid.host)
    cy.get('@match').then((response) => {
      expect(response.status).to.equal(404)
    })
  })
})
