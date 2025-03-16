export const convertAndDownloadCSV = (data: any[], headersTitle: string[], filename: string) => {
  let str = '';

  for (let i = 0; i < data.length; i++) {
    let line = '';
    for (const attr in data[i]) {
      if (line) {
        line += ',';
      }

      line += data[i][attr];
    }
    str += `${line}\r\n`;
  }

  const csvString = [headersTitle, str].join('\n');

  const csvData = new Blob([csvString], {
    type: 'text/csv',
  });
  const csvURL = URL.createObjectURL(csvData);
  const link = document.createElement('a');
  link.href = csvURL;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
