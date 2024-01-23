const letter = ({ pdfUrl }) => {
  return (
    <iframe
      src={`https://docs.google.com/viewer?url=${encodeURIComponent(
        pdfUrl
      )}&embedded=true`}
      title="PDF Viewer"
      width="100%"
      height="600px"
      frameBorder="0"
    />
  );
};

export default letter;
