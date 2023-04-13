export interface HttpResponse {
  statusCode: number
  body: any
}
export interface HttpRequest {
  body?: any
  query?: any
  headers?: any
  params?: any
}
