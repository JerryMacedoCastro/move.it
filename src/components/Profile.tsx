import styles from '../styles/components/Profile.module.css';
import React from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

function Profile() {
  const { level } = React.useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img
        src="https://github.com/JerryMacedoCastro.png"
        alt="Jerry Macedo Castro"
      />
      <div>
        <strong> Jerry Macedo Castro</strong>
        <p>
          <img src="icons/level.svg" alt="levelIcon" />
          Level {level}
        </p>
      </div>
    </div>
  );
}

export default Profile;
