
export const formatValue = (value: unknown): string | number => {
  if (value == null) return "-";
  if (value instanceof Date && !isNaN(value.getTime())) return value.toLocaleString();
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return value;
  if (typeof value === "string") return value.trim() || "-";
  return "-";
};