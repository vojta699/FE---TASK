import type { TreeNode } from "../types/tree.types";

export function removeNodeById(nodes: TreeNode[], id: string): TreeNode[] {
  return nodes
    .filter((node) => node.data.id !== id)
    .map((node) => ({
      ...node,
      children: Object.fromEntries(
        Object.entries(node.children).map(([key, childGroup]) => [
          key,
          {
            ...childGroup,
            records: removeNodeById(childGroup.records, id),
          },
        ])
      ),
    }));
}