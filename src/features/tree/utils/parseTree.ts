import type { TreeNode } from "../types/tree.types";

export function parseTree(json: string): TreeNode[] {
  try {
    const data = JSON.parse(json) as TreeNode[];
    return data;
  } catch (err) {
    console.error("Invalid JSON", err);
    return [];
  }
}