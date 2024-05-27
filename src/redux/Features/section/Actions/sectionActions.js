import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addsection,
  deletesection,
  editsection,
} from "../../../../service/sectionService";

export const addSection = createAsyncThunk(
  "section/addSection",
  (sectionObject) => {
    return addsection(sectionObject).then((response) => response.data);
  }
);

export const updateSection = createAsyncThunk(
  "section/updateSection",
  (param) => {
    return editsection(param.id, param.sectionObject).then(
      (response) => response.data
    );
  }
);

export const deleteSection = createAsyncThunk("section/deleteSection", (id) => {
  return deletesection(id).then((response) => response.data);
});
