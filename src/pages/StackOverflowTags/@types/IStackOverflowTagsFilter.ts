export interface IStackOverflowTagsFilter {
  sortedBy: "popular" | "activity" | "name";
  sortedDirection: "asc" | "desc";
  pageSize: number;
  page: number;
}
