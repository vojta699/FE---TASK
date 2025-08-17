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

export interface TreeState {
  data: TreeNode[];
  fetchData: () => Promise<void>;
  removeNode: (id: string) => Promise<void>;
}

export interface TreeRowsProps {
  node: TreeNode;
  level: number;
  showHeader?: boolean;
  headersByLevel: Record<number, string[]>;
}

export interface TreeHeadersProps {
  level: number;
  levelOffset?: number;
  headersByLevel: Record<number, string[]>;
}
