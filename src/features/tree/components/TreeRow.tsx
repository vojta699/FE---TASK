import React, { useState } from "react";
import RemoveButton from "./RemoveButton";
import TreeHeader from "./TreeHeader";
import { formatValue } from "../utils/format";
import type { TreeRowsProps } from "../types/tree.types";

const TreeRows: React.FC<TreeRowsProps> = ({ node, level, showHeader, headersByLevel }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Object.values(node.children).some(group => group.records.length > 0);
  const headers = headersByLevel[level] || ["ID", "Delete"];

  const handleToggle = () => {
    if (hasChildren) setExpanded(prev => !prev);
  };

  return (
    <>
      {showHeader && level > 0 && (
        <TreeHeader level={level} levelOffset={level} headersByLevel={headersByLevel} />
      )}

      <tr>
        {Array(level).fill(null).map((_, i) => <td key={`pad-${i}`} />)}

        {headers.includes("ID") && (
          <td style={{ cursor: hasChildren ? "pointer" : "auto" }} onClick={handleToggle}>
            {hasChildren ? (expanded ? "▼ " : "▶ ") : null}
            {formatValue(node.data.idGenerated ? "⚠️" : node.data.id)}
          </td>
        )}
        {headers.includes("Name") && <td>{formatValue(node.data.name)}</td>}
        {headers.includes("Gender") && <td>{formatValue(node.data.gender)}</td>}
        {headers.includes("Ability") && <td>{formatValue(node.data.ability)}</td>}
        {headers.includes("Minimal distance (km)") && <td>{formatValue(node.data.minimalDistance)}</td>}
        {headers.includes("Weight (kg)") && <td>{formatValue(node.data.weight)}</td>}
        {headers.includes("Born") && <td>{formatValue(node.data.born)}</td>}
        {headers.includes("In space since") && <td>{formatValue(node.data.inSpaceSince)}</td>}
        {headers.includes("Beer consumption (l/y)") && <td>{formatValue(node.data.beerConsumption)}</td>}
        {headers.includes("Knows the answer?") && <td>{formatValue(node.data.knowsTheAnswer)}</td>}
        {headers.includes("Character ID") && <td>{formatValue(node.data.characterId)}</td>}
        {headers.includes("Is alive?") && <td>{formatValue(node.data.isAlive)}</td>}
        {headers.includes("Years") && <td>{formatValue(node.data.years)}</td>}
        {headers.includes("Nemesis ID") && <td>{formatValue(node.data.nemesisId)}</td>}
        {headers.includes("Secrete Code") && <td>{formatValue(node.data.secreteCode)}</td>}
        {headers.includes("Delete") && <td><RemoveButton id={node.data.id} /></td>}
      </tr>

      {expanded && Object.values(node.children).map(childGroup =>
        childGroup.records.map((child, index) => (
          <TreeRows
            key={child.data.id}
            node={child}
            level={level + 1}
            showHeader={index === 0}
            headersByLevel={headersByLevel}
          />
        ))
      )}
    </>
  );
};

export default TreeRows;