import React from 'react';
import '../styles/PdfViewer.css';

const PdfViewer = ({ url }) => {
  return (
    <div className="pdf-viewer-container">
      <embed
        src={url}
        type="application/pdf"
        width="100%"
        height="100%"
        className="pdf-embed"
      />
      <div className="pdf-fallback">
        <p>Tu navegador no soporta la visualización de PDFs directamente.</p>
        <a href={url} target="_blank" rel="noopener noreferrer">Descargar PDF</a>
      </div>
    </div>
  );
};

export default PdfViewer;
