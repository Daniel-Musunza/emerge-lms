import React from 'react';


const PDFViewer = ({pdfUrl}) => {
    return (
    <div>
        <iframe src={pdfUrl} width="100%"  height='600px'/>
    </div>
    );
   };
export default PDFViewer;