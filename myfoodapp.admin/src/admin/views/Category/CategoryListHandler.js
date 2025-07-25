import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import { ROUTES } from '../../../common/globalConstants';
import { categoryHttp } from '../../../services/http';
import { RearrangeItemsModal } from '../../../common/components';

import messages from './messages';
import CategoryList from './CategoryList';
import { generalErrorHandler } from '../../../common/Forms/errorHandler';

const CategoryListHandler = ({ isReadOnly }) => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const goToCreate = () => history.push(ROUTES.category.new);
  const goToEdit = (id) =>
    history.push(ROUTES.category.edit.replace(':id', id));

  const loadCategories = () => {
    setLoading(true);
    categoryHttp
      .getCategories()
      .then((categories) => setCategories(categories))
      .catch(generalErrorHandler)
      .finally(() => setLoading(false));
  };

  const updateIsVisible = categoryHttp.updateIsVisibleFlag;
  const deleteCategory = (id) => {
    setLoading(true);
    categoryHttp
      .deleteCategory(id)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyDeleted));
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        generalErrorHandler(err);
      });
  };

  const saveRearranged = (rearranged) => {
    setLoading(true);
    setShowModal(false);
    categoryHttp
      .rearrange(rearranged)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyRearranged));
        loadCategories();
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

  useEffect(loadCategories, []);
  return (
    <>
      <RearrangeItemsModal
        title={formatMessage(messages.rearrangeTitle)}
        show={showModal}
        items={categories}
        onClose={setShowModal.bind(null, false)}
        onSubmit={saveRearranged}
      />
      <CategoryList
        loading={loading}
        categories={categories}
        refresh={loadCategories}
        goToCreate={goToCreate}
        goToEdit={goToEdit}
        updateIsVisible={updateIsVisible}
        deleteCategory={deleteCategory}
        openSortModal={openSortModal}
        isReadOnly={isReadOnly}
      />
    </>
  );
};

export default CategoryListHandler;
