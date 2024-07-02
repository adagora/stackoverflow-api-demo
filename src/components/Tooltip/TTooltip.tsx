import React from "react";
import { Tooltip, TooltipProps } from "@mui/material";

interface TTooltipProps extends TooltipProps {
  children: React.ReactElement;
}

export const TTooltip: React.FC<TTooltipProps> = ({
  ...props
}): JSX.Element => {
  return <Tooltip {...props}>{props.children}</Tooltip>;
};
