import React from 'react';

import Select from '../../../common/components/Select';

import { useState } from 'react';
import { useEffect } from 'react';

import {
  CardBody,
  Card,
  CardDeck,
  CardHeader,
  ListGroupItem,
  Button,
  CardFooter,
  Input,
  Container,
  Row,
  Col,
  Form,
  InputGroupAddon,
  InputGroup,
} from 'reactstrap';

import { useIntl } from 'react-intl';

import { useDispatch } from 'react-redux';

import globalMessages from '../../globalMessages';
import { getAll as getAllCategories } from '../../../services/http/categoryHttp';
import { itemHttp, menuHttp } from '../../../services/http';
import {
  addSpinner,
  removeSpinner,
} from '../../../store/actions/applications.actions';

import messages from './messages';
import menuMessages from '../../../admin/views/Menu/messages';
import categoryMessages from '../../../admin/views/Category/messages';
import { Spinner, PageHeader, ContentWrapper } from '../../components';
import ModalOrderItem from './ModalOrderItem';
import Counter from '../../Common/Counter';
import { optionHttp } from '../../../services/http/optionHttp';
import { sideHttp } from '../../../services/http/sideHttp';
import { useParams, useHistory } from 'react-router';
import { ROUTES } from '../../globalConstants';
import { orderHttp } from '../../../services/http';
import { toast } from 'react-toastify';

function renderButtons({ goToEvent, handleSubmit, formatMessage }) {
  return [
    {
      label: formatMessage(globalMessages.backButton),
      icon: 'fa-arrow-left',
      style: 'btn-secondary',
      onClick: goToEvent,
    },
    {
      label: formatMessage(globalMessages.saveButton),
      icon: 'fa-save',
      style: 'btn-primary',
      onClick: handleSubmit,
    },
  ];
}

function calculateTotal(order) {
  const { orderItems, orderExtras } = order;
  const total =
    orderItems.reduce(function (total, { subTotal }) {
      return total + subTotal;
    }, 0) +
    orderExtras.reduce(function (total, { subTotal }) {
      return total + subTotal;
    }, 0);

  return total;
}

const filtersChangedHandler = function (filters) {
  const menu =
    (filters && filters.selectedMenu && filters.selectedMenu.value) || 0;
  const category =
    (filters && filters.selectedCategory && filters.selectedCategory.value) ||
    0;
  const query = (filters && filters.querySearch) || '';

  return itemHttp.getAll(menu, category, { query });
};

function LineItem({
  formatMessage,
  addItemclickHandler,
  item: { image, currentPrice, id, name, description },
  metadata: { items },
}) {
  return (
    <ListGroupItem className="d-flex align-items-center" key={id}>
      <img
        className="mr-2 img-fluid thumb48"
        src={image || 'img/dummy.png'}
        alt="App"
      />
      <div>
        <p className="text-bold mb-0">{name}</p>
        <small>{description}</small>
        <br />
        <small>
          <b>{formatMessage(messages.price)}:</b>
          {currentPrice}
        </small>
      </div>
      <div className="ml-auto">
        <Button
          outline
          color="primary"
          onClick={addItemclickHandler.bind({}, { id })}
        >
          <strong>{formatMessage(messages.add)}</strong>
        </Button>
      </div>
    </ListGroupItem>
  );
}

export default function EventChoseFood() {
  const [menuOptions, setMenuOptions] = useState([]);
  const [categoryOptions, setcategoryOptions] = useState([]);
  const [metadata, setMetadata] = useState({
    items: [],
    sides: [],
    options: [],
  });
  const [filters, setFilters] = useState({
    selectedMenu: null,
    selectedCategory: null,
  });

  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const history = useHistory();
  const [itemListSpinner, setItemListSpinner] = useState(false);

  const [newOrder, setNewOrder] = useState({
    orderItems: [],
    orderExtras: [],
  });

  useEffect(() => {
    dispatch(addSpinner('ChooseFood'));
    Promise.all([menuHttp.getAll(), getAllCategories()])
      .then(function ([menus, categories]) {
        const menuOpts = menus.map(function ({ id, name }) {
          return { value: id, label: name };
        });
        setMenuOptions(menuOpts);

        const categoryOpts = categories.map(function ({ name, id }) {
          return { value: id, label: name };
        });
        setcategoryOptions(categoryOpts);

        const newFilters = {
          selectedMenu: null,
          selectedCategory: null,
        };

        setFilters(newFilters);
        refreshItems(newFilters);
      })
      .finally(function () {
        dispatch(removeSpinner('ChooseFood'));
      });

    return () => {};
  }, []);

  const refreshItems = function (newFilters) {
    dispatch(addSpinner('refreshItems'));
    filtersChangedHandler(newFilters || filters)
      .then(function (items) {
        return items.map(function ({
          id,
          name,
          description,
          prepTimeMins,
          image,
          currentPrice,
        }) {
          return { id, name, description, prepTimeMins, currentPrice, image };
        });
      })
      .then(setItems)
      .finally(function () {
        dispatch(removeSpinner('refreshItems'));
      });
  };

  const onFilterChange = function (val, control) {
    const newFilters = { ...filters, [control.name]: val };
    setFilters(newFilters);
    refreshItems(newFilters);
  };

  const addItemclickHandler = function (item) {
    const { id } = item;
    setItemListSpinner(true);
    setCurrentItem({ id });
  };

  const renderItem = function (item) {
    return (
      <LineItem
        item={item}
        addItemclickHandler={addItemclickHandler}
        formatMessage={formatMessage}
        metadata={metadata}
      />
    );
  };

  const renderOrderExtra = function (
    { metadata: { sides }, onDeleteOrderItem, onQuantityOrderItemChanged },
    orderExtra
  ) {
    const { sideId, quantity, detailId } = orderExtra;

    const { name, image, description, currentPrice } = sides.find(function ({
      id,
    }) {
      return sideId === id;
    });

    return (
      <ListGroupItem className="d-flex align-items-center" key={Math.random()}>
        <img
          className="mr-2 img-fluid thumb48"
          src={image || 'img/dummy.png'}
          alt="App"
        />
        <div>
          <p className="text-bold mb-0">{name}</p>

          <small>{description}</small>
          <br />
          <small>
            <b>{formatMessage(messages.price)}:</b>
            {formatMessage(globalMessages.currency)} {currentPrice}
          </small>
        </div>
        <div className="ml-auto">
          <Counter
            onChangeCount={onQuantityOrderItemChanged.bind({}, detailId)}
            count={quantity}
          />
          &nbsp;
          <Button
            outline
            color="danger"
            onClick={onDeleteOrderItem.bind({}, detailId)}
          >
            <em className="fas fa-trash-alt"></em>
          </Button>
        </div>
      </ListGroupItem>
    );
  };

  const renderOrderItem = function (
    {
      metadata: { items, sides, options },
      onQuantityOrderItemChanged,
      onDeleteOrderItem,
    },
    orderItem
  ) {
    const { itemId, selectedOptions, detailId, notes, quantity } = orderItem;
    const {
      name: itemName,
      image: itemImage,
      description: itemDescription,
      currentPrice,
    } = items.find(function ({ id }) {
      return itemId === id;
    });

    const { name: optionName, choices } = options.find(function ({ id }) {
      return selectedOptions.find(function ({ optionId }) {
        return optionId === id;
      });
    });

    return (
      <ListGroupItem className="d-flex align-items-center" key={Math.random()}>
        <img
          className="mr-2 img-fluid thumb48"
          src={itemImage || 'img/dummy.png'}
          alt="App"
        />
        <div>
          <p className="text-bold mb-0">{itemName}</p>

          <small>{itemDescription}</small>
          <br />
          <div key={Math.random()}>
            {selectedOptions.length && (
              <>
                <small>
                  <b>{formatMessage(messages.options)}:</b>
                  <br />
                  {optionName}:{JSON.parse(choices).join(',')}
                </small>
                <br />
              </>
            )}
            {notes}
            <br />
          </div>
          <small>
            <b>{formatMessage(messages.price)}:</b>
            {formatMessage(globalMessages.currency)} {currentPrice}
          </small>
        </div>
        <div className="ml-auto">
          <Counter
            onChangeCount={onQuantityOrderItemChanged.bind({}, detailId)}
            count={quantity}
          />
          &nbsp;
          <Button
            outline
            color="danger"
            onClick={onDeleteOrderItem.bind({}, detailId)}
          >
            <em className="fas fa-trash-alt"></em>
          </Button>
        </div>
      </ListGroupItem>
    );
  };

  function reloadMetadata(order) {
    dispatch(addSpinner('Reload_Metadata'));
    const { orderExtras, orderItems } = order;
    const itemSides = orderItems.reduce(function (prev, { selectedSides }) {
      return [
        ...prev,
        ...selectedSides.map(function ({ id }) {
          return id;
        }),
      ];
    }, []);

    const sides = orderExtras.reduce(function (prev, { sideId }) {
      return [...prev, sideId];
    }, []);

    const items = orderItems.reduce(function (prev, { itemId }) {
      return [...prev, itemId];
    }, []);

    const options = orderItems.reduce(function (prev, { selectedOptions }) {
      return [
        ...prev,
        ...selectedOptions.map(function ({ optionId }) {
          return optionId;
        }),
      ];
    }, []);

    Promise.all([
      optionHttp.getAllByIds(options.join(',')),
      itemHttp.getAllByIds(items.join(',')),
      sideHttp.getAllByIds([...sides, ...itemSides].join(',')),
    ])
      .then(function ([options, items, sides]) {
        setMetadata({ options, items, sides });
        setNewOrder(order);
      })
      .finally(function () {
        dispatch(removeSpinner('Reload_Metadata'));
      });
  }

  const closeModalHandler = function () {
    setItemListSpinner(false);
    setCurrentItem(0);
  };

  const querySearchChangedHandler = function ({ target: { value } }) {
    const newFilters = { ...filters, querySearch: value };
    setFilters(newFilters);
  };

  const submitHandler = function (e) {
    e.preventDefault();
    refreshItems({ ...filters });
  };

  function selectedFoodClickHandler(orderItem, extras) {
    const { orderItems, orderExtras, ...currentOrder } = newOrder;

    const notListedExtras = extras.filter(function (extra) {
      return !orderExtras.find(function ({ sideId }) {
        return extra.id === sideId;
      });
    });
    const listedExtras = orderExtras.filter(function ({ sideId }) {
      return !!extras.find(function ({ id }) {
        return id === sideId;
      });
    });
    const notSelectedExtras = orderExtras.filter(function ({ sideId }) {
      return !extras.find(function ({ id }) {
        return id === sideId;
      });
    });
    reloadMetadata({
      ...currentOrder,
      orderItems: [
        ...orderItems,
        {
          ...orderItem,
          itemId: currentItem.id,
          quantity: 1,
          selectedOptions: [
            ...orderItem.selectedOptions.map(function ({ id }) {
              return { optionId: id };
            }),
          ],
        },
      ],
      orderExtras: [
        ...notListedExtras.map(function ({ id, ...extra }) {
          return { ...extra, quantity: 1, sideId: id };
        }),
        ...listedExtras.map(function ({ quantity, ...extra }) {
          return { ...extra, quantity: quantity + 1 };
        }),
        ...notSelectedExtras.map(function (extra) {
          return { ...extra };
        }),
      ],
    });
    closeModalHandler();
  }

  function deleteOrderItemHandler(detailId) {
    const orderItems = newOrder.orderItems.filter(function (orderItem) {
      return orderItem.detailId !== detailId;
    });
    setNewOrder({ ...newOrder, orderItems });
  }
  function deleteOrderExtraHandler(detailId) {
    const orderExtras = newOrder.orderExtras.filter(function (orderExtra) {
      return orderExtra.detailId !== detailId;
    });
    setNewOrder({ ...newOrder, orderExtras });
  }
  function quantityOrderExtraChangedHandler(detailId, newQuantity) {
    const orderExtra = newOrder.orderExtras.find(function (orderExtra) {
      return orderExtra.detailId === detailId;
    });
    orderExtra.quantity = newQuantity;
    setNewOrder({ ...newOrder });
  }
  function quantityOrderItemChangedHandler(detailId, newQuantity) {
    const orderItem = newOrder.orderItems.find(function (orderItem) {
      return orderItem.detailId === detailId;
    });
    orderItem.quantity = newQuantity;
    setNewOrder({ ...newOrder });
  }

  const { orderItems, orderExtras } = newOrder;

  function loadDetails() {
    const { orderItems, orderExtras } = newOrder;
    const { items, sides } = metadata;

    orderItems.forEach(function (orderItem) {
      const { currentPrice } = items.find(function ({ id }) {
        return id === orderItem.itemId;
      });
      orderItem.subTotal = parseFloat(currentPrice) * orderItem.quantity;
      orderItem.price = currentPrice;

      orderItem.detailId = `${orderItem.itemId}-${orderItem.selectedOptions[0].id}-${orderItem.notes}`;
    });

    orderExtras.forEach(function (orderExtra) {
      const { currentPrice } =
        sides.find(function ({ id }) {
          return id === orderExtra.sideId;
        }) || {};
      if (currentPrice) {
        orderExtra.price = currentPrice;
      }
      orderExtra.subTotal = parseFloat(orderExtra.price) * orderExtra.quantity;
    });
  }
  loadDetails();

  function goToEvent() {
    history.push(ROUTES.event.edit.replace(':eventId', eventId));
  }
  function onOrderEventCreateSucessfully({ id }) {
    toast.success(
      formatMessage(messages.succesfullyCreatedOrder, { eventId, orderId: id })
    );
  }

  function handleSubmit() {
    orderHttp
      .createOrderEvent({ ...newOrder, eventId })
      .then(onOrderEventCreateSucessfully)
      .then(goToEvent);
  }

  const total = calculateTotal(newOrder);
  const buttons = renderButtons({ goToEvent, handleSubmit, formatMessage });
  return (
    <ContentWrapper>
      <ModalOrderItem
        item={currentItem}
        onSelectedFoodClick={selectedFoodClickHandler}
        onCancelFoodSelection={closeModalHandler}
      />

      <PageHeader
        title={formatMessage(messages.newOrderEventTitle, { eventId }).replace(
          '{eventId}',
          eventId
        )}
        buttons={buttons}
      />
      <CardDeck>
        <Card>
          <Spinner show={itemListSpinner} />
          <CardHeader>
            <h4>{formatMessage(globalMessages.searchLabel)}</h4>
            <Form onSubmit={submitHandler}>
              <Container fluid={true}>
                <Row>
                  <Col xs="3" style={{ paddingLeft: 20, paddingRight: 0 }}>
                    <Select
                      addonType="prepend"
                      isSearchable
                      fluid
                      name="selectedMenu"
                      placeholder={formatMessage(menuMessages.main)}
                      isClearable
                      onChange={onFilterChange}
                      value={filters.selectedMenu}
                      options={menuOptions}
                    />
                  </Col>
                  <Col xs="3" style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Select
                      addonType="prepend"
                      onChange={onFilterChange}
                      name="selectedCategory"
                      placeholder={formatMessage(categoryMessages.main)}
                      isSearchable
                      isClearable
                      value={filters.selectedCategory}
                      options={categoryOptions}
                    />
                  </Col>
                  <Col xs="6" style={{ paddingLeft: 0, paddingRight: 20 }}>
                    <InputGroup>
                      <Input
                        type="text"
                        size="md"
                        name="querySearch"
                        value={filters.querySearch}
                        onChange={querySearchChangedHandler}
                        onKeyDown={function (event) {
                          event.keyCode === 13 && refreshItems();
                        }}
                        styles={['width:50%']}
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          color="primary"
                          onClick={function () {
                            refreshItems();
                          }}
                        >
                          <em className="fas fa-search"></em>
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </Container>
            </Form>
          </CardHeader>
          <CardBody>{items.map(renderItem)}</CardBody>
        </Card>
        <Card>
          <CardHeader tag="h4">
            {formatMessage(messages.orderDetail.main)}
            <hr />
          </CardHeader>

          <CardBody key="orderItemsCard">
            {orderExtras.map(
              renderOrderExtra.bind(
                {},
                {
                  metadata,
                  onDeleteOrderItem: deleteOrderExtraHandler,
                  onQuantityOrderItemChanged: quantityOrderExtraChangedHandler,
                }
              )
            )}
            {orderItems.map(
              renderOrderItem.bind(
                {},
                {
                  metadata,
                  onDeleteOrderItem: deleteOrderItemHandler,
                  onQuantityOrderItemChanged: quantityOrderItemChangedHandler,
                }
              )
            )}
          </CardBody>
          <CardFooter>
            <div className="clearfix">
              <div className="float-right text-right">
                <div className="text-bold">
                  {formatMessage(globalMessages.currency)}&nbsp;{total}
                </div>
              </div>
              <div className="float-left text-bold text-dark">
                {formatMessage(messages.total)}
              </div>
            </div>
          </CardFooter>
        </Card>
      </CardDeck>
    </ContentWrapper>
  );
}
