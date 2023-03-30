import React, {useState, useEffect} from 'react';
import { db } from 'util/firebaseConfig';
import { useMemo } from 'react';
import { doc} from 'firebase/firestore';
import { useTable } from 'react-table';

const ReservedList = ({list , onDeleteClick,  }) => {

  async function handleDeleteClick(docRef) {
    onDeleteClick(docRef);
  }

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
        Cell: ({ cell }) => {
          const { value, isUser, YMD, pn, time, isPastDate} = cell.row.original['0번'];
          return (
            <><div className="value_btn">
              {value}
              {isUser && !isPastDate && (<button className="btn_delete"               
              onClick={() => 
                handleDeleteClick(doc(db, 'reservations', YMD, pn, time))}>취소</button>)}
              </div>
            </>
          );
        },
      },
      {
        Header: '1번 피아노',
        accessor: '1번',
        Cell: ({ cell }) => {
          const { value, isUser,YMD, pn, time, isPastDate} = cell.row.original['1번'];
          return (
            <>
            <div className="value_btn">
              {value}
              {isUser && !isPastDate && (<button className="btn_delete"               
              onClick={() => 
                handleDeleteClick(doc(db, 'reservations', YMD, pn, time))}>취소</button>)}
              </div>
            </>
          );
        },
        
      },
      {
        Header: '2번 피아노',
        accessor: '2번',
        Cell: ({ cell }) => {
          const { value, isUser,YMD, pn, time, isPastDate} = cell.row.original['2번'];
          return (
            <>
            <div className="value_btn">
              {value}
              {isUser && !isPastDate && (<button className="btn_delete"               
              onClick={() => 
                handleDeleteClick(doc(db, 'reservations', YMD, pn, time))}>취소</button>)}
              </div>
            </>
          );
        },
      },
      {
        Header: '3번 피아노',
        accessor: '3번',
        Cell: ({ cell }) => {
          const { value, isUser,YMD, pn, time, isPastDate} = cell.row.original['3번'];
          return (
            <>
            <div className="value_btn">
              {value}
              {isUser && !isPastDate && (<button className="btn_delete" 
              onClick={() => 
                handleDeleteClick(doc(db, 'reservations', YMD, pn, time))}
                >취소</button>)}
              </div>
            </>
          );
        },
      },
    ],
    []
  );
  const data = useMemo(() => {
    return list.filter(item => item['is0'] !== 0); // 'is0' 값이 0이 아닌 요소들만 추출
  }, [list]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="hi">
      <table {...getTableProps()} className="reservedList_table_width">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="reservedList_piano">
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
                    <td {...cell.getCellProps()} className="reservedList_name">
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
