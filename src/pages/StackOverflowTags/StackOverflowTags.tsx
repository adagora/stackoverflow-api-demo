import { useCallback, useEffect, useState } from "react";
import { Alert, Typography } from "@mui/material";
import { Spinner } from "../../components/Spinner/Spinner";
import { TTable } from "../../components/Table/TTable";
import {
  PageSizeSelector,
  SortBySelector,
  SortDirectionSelector
} from "./helpers/ActionBySelector";
import { IStackOverflowTagsFilter } from "./@types/IStackOverflowTagsFilter";
import "./StackOverflowTags.css";
import { ITag } from "./@types/ITag";

const initialState: IStackOverflowTagsFilter = {
  sortedBy: "popular",
  sortedDirection: "desc",
  pageSize: 10,
  page: 0
};

function StackOverflowTags(): JSX.Element {
  const [state, setState] = useState(initialState);
  const [tags, setTags] = useState<ITag[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetchTags();
  }, [state.sortedBy, state.sortedDirection, state.pageSize, state.page]);

  const fetchTags = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.stackexchange.com/2.3/tags?page=${
          state.page + 1
        }&pagesize=${state.pageSize}&order=${state.sortedDirection}&sort=${
          state.sortedBy
        }&site=stackoverflow`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTags(data.items);
      setTotalCount(data.items.length);
    } catch (error: any) {
      setError(error.message as string);
    } finally {
      setLoading(false);
    }
  };

  const handleSetState = useCallback(
    (stateItem: Partial<IStackOverflowTagsFilter>): void =>
      setState((_state) => ({ ..._state, ...stateItem })),
    []
  );

  return (
    <div className="container">
      <Typography variant="h1" color={"black"}>
        Tags
      </Typography>

      <div className="content">
        <div className="content-top">
          <SortBySelector value={state.sortedBy} onChange={handleSetState} />
          <SortDirectionSelector
            value={state.sortedDirection}
            onChange={handleSetState}
          />
          <PageSizeSelector value={state.pageSize} onChange={handleSetState} />
        </div>
      </div>

      {error ? (
        <div className="content-alert-error">
          <Alert severity="error">
            Problem with fetching data, please try again later
          </Alert>
        </div>
      ) : null}

      {loading ? (
        <Spinner />
      ) : (
        <TTable
          rows={tags}
          page={state.page}
          rowsPerPage={state.pageSize}
          count={totalCount}
          onPageChange={(_, newPage) => {
            handleSetState({ page: newPage });
          }}
          onRowsPerPageChange={({ target }) => {
            handleSetState({ pageSize: +target.value });
            handleSetState({ page: 0 });
          }}
        />
      )}
    </div>
  );
}

export default StackOverflowTags;
