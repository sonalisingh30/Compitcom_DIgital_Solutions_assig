// src/slices/CardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CardName: "",
  bucketName: null, // Default to null
  mediaUrl: "",
  cards: [],
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCardName: (state, action) => {
      state.CardName = action.payload;
    },
    setBucketName: (state, action) => {
      state.bucketName = action.payload;
    },
    setMediaUrl: (state, action) => {
      state.mediaUrl = action.payload;
    },
    addCard: (state, action) => {
      const newCard = {
        CardName: action.payload.CardName,
        bucketName: action.payload.bucketName,
        mediaUrl: action.payload.mediaUrl,
      };
      state.cards.push(newCard); // Add new card to the list
    },
    clearForm: (state) => {
      state.CardName = "";
      state.bucketName = null; // Reset bucketName to null
      state.mediaUrl = "";
    },
  },
});

export const { setCardName, setBucketName, setMediaUrl, addCard, clearForm } =
  cardSlice.actions;

export default cardSlice.reducer;
