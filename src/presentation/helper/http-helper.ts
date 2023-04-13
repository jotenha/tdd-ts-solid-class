import { ServerError } from '../errors/server-error'
import { type HttpResponse } from '../protocols/http'

export const customCodeBadRequest = (errorcode: number, errorName: string, errorMessage: string, status?: number): HttpResponse => {
  let sCode = 400
  if (status !== undefined) {
    sCode = status
  }
  return {
    statusCode: sCode,
    body: {
      code: errorcode,
      error: errorName,
      message: errorMessage
    }
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
