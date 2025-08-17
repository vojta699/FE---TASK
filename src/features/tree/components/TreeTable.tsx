import React from "react";
import { Table } from "react-bootstrap";
import { useTreeStore } from "../store/treeStore";
import TreeRow from "./TreeRow";
import TreeHeader from "./TreeHeader";
import type { TreeNode } from "../types/tree.types";
import "../styles/tree.style.css"

const TreeTable: React.FC = () => {
  const { data, fetchData } = useTreeStore();

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const headersByLevel: Record<number, string[]> = {
    0: ["ID", "Name", "Gender", "Ability", "Minimal distance (km)", "Weight (kg)", "Born", "In space since", "Beer consumption (l/y)", "Knows the answer?", "Delete"],
    1: ["ID", "Character ID", "Is alive?", "Years", "Delete"],
    2: ["ID", "Nemesis ID", "Secrete Code", "Delete"],
  };
  

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <TreeHeader level={0} headersByLevel={headersByLevel} />
      </thead>
      <tbody>
        {data.map((node: TreeNode) => (
          <TreeRow key={node.data.id} node={node} level={0} showHeader={false} headersByLevel={headersByLevel} />
        ))}
      </tbody>
    </Table>
  );
};

export default TreeTable;