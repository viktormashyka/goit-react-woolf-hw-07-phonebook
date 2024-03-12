import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

export const fetchContactsThunk = createAsyncThunk('contacts/fetchAll', () =>
  fetchContacts()
);
export const addContactThunk = createAsyncThunk('contacts/addContact', body =>
  addContact(body)
);
export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  id => deleteContact(id)
);

const handleFulfilledContacts = (state, action) => {
  state.items = action.payload;
  state.isLoading = false;
};
const handleFulfilledAddContact = (state, action) => {
  state.items.push(action.payload);
  state.isLoading = false;
};
const handleFulfilledDeleteContact = (state, action) => {
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.items.splice(index, 1);
  state.isLoading = false;
};
const handlePending = (state, action) => {
  state.isLoading = true;
  state.error = '';
};
const handleRejected = (state, action) => {
  state.error = action.error.message;
  state.isLoading = false;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContactsThunk.fulfilled, handleFulfilledContacts)
      .addCase(addContactThunk.fulfilled, handleFulfilledAddContact)
      .addCase(deleteContactThunk.fulfilled, handleFulfilledDeleteContact)
      .addMatcher(action => action.type.endsWith('pending'), handlePending)
      .addMatcher(action => action.type.endsWith('rejected'), handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
