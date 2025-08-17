import React from "react";
import { useTreeStore } from "../store/treeStore";
import TreeRow from "./TreeRow";
import type { TreeNode } from "../types/tree.types";

const TreeTable: React.FC = () => {
  const { data, fetchData } = useTreeStore();
    console.log(data);
    
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Ability</th>
          <th>Minimal distance</th>
          <th>Weight</th>
          <th>Born</th>
          <th>In space since</th>
          <th>Beer consumption (l/y)</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((node: TreeNode) => (
          <TreeRow key={node.data.id} node={node} level={0} />
        ))}
      </tbody>
    </table>
  );
};

export default TreeTable;