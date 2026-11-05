type Sized = { image: { width: number; height: number } };

/**
 * Splits items into balanced columns: each one goes to the currently shortest
 * column, using the height it will have at `columnWidth`. Keeps the given order
 * across the top row, and works the same on the server and in the browser.
 */
export function distribute<T extends Sized>(
  items: readonly T[],
  columns: number,
  columnWidth = 380,
  gap = 20,
): T[][] {
  const result: T[][] = Array.from({ length: columns }, () => []);
  const heights = new Array<number>(columns).fill(0);

  for (const item of items) {
    const shortest = heights.indexOf(Math.min(...heights));
    result[shortest].push(item);
    heights[shortest] += (item.image.height * columnWidth) / item.image.width + gap;
  }
  return result;
}
