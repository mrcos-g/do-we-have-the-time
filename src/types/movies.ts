export interface IResponse {
  results: ISearchResults[];
  page: number;
  total_pages: number;
}

export interface ISearchResults {
  id: number;
  title: string;
}

export interface IMovie {
  id: number;
  original_title: string;
  overview: string;
}
