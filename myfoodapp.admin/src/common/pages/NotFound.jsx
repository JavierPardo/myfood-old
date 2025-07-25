import React from 'react';
import ErrorPagesLinksFooter from './ErrorPagesLinksFooter';

const NotFound = () => {
  return (
    <div className="abs-center wd-xl">
      <div className="text-center mb-4">
        <div className="text-lg mb-3">404</div>
        <p className="lead m-0">We couldn't find this page.</p>
        <p>The page you are looking for does not exists.</p>
      </div>
      <div className="input-group mb-4">
        <input
          className="form-control"
          type="text"
          placeholder="Try with a search"
        />
        <span className="input-group-btn">
          <button className="btn btn-secondary" type="button">
            <em className="fa fa-search"></em>
          </button>
        </span>
      </div>
      <ErrorPagesLinksFooter />
      <div className="p-3 text-center">
        <span className="mr-2">&copy;</span>
        <span>2020</span>
        <span className="mx-2">-</span>
        <span>MFA</span>
        <br />
        <span>My Food App</span>
      </div>
    </div>
  );
};

export default NotFound;
