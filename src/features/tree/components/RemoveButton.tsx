import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useTreeStore } from "../store/treeStore";
import ConfirmModal from "./ConfirmModal";
import type { RemoveButtonProps } from "../types/removeButton.types";

const RemoveButton: React.FC<RemoveButtonProps> = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const { removeNode } = useTreeStore();

  const handleConfirm = async () => {
    await removeNode(id);
    setShowModal(false);
  };

  return (
    <>
      <Button variant="danger" size="sm" onClick={() => setShowModal(true)}>
        Remove
      </Button>

      <ConfirmModal
        show={showModal}
        title="Delete Confirmation"
        body="Are you sure you want to delete this node and all its children?"
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default RemoveButton;