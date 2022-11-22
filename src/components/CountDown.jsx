import { useState, useCallback, useEffect, memo } from 'react';
import { TextStyle } from '@shopify/polaris';

const formatTime = (ms) => {
  return ms >= 60 * 1000
    ? new Date(ms).toISOString().slice(11, 19)
    : new Date(ms).toISOString().slice(14, 19);
};

const localId = 'test-expired-time';

function CountDown({ duration, action = 'reset-time' }) {
  const [counter, setCounter] = useState(0);
  const [end, setEnd] = useState(false);

  const start = useCallback(() => {
    setEnd(false);
    const interval = setInterval(() => {
      setCounter(prev => {
        console.log('prev', prev);
        const value = prev - 1000;
        if (value <= 0) {
          setEnd(true);
          clearInterval(interval);
          return 0;
        }
        return value;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const resetTime = useCallback(() => {
    const remainingTime = duration * 60 * 1000
    localStorage.setItem(localId, duration * 60 * 1000 + Date.now());
    setCounter(remainingTime);
    start();
  }, [duration, start]);

  const doSomething = useCallback(() => {
    if (action === 'reset-time') {
      console.log('Reset time');
      resetTime();
    } else {
      console.log('Do action: ', action);
      localStorage.removeItem(localId);
    }
  }, [action, resetTime]);

  useEffect(() => {
    if (end) {
      doSomething();
    }
  }, [end, doSomething])

  useEffect(() => {
    const expiredTime = +localStorage.getItem(localId) || 0;
    const remainingTime = expiredTime && expiredTime - Date.now();

    if (remainingTime) {
      if (remainingTime <= 0) {
        doSomething();
      } else {
        setCounter(remainingTime);
        start();
      }
    } else {
      resetTime();
    }
  }, [doSomething, resetTime, start]);

  return (
    <TextStyle variation='code'>{ formatTime(counter) }</TextStyle>
  );
}

export default memo(CountDown);
