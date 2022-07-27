export interface SinglestoreQueryResponse {
  results: {
    rows: any []
  }[]
  error: {
    code: number;
    message: string;
  }
}
