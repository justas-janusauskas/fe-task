import { FC } from 'react'

import styles from './ItemIcon.scss'

interface IItemIcon {
  title: string,
}

const ItemIcon: FC<IItemIcon> = ({title}) => (
  <div className={styles.icon}>
    {title.substring(0, 2)}
  </div>
)

export default ItemIcon
