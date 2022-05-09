import CheckboxIcon from './CheckboxIcon';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function StaticCheckbox({ checked, ...props }: InputProps) {
  return (
    <div className="absolute left-0">
      <CheckboxIcon checked={checked} />
      <input checked={checked} {...props} className="invisible" />
    </div>
  );
}
