import { FC } from 'react'

import styles from './LoadingScreen.scss'

const LoadingScreen: FC = () => (
  <div className={styles.loadingScreen}>
    <img data-testid="loader" src="/public/assets/loader.svg" width="50" alt="" />
  </div>
)

export default LoadingScreen
