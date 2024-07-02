import { Button, ButtonProps } from "@mui/material";

export const RoundButton: React.FC<ButtonProps> = ({
  children,
  disabled,
  onClick,
  ...props
}): JSX.Element => {
  return (
    <Button
      aria-label="expand row"
      color="primary"
      size="small"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
};
