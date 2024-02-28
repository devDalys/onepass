'use client';

import React, {useState} from 'react';
import styles from './MainPageSlider.module.scss';
import classNames from 'classnames';
import {FirstElement, SecondElement, ThirdElement} from '@/components/MainPageSlider/Slides';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Autoplay} from 'swiper/modules';
import 'swiper/css';
import type {Swiper as ISwiper} from 'swiper';

const MainPageSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState<ISwiper>();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <Swiper
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        slidesPerView="auto"
        modules={[Pagination, Autoplay]}
        pagination={{clickable: true}}
        onPaginationUpdate={(swiper) => setActiveSlide(swiper.activeIndex)}
        autoplay={{delay: 4000, disableOnInteraction: true}}
      >
        <SwiperSlide>
          <FirstElement />
        </SwiperSlide>
        <SwiperSlide>
          <SecondElement />
        </SwiperSlide>
        <SwiperSlide>
          <ThirdElement />
        </SwiperSlide>
        <div className={styles.buttons}>
          {[0, 1, 2].map((item, idx) => (
            <button
              key={idx}
              className={classNames(styles.button, {
                [styles.button__active]: activeSlide === idx,
              })}
              onClick={() => {
                swiperInstance?.slideTo(idx);
              }}
            >
              {item + 1}
            </button>
          ))}
        </div>
      </Swiper>
    </>
  );
};

export {MainPageSlider};
