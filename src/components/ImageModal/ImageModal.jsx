import ReactModal from "react-modal";

export default function ImageModal({
  modalData: { urls, alt_description },
  closeModal,
  isModalOpen,
}) {
  const custom = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      maxWidth: "100%",
      overflow: "hidden",
      objectFit: "cover",
      maxHeight: "100vh",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
    },
  };

  return (
    <ReactModal
      style={custom}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
      isOpen={isModalOpen}
    >
      <div>
        <img src={urls.regular} alt={alt_description} />
      </div>
    </ReactModal>
  );
}
