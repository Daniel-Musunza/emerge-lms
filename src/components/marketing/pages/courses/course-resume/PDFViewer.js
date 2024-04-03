import React from 'react';


const PDFViewer = ({pdfUrl}) => {
    return (
    <div>
        <iframe src={pdfUrl} width="100%" />
    </div>
    );
   };
export default PDFViewer;