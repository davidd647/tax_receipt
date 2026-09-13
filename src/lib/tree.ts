import type { SpendingNode } from '../data/types';

/** Average-earner dollar share for a node given jurisdiction average tax. */
export function earnerShare(node: SpendingNode, averageTax: number): number {
  return averageTax * node.share;
}

export function collectExpandableIds(nodes: SpendingNode[]): string[] {
  const ids: string[] = [];
  const walk = (list: SpendingNode[]) => {
    for (const n of list) {
      if (n.children && n.children.length > 0) {
        ids.push(n.id);
        walk(n.children);
      }
    }
  };
  walk(nodes);
  return ids;
}
