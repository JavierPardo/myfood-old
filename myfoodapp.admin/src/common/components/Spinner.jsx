import React from 'react';
import PropTypes from 'prop-types';

import 'loaders.css/loaders.css';
import { useSelector } from 'react-redux';

const centered = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  MozTransform: 'translateX(-50%) translateY(-50%)',
  WebkitTransform: 'translateX(-50%) translateY(-50%)',
  transform: 'translateX(-50%) translateY(-50%)',
};

const blurry = {
  zIndex: '10',
  height: '100%',
  width: '100%',
  backgroundColor: '#ffffff',
  opacity: '0.5',
  position: 'absolute',
  left: 0,
  top: 0,
};

const Spinner = ({ show }) => {
  if (!show) {
    return null;
  }
  return (
    <div style={blurry}>
      <div className="ball-scale-ripple" style={centered}>
        <div></div>
      </div>
    </div>
  );
};

Spinner.defaultProps = {
  show: false,
};

Spinner.propTypes = {
  show: PropTypes.bool,
};

export default Spinner;

export const AppSpinner = function () {
  const { spinnerQueue } = useSelector((state) => state.application);
  if (!spinnerQueue.length) {
    return null;
  }
  const [{ message: firstMessage }, ...rest] = spinnerQueue || [{}];
  return (
    <div
      tabIndex="-1"
      style={{ position: 'relative', zIndex: 1050, display: 'block' }}
    >
      <div>
        <div
          className="modal fade show"
          role="dialog"
          tabIndex="-1"
          style={{ display: 'block' }}
        >
          <div className="modal-backdrop fade show"></div>
          <div style={blurry}>
            <div className="ball-scale-ripple" style={centered}>
              <div></div>
            </div>
            <div
              style={centered}
              style={{
                position: 'absolute',
                top: '55%',
                left: '43%',
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              {firstMessage && firstMessage + '...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
