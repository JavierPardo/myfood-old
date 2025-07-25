import React from 'react';
import {
  Card,
  CardBody,
  CardGroup,
  CardHeader,
  CustomInput,
  Input,
} from 'reactstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { sideHttp, optionHttp, itemHttp } from '../../../services/http';
import { useIntl } from 'react-intl';
import messages from './messages';
import { Spinner } from '../../components';

export default function ItemDetail({
  itemId,
  onChangeOrderExtra,
  metadata,
  updateMetadata,
}) {
  const { formatMessage } = useIntl();
  const [options, setOptions] = useState([]);
  const [sides, setSides] = useState([]);
  const [extras, setExtras] = useState([]);
  const [currentOption, setCurrentOption] = useState(0);
  const [currentSide, setCurrentSide] = useState([]);
  const [currentExtra, setCurrentExtra] = useState([]);
  const [currentItem, setCurrentItem] = useState({ numberSidesRequired: 0 });
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      sideHttp.getAll(),
      optionHttp.getAllByItemId(itemId),
      itemHttp.getById(itemId),
    ])
      .then(function ([xtra, opts, item]) {
        if (opts.length) {
          optionChangedHandler(opts[0]);
        }
        setOptions(opts);
        setExtras(xtra);
        setCurrentItem(item);
        setCurrentExtra([]);
        setCurrentOption(0);
        setCurrentSide([]);
        setNotes('');
      })
      .finally(function () {
        setLoading(false);
      });

    return () => {};
  }, []);

  const notesChangedHandler = function ({ target: { value } }) {
    setNotes(value);
    onChangeOrderExtra(currentOption, [...currentSide], currentExtra, value);
  };

  const optionChangedHandler = function (option) {
    const { id, choices, name } = option;
    const newMetadata = {
      ...metadata,
      options: metadata.options.filter(function (option) {
        return option.id !== id;
      }),
    };
    newMetadata.options.push({ id, choices, name });
    updateMetadata(newMetadata);
    const optionSelected = { id };
    setCurrentOption(optionSelected);
    onChangeOrderExtra(optionSelected, [...currentSide], currentExtra, notes);
  };

  const extraChangedHandler = function (side) {
    const { id, name, description, currentPrice } = side;
    const isChecked = currentExtra.filter((x) => x.id === id).length !== 0;
    const newMetadata = {
      ...metadata,
      sides: metadata.sides.filter(function (side) {
        return side.id !== id;
      }),
    };
    let _extra;
    if (isChecked) {
      _extra = [...currentExtra.filter((x) => x.id !== id)];
    } else {
      newMetadata.sides.push({ id, name, description, currentPrice });
      _extra = [...currentExtra, side];
    }
    updateMetadata(newMetadata);
    setCurrentExtra([..._extra]);
    onChangeOrderExtra(currentOption, [...currentSide], [..._extra], notes);
  };

  const sideChangedHandler = function (side) {
    const { id, name, description, currentPrice } = side;
    const isChecked = !!currentSide.find((x) => x.id === id);
    if (!isChecked && currentSide.length == currentItem.numberSidesRequired) {
      setCurrentSide([...currentSide]);
      return;
    }
    const newMetadata = {
      ...metadata,
      sides: metadata.sides.filter(function (side) {
        return side.id !== id;
      }),
    };
    let _sides;
    if (isChecked) {
      _sides = [...currentSide.filter((x) => x.id !== id)];
    } else {
      newMetadata.sides.push({ id, name, description, currentPrice });
      _sides = [...currentSide, { id }];
    }
    updateMetadata(newMetadata);
    setCurrentSide([..._sides]);
    onChangeOrderExtra(currentOption, [..._sides], [...currentExtra], notes);
  };

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
        checked={currentOption.id === option.id}
        onClick={function () {
          optionChangedHandler(option);
        }}
        value={currentOption}
      />
    );
  };

  const renderSide = function (type, changeHandler, showPrice, listValues) {
    return function (side) {
      let label = side.description;
      if (showPrice) label += ` / Precio: ${side.currentPrice}`;

      return (
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
        />
      );
    };
  };
  return (
    <>
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
              {formatMessage(messages.sides)}{' '}{currentSide.length}
            </h4>
          </CardHeader>
        </Card>
      </CardGroup>
      <CardGroup>
        <Card>
          <CardHeader>
            <h4>{formatMessage(messages.extras)}</h4>
          </CardHeader>
          <CardBody>
            {extras.map(
              renderSide('extra', extraChangedHandler, true, currentExtra)
            )}
          </CardBody>
        </Card>
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
    </>
  );
}
