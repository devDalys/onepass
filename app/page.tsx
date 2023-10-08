'use client'
import styles from './page.module.scss'
import React, {useEffect, useState} from "react";
import {useTheme} from "@/Providers/ThemeProvider";
import classNames from "classnames";
import {FullScreenLoading} from "@/Providers/FullScreenLoading";

export default function Home() {



  // if(isLoading) return <Loading  />

  return (
      <>
        <div className={styles.main}>Ничего</div>
      </>
  )
}
