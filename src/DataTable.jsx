import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

class DataTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataOri: props.data,
      data: props.data,
      columns: props.columns,
      columnStates: [],
      isPaging: props.isPaging,
      total: props.total,
      totalPage: 0,
      page: 1,
      perPage: props.perPage
    };

    this.navClicked = props.navClicked;
    this.sort = this.sort.bind(this)
  }

  componentWillMount() {
    let data = _.cloneDeep(this.state.data);

    let columns = this.state.columns;
    let columnStates = this.state.columnStates;

    _.forEach(columns, function(column) {
      columnStates[column.name] = {
        isSorted: null
      }
    });

    this.setState({
      dataOri: data
    });
    this.setState({
      columnStates: columnStates
    });
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.data != null) {
      this.setState({
        dataOri: nextProps.data
      });
      this.setState({
        data: nextProps.data
      });
    }

    if (nextProps.page != null) {
      this.setState({
        page: nextProps.page
      });
    }

    if (nextProps.total != null) {
      let perPage = this.state.perPage;
      let total = nextProps.total;
      let totalPage = parseInt(total / perPage);
      totalPage += total % perPage != 0 ? 1 : 0;
      this.setState({
        total: nextProps.total
      });
      this.setState({
        totalPage: totalPage
      });
    }
  }

  gotoPage(e) {
    let page = e.target.innerHTML;
    this.setState({
      page: page
    });
    this.navClicked(page);
  }

  previousPage() {
    let page = this.state.page - 1;
    this.setState({
      page: page
    });
    this.navClicked(page);
  }

  nextPage() {
    let page = this.state.page + 1;
    this.setState({
      page: page
    });
    this.navClicked(page);
  }

  sort(name, isSorted) {
    if (!isSorted) return;

    let columnStates = this.state.columnStates;
    let type = null;
    switch (columnStates[name].isSorted) {
      case null:
        type = 'asc';
        break;
      case 'asc':
        type = 'desc';
        break;
      case 'desc':
        type = null;
        break;
    }


    columnStates = _.forIn(columnStates, function(columnState) {
      columnState.isSorted = null;
      return columnStates;
    });

    columnStates[name].isSorted = type;

    let sortComparator = this.createComparator(name, type);
    let data = _.cloneDeep(this.state.dataOri);

    if (type != null) {
      data = data.sort(sortComparator);
    }

    this.setState({
      data: data
    });
    this.setState({
      columnStates: columnStates
    });
  }

  createComparator(field, type) {
    let sortComparatorAsc = (x, y) => {
      if (x[field] < y[field])
        return -1;
      if (x[field] > y[field])
        return 1;
      return 0;
    };

    let sortComparatorDesc = (x, y) => {
      if (x[field] > y[field])
        return -1;
      if (x[field] < y[field])
        return 1;
      return 0;
    };

    let sortComparator = type == 'asc' ? sortComparatorAsc : sortComparatorDesc;
    return sortComparator;
  }

  render() {

    let rowProps = this.props.row;

    let fieldId = this.props.fieldId;
    let columns = this.state.columns;
    let data = this.state.data;
    let isPaging = this.state.isPaging;
    let columnStates = this.state.columnStates;
    let columnFrozenSize = 0;
    _.forEach(columns, function(column) {
      columnFrozenSize += column.isFrozen ? column.width : 0;
    });

    let tableWidth = '100%';
    if (this.props.width !== '100%' && this.props.columnWidthType != '%') {
      tableWidth = columns.map(col => col.width)
        .filter(width => typeof width !== 'undefined')
        .reduce((accumulator, curr) => {
          return accumulator + curr;
        });
    }

    let wrapperStyle = {
      width: this.props.width,
      height: this.props.height,
      marginLeft: columnFrozenSize
    };

    let tableStyle = {
      fontSize: this.props.fontSize,
      width: tableWidth - columnFrozenSize,
      tableLayout: this.props.tableLayout
    };

    let leftSize = 0;

    return (
      <div className="data-table-wrapper">
        <div className="data-table-scroller" style={wrapperStyle}>
          <table className="data-table ui celled table" style={tableStyle}>
            <thead>
              <tr className="data-table-row row-header" style={{height: rowProps.height}}>
                {
                  columns.map((column,i) => {

                    let thClasses = classNames({
                      'data-table-cell': true,
                      'frozen': column.isFrozen
                    });

                    let thStyles = {
                      'width': column.width+this.props.columnWidthType,
                      'textAlign': column.headerAlign,
                      'left': leftSize
                    };

                    let iconStyle = classNames({
                      'fa': true,
                      'fa-sort': column.isSorted,
                      'fa-sort-asc': column.isSorted && columnStates[column.name].isSorted === 'asc',
                      'fa-sort-desc': column.isSorted && columnStates[column.name].isSorted === 'desc'
                    });

                    leftSize += column.width;

                    return (
                      <th key={i} className={thClasses} style={thStyles} onClick={() => this.sort(column.name,column.isSorted)}>
                        {column.label} <i className={iconStyle} aria-hidden="true"></i>
                      </th>
                    )
                  })
                }
              </tr>
            </thead>
            <tbody>
              {

                data.map((row,i) => {
                  let leftSize = 0;

                  let tds = columns.map((column,j) => {
                    let value = row[column.accessor];

                    let tdClasses = classNames({
                      'data-table-cell': true,
                      'frozen': column.isFrozen
                    });

                    let tdStyles = {
                      'width': column.width+this.props.columnWidthType,
                      'left': leftSize
                    };

                    leftSize += column.width;

                    if(column.cell!=null) {
                      let id = row[fieldId];
                      let content = column.cell(value,id);
                      return (<td key={j} align={column.align} className={tdClasses} style={tdStyles}>{content}</td>);
                    }
                    else {
                      return (<td key={j} align={column.align} className={tdClasses} style={tdStyles}>{value}</td>);
                    }
                  });

                  let trClasses = classNames({
                    'data-table-row': true
                  });
                  let ret = (<tr key={i} className={trClasses} style={{height: rowProps.height}}>{tds}</tr>);
                  return ret;
                })
              }
            </tbody>
            {
              isPaging && this.state.totalPage > 1 &&
              <tfoot>
                <tr>
                  <th colspan={columns.length}>
                    <div class="ui right floated pagination menu">
                      { this.state.page > 1 &&
                        <a class="icon item" onClick={this.previousPage.bind(this)}>
                          <i class="left chevron icon"></i>
                        </a>
                      }
                      {
                        _.times(this.state.totalPage, i => {
                          let page = i+1;
                          let itemClass = classNames({
                            'item': true,
                            'active': this.state.page == page
                          });
                          return (<a className={itemClass} onClick={this.gotoPage.bind(this)}>{page}</a>)
                        },this)
                      }
                      { this.state.page < this.state.totalPage &&
                        <a class="icon item" onClick={this.nextPage.bind(this)}>
                          <i class="right chevron icon"></i>
                        </a>
                      }
                    </div>
                  </th>
                </tr>
              </tfoot>
            }
          </table>
        </div>
      </div>
    )
  }

}


DataTable.propTypes = {
  fieldId: PropTypes.string.isRequired,
  row: PropTypes.shape({
    height: PropTypes.number.optional
  }).optional,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    headerAlign: PropTypes.oneOf(['left', 'center', 'right']).optional,
    accessor: PropTypes.string.isRequired,
    cell: PropTypes.func.optional,
    width: PropTypes.string.optional,
    align: PropTypes.oneOf(['left', 'center', 'right']).optional,
    isSorted: PropTypes.bool.optional,
    isFrozen: PropTypes.bool.optional
  })).isRequired,
  data: PropTypes.array,
  isPaging: PropTypes.bool.isRequired,
  width: PropTypes.string.optional,
  height: PropTypes.string.optional,
  columnWidthType: PropTypes.oneOf(['px', 'em', 'rem', '%']).optional,
  fontSize: PropTypes.string.optional,
  tableLayout: PropTypes.string.optional
};

DataTable.defaultProps = {
  row: {
    height: 30
  },
  width: '100%',
  height: 'auto',
  columnWidthType: 'px',
  fontSize: '14px',
  tableLayout: 'auto'
};

export default DataTable;