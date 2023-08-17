import { createStore, action } from 'easy-peasy';

const store = createStore({
  auth: {
    isLoggedIn: false,
    setIsLoggedIn: action((state, payload) => {
      state.isLoggedIn = payload;
    }),
  },
});

export default store;
