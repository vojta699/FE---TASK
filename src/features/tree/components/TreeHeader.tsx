import React from "react";
import type { TreeHeadersProps } from "../types/tree.types";


const TreeHeaders: React.FC<TreeHeadersProps> = ({ level, levelOffset = 0, headersByLevel }) => {
  const headers = headersByLevel[level] || ["ID", "Delete"];

  return (
    <tr>
      {Array(levelOffset).fill(null).map((_, i) => <th key={`pad-header-${i}`} />)}
      {headers.map((h) => <th key={h}>{h}</th>)}
    </tr>
  );
};

export default TreeHeaders;