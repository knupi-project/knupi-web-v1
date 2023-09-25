import React from 'react';
import { useMemo } from 'react';
import { useTable } from 'react-table';

const options = {
  weekday: 'short',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};
const ReserveTable = () => {
  const data = useMemo(
    () => [
      {
        col1: new Date().toLocaleString('ko-KR', options),
        col2: '13:00',
        col3: '1번 피아노',
        col4: '멘토링',
        col5: (
          <button
            onClick={() => {
              alert('킄킄');
              alert('취소하는 기능은 아쉽게도 아직 없습니다');
              alert('신중하게.. 예약.. 부탁드립니다.. ');
            }}
          >
            취소하기
          </button>
        ),
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: '날짜',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: '시간',
        accessor: 'col2',
      },
      {
        Header: '종류',
        accessor: 'col3',
      },
      {
        Header: '목적',
        accessor: 'col4',
      },
      {
        Header: '확인하기',
        accessor: 'col5',
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      style={{
        width: '100%',
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
                  width: '20%',
                  borderBottom: 'solid 3px black',
                  color: 'black',
                  fontWeight: 'bold',
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
  );
};

export default ReserveTable;
