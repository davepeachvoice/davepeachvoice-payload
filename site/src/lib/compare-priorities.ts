export function comparePriorities(itemA: Item, itemB: Item) {
  if (itemA.priority < itemB.priority) {
    return -1;
  } else if (itemA.priority > itemB.priority) {
    return 1;
  }
  return 0;
}

interface Item {
  priority: number;
}
