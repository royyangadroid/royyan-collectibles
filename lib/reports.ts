import type { CollectibleItem } from './data';

export interface CategorySummary {
  name: string;
  count: number;
  sold: number;
}

export interface InventoryReport {
  totalProducts: number;
  available: number;
  reserved: number;
  sold: number;
  totalValue: number;
  availableValue: number;
  soldValue: number;
  categories: CategorySummary[];
  soldItems: CollectibleItem[];
  latestItems: CollectibleItem[];
}

export function getInventoryReport(items: CollectibleItem[]): InventoryReport {
  const categoryMap = new Map<string, { count: number; sold: number }>();
  let totalValue = 0;
  let availableValue = 0;
  let soldValue = 0;

  items.forEach((item) => {
    const existing = categoryMap.get(item.category) ?? { count: 0, sold: 0 };
    existing.count += 1;
    if (item.status === 'Sold') {
      existing.sold += 1;
      soldValue += item.price;
    } else {
      availableValue += item.price;
    }
    totalValue += item.price;
    categoryMap.set(item.category, existing);
  });

  const categories = Array.from(categoryMap.entries())
    .map(([name, data]) => ({ name, count: data.count, sold: data.sold }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const soldItems = items
    .filter((item) => item.status === 'Sold')
    .sort((a, b) => b.price - a.price);

  const latestItems = [...items]
    .sort((a, b) => {
      const aNum = Number(a.collectionNumber.replace(/\D/g, '')) || 0;
      const bNum = Number(b.collectionNumber.replace(/\D/g, '')) || 0;
      return bNum - aNum;
    })
    .slice(0, 8);

  return {
    totalProducts: items.length,
    available: items.filter((item) => item.status === 'Available').length,
    reserved: items.filter((item) => item.status === 'Reserved').length,
    sold: soldItems.length,
    totalValue,
    availableValue,
    soldValue,
    categories,
    soldItems,
    latestItems,
  };
}
