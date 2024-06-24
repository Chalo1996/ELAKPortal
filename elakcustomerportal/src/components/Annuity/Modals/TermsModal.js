import { useState } from "react";
import { Modal, Button } from "antd";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import termsPDF from "../../../assets/policy-pdfs/Annuity Policy.pdf";

const TermsModal = ({ isVisible, onClose, formData, setFormData }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(window.innerWidth * 0.6);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleTermsModalAccept = () => {
    setFormData({ ...formData, terms: true });
    onClose();
  };

  // Update page width on window resize for responsiveness
  window.addEventListener("resize", () => {
    setPageWidth(window.innerWidth * 0.6);
  });

  return (
    <Modal
      title={
        <span className="text-left font-semibold text-[16px] leading-6">
          Terms and Conditions
        </span>
      }
      open={isVisible}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button
          key="accept"
          type="primary"
          className="shadow-none"
          onClick={handleTermsModalAccept}
        >
          Accept
        </Button>,
      ]}
      onCancel={onClose}
      width="60vw"
    >
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full h-full max-h-[90vh]  overflow-y-auto lg:overflow-x-hidden">
          <div className="w-full flex justify-center">
            <Document file={termsPDF} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  className="mb-4"
                  width={pageWidth} // Responsive width (60% of window width)
                  scale={1}
                />
              ))}
            </Document>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TermsModal;
