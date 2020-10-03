import { GetStaticProps } from 'next';
import React, { Component } from 'react';
import { AdobeViewSDKClient, Layout, Noscript, readPDF } from '../components';

type Props = {
  clientId: string
  pdfText: string
  filePath: string
};

export const getStaticProps: GetStaticProps = async() => {
  return {
    'props': {
      'clientId': process.env.NEXT_PUBLIC_ADOBE_API_KEY,
      'filePath': process.env.NEXT_RESUME_FILE_PATH,
      'pdfText': await readPDF(process.env.NEXT_RESUME_FILE_PATH!),
    }
  };
};

const ResumePage = class extends Component<Props> {
  componentDidMount() {
    const viewSDKClient = new AdobeViewSDKClient(this.props);

    viewSDKClient.ready().then(() => {
        viewSDKClient.previewFile('pdf-div', {
            'embedMode': 'IN_LINE'
        });
    });
  }

  render() {
    const { pdfText } = this.props;

    return (
      <Layout title="About | Next.js + TypeScript Example">
        <article>
          <h1>Resume</h1>
          <div id="pdf-div" className="in-line-div">
            <Noscript>
              <article dangerouslySetInnerHTML={{'__html': pdfText}} />
            </Noscript>
          </div>
        </article>
      </Layout>
    );
  }
};

// tslint:disable-next-line: no-default-export
export default ResumePage;
