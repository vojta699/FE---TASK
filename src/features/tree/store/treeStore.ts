import { create } from "zustand";
import axios from "axios";
import type { TreeNode } from "../types/tree.types";
import { removeNodeById } from "../utils/removeNode";
import { normalizeData } from "../utils/normalizeData";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface TreeState {
  data: TreeNode[];
  fetchData: () => Promise<void>;
  removeNode: (id: string) => Promise<void>;
}

export const useTreeStore = create<TreeState>((set, get) => ({
  data: [],

  fetchData: async () => {
    try {
      const res = await axios.get(`${API_URL}/tree`);
      const normalized = normalizeData(res.data);
      set({ data: normalized });
    } catch (err) {
      console.error("❌ Failed to fetch tree data:", err);
    }
  },

  removeNode: async (id: string) => {
    try {
      await axios.delete(`${API_URL}/tree/${id}`);
      const newData = removeNodeById(get().data, id);
      set({ data: newData });
    } catch (err) {
      console.error(`❌ Failed to remove node ${id}:`, err);
    }
  },
}));