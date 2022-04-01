import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'
import {
    deleteContact,
    fetchContacts,
    fetchIndividualContact
} from './contactAPI'

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
    async (data: any, { rejectWithValue, fulfillWithValue }) => {
        const contact = {   firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone }

        const contactUpdated = {   firstName: data.firstName,
            lastName: data.lastName,
        }
        const url = 'https://bkbnchallenge.herokuapp.com/contacts/'+data.id;
        if(data.id){
            try{
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contactUpdated),
                })
                if (!response.ok) {
                     await response.text().then(text => { throw new Error(text) })
                }
                const data = await response.json();
                alert('Successfully updated')
                return fulfillWithValue(data)
            }catch(error){
                alert(JSON.parse(error.message).message)
                throw rejectWithValue(error.message)
            }
        }
        else
        {
            try{
            const response = await fetch('https://bkbnchallenge.herokuapp.com/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact),
            })
                if (!response.ok) {
                    const l = await response.text().then(text => { throw new Error(text) })
                }
                const data = await response.json();
                alert('Successfully created')
                return fulfillWithValue(data)
            }catch(error){
                alert(JSON.parse(error.message).message)
                throw rejectWithValue(error.message)
            }
        }
    }
)

export const deleteAsync = createAsyncThunk(
    'contacts/deleteContact',
    async (id: string) => {
        return await deleteContact(id);
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
        .addCase(deleteAsync.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(deleteAsync.fulfilled, (state, action) => {
            state.status = 'idle'
        })
  },
})

export const selectContacts = (state: AppState) => state.contact.contacts
export const selectContact = (state: AppState) => state.contact

export default contactSlice.reducer
