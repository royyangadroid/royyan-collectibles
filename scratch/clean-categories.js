const fs = require('fs');
const path = require('path');

const catalogDir = path.join(__dirname, '../public/catalog');

// Category mapping
const mapping = {
  'Komik': 'Komik',
  'Komik Indonesia': 'Komik',
  'Komik Klasik Tiongkok': 'Komik',
  'Komik Tintin': 'Komik',
  'Komik Star Wars': 'Komik',
  
  'Buku Sejarah': 'Buku',
  'Buku Budaya': 'Buku',
  
  'Mata Uang Asing': 'Uang Kuno & Perangko',
  'Perangko': 'Uang Kuno & Perangko',
  'Uang Kuno & Perangko': 'Uang Kuno & Perangko',
  
  'Playstation': 'PlayStation',
  'PlayStation': 'PlayStation',
  
  'Hot Wheels': 'Hot Wheels'
};

const dirs = fs.readdirSync(catalogDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let updatedCount = 0;

for (const dir of dirs) {
  const dataPath = path.join(catalogDir, dir, 'data.json');
  if (fs.existsSync(dataPath)) {
    try {
      const dataStr = fs.readFileSync(dataPath, 'utf-8');
      const data = JSON.parse(dataStr);
      const oldCategory = data.category;
      
      if (oldCategory && mapping[oldCategory]) {
        const newCategory = mapping[oldCategory];
        if (oldCategory !== newCategory) {
          data.category = newCategory;
          fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
          console.log(`Updated ${dir}: ${oldCategory} -> ${newCategory}`);
          updatedCount++;
        }
      } else {
        console.warn(`Unmapped or missing category in ${dir}: ${oldCategory}`);
      }
    } catch (err) {
      console.error(`Error processing ${dir}:`, err);
    }
  }
}

console.log(`\nDone! Updated categories for ${updatedCount} items.`);
