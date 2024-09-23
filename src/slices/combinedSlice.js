// src/slices/CombinedSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buckets: [], // Array to store bucket objects
  cards: [], // Array to store card objects
  selectedBucketId: null, // ID of the currently selected bucket
  selectedBucketCard: [],
};

const combinedSlice = createSlice({
  name: "combined",
  initialState,
  reducers: {
    // Bucket reducers
    addBucket: (state, action) => {
      const newBucket = { id: Date.now(), name: action.payload };
      state.buckets.push(newBucket);
    },
    editBucket: (state, action) => {
      const { id, name } = action.payload;
      const bucket = state.buckets.find((bucket) => bucket.id === id);
      if (bucket) {
        bucket.name = name;
      }
    },
    deleteBucket: (state, action) => {
      state.buckets = state.buckets.filter(
        (bucket) => bucket.id !== action.payload
      );
      // Also remove cards associated with the deleted bucket
      state.cards = state.cards.filter(
        (card) => card.bucketAdded !== action.payload
      );
    },

    // Card reducers
    addCard: (state, action) => {
      const newCard = {
        id: Date.now(),
        name: action.payload.name,
        bucketAdded: action.payload.bucketAdded, // ID of the bucket this card is added to
        mediaUrl: action.payload.mediaUrl,
      };
      state.cards.push(newCard);
    },
    editCard: (state, action) => {
      const { id, name, mediaUrl } = action.payload;
      const card = state.cards.find((card) => card.id === id);
      if (card) {
        card.name = name;
        card.mediaUrl = mediaUrl;
      }
    },
    deleteCard: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },

    // New action to delete multiple cards
    deleteMultipleCards: (state, action) => {
      const cardIdsToDelete = action.payload;
      state.cards = state.cards.filter(
        (card) => !cardIdsToDelete.includes(card.id)
      );
    },

    // New action to move multiple cards to a new bucket
    moveCardsToBucket: (state, action) => {
      const { cardIds, newBucketId } = action.payload;
      state.cards.forEach((card) => {
        if (cardIds.includes(card.id)) {
          card.bucketAdded = newBucketId;
        }
      });
    },

    // Select bucket
    selectBucket: (state, action) => {
      state.selectedBucketId = action.payload;
    },

    // Get cards by bucket ID
    getCardsByBucketId: (state, action) => {
      const bucketId = String(action.payload);
      state.selectedBucketCard = state.cards.filter(
        (card) => String(card.bucketAdded) === bucketId
      );
    },
  },
});

// Export actions
export const {
  addBucket,
  editBucket,
  deleteBucket,
  addCard,
  editCard,
  deleteCard,
  deleteMultipleCards,
  moveCardsToBucket,
  selectBucket,
  getCardsByBucketId,
} = combinedSlice.actions;

export default combinedSlice.reducer;
