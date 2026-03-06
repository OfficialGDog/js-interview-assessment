import { Button } from "@carbon/react";
import { ArrowsHorizontal } from "@carbon/icons-react";

export function SwapButton({ onClick, hidden }: { onClick?: () => void, hidden?: boolean }) {
  return (
    <Button
      kind="ghost"
      style={{ visibility: hidden ? "hidden" : "visible" }}
      renderIcon={ArrowsHorizontal}
      iconDescription="Swap currency control"
      onClick={onClick}
    />
  );
}
