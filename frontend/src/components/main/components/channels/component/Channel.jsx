import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectCurrentChannel } from '../../../../../slices/components/channelsSlice';

const Channel = ({
  name,
  changeChannel,
  removable,
  showModalRemove,
  showModalRename,
}) => {
  const { t } = useTranslation();
  const currentChannel = useSelector(selectCurrentChannel);

  const type = name === currentChannel.name
    ? 'secondary'
    : '';

  const classBtn = 'w-100 rounded-0 text-start btn text-truncate';

  return (
    <li className="nav-item w-100">
      {removable
        ? (
          <Dropdown as={ButtonGroup} className="w-100">
            <Button variant={type} className={classBtn} onClick={changeChannel}>
              <span className="me-1">#</span>
              {name}
            </Button>

            <Dropdown.Toggle split variant={type}>
              <span className="visually-hidden">{t('fields.controlChannel')}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={showModalRemove}
              >
                {t('buttons.remove')}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={showModalRename}
              >
                {t('buttons.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : (
          <Button variant={type} onClick={changeChannel} className={classBtn}>
            <span className="me-1">#</span>
            {name}
          </Button>
        )}
    </li>
  );
};

export default Channel;
