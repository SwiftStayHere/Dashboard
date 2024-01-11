import { useEffect, useState } from "react";

export default function Input({ data,disabled }) {
  const [value, setValue] = useState(data?.value);
   
  useEffect(() => {
  
    if (data?.isIndex || data.isIndex === 0) {
      setValue(data.value + " " + (data?.isIndex + 1));
    }
  }, [data?.isIndex,data.value]);
     useEffect(() => {
       setValue(data.value);
     }, [data.value]);


  return (
    <>
      <input
        onChange={(e) => {
          setValue(e.target.value);
          data.setVal(e.target.value, data.i, setValue);
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && e.which === 13) {
            e.target.blur();
          }
        }}
        type="text"
        id={data.i}
        value={value}
        placeholder={data.placeholder}
        disabled={disabled}
      />
    </>
  );
}
