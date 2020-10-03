import PDFParser from 'pdf2json';

const pdfParser = new PDFParser();

export async function readPDF(fileName: string) {
  return await new Promise((resolve, reject) => {
    pdfParser.on('pdfParser_dataError', (errData: any) => reject(errData.parserError) );
    pdfParser.on('pdfParser_dataReady', (pdfData: any) => {

      const text =
        pdfData
          .formImage
          .Pages
          .map((page: any) => {
            let lastY = 0;

            return `<div>${page
              .Texts
              .reduce((a: any, b: any) => {
                const textVal = `${a}
                  ${b.y !== lastY ? '<br/>' : ''}
                  ${b.R[0].TS[1] > 15 ? '<strong>' : ''}
                  ${
                    decodeURIComponent(b?.R[0]?.T)
                      .replace('', '<li>')
                      .replace('◦', '<li>')
                  }
                  ${b.R[0].TS[1] > 15 ? '</strong>' : ''}
                  `;
                lastY = b.y;
                return textVal;
              }, '')}</div>`;
            },
          )
          .join('');

      resolve(text);
    });

    pdfParser.loadPDF(`public/${fileName}`);
  });
}
