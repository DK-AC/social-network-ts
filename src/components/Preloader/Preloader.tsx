import React, {FC} from 'react'

import {Spin} from 'antd'

import styles from './preloader.module.css'

export const Preloader: FC = () => <Spin className={styles.preloader} size="large"/>


