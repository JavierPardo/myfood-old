import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import RGL, { WidthProvider } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RGL);

const defaultGridItem = {
  w: 1,
  h: 1,
};

const calculateXY = (index, columns) => ({
  x: index % columns,
  y: Math.floor(index / columns),
});

const calculatePosition = (x, y, columns) => x + y * columns;

const toMatrix = memoize((items, columns) =>
  items.map(({ position, ...rest }) => {
    const { x, y } = calculateXY(position, columns);
    return { x, y, ...defaultGridItem, ...rest };
  })
);

const toList = (layout, columns) =>
  layout.map(({ x, y, i }) => ({
    id: i,
    position: calculatePosition(x, y, columns),
  }));

const SortableItem = ({ title, image }) => (
  <div className="card bg-dark border-0">
    <div className="text-center" style={{ height: '115px' }}>
      <img
        src={!image ? 'img/not-found.png' : image}
        alt=""
        style={{ pointerEvents: 'none', maxHeight: '100%', maxWidth: '100%' }}
      />
    </div>
    <div
      className="card-footer d-flex justify-content-center"
      style={{ border: '0px', backgroundColor: 'inherit' }}
    >
      <span className="text-white overflow-hidden text-truncate text-nowrap p-0">
        {title}
      </span>
    </div>
  </div>
);

const GridSortable = ({ items, onSort, columns }) => {
  const layout = toMatrix(items, columns);
  const updateSort = (layout) => {
    const changed = toList(layout, columns);
    onSort(changed);
  };

  return (
    <div style={{ padding: '20px' }}>
      <ReactGridLayout
        className="layout"
        cols={columns}
        rowHeight={165}
        isResizable={false}
        compactType="horizontal"
        onLayoutChange={updateSort}
      >
        {layout.map(({ image, name, id, x, y, w, h }) => (
          <div key={id} data-grid={{ x, y, w, h }}>
            <SortableItem image={image} title={name} />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

GridSortable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      image: PropTypes.string,
      name: PropTypes.string,
      position: PropTypes.number,
    })
  ),
  onSort: PropTypes.func,
  columns: PropTypes.number,
};

GridSortable.defaultProps = {
  columns: 4,
};

export default GridSortable;
