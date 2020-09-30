/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

type decoratedWindow = typeof window & { AdobeDC: any }

export default class AdobeViewSDKClient {
  readyPromise: any
  adobeDCView: any
  clientId: string
  filePath: string

  constructor(props: any) {
    this.clientId = props.clientId

    this.readyPromise = new Promise((resolve) => {
        if ((window as decoratedWindow).AdobeDC) {
            resolve();
        } else {
            /* Wait for Adobe Document Services PDF Embed API to be ready */
            document.addEventListener('adobe_dc_view_sdk.ready', () => {
                resolve();
            });
        }
    });
    this.adobeDCView = undefined;
    this.filePath = props.filePath
  }

  ready() {
      return this.readyPromise;
  }

  previewFile(divId: string, viewerConfig: any) {
      const config : {
        clientId: string
        divId?: string
      } = {
          /* Pass your registered client id */
          clientId: this.clientId,
      };
      if (divId) { /* Optional only for Light Box embed mode */
          /* Pass the div id in which PDF should be rendered */
          config.divId = divId;
      }
      /* Initialize the AdobeDC View object */
      this.adobeDCView = new (window as decoratedWindow).AdobeDC.View(config);

      /* Invoke the file preview API on Adobe DC View object */
      const previewFilePromise = this.adobeDCView.previewFile({
          /* Pass information on how to access the file */
          content: {
              /* Location of file where it is hosted */
              location: {
                  url: this.filePath,
              },
          },
          /* Pass meta data of file */
          metaData: {
              /* file name */
              fileName: this.filePath,
              /* file ID */
              // id: "6d07d124-ac85-43b3-a867-36930f502ac6",
          }
      }, viewerConfig);

      return previewFilePromise;
  }
}
