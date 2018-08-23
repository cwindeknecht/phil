import * as actions from '../actions/index';

import Start from '../components/Bottom';

import * as rooms from './rooms';

let room = {
  current: rooms.room5,
}

const initialState = {
  current: Start,
  currentRoom: room.current,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
