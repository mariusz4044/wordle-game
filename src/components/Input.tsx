export default function Input({ value }: { value: string }) {
  return <input placeholder={`${value}`} disabled />;
}
