import { Modal } from 'react-bootstrap';

const Container = ({
  show,
  onHide,
  titles,
  children,
}) => (
  <Modal
    centered
    show={show}
  >
    <Modal.Header closeButton onHide={onHide}>
      <Modal.Title id="contained-modal-title-vcenter">
        {titles}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {children}
    </Modal.Body>
  </Modal>
);

export default Container;
