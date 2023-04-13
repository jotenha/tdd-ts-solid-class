import { MissingParamError } from '../errors/missing-param-error'
import { customCodeBadRequest } from '../helper/http-helper'
import { type Controller } from '../protocols/controller'
import { type HttpResponse, type HttpRequest } from '../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return customCodeBadRequest(3000, MissingParamError.name, new MissingParamError(field).message, 400)
      }
    }
    return {
      statusCode: 200,
      body: {
        message: 'Sign-up successful'
      }
    }
  }
}
