import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token:null,
    },
    reducers: {
        login: (state, action) => { 
            state.isLoggedIn = action.payload.isLoggedIn;
            state.current = action.payload.userData;
            state.token = action.payload.token;
        },

        logout: (state) => {
            state.isLoggedIn = false;
            state.current = null;
            state.token = null;
        },
    },
    extraReducers: {
    }
})
export const {login, logout} = userSlice.actions
export default userSlice.reducer