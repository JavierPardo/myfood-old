import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import GridSortable from './GridSortable';
import globalMessages from '../globalMessages';

const RearrangeItemsModal = ({
  show,
  items,
  title,
  columns,
  onSubmit,
  onClose,
}) => {
  const [rearranged, setRearranged] = useState([]);
  const { formatMessage } = useIntl();
  const handleSaveBtn = () => onSubmit(rearranged);

  return (
    <Modal isOpen={show} size="lg">
      <ModalHeader toggle={onClose}>{title}</ModalHeader>
      <ModalBody>
        <GridSortable items={items} onSort={setRearranged} columns={columns} />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          {formatMessage(globalMessages.cancelButton)}
        </Button>
        <Button color="primary" onClick={handleSaveBtn}>
          {formatMessage(globalMessages.saveButton)}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

RearrangeItemsModal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.any, name: PropTypes.string })
  ),
  columns: PropTypes.number,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

RearrangeItemsModal.defaultProps = {
  show: false,
  items: [],
  title: '',
  columns: 4,
};

export default RearrangeItemsModal;
