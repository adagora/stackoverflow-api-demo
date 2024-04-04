export const sortOptions = [
  { label: "Name", value: "name" },
  { label: "Activity", value: "activity" },
  { label: "Popular", value: "popular" }
];

export const directionOptions = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" }
];

export const pageSizeOptions = [10, 20, 30, 50, 100].map((value) => ({
  label: value.toString(),
  value: value
}));
