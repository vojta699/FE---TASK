export interface TreeNode {
  data: {
    id: string;
    name?: string;
    gender?: string;
    ability?: string;

    minimalDistance?: number;
    weight?: number;

    born?: Date;
    inSpaceSince?: Date;

    beerConsumption?: number;
    knowsTheAnswer?: boolean;

    characterId?: string;
    nemesisId?: string;
    isAlive?: boolean;
    years?: number;
    secreteCode?: string;

    // fallback for unknown types
    [key: string]: string | number | boolean | Date | undefined;
  };
  children: Record<string, { records: TreeNode[] }>;
}