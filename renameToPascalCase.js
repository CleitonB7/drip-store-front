const fs = require('fs');
const path = require('path');

// Pastas que serão processadas
const folders = [
  'src/components',
  'src/assets',
  'public/assets'
];

// Função para converter string para PascalCase
function toPascalCase(str) {
  return str
    .replace(/[-_ ]+/g, ' ')         // converte -, _, espaços para espaço
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).replace(/\.[^/.]+$/, match => match)) // primeira letra maiúscula
    .join('')                        // junta tudo
    .replace(/(\.[^.]+)$/,'$1');     // mantém extensão
}

// Função para processar arquivos recursivamente
function processFolder(folder) {
  const items = fs.readdirSync(folder);

  items.forEach(item => {
    const fullPath = path.join(folder, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processFolder(fullPath); // recursivo
    } else {
      const ext = path.extname(item);
      if (['.jsx', '.js', '.png', '.svg'].includes(ext)) {
        const newName = toPascalCase(item);
        const newFullPath = path.join(folder, newName);

        if (fullPath !== newFullPath) {
          fs.renameSync(fullPath, newFullPath);
          console.log(`Renomeado: ${fullPath} → ${newFullPath}`);
        }
      }
    }
  });
}

// Função para criar mapa de imports
function generateImportMap(folder, basePath = '.') {
  const items = fs.readdirSync(folder);
  let map = [];

  items.forEach(item => {
    const fullPath = path.join(folder, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      map = map.concat(generateImportMap(fullPath, basePath));
    } else {
      const ext = path.extname(item);
      if (['.jsx', '.js', '.png', '.svg'].includes(ext)) {
        const importName = path.basename(item, ext);
        const relativePath = './' + path.relative(basePath, fullPath).replace(/\\/g, '/');
        map.push({ importName, relativePath });
      }
    }
  });

  return map;
}

// === EXECUÇÃO ===
folders.forEach(folder => {
  if (fs.existsSync(folder)) {
    processFolder(folder);
  }
});

console.log('\n=== Mapa de imports sugerido ===');
folders.forEach(folder => {
  if (fs.existsSync(folder)) {
    const imports = generateImportMap(folder, '.');
    imports.forEach(i => {
      console.log(`import ${i.importName} from '${i.relativePath}';`);
    });
  }
});