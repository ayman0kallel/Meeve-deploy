import { configureStore } from '@reduxjs/toolkit';
import userStore from '../store/userStore';
import iconSlice from '../store/navBarStore';

export default configureStore({
  reducer: {
    user: userStore,
    icon: iconSlice,
  },
});