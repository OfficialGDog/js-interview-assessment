import { NumberInput } from "@carbon/react";

type CurrencyInputProps = {
  id: string;
  label: string;
  value: string | number;
  onChange: (id: string, value: number) => void;
}

export function CurrencyInput({
  id,
  label,
  value,
  onChange,
}: CurrencyInputProps) {
  return (
    <NumberInput
      id={id}
      label={label}
      value={value}
      hideSteppers={true}
      hideLabel={true}
      min={0}
      onChange={(_, state) => {
        onChange(id, Number(state.value));
      }}
    />
  );
}
