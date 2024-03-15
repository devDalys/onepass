'use client';
import React, {memo, useState} from 'react';
import styles from './ThemeSwitcher.module.scss';
import {useTheme} from '@/providers/ThemeProvider';
import classNames from 'classnames';
import {Theme} from '@/providers/ThemeProvider/ThemeContext';

const Moon = (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_303_28)">
      <path
        d="M25.3661 13.5309C26.081 15.0837 26.3389 16.808 26.1095 18.502C25.8802 20.196 25.1731 21.7897 24.0711 23.0965C22.9691 24.4033 21.5177 25.3693 19.8867 25.8814C18.2558 26.3934 16.5127 26.4304 14.8615 25.9879C13.2103 25.5455 11.7192 24.6419 10.5628 23.383C9.40638 22.1241 8.63241 20.5618 8.33145 18.8791C8.0305 17.1963 8.21501 15.4627 8.8634 13.8809C9.51179 12.2992 10.5972 10.9349 11.9927 9.94754C11.8038 11.6135 12.2191 13.2919 13.163 14.6775C14.107 16.0631 15.5169 17.0639 17.1364 17.4978C18.7559 17.9318 20.4773 17.77 21.9876 17.042C23.4979 16.314 24.6968 15.0681 25.3661 13.5309Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_303_28">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0.784607 12.9545) rotate(-30)"
        />
      </clipPath>
    </defs>
  </svg>
);

const Soon = (
  <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_303_18)">
      <path
        d="M19.0551 21.6769C21.4466 20.2962 22.2659 17.2382 20.8852 14.8468C19.5045 12.4553 16.4466 11.6359 14.0551 13.0166C11.6636 14.3973 10.8443 17.4553 12.225 19.8468C13.6057 22.2382 16.6636 23.0576 19.0551 21.6769Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0551 7.8205L12.0551 9.55255"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.0551 25.141L22.0551 26.873"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.92743 14.4991L7.86719 15.0188"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.243 19.6747L27.1828 20.1944"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.02884 22.8468L8.76089 21.8468"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.3493 12.8468L26.0814 11.8468"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7074 27.9744L14.2272 26.0347"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.883 8.65886L19.4028 6.71911"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_303_18">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0.162811 12.9545) rotate(-30)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const ThemeSwitcher = memo(() => {
  const {toggleTheme, theme} = useTheme();
  const [firstRender, setFirstRender] = useState(true);

  const onToggleTheme = () => {
    firstRender && setFirstRender(false);
    toggleTheme();
  };

  return (
    <button onClick={onToggleTheme} className={styles.button}>
      <span
        className={classNames(styles.icon, {
          [styles.active]: theme === Theme.LIGHT && firstRender,
          [styles.leftAnimation]: theme === Theme.LIGHT && !firstRender,
        })}
      >
        {Soon}
      </span>
      <span
        className={classNames(styles.icon, {
          [styles.active]: theme === Theme.DARK && firstRender,
          [styles.rightAnimation]: theme === Theme.DARK && !firstRender,
        })}
      >
        {Moon}
      </span>
    </button>
  );
});
ThemeSwitcher.displayName = 'ThemeSwitcher';
