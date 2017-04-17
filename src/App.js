import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

var ReactDataGrid = require('react-data-grid');
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');

var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

          <p className="App">
              <Example/>
          </p>

          <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>


        <FilterableProductTable products={PRODUCTS} />
      </div>

    );
  }
}


class ProductCategoryRow extends React.Component {
    render() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
}

class ProductRow extends React.Component {
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
        return (
            <tr>
              <td>{name}</td>
              <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
        console.log(this.props.inStockOnly)
        this.props.products.forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        return (
            <table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
        );
    }
}


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    handleInStockInputChange(e) {
        this.props.onInStockInput(e.target.checked);
    }

    render() {
        return (
            <form>
              <input
                  type="text"
                  placeholder="Search..."
                  value={this.props.filterText}
                  onChange={this.handleFilterTextInputChange}
              />
              <p>
                <input
                    type="checkbox"
                    checked={this.props.inStockOnly}
                    onChange={this.handleInStockInputChange}
                />
                  {' '}
                Only show products in stock
              </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleInStockInput = this.handleInStockInput.bind(this);
    }

    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockInput(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    render() {
        return (
            <div>
              <SearchBar
                  filterText={this.state.filterText}
                  inStockOnly={this.state.inStockOnly}
                  onFilterTextInput={this.handleFilterTextInput}
                  onInStockInput={this.handleInStockInput}
              />
              <ProductTable
                  products={this.props.products}
                  filterText={this.state.filterText}
                  inStockOnly={this.state.inStockOnly}
              />
            </div>
        );
    }

}


const Example = React.createClass({
    getInitialState() {
        this.createRows();
        this._columns = [
            { key: 'id', name: 'ID', width: 50, filterable: true },
            { key: 'task', name: 'Title',width: 100, filterable: true },
            { key: 'complete', name: 'Count',width: 60, filterable: true },
            { key: 'issueType', name: 'Iss Type',width: 100, filterable: true } ,
            { key: 'startDate', name: 'Start Date',width: 100, filterable: true } ];

        return { rows: this.createRows(), filters: {} };
    },

    getRandomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
    },

    createRows() {
        let rows = [];
        for (let i = 1; i < 1000; i++) {
            rows.push({
                id: i,
                task: 'Task ' + i,
                complete: Math.min(100, Math.round(Math.random() * 110)),
                priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
                issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
                startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
                completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
            });
        }

        return rows;
    },

    rowGetter(rowIdx) {
        let rows = this.getRows();
        return rows[rowIdx];
    },

    getRows() {
        return Selectors.getRows(this.state);
    },

    getSize() {
        return this.getRows().length;
    },

    onClearFilters() {
        // all filters removed
        this.setState({filters: {} });
    },

    handleFilterChange(filter) {
        // TODO:  Send the filter change to the server
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }
        this.setState({ filters: newFilters });
    },

    render() {

        var ws = new WebSocket("ws://localhost:9090");

        ws.onmessage = function(event) {
            console.log(event)
            var text = new FileReader().readAsText(event.data);
            console.log(text)
        };

        ws.onopen = function(event) {
            ws.send("hi");
        };

        // Handle any errors that occur.
        ws.onerror = function(error) {
            console.log('WebSocket Error: ' + error);
        };


        return  (
            <div className="myGrid">
                <ReactDataGrid
                    headerRowHeight={30}
                    rowHeight={20}
                    columns={this._columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.getSize()}
                    minHeight={200}
                    onAddFilter={this.handleFilterChange}
                    toolbar={<Toolbar enableFilter={true}/>}
                    onClearFilters={this.onClearFilters} />
            </div>
        );
    }
});


export default App;
