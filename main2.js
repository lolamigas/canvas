var filterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
 
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
 
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
 
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};
 
var columnDefs = [
  { field: ‘area’ },
  { field: ‘page type’, filter: 'agNumberColumnFilter', maxWidth: 100 },
  { field: ‘route’ },
  { field: ‘page status’, maxWidth: 100 },
  {
    field: ‘live date’,
    filter: 'agDateColumnFilter',
    filterParams: filterParams,
  },
  { field: ‘last modified’ },
  { field: ‘modified by’, filter: 'agNumberColumnFilter' },
  { field: ‘date created’, filter: 'agNumberColumnFilter' },
  { field: ‘page weight’, filter: 'agNumberColumnFilter' },
  { field: ‘ID’, filter: false },
];
 
var gridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
  },
};
 
// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
 
  agGrid
    .simpleHttpRequest({
      url: 'https://www.ag-grid.com/example-assets/olympic-winners.json',
    })
    .then(function (data) {
      gridOptions.api.setRowData(data);
    });
});
