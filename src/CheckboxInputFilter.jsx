import React from 'react';
import classNames from 'classnames';


class CheckboxInputFilter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: props.filter,
      data: props.data
    };

    this.inputChange = props.inputChange;
  }

  onChange(e) {
    this.setState({
      data: !this.state.data
    });
    this.inputChange(!this.state.data);
  }

  render() {

    let filter = this.state.filter;
    let data = this.state.data;

    let wide = filter.columnWidth || "three";
    let fieldClasess = classNames([wide, 'wide', 'field']);

    let checkboxStyle = {
      width: 'auto'
    };

    return (
      <div className={fieldClasess}>
        <label>{filter.label}</label>
        <div class="ui input" style={checkboxStyle} >
          <input type="checkbox" placeholder={filter.label} checked={data} 
            onClick={this.onChange.bind(this)}/>
        </div>
      </div>
    )
  }

}

export default CheckboxInputFilter;