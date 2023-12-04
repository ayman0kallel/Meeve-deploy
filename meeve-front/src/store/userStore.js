import { createSlice } from '@reduxjs/toolkit';

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    username: 'Sophie Dubois',
    userLastName: 'nom',
    profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    favoriteGym: 'Basic Fit',
    favoriteSport: 'Fitness',
    friendsCount: 50,
    email:'user@namle.com',
    biography: "Passionnée par la vie fitness et résidant à Lyon ! En quête d'un(e) partenaire de fitness pour des séances d'entraînement intenses et motivantes. Coach sportive dévouée, je suis prête à partager ma passion pour le sport avec quelqu'un qui partage les mêmes objectifs de santé et de bien-être.",
    points: 1400,
  },
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
      console.log(state.username);
    },
    updateUserLastName: (state, action) => {
        state.userLastName = action.payload;
        console.log(state.userLastName);
      },
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    updateFavoriteGym: (state, action) => {
      state.favoriteGym = action.payload;
      console.log(state.favoriteGym);
    },
    updateFavoriteSport: (state, action) => {
      state.favoriteSport = action.payload;
      console.log(state.favoriteSport);
    },
    updateFriendsCount: (state, action) => {
      state.friendsCount = action.payload;
    },
    updateBiography: (state, action) => {
      state.biography = action.payload;
      console.log(state.biography);
    },
    updateEmail: (state, action) => {
        state.email = action.payload;
        console.log(state.biography);
      },
      reducePoints: (state, action) => {
        if(state.points < action.payload){
          console.log("transaction failed, you dont have enough points" + state.points);
        }else{
          state.points -= action.payload;
          console.log("transaction Succeed, your current points are " + state.points);
        }
        
   
      },
      addPoints: (state, action) => {
        state.points += action.payload;
        console.log("transaction Succeed, your current points are " + state.points);
      },
  },
});

export const {
  updateUsername,
  updateProfileImage,
  updateFavoriteGym,
  updateFavoriteSport,
  updateFriendsCount,
  updateBiography,
  reducePoints,
  addPoints,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
