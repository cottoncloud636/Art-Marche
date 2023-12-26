import { createSlice } from '@reduxjs/toolkit'

//initialize slice
const initialState = {
    //initially all states are set to null or false
    currentUser: null,
    error: null,
    loading: false,
};

//create slice
const userSlice = createSlice({
  name: 'user', // Names the slice as 'user'
  initialState,
  reducers: { //Defines reducer functions that modify the state when dispatched.
    loginStart: (state) => { //It is a reducer function triggered by the loginStart action. It updates the 
                             //loading state to true

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.loading = true;
    },
    loginSuccess: (state, action) => { //action: represent the data we get from DB.
                                       //loginSuccess Updates the currentUser, loading, and error states based
                                       //on the loginSuccess action's payload.
      state.currentUser = action.payload; 
      state.loading = false;
      state.error = null;
    },
    loginfail: (state, action) => {//loginfail: Updates error and loading states based on loginfail action's payload.
      state.error = action.payload;
      state.loading = false;
    }
  }
});
    
// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginfail } = userSlice.actions;

export default userSlice.reducer;