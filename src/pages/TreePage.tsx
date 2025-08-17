import React from "react";
import TreeTable from "../features/tree/components/TreeTable";

const TreePage: React.FC = () => {
  return (
    <div className="container mt-3">
      <h2>Hierarchy Table</h2>
      <TreeTable />
    </div>
  );
};

export default TreePage;