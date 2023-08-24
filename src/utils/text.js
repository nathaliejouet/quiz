export function minutesAndHoursFormat(minutes, seconds) {
  let secondsFormat;
  let minutesFormat;
  secondsFormat = seconds < 10 ? `0${seconds}` : seconds;
  minutesFormat = minutes < 10 ? `0${minutes}` : minutes;

  return `${minutesFormat}:${secondsFormat}`;
}
