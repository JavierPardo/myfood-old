import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FormattedMessage, useIntl } from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableFooter from '@material-ui/core/TableFooter';
import Spinner from './Spinner';
import globalMessages from '../globalMessages';
import IconButton from '@material-ui/core/IconButton';
import { ArrowDropDown,
         LastPage,
         KeyboardArrowLeft,
         KeyboardArrowRight,
         FirstPage } from '@material-ui/icons';
import ReportPDF from './ReportPDF';
import ReportCSV from './ReportCSV';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  button: {
    padding: 8,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton className={classes.button}
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page" className={classes.button}>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton className={classes.button}
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        className={classes.button}
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function ReportTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={classes.headRow}>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.headCells}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              IconComponent={ArrowDropDown}
              classes={{
                active: classes.sortActive,
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ReportTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },

  root: {
    marginTop: '56px',
  },

  table: {
    minWidth: props => props.minWidth,
    style: {
      color: '#656565',
      backgroundColor: '#fff',
    },
  },

  headRow: {
    borderBottomWidth: '2px',
    borderBottomColor: '#da2d2d',
    borderBottomStyle: 'solid',
  },

  headCells: {
    fontSize: '.875rem',
    fontWeight: '500',
    color: '#888',
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingTop: '14px',
    paddingBottom: '14px',
    activeSortStyle: {
      color: '#888',
      '&:focus': {
        outline: 'none',
      },
      '&:hover:not(:focus)': {
        color: '#888',
      },
    },
  },

  sortActive: {
    color: '#888 !important',
  },

  body:{
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderBottomColor: '#e5e5e5',
  },

  rows:{
    height: 48,
    fontFamily: 'Source Sans Pro,sans-serif;',
    '&:nth-of-type(even)': {
      backgroundColor: '#fafafa',
    },
    '&:nth-of-type(even) > td': {
      color: 'rgba(0,0,0,0.87) !important',
    },
    '&:nth-of-type(odd)': {
      backgroundColor: '#fff'
    },
    "&:hover": {
      backgroundColor: "#f8b76c !important",
    },
    '&:hover:nth-of-type(even) > td': {
      color: '#db312f !important',
    },
    "&:hover > td": {
      color: "#db312f",
    }
  },

  cells: {
    fontSize: '.875rem',
    color: '#656565',
    fontFamily: 'Source Sans Pro,sans-serif;',
    fontWeight: '400',
    lineHeight: '1.52857',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderBottomColor: '#f6991d',
    wordWrap: 'break-word',
  },
  
  paginationRoot: {
    color: '#656565',
    fontSize: '14px',
    fontFamily: 'Source Sans Pro,sans-serif;',
    borderTopStyle: 'solid',
    borderTopWidth: '2px',
    borderTopColor: '#eee',
  },

  paginationCaption: {
    color: '#656565',
    fontSize: '0.875rem',
    fontFamily: 'Source Sans Pro,sans-serif;',
  },

  paginationToolbar: {
    "& > p:nth-of-type(2)": {
      color: '#656565',
      fontSize: '0.875rem',
      fontWeight: 400,
      fontFamily: 'Source Sans Pro,sans-serif;',
    }
  }
}));

export default function ReportTable({ isLoading, ...props }) {
  const classes = useStyles(props);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { title, data, columns, footerData, footerColumns, pdfCellWidth, pdfFontSize} = props;

  const { formatMessage } = useIntl();
  const paginationLabels = {
    rowsPerPageText: formatMessage(globalMessages.rowsPerPageLabel),
    rangeSeparatorText: formatMessage(globalMessages.ofConector),
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const message = <FormattedMessage {...globalMessages.emptyTable} />;
  return (
    <div className={classes.root}>
      <Spinner show={isLoading} />
      {data.length > 0 ? 
      <>
      <div style={{marginTop: 10, textAlign: 'right'}}>
        <ReportPDF
          title={title}
          data={data}
          columns={columns}
          footerData={footerData}
          footerColumns={footerColumns}
          cellWidth={pdfCellWidth}
          fontSize={pdfFontSize}
        />
        <ReportCSV
          title={title}
          data={data}
          columns={columns}
        />
      </div>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <ReportTableHead
            headCells={columns}
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody
            className={classes.body}>
            {stableSort(data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    className={classes.rows}
                    hover
                    tabIndex={-1}
                    key={row.id}
                  >
                    {Object.values(row).map((column, index) => (
                        <TableCell 
                          className={classes.cells}
                          key={index} 
                          align="left">
                            {column}
                        </TableCell>
                    ))}
                  </TableRow>
                );

              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            {
              footerData &&
              footerData.length > 0 &&
            Object.values(footerData).map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((column, index) => (
                  <TableCell key={index} align="left">{column}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={paginationLabels.rowsPerPageText}
        labelDisplayedRows={ (from=page) => (`${from.from}-${from.to === -1 ? from.count : from.to} de ${from.count}`) }
        rowsPerPageOptions={[10, 15, 20, 25, 30]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
        classes={{
          root: classes.paginationRoot,
          toolbar: classes.paginationToolbar,
          caption: classes.paginationCaption,
        }}
      />
      </>:<div  style={{textAlign: 'center', color:'rgba(0,0,0,0.87)'}}>{message}</div>
      }
    </div>
  );
}
