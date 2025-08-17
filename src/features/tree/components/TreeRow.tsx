import React, { useState } from "react";
import RemoveButton from "./RemoveButton";
import TreeHeader from "./TreeHeader";
import type { TreeRowsProps } from "../types/tree.types";

const headersByLevel: Record<number, string[]> = {
  0: ["ID", "Name", "Gender", "Ability", "Minimal distance (km)", "Weight (kg)", "Born", "In space since", "Beer consumption (l/y)", "Knows the answer?", "Delete"],
  1: ["ID", "Character ID", "Is alive?", "Years", "Delete"],
  2: ["ID", "Nemesis ID", "Secrete Code", "Delete"],
};

const displayValue = (value: unknown): React.ReactNode => {
  if (value === undefined || value === null) {
    return <span className="dash">-</span>;
  }

  if (value instanceof Date) {
    return !isNaN(value.getTime()) ? value.toLocaleString("cs-CZ") : "-";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    if (value.trim() === "" || value.toLowerCase() === "null" || value.toLowerCase() === "unknown") {
      return "-";
    }
    return value;
  }

  return <span className="dash">-</span>;
};

const TreeRows: React.FC<TreeRowsProps> = ({ node, level, showHeader }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Object.values(node.children).some(group => group.records.length > 0);
  const headers = headersByLevel[level] || ["ID", "Delete"];

  const handleToggle = () => {
    if (hasChildren) setExpanded(prev => !prev);
  };

  return (
    <>
      {showHeader && level > 0 && <TreeHeader level={level} levelOffset={level} />}

      <tr>
        {Array(level).fill(null).map((_, i) => <td key={`pad-${i}`} />)}

        {headers.includes("ID") && (
          <td style={{ cursor: hasChildren ? "pointer" : "auto" }} onClick={handleToggle}>
            {hasChildren ? (expanded ? "▼ " : "▶ ") : null}
            {displayValue(
              node.data.idGenerated ? `⚠️` : node.data.id
            )}
          </td>
        )}
        {headers.includes("Name") && <td>{displayValue(node.data.name)}</td>}
        {headers.includes("Gender") && <td>{displayValue(node.data.gender)}</td>}
        {headers.includes("Ability") && <td>{displayValue(node.data.ability)}</td>}
        {headers.includes("Minimal distance (km)") && <td>{displayValue(node.data.minimalDistance)}</td>}
        {headers.includes("Weight (kg)") && <td>{displayValue(node.data.weight)}</td>}
        {headers.includes("Born") && <td>{displayValue(node.data.born)}</td>}
        {headers.includes("In space since") && <td>{displayValue(node.data.inSpaceSince)}</td>}
        {headers.includes("Beer consumption (l/y)") && <td>{displayValue(node.data.beerConsumption)}</td>}
        {headers.includes("Knows the answer?") && <td>{displayValue(node.data.knowsTheAnswer)}</td>}
        {headers.includes("Character ID") && <td>{displayValue(node.data.characterId)}</td>}
        {headers.includes("Is alive?") && <td>{displayValue(node.data.isAlive)}</td>}
        {headers.includes("Years") && <td>{displayValue(node.data.years)}</td>}
        {headers.includes("Nemesis ID") && <td>{displayValue(node.data.nemesisId)}</td>}
        {headers.includes("Secrete Code") && <td>{displayValue(node.data.secreteCode)}</td>}
        {headers.includes("Delete") && <td><RemoveButton id={node.data.id} /></td>}
      </tr>

      {expanded && Object.values(node.children).map(childGroup =>
        childGroup.records.map((child, index) => (
          <TreeRows
            key={child.data.id}
            node={child}
            level={level + 1}
            showHeader={index === 0}
          />
        ))
      )}
    </>
  );
};

export default TreeRows;
