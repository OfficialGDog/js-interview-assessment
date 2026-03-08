import { Button } from "@carbon/react";
import { ArrowsHorizontal } from "@carbon/icons-react";

interface SwapButtonProps {
  onClick?: () => void;
  hidden?: boolean;
}

export function SwapButton({ onClick, hidden }: SwapButtonProps) {
  return (
    <Button
      kind="ghost"
      style={{ visibility: hidden ? "hidden" : "visible" }}
      renderIcon={ArrowsHorizontal}
      iconDescription="Swap currencies"
      onClick={onClick}
    />
  );
}
