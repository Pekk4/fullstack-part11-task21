import { useSelector } from 'react-redux';

const Modal = () => {
  const modalMessage = useSelector((state) => state.modal.message);
  const modalStyle = useSelector((state) => state.modal.style);

  let modalClass = 'modal green';

  if (modalMessage === null) {
    return null;
  }
  if (modalStyle !== null) {
    modalClass = 'modal red';
  }

  return (
    <div data-testid="modal-body" className="container">
      <div className={modalClass}>{modalMessage}</div>
    </div>
  );
};

export default Modal;
