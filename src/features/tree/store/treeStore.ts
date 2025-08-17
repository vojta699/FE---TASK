import { create } from "zustand";
import type { TreeState } from "../types/tree.types";
import { removeNodeById } from "../utils/removeNode";
import { normalizeData } from "../utils/normalizeData";
import * as treeApi from "../../../api/treeApi";

export const useTreeStore = create<TreeState>((set, get) => ({
  data: [],

  fetchData: async () => {
    try {
      const res = await treeApi.fetchTree();
      const normalized = normalizeData(res);
      set({ data: normalized });
    } catch (err) {
      console.error("❌ Failed to fetch tree data:", err);
    }
  },

  removeNode: async (id: string) => {
    try {
      await treeApi.deleteNode(id);
      const newData = removeNodeById(get().data, id);
      set({ data: newData });
    } catch (err) {
      console.error(`❌ Failed to remove node ${id}:`, err);
    }
  },
}));