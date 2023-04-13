import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { customCodeBadRequest } from '../helper/http-helper'
import { type EmailValidator } from '../protocols/email-validator'
import { SignUpController } from './signup'

interface SutTypes {
  sut: SignUpController
  emailValidator: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  const emailValidator = new EmailValidatorStub()
  const sut = new SignUpController(emailValidator)
  return {
    sut,
    emailValidator
  }
}

describe('Signup Controller', () => {
  test('should return 400 if no name is provided', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    const httpRequest = {
      body:
      {
        name: 'any',
        // email: 'mail@mail.com'
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
    const { sut } = makeSut()
    const httpRequest = {
      body:
      {
        name: 'any',
        email: 'mail@mail.com'
        // password: 'anypass'
      }
    }
    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(customCodeBadRequest(3000, MissingParamError.name, new MissingParamError('password').message, 400).body)
  })
})

describe('Signup Controller', () => {
  test('should return 400 if invalid mail is provided', () => {
    const { sut, emailValidator } = makeSut()
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body:
      {
        name: 'any',
        email: 'invalid mail',
        password: 'anypass'
      }
    }
    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(customCodeBadRequest(3001, InvalidParamError.name, new InvalidParamError('email').message, 400).body)
  })
})

describe('Signup Controller', () => {
  test('should call EmailValidator with correct email', () => {
    const { sut, emailValidator } = makeSut()
    const isValidSpy = jest.spyOn(emailValidator, 'isValid')
    const httpRequest = {
      body:
      {
        name: 'any',
        email: 'any mail',
        password: 'anypass'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email) // needs to be same value as body
  })
})
