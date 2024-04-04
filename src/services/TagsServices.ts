import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IStackOverflowTagsFilter } from "../pages/StackOverflowTags/@types/IStackOverflowTagsFilter";
import { ITag } from "../pages/StackOverflowTags/@types/ITag";

export const secondInMilliseconds = 1000;
export const minuteInMilliseconds = secondInMilliseconds * 60;
export const hourInMilliseconds = minuteInMilliseconds * 60;

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
        `https://api.stackexchange.com/2.3/tags?page=${
          state.page + 1
        }&pagesize=${state.pageSize}&order=${state.sortedDirection}&sort=${
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
