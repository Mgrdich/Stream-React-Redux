import React from "react";

const TableHead = props => {
  // console.log(props.columns);

  const { columns } = props;
  return (
    <>
      <thead className="table-dark">
        <tr>
          {columns.map(it => {
            return <th key={it.label || it.key}>{(it.label)?it.label:null}</th>;
          })}
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
