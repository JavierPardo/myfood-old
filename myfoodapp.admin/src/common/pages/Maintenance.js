import React from 'react';

const Maintenance = () => (
  <div className="abs-center" style={{ position: 'relative' }}>
    <div className="text-center my-3">
      <h1 className="mb-3">
        <sup>
          <em className="fa fa-cog fa-2x text-muted fa-spin text-info"></em>
        </sup>
        <em className="fa fa-cog fa-5x text-muted fa-spin text-purple"></em>
        <em className="fa fa-cog fa-lg text-muted fa-spin text-success"></em>
      </h1>
      <div className="text-bold text-lg mb-3">Sitio en construccion</div>
    </div>
  </div>
);

export default Maintenance;
