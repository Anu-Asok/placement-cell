import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick(event){
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick (event) {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick (event)  {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick (event) {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick.bind(this)}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick.bind(this)}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick.bind(this)}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick.bind(this)}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    maxWidth: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  paper: {
    maxWidth: '95px'
  }
});

class CustomPaginationActionsTable extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.result);
    this.state = {
      rows: this.props.result,
      page: 0,
      rowsPerPage: 5,
      query: ''
    };
  }

  handleChangePage(event, page) {
    this.setState({ page });
  };

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleSearchQuery(e){
    this.setState({
      query: e.target.value
    });
  }

  render() {
    const { classes } = this.props;
    var { rows, rowsPerPage, page } = this.state;
    rows=this.props.result;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    console.log('from preview', rows);
    return (
      <Paper className="Table">
        <TextField
          style={{ marginBottom: 20, padding: 20 }}
          placeholder="Enter the register number"
          fullWidth
          margin="normal"
          onChange={this.handleSearchQuery.bind(this)}
        />
        <div className={classes.tableWrapper} style={{padding: 10}}>
          <Table className={classes.table} >
            <TableHead>
             <TableRow>
               <CustomTableCell>Register No.</CustomTableCell>
               <CustomTableCell>Name</CustomTableCell>
               <CustomTableCell>Course</CustomTableCell>
               <CustomTableCell>Branch</CustomTableCell>
               <CustomTableCell>Email</CustomTableCell>
               <CustomTableCell>Mobile</CustomTableCell>
               <CustomTableCell>Non core</CustomTableCell>
               <CustomTableCell>Core</CustomTableCell>
               <CustomTableCell>Dream</CustomTableCell>
               <CustomTableCell>Remarks</CustomTableCell>
             </TableRow>
           </TableHead>
            <TableBody>
              {rows.filter((obj)=>{
                  return obj['REGISTER NO.'].toLowerCase().includes(this.state.query.toLowerCase());
                }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow key={row['REGISTER NO.']}>
                    <TableCell>{row['REGISTER NO.']}</TableCell>
                    <TableCell>{row['NAME']}</TableCell>
                    <TableCell>{row['COURSE']}</TableCell>
                    <TableCell>{row['BRANCH']}</TableCell>
                    <TableCell>{row['Email']}</TableCell>
                    <TableCell>{row['Mobile']}</TableCell>
                    <TableCell>{row['Non core']}</TableCell>
                    <TableCell>{row['Core']}</TableCell>
                    <TableCell>{row['Dream']}</TableCell>
                    <TableCell>{row['Remarks']}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={10}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage.bind(this)}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);
