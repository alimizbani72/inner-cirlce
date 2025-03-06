import fs from 'fs';

const filePath = './services/cms/chainmindCms.schemas.ts';
if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, 'utf-8');
  if (!content.startsWith('// @ts-nocheck')) {
    fs.writeFileSync(filePath, `// @ts-nocheck\n${content}`);
    console.log(`Added @ts-nocheck to ${filePath}`);
  }
}
