import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TablePaginationProps
} from "@mui/material";

/**
 * Represents a single tag.
 */
interface ITag {
  /**
   * The name of the tag.
   */
  name: string;
  /**
   * The count of the tag.
   */
  count: number;
}

interface ITTable {
  rows: ITag[] | undefined;
}

/**
 * TTable component displays tabular data with pagination.
 */
export const TTable: React.FC<ITTable & TablePaginationProps> = ({
  /** The rows to display in the table. */
  rows,
  /** The current page number. */
  page,
  /** The number of rows per page. */
  rowsPerPage,
  /** The total number of rows. */
  count,
  /** Callback function triggered when the page is changed. */
  onPageChange,
  /** Callback function triggered when the rows per page is changed. */
  onRowsPerPageChange
}) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.length > 0 ? (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  return (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.count}</TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[10, 20, 30, 50, 100]}
      />
    </>
  );
};
