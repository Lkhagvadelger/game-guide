import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpoint
} from "@ui/index";
import React, { ReactNode } from "react";
type Column = {
  Cell?: (data: any) => JSX.Element;
  Header?: ReactNode;
  accessor?: string;
  hideInMobile?: boolean;
};

type Props = {
  tableName?: string;
  columns: Column[];
  data: any[];
  editFunction?: (data: any) => void;
  onRowClick?: (data: any) => void;
};

export const TableContent = ({
  data,
  columns,
  editFunction,
  tableName,
  onRowClick,
}: Props) => {
  const bp = useBreakpoint();
  const [rowId, setRowId] = React.useState<string | null>(null);
  return (
    <Table my="4" fontSize="sm" key={tableName} borderRadius={"4px"}>
      <Thead borderRadius={"4px"}>
        <Tr key={1} borderColor="gray.50">
          {columns.map((column, index) => {
            return (
              <>
                {bp !== "sm" && bp !== "base" && (
                  <Th fontWeight={"400"} key={index} p={1}>
                    {column.Header}
                  </Th>
                )}
              </>
            );
          })}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <Tr
            key={index}
            borderColor="gray.50"
            onClick={() => {
              setRowId(row.id);
              onRowClick && onRowClick(row);
            }}
            bg={rowId === row.id ? "gray.100" : "white"}
          >
            {columns.map((column, cindex) => {
              const cell = column.accessor
                ? row[column.accessor as keyof typeof row]
                : row;
              const element = column.Cell?.(cell) ?? cell;

              return (
                <>
                  {bp !== "sm" && bp !== "base" && (
                    <Td key={cindex} borderColor="gray.100" p={1}>
                      {element}
                    </Td>
                  )}
                </>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
