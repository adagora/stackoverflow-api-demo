import { Box, Collapse, CollapseProps } from "@mui/material";

export const TCollapse: React.FC<CollapseProps> = ({
  children,
  ...props
}): JSX.Element => {
  return (
    <Collapse timeout="auto" unmountOnExit {...props}>
      <Box margin={1}>{children}</Box>
    </Collapse>
  );
};
