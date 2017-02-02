// @flow
import { TOGGLE_MUTE } from '../actions/video';

export type videoStateType = {
  mute: boolean
};

type actionType = {
  type: string
};

export default function toggleMute(state: boolean = true, action: actionType) {
  switch (action.type) {
    case TOGGLE_MUTE:
      action.rtc.send('/command', 'This is a custom command!!');
      return true
    default:
      return state;
  }
}
