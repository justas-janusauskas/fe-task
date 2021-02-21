import { FC } from 'react'

import styles from './LoadingScreen.scss'

const SVGIcon = require('./images/loader.svg')

const LoadingScreen: FC = () => (
  <div className={styles.loadingScreen}>
    <img src={SVGIcon.default} width="50" alt="" />
  </div>
)

export default LoadingScreen
