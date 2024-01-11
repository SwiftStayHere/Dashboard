import React from 'react'
import Select from "../basic/Select";
import Input from "./Input";


const Item = ({data}) => {
    return (
        <div className="item">
          <span>
            {data.name} {data.op && <small>({data.op})</small>}
          </span>
          {data.checkbox && (
            <>
              <input id={data.name} type="checkbox" />
              <label htmlFor={data.name}>{data.checkbox}</label>
            </>
          )}
          {(data?.options && ((data?.handler && <Select data={data.options} handler={(d) => data.handler(d)} activeValue={data.activeValue} />) || <Select data={data.options} activeValue={data.activeValue}/>)) || (
            <Input data={{ value: data.value, setVal: (d, i, setValue) => data.handler(d, i, setValue), placeholder: data.placeholder }} />
          )}
        </div>
      );
}

export default Item