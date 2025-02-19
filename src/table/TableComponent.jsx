import React, { useState, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import PropTypes from 'prop-types';

const TableComponent = ({ tableData, columns, onEdit, searchColumns }) => {
  const [searchInput, setSearchInput] = useState('');

  // Filter data based on search input
  const filteredData = useMemo(() => {
    if (!searchInput) return tableData;
    return tableData.filter((row) =>
      searchColumns.some((col) =>
        String(row[col]).toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [tableData, searchInput, searchColumns]);

  const handleEdit = (rowIndex, columnId, value, id) => {
    if (onEdit) {
      onEdit(rowIndex, columnId, value, id); // Call the parent's edit handler
    }
  };

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
      data: filteredData,
      initialState: { pageIndex: 0 }, // Start on the first page
    },
    usePagination
  );

  return (
    <>
      {/* Global Search Input */}
      <input
        type='text'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder='Search...'
        style={{ margin: '10px', padding: '5px', width: '200px' }}
      />

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
                    key={key}
                    {...restProps}
                    style={{
                      borderBottom: 'solid 2px red',
                      background: 'aliceblue',
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      padding: '4px',
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
              <React.Fragment key={row.id}>
                <tr
                  {...row.getRowProps()}
                  style={{
                    backgroundColor: row.original.hasError ? 'red' : 'white',
                    color: row.original.hasError ? 'red' : 'black',
                  }}
                >
                  {row.cells.map((cell) => {
                    const { key, ...restProps } = cell.getCellProps();
                    return (
                      <td
                        key={key}
                        {...restProps}
                        style={{
                          padding: '4px',
                          border: 'solid 1px gray',
                          background: 'papayawhip',
                          fontSize: '12px',
                        }}
                        align='center'
                      >
                        {cell.column.editable ? (
                          <input
                            type={cell.column.type}
                            value={cell.value}
                            onChange={(e) =>
                              handleEdit(
                                row.index,
                                cell.column.id,
                                e.target.value,
                                row.original.id
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
                {row.original.errorMessages?.length > 0 && (
                  <tr>
                    <td colSpan={columns.length} style={{ padding: '0' }}>
                      {row.original.errorMessages.map((item, i) => (
                        <p
                          key={i}
                          style={{
                            backgroundColor: '#f8d7da',
                            color: '#721c24',
                            border: '1px solid #f5c6cb',
                            borderRadius: '4px',
                            padding: '5px',
                            margin: '5px 0',
                            fontSize: '9px',
                          }}
                        >
                          {item}
                        </p>
                      ))}
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
            style={{ width: '50px', fontSize: '12px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          style={{ fontSize: '12px' }}
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
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  searchColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableComponent;
