import { MissingParamError } from '../errors/missing-param-error'
import { customCodeBadRequest } from '../helper/http-helper'
import { SignUpController } from './signup'

describe('Signup Controller', () => {
  test('should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body:
      {
        // name: 'any',
        mail: 'mail@mail.com',
        password: 'anypass'
      }
    }
    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(customCodeBadRequest(3000, MissingParamError.name, new MissingParamError('name').message, 400).body)
  })
})

describe('Signup Controller', () => {
  test('should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body:
      {
        name: 'any',
        // mail: 'mail@mail.com',
        password: 'anypass'
      }
    }
    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(customCodeBadRequest(3000, MissingParamError.name, new MissingParamError('email').message, 400).body)
  })
})

describe('Signup Controller', () => {
  test('should return 400 if no password is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body:
      {
        name: 'any',
        mail: 'mail@mail.com'
        // password: 'anypass'
      }
    }
    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(customCodeBadRequest(3000, MissingParamError.name, new MissingParamError('email').message, 400).body)
  })
})
