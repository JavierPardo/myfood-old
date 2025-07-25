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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
import { itemHttp } from '../../../services/http';
import { menuHttp } from '../../../services/http';
import {
  addSpinner,
  removeSpinner,
} from '../../../store/actions/applications.actions';

import messages from './messages';
import menuMessages from '../../../admin/views/Menu/messages';
import categoryMessages from '../../../admin/views/Category/messages';
import { useContext } from 'react';
import OrderContext from '../../contexts/OrderContext/OrderContext';
import { Spinner } from '../../components';
import ItemDetail from './ItemDetail';
import { parseFloat } from 'core-js/fn/number';

const filtersChangedHandler = function (filters) {
  const menu =
    (filters && filters.selectedMenu && filters.selectedMenu.value) || 0;
  const category =
    (filters && filters.selectedCategory && filters.selectedCategory.value) ||
    0;
  const query = (filters && filters.querySearch) || '';

  return itemHttp.getAll(menu, category, { query });
};

function renderSides(side) {
  return <li key={side.id}>{side.description}</li>;
}

export default function ChoseFood() {
  const {
    order: { data: order, update: updateOrder },
    metadata: { data: metadata, update: updateMetadata },
  } = useContext(OrderContext);
  const { orderDetail: orderItems } = order;
  const [menuOptions, setMenuOptions] = useState([]);
  const [categoryOptions, setcategoryOptions] = useState([]);
  const [filters, setFilters] = useState({
    selectedMenu: null,
    selectedCategory: null,
  });

  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const [orderExtra, setOrderExtra] = useState({});
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const [itemListSpinner, setItemListSpinner] = useState(false);

  const completeOrderItems = filledOrderItems();

  console.log('Orders');
  console.log(completeOrderItems);

  useEffect(() => {
    dispatch(addSpinner('ChooseFood'));
    Promise.all([menuHttp.getAll(), getAllCategories()])
      .then(function ([menus, categories]) {
        const menuOpts = menus.map(function ({ id, menuName }) {
          return { value: id, label: menuName };
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

  function refreshItems(newFilters) {
    dispatch(addSpinner('refreshItems'));
    filtersChangedHandler(newFilters || filters)
      .then(function (items) {
        return items.map(function ({
          id,
          name,
          description,
          prepTimeMins,
          currentPrice,
        }) {
          return { id, name, description, prepTimeMins, currentPrice };
        });
      })
      .then(setItems)
      .finally(function () {
        dispatch(removeSpinner('refreshItems'));
      });
  }

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

  function filledOrderItems() {
    return [
      ...orderItems.map(function (orderItem) {
        let newOrderItem = { ...orderItem };

        if (orderItem.sideId) {
          const extra = metadata.sides.find(function (side) {
            return side.id === orderItem.sideId;
          });
          newOrderItem = { ...orderItem, ...extra };
          newOrderItem.detailId = orderItem.sideId.toString();
        }

        if (orderItem.itemId) {
          const item = metadata.items.find(function (item) {
            return item.id === orderItem.itemId;
          });
          newOrderItem = { ...orderItem, ...item };

          const sideDetailId = newOrderItem.sides
            .map(function (side) {
              return side.id;
            })
            .join('/');
          newOrderItem.detailId = `${item.id}-${sideDetailId}-${newOrderItem.option.id}`;
        }

        return newOrderItem;
      }),
    ];
  }

  const renderItem = function (item) {
    return (
      <ListGroupItem className="d-flex align-items-center" key={item.id}>
        <img
          className="mr-2 img-fluid thumb48"
          src={item.image || 'img/dummy.png'}
          alt="App"
        />
        <div>
          <p className="text-bold mb-0">{item.name}</p>
          <small>{item.description}</small>
          <br />
          <small>
            <b>{formatMessage(messages.price)}:</b>
            {item.currentPrice}
          </small>
        </div>
        <div className="ml-auto">
          <Button
            outline
            color="primary"
            onClick={addItemclickHandler.bind({}, item)}
          >
            <strong>{formatMessage(messages.add)}</strong>
          </Button>
        </div>
      </ListGroupItem>
    );
  };

  const orderItemQuantityChangedHandler = function (itemDetailId, quantity) {
    const currentOrderItem = orderItems.find(function (oi) {
      return oi.detailId === itemDetailId;
    });

    if (currentOrderItem) {
      const newQuantity = quantity + currentOrderItem.quantity;
      if (newQuantity === 0) {
        return;
      }
      currentOrderItem.quantity = newQuantity;
    }
    updateOrder({ ...order });
  };

  const renderOrderItem = function (item) {
    const itemExtra = item.itemId ? (
      <div key={Math.random()}>
        {item.option && (
          <>
            <small>
              <b>{formatMessage(messages.options)}:</b>
              <br />
              {item.option.name}
            </small>
            <br />
          </>
        )}
        {item.sides && (
          <>
            <small>
              <b>{formatMessage(messages.sides)}:</b>
            </small>
            <br />
            <ul>{item.sides.map(renderSides)}</ul>
          </>
        )}
      </div>
    ) : null;

    const orderItemDeletedHandler = function (itemDetailId) {
      const newOrderItems = [
        ...orderItems.filter(function (oi) {
          return oi.detailId !== itemDetailId;
        }),
      ];

      updateOrder({ ...order, orderDetail: newOrderItems });
    };

    return (
      <ListGroupItem className="d-flex align-items-center" key={item.id}>
        <img
          className="mr-2 img-fluid thumb48"
          src={item.image || 'img/dummy.png'}
          alt="App"
        />
        <div>
          <p className="text-bold mb-0">{item.name || item.description}</p>
          {item.name && item.description ? (
            <>
              <small>{item.name && item.description}</small>
              <br />
            </>
          ) : null}
          {itemExtra}
          <small>
            <b>{formatMessage(messages.price)}:</b>
            {formatMessage(globalMessages.currency)} {item.currentPrice}
          </small>
        </div>
        <div className="ml-auto">
          <Button
            color="link"
            onClick={function () {
              orderItemQuantityChangedHandler(item.detailId, -1);
            }}
          >
            <em className="fas fa-minus"></em>
          </Button>
          &nbsp;
          <label>{item.quantity}</label>
          &nbsp;
          <Button
            color="link"
            onClick={function () {
              orderItemQuantityChangedHandler(item.detailId, 1);
            }}
          >
            <em className="fas fa-plus"></em>
          </Button>
          &nbsp;
          <Button
            outline
            color="danger"
            onClick={function () {
              orderItemDeletedHandler(item.detailId);
            }}
          >
            <em className="fas fa-trash-alt"></em>
          </Button>
        </div>
      </ListGroupItem>
    );
  };

  const closeModal = function () {
    setCurrentItem(null);
    setItemListSpinner(false);
  };

  const addItemToOrderItems = function (item) {
    const sideDetailId = orderExtra.sides
      .map(function (side) {
        return side.id;
      })
      .join('/');
    const detailId = `${item.id}-${sideDetailId}-${orderExtra.option.id}`;
    const foundOrderItem = orderItems.find(function (orderItem) {
      return detailId === orderItem.detailId;
    });

    if (foundOrderItem) {
      foundOrderItem.quantity += 1;
      return;
    }

    const { id: itemId, ..._item } = item;

    orderItems.push({
      itemId,
      quantity: 1,
      detailId,
      ..._item,
      ...orderExtra,
    });
  };

  const addExtrasToOrderItems = function (xtras) {
    xtras.forEach(function (extra) {
      const foundExtra = orderItems.find(function (orderItem) {
        return orderItem.sideId && orderItem.sideId === extra.id;
      });

      if (foundExtra) {
        foundExtra.quantity += 1;
        return;
      }

      const { id: sideId, ..._extra } = extra;
      orderItems.push({
        sideId,
        quantity: 1,
        detailId: sideId.toString(),
        ..._extra,
      });
    });
  };

  const addMealClickHandler = function () {
    const _orderExtra = { ...orderExtra };
    const { extras: xtras } = _orderExtra;
    const item = items.find(function (i) {
      return i.id === currentItem.id;
    });
    updateMetadata({
      ...metadata,
      items: [...metadata.items, { ...item }],
      sides: [...metadata.sides, ...xtras],
    });
    addExtrasToOrderItems(xtras);
    addItemToOrderItems(currentItem);

    updateOrder({ ...order });

    closeModal();
  };

  const orderExtraChangeHandler = function (option, sids, extras) {
    setOrderExtra({ option, sides: sids, extras });
  };

  const calculateTotalPrice = function () {
    const total = completeOrderItems.reduce(function (pv, cv) {
      return pv + parseInt(cv.quantity) * parseFloat(cv.currentPrice);
    }, 0);

    return total;
  };

  const querySearchChangedHandler = function ({ target: { value } }) {
    const newFilters = { ...filters, querySearch: value };
    setFilters(newFilters);
  };

  const submitHandler = function (e) {
    e.preventDefault();
    refreshItems({ ...filters });
  };

  return (
    <>
      {currentItem ? (
        <Modal
          isOpen={true}
          toggle={closeModal}
          size="lg"
          key="extra-order-modal"
        >
          <ModalHeader toggle={closeModal}>
            {formatMessage(messages.sidesOptionsAndExtras)}
          </ModalHeader>
          <ModalBody>
            <ItemDetail
              itemId={currentItem.id}
              metadata={metadata}
              updateMetadata={updateMetadata}
              onChangeOrderExtra={orderExtraChangeHandler}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={addMealClickHandler}>
              {formatMessage(messages.addItemButtonLabel)}
            </Button>
            <div className="divider" />
            <Button color="secondary" onClick={closeModal}>
              {formatMessage(globalMessages.cancelAction)}
            </Button>
          </ModalFooter>
        </Modal>
      ) : null}

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
            {completeOrderItems.map(renderOrderItem)}
          </CardBody>
          <CardFooter>
            <div className="clearfix">
              <div className="float-right text-right">
                <div className="text-bold">
                  {formatMessage(globalMessages.currency)}&nbsp;
                  {calculateTotalPrice()}
                </div>
              </div>
              <div className="float-left text-bold text-dark">
                {formatMessage(messages.total)}
              </div>
            </div>
          </CardFooter>
        </Card>
      </CardDeck>
    </>
  );
}
