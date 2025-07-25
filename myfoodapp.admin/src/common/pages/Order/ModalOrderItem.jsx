import React from 'react';
import { useIntl } from 'react-intl';
import messages from './messages';
import { optionHttp, itemHttp, sideHttp } from '../../../services/http';
import {
  Modal,
  ModalHeader,
  ModalBody,
  CardBody,
  CardHeader,
  Card,
  CardGroup,
  CustomInput,
  Input,
  ModalFooter,
  Button,
} from 'reactstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { Spinner } from '../../components';
import globalMessages from '../../globalMessages';

export default function ModalOrderItem({
  item: { id: itemId },
  onSelectedFoodClick,
  onCancelFoodSelection,
}) {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState({
    itemSides: [],
    sides: [],
    options: [],
    item: {},
  });
  const [orderItem, setOrderItem] = useState({
    selectedSides: [],
    selectedOptions: [],
    notes: '',
  });
  const [orderExtras, setOrderExtras] = useState([]);

  useEffect(() => {
    if (!itemId) {
      return;
    }
    setLoading(true);
    Promise.all([
      sideHttp.getAll(),
      optionHttp.getAllByItemId(itemId),
      itemHttp.getById(itemId),
    ])
      .then(function ([sides, options, item]) {
        if (options.length) {
          const { id } = options[0];
          setOrderItem({
            selectedSides: [],
            notes: '',
            selectedOptions: [{ id }],
          });
        } else {
          clearSelection();
        }
        setOrderExtras([]);
        setMetadata({ sides, options, item });
      })
      .finally(function () {
        setLoading(false);
      });

    return () => {};
  }, [itemId]);

  if (!itemId) {
    return <></>;
  }

  function clearSelection() {
    setOrderItem({
      selectedSides: [],
      selectedOptions: [],
      notes: '',
    });
  }
  function okSelectionClickHandler() {
    onSelectedFoodClick({ ...orderItem }, orderExtras);

    clearSelection();
  }

  const renderOption = function (option) {
    return (
      <CustomInput
        type="radio"
        id={`option${option.id}`}
        name="options"
        key={`option${option.id}`}
        label={
          <>
            {option.name}
            <br />
            {JSON.parse(option.choices).join(', ')}
          </>
        }
        checked={orderItem.selectedOptions.find(function (opt) {
          return opt.id === option.id;
        })}
        onClick={function () {
          optionChangedHandler(option);
        }}
        value={orderItem.optionId}
      />
    );
  };

  function renderSide(type, changeHandler, showPrice, listValues, side) {
    let label = side.description;
    if (showPrice) label += ` / Precio: ${side.currentPrice}`;

    return (
      <>
        <CustomInput
          type="checkbox"
          id={`${type}${side.id}`}
          name={`${type}${side.id}`}
          key={`${type}${side.id}`}
          label={label}
          checked={
            !!listValues.find(function (s) {
              return s.id === side.id;
            })
          }
          onClick={function () {
            changeHandler(side);
          }}
          value={side.id}
        />
      </>
    );
  }

  function optionChangedHandler({ id }) {
    setOrderItem({ ...orderItem, selectedOptions: [{ id }] });
  }

  const { sides, options } = metadata;
  const { notes } = orderItem;

  function extraChangedHandler({ id }) {
    let selectedExtras = [...orderExtras];
    const isChecked = orderExtras.find(function ({ id: selectedId }) {
      return selectedId === id;
    });
    if (!isChecked) {
      selectedExtras.push({ id });
    } else {
      selectedExtras = orderExtras.filter(function ({ id: selectedId }) {
        return selectedId !== id;
      });
    }

    setOrderExtras([...selectedExtras]);
  }

  function notesChangedHandler({ target: { name, value } }) {
    setOrderItem({ ...orderItem, [name]: value });
  }

  // const sideChangedHandler = function ({ id }) {
  //   let { selectedSides } = orderItem;
  //   const isChecked = selectedSides.find(function ({ id: selectedId }) {
  //     return selectedId === id;
  //   });
  //   if (!isChecked) {
  //     if (metadata.item.numberSidesRequired <= selectedSides.length) return;
  //     selectedSides.push({ id });
  //   } else {
  //     selectedSides = selectedSides.filter(function ({ id: selectedId }) {
  //       return selectedId !== id;
  //     });
  //   }

  //   setOrderItem({ ...orderItem, selectedSides: [...selectedSides] });
  // };

  const {
    item: { numberSidesRequired },
  } = metadata;
  return (
    <Modal
      isOpen={true}
      toggle={onCancelFoodSelection}
      size="lg"
      key="extra-order-modal"
    >
      <ModalHeader toggle={onCancelFoodSelection}>
        {formatMessage(messages.sidesOptionsAndExtras)}
      </ModalHeader>
      <ModalBody>
        <Spinner show={loading} />
        <CardGroup>
          <Card>
            <CardHeader>
              <h4>{formatMessage(messages.options)}</h4>
            </CardHeader>
            <CardBody>{options.map(renderOption)}</CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h4>
                {formatMessage(messages.sides)}{' '}{orderExtras.length}
              </h4>
            </CardHeader>
            <CardBody>
              {sides.map(
                renderSide.bind(
                  {},
                  'extra',
                  extraChangedHandler,
                  true,
                  orderExtras
                )
              )}
            </CardBody>
            {/* <CardHeader>
                            <h4>{formatMessage(messages.sides)} {`${selectedSides.length}/${numberSidesRequired}`}</h4>
                        </CardHeader>
                        <CardBody>
                            {itemSides.map(renderSide.bind({}, 'side', sideChangedHandler, false, selectedSides))}
                        </CardBody> */}
          </Card>
        </CardGroup>
        <CardGroup>
          <Card>
            <CardHeader>
              <h4>{formatMessage(messages.notes)}</h4>
            </CardHeader>
            <CardBody>
              <Input
                type="textarea"
                name="notes"
                id="notes"
                value={notes}
                onChange={notesChangedHandler}
                style={{ resize: 'none' }}
              />
            </CardBody>
          </Card>
        </CardGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={okSelectionClickHandler}>
          {formatMessage(messages.addItemButtonLabel)}
        </Button>
        <div className="divider" />
        <Button color="primary" outline onClick={onCancelFoodSelection}>
          {formatMessage(globalMessages.cancelAction)}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
