export default function Input({ d, i, handler, type }) {
  return (
    <input
      type={type ?? "text"}
      value={d.value}
      onChange={(e) => {
        handler(e.target.value);
      }}
      placeholder={d.label}
      id={i}
    />
  );
}
