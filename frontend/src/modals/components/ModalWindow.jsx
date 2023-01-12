import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const ModalWindow = ({
  show,
  onHide,
  type,
}) => {
  const { t } = useTranslation();

  const titles = {
    add: t('titles.addChannel'),
    rename: t('titles.renameChannel'),
    remove: t('titles.removeChannel'),
  };

  const components = {
    add: <Add onHide={onHide} />,
    rename: <Rename onHide={onHide} />,
    remove: <Remove onHide={onHide} />,
  };

  const getTitle = (titleName) => titles[titleName];
  const getModal = (modalName) => components[modalName];

  return (
    <Modal
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {getTitle(type)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getModal(type)}
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
