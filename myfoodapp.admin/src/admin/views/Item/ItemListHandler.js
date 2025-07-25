import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { ROUTES } from '../../../common/globalConstants';
import { itemHttp } from '../../../services/http';
import { generalErrorHandler } from '../../../common/Forms/errorHandler';
import { RearrangeItemsModal } from '../../../common/components';

import ItemList from './ItemList';
import messages from './messages';

const ItemListHandler = ({ isReadOnly }) => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const goToCreate = () => history.push(ROUTES.item.new);
  const goToEdit = (id) => history.push(ROUTES.item.edit.replace(':id', id));

  const loadItems = () => {
    setLoading(true);
    itemHttp
      .getItems()
      .then((items) => setItems(items))
      .catch(generalErrorHandler)
      .finally(() => setLoading(false));
  };

  useEffect(loadItems, []);

  const deleteItem = (id) => {
    setLoading(true);
    itemHttp
      .deleteItem(id)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyDeleted));
        loadItems();
      })
      .catch(generalErrorHandler);
  };

  const saveRearranged = (rearranged) => {
    setLoading(true);
    setShowModal(false);
    itemHttp
      .rearrange(rearranged)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyRearranged));
        loadItems();
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      })
      .catch(generalErrorHandler);
  };

  const openSortModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <RearrangeItemsModal
        title={formatMessage(messages.rearrangeModalTitle)}
        show={showModal}
        items={items}
        columns={5}
        onClose={setShowModal.bind(null, false)}
        onSubmit={saveRearranged}
      />
      <ItemList
        loading={loading}
        items={items}
        goToCreate={goToCreate}
        goToEdit={goToEdit}
        refresh={loadItems}
        deleteItem={deleteItem}
        toggleVisible={itemHttp.updateIsVisible}
        openSortModal={openSortModal}
        isReadOnly={isReadOnly}
      />
    </>
  );
};

export default ItemListHandler;
