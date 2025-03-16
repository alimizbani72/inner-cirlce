import fs from 'fs';
import { toWords } from 'number-to-words';
import path from 'path';

const svgsDirectoryPath = path.resolve(__dirname, '../icons');
const componentsFilePath = path.resolve(__dirname, '../components/icon/icons');
const exportComponentsFilePath = path.resolve(__dirname, '../components/icon/icons.ts');

// Helper function to rename icons if the filename starts with numbers
const renameIfNumeric = (name: string): string => {
  const match = name.match(/^(\d+)([A-Za-z0-9_$]*)$/);
  if (!match) {
    return name;
  }

  const numericPart = match[1];
  const remainder = match[2];
  const spelledOut = toWords(parseInt(numericPart, 10));
  return spelledOut.charAt(0).toUpperCase() + spelledOut.slice(1).toLowerCase() + remainder;
};

// Function to sanitize file names
const nameGenerator = (name: string): string => {
  return name
    .replace('Color', ' ')
    .replace('+', '')
    .replace(/\.[^/.]+$/, '')
    .replace('-', '')
    .toLowerCase()
    .replace(/(?:^|\s|[^a-zA-Z0-9]+)(\w)/g, (_, chr) => chr.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '')
    .trim();
};

// Function to replace SVG attributes
const replaceSvgAttributes = (content: string): string => {
  return content
    .replace(/stroke-width/g, 'strokeWidth')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin')
    .replace(/fill-rule/g, 'fillRule')
    .replace(/clip-rule/g, 'clipRule');
};

// Function to process each SVG file
const processSvgFile = async (file: string) => {
  const filePath = path.join(svgsDirectoryPath, file);
  const name = renameIfNumeric(nameGenerator(file));
  let svgContent = await fs.promises.readFile(filePath, 'utf-8');
  svgContent = svgContent.replace(/stroke="[^"]*"/g, 'stroke={stroke}');
  svgContent = svgContent.replace(/fill="(?!none")[^"]*"/g, 'fill={fill}');
  svgContent = replaceSvgAttributes(svgContent);

  const componentTemplate = `
import type { IconProps } from '../types';

export const ${name}Icon: IconProps = ({ ${
    svgContent.includes('fill={fill}') ? 'fill,' : ''
  } ${svgContent.includes('stroke={stroke}') ? 'stroke' : ''} }) => {
  return (
    ${svgContent}
  );
};
`;

  const componentPath = path.join(componentsFilePath, `${name}Icon.tsx`);
  await fs.promises.writeFile(componentPath, componentTemplate, 'utf-8');
  return name;
};

// Function to generate the icons.ts file based on existing .tsx files in the icons folder
const generateIconsTs = async () => {
  try {
    const files = await fs.promises.readdir(componentsFilePath);
    const tsxFiles = files.filter((file) => file.endsWith('Icon.tsx'));

    let importStatements = '';
    let exportObject = 'const icons = {\n';

    for (const file of tsxFiles) {
      const componentName = file.replace(/Icon\.tsx$/, ''); // Remove Icon.tsx suffix
      importStatements += `import { ${componentName}Icon } from './icons/${componentName}Icon';\n`;
      exportObject += `  ${componentName}Icon,\n`;
    }

    exportObject += '};\n';

    const exportContent = `${importStatements}\n${exportObject}\nexport default icons;\n`;
    await fs.promises.writeFile(exportComponentsFilePath, exportContent, 'utf-8');

    console.log('icons.ts file created successfully!');
  } catch (err) {
    console.error('Error generating icons.ts file:', err);
  }
};

// Main function to process SVG files and generate .tsx files, followed by icons.ts
const generateIcons = async () => {
  try {
    const files = await fs.promises.readdir(svgsDirectoryPath);

    for (const file of files) {
      if (file.endsWith('.svg')) {
        await processSvgFile(file);
      }
    }

    // After generating .tsx files, generate icons.ts
    await generateIconsTs();

    console.log('Icon components and icons.ts file created successfully!');
  } catch (err) {
    console.error('Error processing files:', err);
  }
};

generateIcons();
