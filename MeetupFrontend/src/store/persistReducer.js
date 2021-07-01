import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistirReducer = persistReducer(
    {
      key: 'meetup',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistirReducer;
};
