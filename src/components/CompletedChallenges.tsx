import React from 'react';
import styles from '../styles/components/CompletedChanllenges.module.css';

function CompletedChallenges() {
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>7</span>
    </div>
  );
}

export default CompletedChallenges;
