import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { data: [] },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.data.push(action.payload);
      },
    },
    removeContact: {
      reducer(state, action) {
        const index = state.data.findIndex(
          contact => contact.id === action.payload
        );
        state.data.splice(index, 1);
      },
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
