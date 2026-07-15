import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../Table';
import { Icons } from '../Icons';
import { cn } from '../../../utils/cn';

/**
 * Brovet DataTable — lightweight columns/data API (no tanstack).
 *
 *   columns: [{ id, header, accessorKey?, cell?(row), sortable?, className?, headerClassName? }]
 *   data: array of row objects
 */
function getCellValue(row, column) {
  if (typeof column.cell === 'function') return column.cell(row);
  if (column.accessorKey) return row?.[column.accessorKey];
  return row?.[column.id];
}

function SortIndicator({ direction }) {
  if (!direction) {
    return <Icons.ChevronDown className="h-3.5 w-3.5 text-neutral-border opacity-60" />;
  }
  return direction === 'asc' ? (
    <Icons.ChevronUp className="h-3.5 w-3.5 text-primary" />
  ) : (
    <Icons.ChevronDown className="h-3.5 w-3.5 text-primary" />
  );
}

function DataTable({
  columns = [],
  data = [],
  className,
  emptyMessage = 'No results.',
  size = 'default',
}) {
  const [sorting, setSorting] = React.useState({ id: null, desc: false });

  const sortedData = React.useMemo(() => {
    if (!sorting.id) return data;
    const col = columns.find((c) => c.id === sorting.id);
    if (!col) return data;

    const copy = [...data];
    copy.sort((a, b) => {
      const av = getCellValue(a, col);
      const bv = getCellValue(b, col);
      const aStr = av == null ? '' : String(av);
      const bStr = bv == null ? '' : String(bv);
      const cmp = aStr.localeCompare(bStr, undefined, { numeric: true, sensitivity: 'base' });
      return sorting.desc ? -cmp : cmp;
    });
    return copy;
  }, [columns, data, sorting]);

  const toggleSort = (columnId) => {
    setSorting((prev) => {
      if (prev.id !== columnId) return { id: columnId, desc: false };
      if (!prev.desc) return { id: columnId, desc: true };
      return { id: null, desc: false };
    });
  };

  const headPad = size === 'compact' ? 'px-4 py-3' : undefined;
  const cellPad = size === 'compact' ? 'px-4 py-3 text-xs' : undefined;

  return (
    <div className={cn('w-full', className)} data-slot="data-table">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((column) => {
              const sorted =
                sorting.id === column.id ? (sorting.desc ? 'desc' : 'asc') : false;
              return (
                <TableHead
                  key={column.id}
                  className={cn(headPad, column.headerClassName)}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(column.id)}
                      className={cn(
                        'inline-flex items-center gap-1.5 select-none transition-colors hover:text-primary',
                        sorted && 'text-primary'
                      )}
                    >
                      {typeof column.header === 'function'
                        ? column.header()
                        : column.header}
                      <SortIndicator direction={sorted} />
                    </button>
                  ) : typeof column.header === 'function' ? (
                    column.header()
                  ) : (
                    column.header
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedData.length > 0 ? (
            sortedData.map((row, rowIndex) => (
              <TableRow key={row.id ?? rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    className={cn(cellPad, column.className)}
                  >
                    {getCellValue(row, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-neutral-muted"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export { DataTable };
