export interface SinglestoreQueryResponse {
  results: {
    rows: JSON []
  }[]
  error: {
    code: number;
    message: string;
  }
}
