import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { customCodeBadRequest } from '../helper/http-helper'
import { type Controller } from '../protocols/controller'
import { type EmailValidator } from '../protocols/email-validator'
import { type HttpResponse, type HttpRequest } from '../protocols/http'

export class SignUpController implements Controller {
  /* emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  } */
  constructor (
    private readonly emailvalidator: EmailValidator
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return customCodeBadRequest(3000, MissingParamError.name, new MissingParamError(field).message, 400)
      }
    }
    const { email } = httpRequest.body
    const isMailValid = this.emailvalidator.isValid(email)
    if (!isMailValid) {
      return customCodeBadRequest(3001, InvalidParamError.name, new InvalidParamError('email').message, 400)
    }
    return {
      statusCode: 200,
      body: {
        message: 'Sign-up successful'
      }
    }
  }
}
