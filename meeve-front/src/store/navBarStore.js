import { createSlice } from '@reduxjs/toolkit';

const navBarIconSlice = createSlice({
    name: 'icon',
    initialState: {
      iconName: 'Carte',
    },
    reducers: {
      updateIcon: (state, action) => {
        state.iconName = action.payload;
        console.log(state.iconName);
      },
    },
  });
  
  export const {
    updateIcon,
  } = navBarIconSlice.actions;
  
  export default navBarIconSlice.reducer;
  
