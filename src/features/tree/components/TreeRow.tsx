import React, { useState } from "react";
import type { TreeNode } from "../types/tree.types";
import RemoveButton from "./RemoveButton";

interface TreeRowProps {
  node: TreeNode;
  level: number;
}

const TreeRow: React.FC<TreeRowProps> = ({ node, level }) => {
  const [expanded, setExpanded] = useState(true);

  const hasChildren = Object.values(node.children).some(
    (childGroup) => childGroup.records.length > 0
  );


  return (
    <>
      <tr>
        <td>{node.data.id}</td>
        <td style={{ paddingLeft: `${level * 20}px`, cursor: hasChildren ? "pointer" : "auto" }}
          onClick={() => hasChildren && setExpanded(!expanded)}>
          {hasChildren ? (expanded ? "▼ " : "▶ ") : null}
          {node.data.name}
        </td>
        <td>{node.data.gender}</td>
        <td>{node.data.ability}</td>
        <td>{node.data.minimalDistance}</td>
        <td>{node.data.weight}</td>
        <td>{node.data.born}</td>
        <td>{node.data.inSpaceSince}</td>
        <td>{node.data.beerConsumption}</td>
        <td>{node.data.knowsTheAnswer}</td>
        <td>
          <RemoveButton id={node.data.id} />
        </td>
      </tr>

      {expanded &&
        Object.values(node.children).map((childGroup) =>
          childGroup.records.map((child) => (
            <TreeRow key={child.data.id} node={child} level={level + 1} />
          ))
        )}
    </>
  );
};

export default TreeRow;