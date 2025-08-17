import React from "react";
import { Table } from "react-bootstrap";
import { useTreeStore } from "../store/treeStore";
import TreeRow from "./TreeRow";
import TreeHeader from "./TreeHeader";
import type { TreeNode } from "../types/tree.types";

const TreeTable: React.FC = () => {
  const { data, fetchData } = useTreeStore();

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <TreeHeader level={0} />
      </thead>
      <tbody>
        {data.map((node: TreeNode) => (
          <TreeRow key={node.data.id} node={node} level={0} showHeader={false} />
        ))}
      </tbody>
    </Table>
  );
};

export default TreeTable;