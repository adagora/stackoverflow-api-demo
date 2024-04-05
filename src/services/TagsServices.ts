import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IStackOverflowTagsFilter } from "../pages/StackOverflowTags/@types/IStackOverflowTagsFilter";
import { ITag } from "../pages/StackOverflowTags/@types/ITag";
import { API_BASE_URL, hourInMilliseconds } from "../helpers/const";

export function useGetTags(
  state: IStackOverflowTagsFilter,
  enabled?: boolean
): UseQueryResult<ITag[], Error> {
  return useQuery<{ items: ITag[] }, Error, ITag[], any>({
    queryKey: [
      "tags",
      state.sortedBy,
      state.sortedDirection,
      state.pageSize,
      state.page
    ],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/tags?page=${state.page + 1}&order=${state.sortedDirection}&sort=${
          state.sortedBy
        }&site=stackoverflow`
      );
      return response.json();
    },
    select: (data) => data.items,
    enabled,
    staleTime: hourInMilliseconds // use cache, instead of fetching
  });
}
