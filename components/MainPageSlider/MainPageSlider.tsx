'use client';

import React, {useState} from 'react';
import styles from './MainPageSlider.module.scss';
import classNames from 'classnames';

const MainPageSlider: React.FC<{children: React.ReactNode[]}> = ({children}) => {
  const [activeNumber, setActiveNumber] = useState(0);
  return (
    <>
      <h1 className={styles.title}>{children[activeNumber]}</h1>
      <div className={styles.buttons}>
        {[0, 1, 2].map((item, idx) => (
          <button
            key={idx}
            className={classNames(styles.button, {[styles.button__active]: activeNumber === idx})}
            onClick={() => setActiveNumber(idx)}
          >
            {item + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export {MainPageSlider};
