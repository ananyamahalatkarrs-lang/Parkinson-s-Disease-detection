import React from 'react';
import './Table.css';

interface TableProps {
  headers: string[];
  rows: (string | number | React.ReactNode)[][];
}

export const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
