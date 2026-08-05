import { getAllCollectibles } from '@/lib/data';
import MarkSoldClient from './MarkSoldClient';

export const dynamic = 'force-dynamic';

export default function MarkSoldPage() {
  const items = getAllCollectibles();
  return <MarkSoldClient items={items} />;
}
