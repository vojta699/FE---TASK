import { v4 as uuid } from "uuid";
import type { TreeNode } from "../types/tree.types";

export function normalizeData(raw: any[]): TreeNode[] {
  const seen = new Set<string>();

  return raw.map((item) => {
    const d = item.data ?? {};
    const id = d.ID ?? uuid();
    const finalId = seen.has(id) ? uuid() : id;
    seen.add(finalId);

    return {
      ...item,
      data: {
        ...d,
        id: finalId,
        name: d.Name ?? "",
        gender: d.Gender ?? "",
        ability: d.Ability ?? "",
        minimalDistance: d["Minimal distance"] ?? "",
        weight: d["Weight"] ?? "",
        born: d["Born"] ?? "",
        inSpaceSince: d["In space since"] ?? "",
        beerConsumption: d["Beer consumption (l/y)"] ?? "",
        knowsTheAnswer: d["Knows the answer?"] ?? "",
        characterId: d["Character ID"] ?? "",
        nemesisId: d["Nemesis ID"] ?? "",
        isAlive: d["Is alive?"] ?? "",
        years: d["Years"] ?? "",
        secreteCode: d["Secrete Code"] ?? "",
      },
      children: item.children || {},
    };
  });
}