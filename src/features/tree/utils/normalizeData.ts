import { v4 as uuid } from "uuid";
import type { TreeNode } from "../types/tree.types";

function normalizeValue(value: unknown): unknown {
    if (value === undefined || value === null) return undefined;

    if (value instanceof Date) {
        return !isNaN(value.getTime()) ? value : undefined;
    }

    if (typeof value === "boolean") return value;

    if (typeof value === "string") {
        if (value.trim() === "" || value.toLowerCase() === "null" || value.toLowerCase() === "unknown") return undefined;
        return value;
    }

    if (typeof value === "number") return value;

    return undefined;
}

function normalizeName(value: unknown): string | undefined {
    const v = normalizeValue(value);
    if (typeof v !== "string") return undefined;
    return v === "Deep Thought" ? `💻 ${v}` : v;
}

function normalizeGender(value: string | undefined): string | undefined {
    if (!value || value.trim() === "") return undefined;
    const v = value.trim().toLowerCase();
    if (["m", "male"].includes(v)) return "Male";
    if (["f", "female"].includes(v)) return "Female";
    if (["mouse"].includes(v)) return "Mouse";
    return value;
}

function normalizeAbility(value: string | undefined | null): string | undefined {
    if (!value || value.toLowerCase() === "null" || value.toLowerCase() === "unknown") return undefined;
    return value
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function normalizeBoolean(value: string | undefined): boolean | undefined {
    if (!value) return undefined;
    const v = value.trim().toLowerCase();
    if (["true", "1", "yes"].includes(v)) return true;
    if (["false", "0", "no"].includes(v)) return false;
    return undefined;
}

function safeParseDate(value: string | undefined): Date | undefined {
    if (!value) return undefined;
    const cleaned = value.replace("CET", "+0100").replace("CEST", "+0200");
    const timestamp = Date.parse(cleaned);
    if (isNaN(timestamp)) return undefined;
    return new Date(timestamp);
}

function normalizeChildren(children: any): Record<string, { records: TreeNode[] }> {
    if (!children) return {};
    const result: Record<string, { records: TreeNode[] }> = {};

    for (const key in children) {
        const group = children[key];
        result[key] = {
            records: group.records.map((child: any) => {
                const childData: TreeNode["data"] = {
                    id: child.data.ID || uuid(),
                    name: normalizeName(child.data["Name"]),
                    gender: normalizeGender(child.data["Gender"]),
                    ability: normalizeAbility(child.data["Ability"]),
                    minimalDistance: child.data["Minimal distance"] ? parseFloat(child.data["Minimal distance"]) : undefined,
                    weight: child.data["Weight"] ? parseFloat(child.data["Weight"]) : undefined,
                    born: safeParseDate(child.data["Born"]),
                    inSpaceSince: safeParseDate(child.data["In space since"]),
                    beerConsumption: child.data["Beer consumption (l/y)"] ? parseInt(child.data["Beer consumption (l/y)"], 10) : undefined,
                    knowsTheAnswer: normalizeBoolean(child.data["Knows the answer?"]),
                    characterId: child.data["Character ID"],
                    isAlive: normalizeBoolean(child.data["Is alive?"]),
                    years: child.data["Years"] ? parseInt(child.data["Years"], 10) : undefined,
                    nemesisId: child.data["Nemesis ID"],
                    secreteCode: child.data["Secrete Code"],
                };

                return {
                    data: childData,
                    children: normalizeChildren(child.children),
                };
            }),
        };
    }

    return result;
}

export function normalizeData(raw: any[]): TreeNode[] {
    const seen = new Set<string>();

    function getUniqueId(id: string | undefined) {
        const finalId = !id || seen.has(id) ? uuid() : id;
        seen.add(finalId);
        return finalId;
    }

    return raw.map(item => {
        const originalId = item.data?.ID;
        const idGenerated = !originalId || seen.has(originalId);
        const data: TreeNode["data"] = {
            id: getUniqueId(item.data?.ID), 
            idGenerated,
            name: normalizeName(item.data["Name"]),
            gender: normalizeGender(item.data["Gender"]),
            ability: normalizeAbility(item.data["Ability"]),
            minimalDistance: item.data["Minimal distance"] ? parseFloat(item.data["Minimal distance"]) : undefined,
            weight: item.data["Weight"] ? parseFloat(item.data["Weight"]) : undefined,
            born: safeParseDate(item.data["Born"]),
            inSpaceSince: safeParseDate(item.data["In space since"]),
            beerConsumption: item.data["Beer consumption (l/y)"] ? parseInt(item.data["Beer consumption (l/y)"], 10) : undefined,
            knowsTheAnswer: normalizeBoolean(item.data["Knows the answer?"]),
            characterId: item.data["Character ID"],
            isAlive: normalizeBoolean(item.data["Is alive?"]),
            years: item.data["Years"] ? parseInt(item.data["Years"], 10) : undefined,
            nemesisId: item.data["Nemesis ID"],
            secreteCode: item.data["Secrete Code"],
        };

        return {
            data,
            children: normalizeChildren(item.children),
        };
    });
}
