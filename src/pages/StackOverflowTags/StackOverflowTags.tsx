import { useCallback, useState } from "react";
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
import { useGetTags } from "../../services/TagsServices";
import BreadcrumbNavigation from "../../components/Breadcrumbs/Breadcrumbs";

const initialState: IStackOverflowTagsFilter = {
  sortedBy: "popular",
  sortedDirection: "desc",
  pageSize: 10,
  page: 0
};

function StackOverflowTags(): JSX.Element {
  const [state, setState] = useState(initialState);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { data: tags, isLoading, isError, error, refetch } = useGetTags(state);

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
      <div className="container-breadcrumb">
        <BreadcrumbNavigation
          selectedPath={selectedPath}
          onSelectedPathChange={(path) => setSelectedTag(path)}
        />
      </div>
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

      {isError ? (
        <div className="content-alert-error">
          <Alert severity="error">
            Problem with fetching data, please try again later. Error:
            {error.message}
            <button onClick={() => refetch()}>
              <Typography variant="button">Try again</Typography>
            </button>
          </Alert>
        </div>
      ) : null}

      {isLoading ? (
        <Spinner />
      ) : (
        <TTable
          rows={tags}
          page={state.page}
          rowsPerPage={state.pageSize}
          count={tags?.length || 0}
          onPageChange={(_, newPage) => {
            handleSetState({ page: newPage });
          }}
          onRowsPerPageChange={({ target }) => {
            handleSetState({ pageSize: +target.value });
            handleSetState({ page: 0 });
          }}
          setSelectedPath={setSelectedPath}
          scrollToRow={selectedTag}
        />
      )}
    </div>
  );
}

export default StackOverflowTags;
