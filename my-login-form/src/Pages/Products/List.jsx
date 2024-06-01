// src/Pages/Products/List.jsx

import React from "react";
import { List, useDataGrid, DateField } from "@refinedev/mui";
import { DataGrid } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";

export const ProductList = () => {
  const { dataGridProps } = useDataGrid();

  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids:
      dataGridProps?.rows?.map((item) => item?.category?.id).filter(Boolean) ??
      [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo(
    () => [
      { field: "id", headerName: "ID", type: "number" },
      { field: "name", flex: 1, headerName: "Name" },
      {
        field: "category",
        flex: 1,
        headerName: "Category",
        renderCell: ({ value }) =>
          isLoading
            ? "Loading..."
            : categories?.data?.find((item) => item.id === value?.id)?.title,
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created at",
        renderCell: ({ value }) => <DateField value={value} />,
      },
    ],
    [categories?.data, isLoading]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
