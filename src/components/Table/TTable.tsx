import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TablePaginationProps,
  Checkbox
} from "@mui/material";
import { useState, useEffect, useRef } from "react";

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
  setSelectedPath: (path: string[]) => void;
  scrollToRow: string | null;
}

/**
 * TTable component displays tabular data with pagination and row selection.
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
  onRowsPerPageChange,
  /** The path to scroll to. */
  setSelectedPath,
  /** The row to scroll to. */
  scrollToRow
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});

  useEffect(() => {
    setSelectedPath(selected);
    if (scrollToRow && rowRefs.current[scrollToRow]) {
      rowRefs.current[scrollToRow]?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [selected, setSelectedPath, scrollToRow]);

  const handleSelect = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader={!scrollToRow} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.length > 0 ? (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  const isItemSelected = isSelected(item.name);
                  return (
                    <TableRow
                      key={item.name}
                      selected={isItemSelected}
                      onClick={() => handleSelect(item.name)}
                      ref={(el) => (rowRefs.current[item.name] = el)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.count}</TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No data</TableCell>
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
