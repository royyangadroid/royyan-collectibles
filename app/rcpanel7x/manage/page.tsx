import { getAllCollectibles } from '@/lib/data';
import ManageInventoryClient from './ManageInventoryClient';

export const dynamic = 'force-dynamic';

export default function ManageInventoryPage() {
  const items = getAllCollectibles();

  // Sort items: available first, then sold
  const sortedItems = [...items].sort((a, b) => {
    if (a.status === 'Available' && b.status === 'Sold') return -1;
    if (a.status === 'Sold' && b.status === 'Available') return 1;
    return 0;
  });

  return <ManageInventoryClient initialItems={sortedItems} />;
}
