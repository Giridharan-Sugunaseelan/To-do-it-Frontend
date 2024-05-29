import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addsection,
  deletesection,
  editsection,
} from "../../../../service/sectionService";

import { startLoading, endLoading } from "../../Loading/loadingSlice";

export const addSection = createAsyncThunk(
  "section/addSection",
  async (sectionObject, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await addsection(sectionObject);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const updateSection = createAsyncThunk(
  "section/updateSection",
  async (param, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await editsection(param.id, param.sectionObject);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);

export const deleteSection = createAsyncThunk(
  "section/deleteSection",
  async (id, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await deletesection(id);
      return response.data;
    } finally {
      dispatch(endLoading());
    }
  }
);
