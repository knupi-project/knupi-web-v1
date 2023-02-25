import React from 'react';
import { useMemo } from 'react';
import { useTable } from 'react-table';

const ReservedList = ({ list }) => {
  // 표 columns
  const columns = useMemo(
    () => [
      {
        Header: '예약 시간',
        accessor: 'time',
      },
      {
        Header: '업라이트 피아노',
        accessor: '0번',
      },
      {
        Header: '1번 피아노',
        accessor: '1번',
      },
      {
        Header: '2번 피아노',
        accessor: '2번',
      },
      {
        Header: '3번 피아노',
        accessor: '3번',
      },
    ],
    []
  );
  const data = useMemo(() => list, [list]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="hi">
      <table
        {...getTableProps()}
        style={{
          width: '150%',
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    textAlign: 'center',
                    width: '100px',
                    borderBottom: 'solid 3px black',
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.3rem',
                        borderBottom: 'solid 1px gray',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReservedList;
