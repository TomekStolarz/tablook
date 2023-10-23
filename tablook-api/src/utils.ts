export const calculateArrivalandLeaving = (
  date: string,
  arrival?: string,
  leaving?: string,
): {
  arrival: number;
  leaving: number;
  dateStart: Date;
  dateEnd: Date;
  currentTime: Date;
  futureDate: boolean;
} => {
  const currentTime = new Date(new Date().setSeconds(0, 0));
  const dateStart = new Date(date);
  const dateEnd = new Date(dateStart);
  dateEnd.setHours(24);
  let futureDate = false;

  let arrived = arrival || currentTime.toTimeString().slice(0, 5);
  if (dateStart.toDateString() !== currentTime.toDateString() && !arrival) {
    arrived = dateStart.toTimeString().slice(0, 5);
    futureDate = true;
  }
  const arrivalPart = arrived.split(':').map((x) => parseInt(x));
  const _arrival = new Date(dateStart).setHours(arrivalPart[0], arrivalPart[1]);

  let _leaving = 0;
  if (leaving) {
    const leavingPart = leaving.split(':').map((x) => parseInt(x));
    _leaving = new Date(dateStart).setHours(leavingPart[0], leavingPart[1]);
  }

  return {
    arrival: _arrival,
    leaving: _leaving,
    dateStart,
    dateEnd,
    currentTime,
    futureDate,
  };
};
