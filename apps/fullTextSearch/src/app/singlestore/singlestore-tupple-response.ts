export interface SinglestoreTuppleResponse {
  results: {
    columns: {
      name: string;
      dataType: string;
      nullable: boolean;
    }[]
    rows: string[][]
  }[]
  error: {
    code: number;
    message: string;
  }
}
