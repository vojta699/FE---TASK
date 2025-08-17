import React from "react";

interface TreeHeadersProps {
  level: number;
  levelOffset?: number;
}

const headersByLevel: Record<number, string[]> = {
  0: ["ID", "Name", "Gender", "Ability", "Minimal distance", "Weight", "Born", "In space since", "Beer consumption (l/y)", "Knows the answer?", "Delete"],
  1: ["ID", "Character ID", "Is alive?", "Years", "Delete"],
  2: ["ID", "Nemesis ID", "Secrete Code", "Delete"],
};

const TreeHeaders: React.FC<TreeHeadersProps> = ({ level, levelOffset = 0 }) => {
  const headers = headersByLevel[level] || ["ID", "Delete"];

  return (
    <tr>
      {Array(levelOffset).fill(null).map((_, i) => <th key={`pad-header-${i}`} />)}
      {headers.map((h) => <th key={h}>{h}</th>)}
    </tr>
  );
};

export default TreeHeaders;