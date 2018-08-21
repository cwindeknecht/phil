import * as actions from '../actions/index';

import Start from '../components/Bottom';

import * as rooms from './rooms';

const initialState = {
  current: Start,
  currentRoom: rooms.room1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
