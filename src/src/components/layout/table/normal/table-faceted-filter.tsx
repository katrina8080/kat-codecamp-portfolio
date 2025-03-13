import * as React from 'react';
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { State, none, useHookstate } from '@hookstate/core';

interface DataTableFacetedFilterProps {
  data: State<any[]>;
  filteredData: State<any[]>;
  column?: String;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter({ data, filteredData, column, title, options }: DataTableFacetedFilterProps) {
  const selectedValues = useHookstate([]);

  React.useEffect(() => {
    console.log('filteredData', filteredData.get({ noproxy: true }));
  }, [filteredData]);

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.length > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.value.includes(option.value))
                    .map((option) => (
                      <Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal">
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList className="">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="">
              {options.map((option) => {
                const isSelected = selectedValues.value.includes(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        const findIndex = selectedValues.value.findIndex((x) => x === option.value);
                        selectedValues[findIndex].set(none);
                      } else {
                        selectedValues.merge([option.value]);
                      }
                      console.log('selectedValues', selectedValues.value);

                      if (selectedValues.length === 0) {
                        filteredData.set(data.get({ noproxy: true }));
                      } else {
                        filteredData.set(
                          data.get({ noproxy: true }).filter((el) => {
                            if (selectedValues.value.includes(`${el[`${column}`]}`)) return el;
                          }),
                        );
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                        isSelected ? 'text-primary-foreground' : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4 text-primary')} />
                    </div>
                    {option.icon && <option.icon className="text-muted-foreground mr-2 h-4 w-4" />}
                    <span>{option.label}</span>
                    {data.value.filter((row) => `${row[`${column}`]}` === option.value).length > 0 && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {data.value.filter((row) => `${row[`${column}`]}` === option.value).length}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      selectedValues.set([]);
                      filteredData.set(data.get({ noproxy: true }));
                    }}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
