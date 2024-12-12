import { createSlice } from "@reduxjs/toolkit";
interface UserData {
    $id: string;
    name: string;
    email : string,
    password : string
}
interface AuthState {
    status: boolean;
    userData: UserData | null; // `userData` is null if the user is logged out
}

const initialState : AuthState = {
    status: false,
    userData: null,
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.userData = null;
            state.status = false;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer