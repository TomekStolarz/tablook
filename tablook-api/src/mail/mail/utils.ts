export const Cron = (cronPattern: string): MethodDecorator => {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    const cronRegex = /(((\d+,)+\d+|(\d+(\/)\d+)|\d+|\*) ?){4}/;
    const cronNames = {
      '@minutely': '* * * *',
      '@hourly': '$ * * *',
      '@daily': '$ $ * *',
      '@weekly': '$ $ $/7 *',
      '@montly': '$ $ $ *',
      '@cron': '$',
    };

    const multipliers = [60, 60, 24, 30, 365];
    const intervalMultiplier = multipliers.reduce((acc, curr, currId) => {
      const previous = acc[currId - 1] ?? 1000;
      acc.push(curr * previous);
      return acc;
    }, Array<number>());

    descriptor.value = async function (...args: any[]) {
      const cronKey = cronPattern.split(' ')[0];
      if (!Object.keys(cronNames).join('').includes(cronKey)) {
        return;
      }
      let newCronPattern = '';
      if (cronKey === '@cron') {
        newCronPattern = cronPattern.split(' ').slice(1).join(' ');
        if (newCronPattern.split('').filter((c) => c === '/').length > 1) {
          return;
        }
      } else {
        newCronPattern = cronNames[cronKey];
        const passedParams = cronPattern.split(' ').slice(1).join(' ');
        newCronPattern = newCronPattern
          .split(' ')
          .map((val, index) => {
            if (val.includes('$')) {
              return val.replace('$', passedParams[index] ?? '*');
            }
            return val;
          })
          .join(' ');
      }

      if (!cronRegex.test(newCronPattern)) {
        return;
      }
      const firstDate = new Date();
      const firstInterval = newCronPattern
        .split(' ')
        .findIndex((val) => val === '*');

      const hasNextVal =
        newCronPattern
          .split(' ')
          .slice(firstInterval)
          .findIndex((val) => val !== '*') + 1;

      let intervalTime = intervalMultiplier[firstInterval];

      const cronParams = newCronPattern.split(' ');
      cronParams
        .map((value, index) => ({ index: index, value: value }))
        .filter((val) => val.value !== '*')
        .forEach((interval) => {
          if (interval.value.includes('/')) {
            intervalTime =
              intervalMultiplier[interval.index] *
              Number(interval.value.split('/')[1]);
            interval.value = interval.value.split('/')[0];
          }
          switch (interval.index) {
            case 0:
              firstDate.setMinutes(Number(interval.value));
              break;
            case 1:
              firstDate.setHours(Number(interval.value));
              break;
            case 2:
              firstDate.setDate(Number(interval.value));
              break;
            case 3:
              firstDate.setMonth(Number(interval.value));
              break;
            default:
              break;
          }
        });

      let timeout = firstDate.getTime() - new Date().getTime();
      if (cronPattern === '* * * *') {
        timeout = 0;
      }

      if (timeout < 0) {
        return;
      }

      const clearInvervalOn = (intervalId: NodeJS.Timer, timeout: number) => {
        setTimeout(() => {
          clearInterval(intervalId);
        }, timeout);
      };

      setTimeout(() => {
        originalMethod.call(this, ...args);
        setInterval(() => {
          originalMethod.call(this, ...args);
          if (hasNextVal) {
            const localIntervalTime = intervalMultiplier[firstInterval];
            const settedInterval = setInterval(() => {
              originalMethod.call(this, ...args);
            }, localIntervalTime);
            clearInvervalOn(
              settedInterval,
              localIntervalTime * intervalMultiplier[hasNextVal],
            );
          }
        }, intervalTime);
      }, timeout);

      return;
    };

    return descriptor;
  };
};
