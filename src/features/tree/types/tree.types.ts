export interface TreeNode {
  data: Record<string, string>;
  children: Record<string, { records: TreeNode[] }>;
}