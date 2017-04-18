function initialState() {
  const lastVisited = window.localStorage.getItem('lastVisited');
  if (lastVisited) {
    return { roomName: JSON.parse(lastVisited) };
  }

  return {};
}

export default function mapCenter(state = initialState(), action) {
  switch (action.type) {
    case 'GET_HISTORY': {
      return initialState();
    }
    default:
      return state;
  }
}
