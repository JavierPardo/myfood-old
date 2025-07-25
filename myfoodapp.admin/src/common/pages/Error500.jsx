import React from 'react';
import ErrorPagesLinksFooter from './ErrorPagesLinksFooter';

const Error500 = () => {
  return (
    <div className="abs-center wd-xl">
      <div className="text-center mb-4">
        <div className="mb-3">
          <em className="fa fa-wrench fa-5x text-muted"></em>
        </div>
        <div className="text-lg mb-3">500</div>
        <p className="lead m-0">Oh! Something went wrong :(</p>
        <p>Don't worry, we're now checking this.</p>
        <p>
          In the meantime, please try one of those links below or come back in a
          moment
        </p>
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

export default Error500;
