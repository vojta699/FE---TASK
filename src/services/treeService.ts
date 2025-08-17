export function validateTreeData(data: unknown) {
  if (!Array.isArray(data)) {
    throw new Error("Tree data must be an array");
  }
}