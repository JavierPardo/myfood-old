import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import chunk from 'lodash/chunk';
import { Container, Row, Col } from 'reactstrap';
import Dropzone from 'react-dropzone';

const acceptedExt = ['image/*'];

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

const convertToBase64 = (files) => {
  return Promise.allSettled(files.map(fileToBase64)).then((filesConverted) => {
    return filesConverted
      .filter((file) => file.status === 'fulfilled')
      .map((file) => file.value);
  });
};

export function FrameImage({ file, size, offset = 0, base64, defaultImage }) {
  const [isError, setIsError] = useState(false);

  function errorLoadingImageHandler() {
    if (defaultImage === undefined) {
      return;
    }

    setIsError(true);
  }

  useEffect(() => {
    setIsError(false);
    return () => {};
  }, [file]);

  const imageSrc = base64 ? file : file.preview;
  return (
    <Col xs={{ size, offset }} key={file.name}>
      <img
        className="img-fluid mb-2"
        src={isError ? defaultImage : imageSrc}
        onError={errorLoadingImageHandler}
        alt={file.name}
      />
    </Col>
  );
}

const renderMultipleImages = (files, base64) => {
  const blocks = chunk(files, 3);
  return blocks.map((block) => (
    <Row>
      {block.map((file) => (
        <FrameImage file={file} size={4} base64={true}></FrameImage>
      ))}
    </Row>
  ));
};

const UploadImage = ({
  uploadMessage,
  onSelect,
  multiple,
  values,
  base64,
  disabled,
}) => {
  const onDrop = (acceptedFiles) => {
    if (base64) {
      convertToBase64(acceptedFiles).then((files) => onSelect(files));
      return;
    }
    const files = acceptedFiles.map((file) => {
      return Object.assign(file, { preview: URL.createObjectURL(file) });
    });
    onSelect(files);
  };

  return (
    <Container className="container-md">
      <Dropzone
        className="card p-3"
        multiple={multiple}
        onDrop={onDrop}
        disabled={disabled}
        accept={acceptedExt}
      >
        <div className="text-center box-placeholder m-0">{uploadMessage}</div>
        <div className="mt-3">
          {values.length > 0 &&
            multiple &&
            renderMultipleImages(values, base64)}
          {values.length > 0 && !multiple && (
            <Row>
              <FrameImage
                file={values[0]}
                size="12"
                base64={true}
                defaultImage=""
              ></FrameImage>
            </Row>
          )}
        </div>
      </Dropzone>
    </Container>
  );
};

UploadImage.defaultProps = {
  uploadMessage:
    'Try dropping some files here, or click to select files to upload.',
  multiple: false,
  values: [],
};

UploadImage.propTypes = {
  uploadMessage: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  values: PropTypes.array,
  base64: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default UploadImage;
export const frameImage = FrameImage;
