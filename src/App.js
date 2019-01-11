import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExportToExcel from "./ExportToExcel";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      pageSizeOptions: [5, 10, 15, 20, 25, 50, 100]
    };
  }

  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(posts => {
        this.setState({ posts: posts });
      });
  }
  render() {
    const columns = [
      {
        Header: "User Id",
        accessor: "userId",
        sortable: true,
        filterable: true,
        resizable: true,
        style: {
          textAlign: "center"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Id",
        accessor: "id",
        sortable: true,
        filterable: true,
        resizable: true,
        style: {
          textAlign: "center"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Title",
        accessor: "title",
        sortable: true,
        filterable: true,
        resizable: true
      },
      {
        Header: "Content",
        accessor: "body",
        sortable: true,
        filterable: true,
        resizable: true
      }
    ];
    return (
      <ReactTable
        columns={columns}
        data={this.state.posts}
        loading={false}
        showPagination={true}
        showPaginationTop={false}
        showPaginationBottom={true}
        showPageSizeOptions={true}
        pageSizeOptions={this.state.pageSizeOptions}
        defaultPageSize={20}
        noDataText={"Loading..."}
      >
        {(state, filteredData, instance) => {
          this.reactTable = state.pageRows.map(post => {
            return post._original;
          });
          return (
            <div>
              {filteredData()}
              <ExportToExcel posts={this.reactTable} />
            </div>
          );
        }}
      </ReactTable>
    );
  }
}

export default App;
