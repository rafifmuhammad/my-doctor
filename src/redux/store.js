import {createStore} from 'redux';
// ini sama seperti
// const [profile, setProfile] = useState();
// tempat menyimpan state global

const initialState = {
  loading: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }

  return state;
};

const store = createStore(reducer);

export default store;
