export default function TextArea({ pls, value, handler, name }) {
  return (
    <textarea
      name={name}
      placeholder={pls}
      value={value}
      onChange={(e) => handler(e.target.value)}
    ></textarea>
  );
}
