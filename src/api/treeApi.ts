import axios from "axios";
import type { TreeNode } from "../features/tree/types/tree.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const fetchTree = async (): Promise<TreeNode[]> => {
  const res = await axios.get<TreeNode[]>(`${API_URL}/tree`);
  return res.data;
};

export const deleteNode = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/tree/${id}`);
};