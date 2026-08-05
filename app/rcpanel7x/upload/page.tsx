import { collectibles } from '@/lib/data';
import UploadClient from './UploadClient';

export default function UploadCatalogPage() {
  const rcNumbers = collectibles
    .map(c => c.collectionNumber)
    .filter(n => n.startsWith('RC-'))
    .map(n => parseInt(n.replace('RC-', ''), 10))
    .filter(n => !isNaN(n))
    .sort((a, b) => a - b);

  let nextAvailable = 1;
  let previousAvailable: number | null = null;

  if (rcNumbers.length > 0) {
    const maxNumber = Math.max(...rcNumbers);
    nextAvailable = maxNumber + 1;
    
    // Find the highest missing number below maxNumber
    for (let i = maxNumber - 1; i >= 1; i--) {
      if (!rcNumbers.includes(i)) {
        previousAvailable = i;
        break;
      }
    }
  }

  const formatRC = (num: number) => `RC-${String(num).padStart(3, '0')}`;
  
  return (
    <UploadClient 
      nextNumber={formatRC(nextAvailable)} 
      previousNumber={previousAvailable ? formatRC(previousAvailable) : null} 
    />
  );
}
