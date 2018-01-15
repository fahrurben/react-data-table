import React from 'react';
import classNames from 'classnames';

class DropdownInputFilter extends React.Component {

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
    this.setState({
      data: value
    });
    this.inputChange(value);
  }

  render() {

    let filter = this.state.filter;
    let data = this.state.data;

    let wide = filter.columnWidth || "three";
    let fieldClasess = classNames([wide, 'wide', 'field']);

    return (
      <div className={fieldClasess}>
        <label>{filter.label}</label>
        <div class="ui input">
          <select value={data} onChange={this.onChange.bind(this)}>
            <option value="">{filter.label}</option>
            {
              filter.options.map((option,i) => {
                return (<option value={option.value}>{option.label}</option>)
              })
            }
          </select>
        </div>
      </div>
    )
  }

}

export default DropdownInputFilter;