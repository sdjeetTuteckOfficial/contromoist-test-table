import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import PropTypes from 'prop-types';

const TableComponent = ({ tableData, columns, onEdit }) => {
  //   const [tableData, setTableData] = useState(data);
  const handleEdit = (rowIndex, columnId, value, id) => {
    if (onEdit) {
      onEdit(rowIndex, columnId, value, id); // Call the parent's edit handler
    }
  };

  //   const handleEdit = (rowIndex, columnId, value) => {
  //     const updatedData = [...tableData];
  //     updatedData[rowIndex][columnId] = value; // Update the specific column value
  //     setTableData(updatedData);

  //     // Send updated data back to the parent
  //     if (onDataChange) {
  //       onDataChange(updatedData); // Pass the updated data to the parent
  //     }
  //   };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageIndex: 0 }, // Start on the first page
    },
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        style={{ border: 'solid 1px black', width: '100%' }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                const { key, ...restProps } = column.getHeaderProps();
                return (
                  <th
                    key={key} // Set the key directly here
                    {...restProps}
                    style={{
                      borderBottom: 'solid 2px red',
                      background: 'aliceblue',
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: '12px', // Smaller font size for header
                      padding: '4px', // Smaller padding for header
                    }}
                  >
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{
                  backgroundColor: row.original.hasError ? 'red' : 'white',
                  color: row.original.hasError ? 'red' : 'black',
                }}
              >
                {console.log('this is itt', row.original.hasError)}
                {row.cells.map((cell) => {
                  const { key, ...restProps } = cell.getCellProps();
                  return (
                    <td
                      key={key} // Set the key directly here
                      {...restProps}
                      style={{
                        padding: '4px', // Reduced padding for smaller rows
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                        fontSize: '12px', // Smaller font size for table rows
                      }}
                      align='center'
                    >
                      {cell.column.editable ? (
                        <input
                          type={cell.column.type}
                          value={cell?.value}
                          onChange={(e) =>
                            handleEdit(
                              row.index,
                              cell.column.id,
                              e.target.value,
                              row.id
                            )
                          }
                          style={{ width: '80%' }}
                        />
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className='pagination'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '50px', fontSize: '12px' }} // Smaller input size
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          style={{ fontSize: '12px' }} // Smaller font size for select dropdown
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

TableComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDataChange: PropTypes.func,
};

export default TableComponent;
