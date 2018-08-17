export const HANDLE_CURRENT = 'HANDLE_CURRENT';
export const HANDLE_ROOM_PICKUP = 'HANDLE_ROOM_PICKUP';
export const HANDLE_ROOM_TRAVEL = 'HANDLE_ROOM_TRAVEL';
export const HANDLE_ROOM_VISIBLE = 'HANDLE_ROOM_VISIBLE';

export const handle_current = (component) => {
  const payload = component;
  return {
    type: 'HANDLE_CURRENT',
    payload,
  };
};

export const handle_room_pickup = (itemName) => {
  const payload = itemName;
  return {
    type: 'HANDLE_ROOM_PICKUP',
    payload,
  };
};

export const handle_room_travel = (roomName) => {
  const payload = roomName;
  return {
    type: 'HANDLE_ROOM_TRAVEL',
    payload,
  };
};

export const handle_room_visible = (name) => {
  const payload = { name };
  return {
    type: 'HANDLE_ROOM_VISIBLE',
    payload,
  };
};
