import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

const PageHeader = ({ title, subTitle, buttons, loading }) => {
  return (
    <div className="content-heading">
      {title}
      <small>{subTitle}</small>
      <div className="ml-auto">
        <div className="btn-group">
          <Spinner show={loading} />
          {buttons.map(
            ({ label, icon, style, onClick, disabled, isHidden }) => {
              if (isHidden) return null;
              return (
                <button
                  className={`btn btn-sm ${style}`}
                  type="button"
                  onClick={onClick}
                  disabled={disabled}
                  key={label}
                >
                  {icon && <em className={`fas fa-fw ${icon}`}></em>}
                  {` ${label}`}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

PageHeader.defaultProps = {
  title: '',
  subTitle: '',
  buttons: [],
};

PageHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      icon: PropTypes.string,
      style: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
};

export default PageHeader;
