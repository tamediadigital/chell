// @flow
export const TOGGLE_MUTE = 'TOGGLE_MUTE';

export function toggleMute(rtc) {
  return {
    type: TOGGLE_MUTE,
    rtc
  };
}
