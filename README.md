## Depedencies ##
Semantic UI css style:

[Semantic UI Style CSS](https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css)

```sh
npm install --save font-awesome
```

## Installation ##
```sh
npm install --save github:fahrurben/react-data-table
```

## Getting Started ##

```javascript
import DataTable from 'react-data-table/dist/DataTable';

import 'react-data-table/dist/data-table.css';
```

Example:
```javascript

let columns = [
  {
    name: 'fullname',
    label: 'Fullname',
    accessor: 'fullname',
    width: 100,
    headerAlign: 'left',
    isFrozen: true,
    isSorted: true
  },
  {
    name: 'firstname',
    label: 'Firstname',
    accessor: 'firstname',
    width: 200,
    isFrozen: true,
    isSorted: true
  },
  {
    name: 'lastname',
    label: 'Lastname',
    accessor: 'lastname',
    width: 1000,
    cell: (value,id) => {
      return (<div dataid={id} className="" onClick={this.nameClicked.bind(this)}>{id}-{value}</div>)
    }
  }
];



return (
	<DataTable fieldId="id" columns={columns} data={employees} isPaging={true} page={1}
            total={total} perPage={10} />
)
```

## Properties ##
* width (string): the width of table
* height (string): the height of table
* columnWidthType : the column width type. use 'px', 'em', 'rem', or '%'
* data : array of data
* fieldId : the field that contains id in data
* fontSize : the size of font 
* tableLayout : the css table-layout property, default 'auto'
* isPaging : will set the pagination of table
* total : total row of data from REST API
* row :  
	* height : the height of row
* columns : arrray
	* name : Column name
	* label : Column label, in thead
	* headerAlign : align of header, 'right', 'left', 'center'
	* accessor : the field name for accessing the data. map the column with data
	* cell : custom function to format the cell
	* width : the width of column
	* align : the align of column
	* isSorted : set the column to support sorting
	* isFrozen : set the column to frozen
