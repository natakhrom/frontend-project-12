import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useChannel from '../hooks/useChannel';

const Channel = ({
  name,
  onClick,
  removable,
  showModal,
}) => {
  const currentChannel = useChannel();
  const { t } = useTranslation();

  const type = name === currentChannel.name
    ? 'secondary'
    : '';

  const classBtn = 'w-100 rounded-0 text-start btn text-truncate';

  return (
    <li className="nav-item w-100">
      {removable
        ? (
          <Dropdown as={ButtonGroup} onClick={onClick} className="w-100">
            <Button variant={type} className={classBtn}>
              <span className="me-1">#</span>
              {name}
            </Button>

            <Dropdown.Toggle split variant={type} />

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => showModal('removing', currentChannel)}
              >
                {t('buttons.remove')}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => showModal('renaming', currentChannel)}
              >
                {t('buttons.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : (
          <Button variant={type} onClick={onClick} className={classBtn}>
            <span className="me-1">#</span>
            {name}
          </Button>
        )}
    </li>
  );
};

export default Channel;
