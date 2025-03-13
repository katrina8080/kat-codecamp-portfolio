'use client';

import { Cross2Icon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './table-view-option';
import { DataTableFacetedFilter } from './table-faceted-filter';
import { useGlobalState } from '@/lib/store';

export function DataTableToolbar({ id = '', table, meta = null }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* <Input
          placeholder="Filter users..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        /> */}
        {meta ? (
          <Input
            placeholder="Search..."
            onChange={(event) => {
              table.setGlobalFilter(event.target.value);
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ) : (
          <Input
            placeholder="Search..."
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}

        {id === 'users' && (
          <>
            {table.getColumn('status') && (
              <DataTableFacetedFilter
                column={table.getColumn('status')}
                title="Status"
                options={[
                  { label: 'True', value: 'True' },
                  { label: 'False', value: 'False' },
                ].map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
              />
            )}
            {table.getColumn('role') && (
              <DataTableFacetedFilter
                column={table.getColumn('role')}
                title="Role"
                options={[
                  { label: 'Author', value: 'author' },
                  { label: 'Editor', value: 'editor' },
                ].map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
              />
            )}
          </>
        )}

        {isFiltered && (
          <Button variant="destructive" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
