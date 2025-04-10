import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SyntheticEvent } from "react";

// Define the interface for table data
interface TableData {
  filterActions: {
    globalFilter: string;
    setGlobalfilter: (e: SyntheticEvent) => void;
  };

  paginationAction: {
    canPreviousPage: boolean;
    canNextPage: boolean;
    gotoPage: (page: number) => void;
    setPageSize: (page: number) => void;
    previousPage: () => void;
    nextPage: () => void;
    pageIndex: number;
    pageCount: number;
    dataLength: number;
    pageSize: number;
  };
}

// Define the initial state
const initialState: TableData = {
  filterActions: {
    globalFilter: "",
    setGlobalfilter: (e: SyntheticEvent) => {
      // Placeholder implementation
      console.log("setGlobalfilter called", e);
    },
  },

  paginationAction: {
    canPreviousPage: false,
    canNextPage: false,
    gotoPage: (page: number) => {
      // Placeholder implementation
      console.log("gotoPage called", page);
    },
    setPageSize: (page: number) => {
      // Placeholder implementation
      console.log("setPageSize called", page);
    },
    previousPage: () => {
      // Placeholder implementation
      console.log("previousPage called");
    },
    nextPage: () => {
      // Placeholder implementation
      console.log("nextPage called");
    },
    pageIndex: 0,
    pageCount: 0,
    dataLength: 0,
    pageSize: 0,
  },
};

// Create a slice for table-related actions and reducers
const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    // Action to update filter properties
    getFilterProps(
      state,
      action: PayloadAction<{
        globalFilter: string;
        setGlobalfilter: (e: SyntheticEvent) => void;
      }>
    ) {
      const { globalFilter, setGlobalfilter } = action.payload;
      state.filterActions = {
        globalFilter,
        setGlobalfilter,
      };
    },

    getPaginationProps(
      state,
      action: PayloadAction<{
        canPreviousPage: boolean;
        canNextPage: boolean;
        gotoPage: (page: number) => void;
        setPageSize: (page: number) => void;
        previousPage: () => void;
        nextPage: () => void;
        pageIndex: number;
        pageCount: number;
        dataLength: number;
        pageSize: number;
      }>
    ) {
      const { canPreviousPage, canNextPage, gotoPage, setPageSize, previousPage, nextPage, pageIndex, pageCount, dataLength, pageSize } =
        action.payload;
      state.paginationAction = {
        canPreviousPage,
        canNextPage,
        gotoPage,
        setPageSize,
        previousPage,
        nextPage,
        pageIndex,
        pageCount,
        dataLength,
        pageSize,
      };
    },
  },
});

// Export action creators and reducer
export const { getFilterProps, getPaginationProps } = tableSlice.actions;
export const tableReducer = tableSlice.reducer;