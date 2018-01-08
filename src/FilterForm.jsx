import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';

class FilterForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    	isShowFilter: false,
    	filters: props.filters,
    	data: props.data
    };

    this.filterTable = props.filterTable;

    this.createFilterInput = this.createFilterInput.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  filterParaClicked(e) {
  	this.setState({ isShowFilter: !this.state.isShowFilter });
  }

  submitClicked(e) {
  	this.filterTable(this.state.data);
  }

  clearClicked(e) {

  }

  /**
   * Create filter input field
   */
  createFilterInput(filter) {
  	let data = this.state.data[filter.name];
    let inputChange = (value) => {
      let data = this.state.data;
      data[filter.name] = value;
      this.setState({ data: data });
    };
    return React.createElement(this.props.components[filter.type], 
      {filter: filter, data: data, inputChange: inputChange}, null);  
  }

  render() {

  	let filters = this.state.filters;
  	let data = this.state.data;

  	let filtersLength = filters.length;
  	let rowSize = 1;
    _.forEach(filters, function(filter) {
      rowSize = filter.row > rowSize ? filter.row : rowSize;
    });

  	let expandIcon = classNames({
  		'icon': true,
  		'plus': !this.state.isShowFilter,
  		'minus': this.state.isShowFilter
  	});

    return (
      <div class="ui segments">
	      <div className="ui segment secondary filterSegment" onClick={this.filterParaClicked.bind(this)}>
	        <p>Filter
	        	<a href="javascript:;"><i className={expandIcon}></i></a>
	        </p>
	      </div>
	      { this.state.isShowFilter && 
	      <div class="ui segment">
	        <form className="ui form">
	        	{
		        	_.times(rowSize, i => {

                let columnSize = [];
                _.forEach(filters, function(filter,key) {
                  if(filter.row === i+1) {
                    columnSize.push(key); 
                  }
                });
                console.log(columnSize);

		        		let fields = _.times(columnSize.length, j => {
	        				let filter = filters[columnSize[j]];
		        			return this.createFilterInput(filter);
	        			});

	        			return(
		        			<div className="grid">
		        		    <div className="fields">
		        		    	{fields}
		        		    </div>
		        		  </div>
	        		  )
	        		})
	        	}

	          <div className="field">
	          	<div class="searchButtonBox">
		          	<a className="ui blue button searchButton" onClick={this.submitClicked.bind(this)}>
		          	  <i class="search icon"></i>Search
		          	</a>
		          	<a className="ui button" onClick={this.clearClicked.bind(this)}>
		          	  <i class="refresh icon"></i>Clear
		          	</a>
	          	</div>
	          	<div class="clearfix"></div>
	          </div>

	        </form>
	      </div>
	      }
	    </div>
    )
  }

}

FilterForm.propTypes = {
	filterTable: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			param: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
      row: PropTypes.number.optional,
      columnWidth: PropTypes.number.optional,
			options: PropTypes.array.optional,
			optionValueField: PropTypes.string.optional,
			optionLabelField: PropTypes.string.optional
	  })).isRequired,
  data: PropTypes.array,
  components: PropTypes.array.optional
};


export default FilterForm;