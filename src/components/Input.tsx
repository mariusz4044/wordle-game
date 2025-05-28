export default function Input({ value }: { value: number }) {
  return <input placeholder={`${value}`} disabled />;
}
