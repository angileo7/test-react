import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../app/store'
import {fetchContacts, fetchCreateContact, fetchIndividualContact, fetchUpdateContact} from './contactAPI'

export interface IContact {
    _id?: string
    id?: string
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    createdAt?: string
    updatedAt?: string
    __v?: number
}

export interface ContactState {
  contacts: IContact[]
  contact: IContact
  status: 'idle' | 'loading' | 'failed',
}

const initialState: ContactState = {
  contacts: [],
  contact: {},
  status: 'idle',
}

export const getAllAsync = createAsyncThunk(
  'contacts/fetchContact',
  async () => {
    const response = await fetchContacts()

    return response
  }
)

export const getAsync = createAsyncThunk(
    'contacts/fetchIndividualContact',
    async (id: string) => {
        const response = await fetchIndividualContact(id)

        return response
    }
)

export const saveAsync = createAsyncThunk(
    'contacts/saveContact',
    async (data: any) => {
        if(data.id)
            return await fetchUpdateContact({...data})
        else
            return await fetchCreateContact({...data})
    }
)

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.contacts = action.payload as unknown as IContact[]
      })
        .addCase(saveAsync.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(saveAsync.fulfilled, (state, action) => {
          state.status = 'idle'
        })
        .addCase(getAsync.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            state.contact = action.payload as IContact
        })
  },
})

export const selectContacts = (state: AppState) => state.contact.contacts
export const selectContact = (state: AppState) => state.contact.contact

export default contactSlice.reducer
