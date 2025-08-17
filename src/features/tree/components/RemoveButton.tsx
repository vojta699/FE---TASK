import React from "react";
import { useTreeStore } from "../store/treeStore";

interface RemoveButtonProps {
  id: string;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ id }) => {
  const { removeNode } = useTreeStore();

  const handleClick = async () => {
    if (window.confirm("Opravdu smazat tento uzel i všechny jeho děti?")) {
      await removeNode(id);
    }
  };

  return <button className="btn btn-danger btn-sm" onClick={handleClick}>Remove</button>;
};

export default RemoveButton;