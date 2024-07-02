import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useState, useEffect } from "react";

interface BreadcrumbProps {
  selectedPath: string[];
  onSelectedPathChange?: (path: string) => void;
}

export const TBreadcrumb: React.FC<BreadcrumbProps> = ({
  selectedPath,
  onSelectedPathChange
}) => {
  const [pathArray, setPathArray] = useState<string[]>([]);

  useEffect(() => {
    if (selectedPath) {
      setPathArray(selectedPath.filter((p) => p));
    }
  }, [selectedPath]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    path: string
  ) => {
    e.preventDefault();
    if (onSelectedPathChange) {
      onSelectedPathChange(path);
    }
  };

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        "& a": {
          textDecoration: "none",
          color: "inherit"
        }
      }}
    >
      {pathArray.map((path) => {
        const isLast = path === pathArray[pathArray.length];
        return isLast ? (
          <Typography color="text.primary" key={path}>
            {path}
          </Typography>
        ) : (
          <Link key={path} href="#" onClick={(e) => handleLinkClick(e, path)}>
            {path}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
