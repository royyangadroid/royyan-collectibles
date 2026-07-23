const fs = require('fs');
const path = require('path');

const catalogDir = path.join(__dirname, '../public/catalog');
const dirs = fs.readdirSync(catalogDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const items = [];

for (const dir of dirs) {
  const dirPath = path.join(catalogDir, dir);
  const dataPath = path.join(dirPath, 'data.json');
  
  if (fs.existsSync(dataPath)) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    // Find cover image
    let coverExt = '.jpg';
    if (fs.existsSync(path.join(dirPath, 'cover.png'))) {
      coverExt = '.png';
    } else if (fs.existsSync(path.join(dirPath, 'cover.jpeg'))) {
      coverExt = '.jpeg';
    } else if (fs.existsSync(path.join(dirPath, 'cover.webp'))) {
      coverExt = '.webp';
    }
    
    data.slug = data.collectionNumber;
    data.image = `/catalog/${dir}/cover${coverExt}`;
    
    items.push(data);
  }
}

console.log(`Found ${items.length} items. First item:`, items[0]);
