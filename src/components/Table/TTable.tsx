import { useState, useEffect, useRef } from "react";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ITag } from "../../pages/StackOverflowTags/@types/ITag";
import { RoundButton } from "../RoundButton/RoundButton";
import { TCollapse } from "../Collapse/TCollapse";
import { TTooltip } from "../Tooltip/TTooltip";

interface ITTable {
  rowsData: ITag[] | undefined;
  setSelectedPath: (path: string[]) => void;
  scrollToRow: string | null;
}

/**
 * TTable component displays tabular data with pagination, row selection, and collapsible detail rows.
 */
export const TTable: React.FC<ITTable & TablePaginationProps> = ({
  rowsData,
  page,
  rowsPerPage,
  count,
  onPageChange,
  onRowsPerPageChange,
  setSelectedPath,
  scrollToRow
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

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

  const handleExpand = (
    event: React.MouseEvent<HTMLButtonElement>,
    name: string
  ) => {
    event.stopPropagation();
    setExpanded(expanded === name ? null : name);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const isExpanded = (name: string) => expanded === name;

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 440, maxWidth: 500 }}>
        <Table stickyHeader={!scrollToRow} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData && rowsData.length > 0 ? (
              rowsData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  const isItemSelected = isSelected(item.name);
                  return (
                    <>
                      <TableRow
                        key={item.name}
                        selected={isItemSelected}
                        onClick={() => handleSelect(item.name)}
                        ref={(element) =>
                          (rowRefs.current[item.name] = element)
                        }
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell width={1}>
                          <TTooltip
                            title={
                              !item.collectives || item.collectives.length === 0
                                ? "No details"
                                : "Show details"
                            }
                          >
                            <RoundButton
                              onClick={(e) => handleExpand(e, item.name)}
                              disabled={
                                !item.collectives ||
                                item.collectives.length === 0
                              }
                            >
                              {isExpanded(item.name) ? (
                                <ExpandLessIcon fontSize="inherit" />
                              ) : (
                                <ExpandMoreIcon fontSize="inherit" />
                              )}
                            </RoundButton>
                          </TTooltip>
                        </TableCell>
                      </TableRow>
                      {isExpanded(item.name) && (
                        <TableRow>
                          <TableCell colSpan={4}>
                            <TCollapse in={isExpanded(item.name)}>
                              {item.collectives &&
                              item.collectives.length > 0 ? (
                                <ul>
                                  {item.collectives.map((collective) => (
                                    <li
                                      key={collective.slug}
                                      style={{
                                        listStyleType: "none"
                                      }}
                                    >
                                      <strong>{collective.name}:</strong>{" "}
                                      {collective.description}
                                      {collective.external_links.map((link) => (
                                        <div key={link.link}>
                                          <a
                                            href={link.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {link.type}
                                          </a>
                                        </div>
                                      ))}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                "No collectives available"
                              )}
                            </TCollapse>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No data</TableCell>
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
