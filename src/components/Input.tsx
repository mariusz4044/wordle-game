export default function Input({
  value,
  status,
}: {
  value: string;
  status: string | null;
}) {
  const char = value ? <div className={"char"}>{value}</div> : "";

  let className = "word-input ";
  if (status) className += `${status} position-checked`;

  return <div className={className}>{char}</div>;
}
