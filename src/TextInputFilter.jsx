import React from 'react';
import classNames from 'classnames';

class TextInputFilter extends React.Component {

  constructor(props) {
  	super(props);

    this.state = {
    	filter: props.filter,
    	data: props.data
    };

    this.inputChange = props.inputChange;
  }

  onChange(e) {
    let value = e.target.value;
    this.setState({ data: value });
    this.inputChange(value);
  }

  render() {

  	let filter = this.state.filter;
  	let data = this.state.data;

    let wide = filter.columnWidth || "three";
    let fieldClasess = classNames([wide,'wide','field']);

    return (
    	<div className={fieldClasess}>
    	  <label>{filter.label}</label>
    	  <div class="ui input">
    	    <input type="text" placeholder={filter.label} onChange={this.onChange.bind(this)}
    	    	value={data} />
    	  </div>
    	</div>
    )
  }

}

export default TextInputFilter