import React from 'react';
import styles from '../styles/components/Countdown.module.css';

let coutdownTimeout: NodeJS.Timeout;

function Countdown() {
  const defaultTime = 0.1 * 60;
  const [time, setTime] = React.useState(defaultTime);
  const [isActive, setIsActive] = React.useState(false);
  const [hasFinished, setHasFinished] = React.useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const startCountdown = () => {
    setIsActive(true);
  };

  const resetCountdown = () => {
    setIsActive(false);
    clearTimeout(coutdownTimeout);
    setTime(defaultTime);
  };

  React.useEffect(() => {
    if (isActive && time > 0) {
      coutdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : !isActive ? (
        <button
          onClick={startCountdown}
          type="button"
          className={styles.countdownButton}
        >
          Iniciar novo ciclo
        </button>
      ) : (
        <button
          onClick={resetCountdown}
          type="button"
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
        >
          Abandonar ciclo
        </button>
      )}
    </div>
  );
}

export default Countdown;
