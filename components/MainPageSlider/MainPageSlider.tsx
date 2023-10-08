'use client';

import {useState} from 'react';
import styles from './MainPageSlider.module.scss';
import {Slides} from '@/components/MainPageSlider/MainPageSlider.entity';
import classNames from 'classnames';

const MainPageSlider = () => {
  const [activeNumber, setActiveNumber] = useState(0);

  return (
    <>
      <h1 className={styles.title}>{Slides[activeNumber]}</h1>
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
