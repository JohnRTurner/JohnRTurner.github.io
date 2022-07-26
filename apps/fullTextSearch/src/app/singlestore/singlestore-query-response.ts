export interface SinglestoreQueryResponse {
  results: {
    rows: object []
  }[]
  error: {
    code: number;
    message: string;
  }
}
