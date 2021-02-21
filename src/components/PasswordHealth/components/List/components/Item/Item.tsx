import { FC, useState } from 'react'

import ItemIcon from '../../components/ItemIcon/ItemIcon'

import {IItem} from "~/services/getUserItems"

import styles from './Item.scss'

interface IList {
  item: IItem,
  handleSetActiveItem: (item: IItem) => void,
}

const List: FC<IList> = ({ item, handleSetActiveItem }) => {
  if (!item) return

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword)
  }

  return (
    <li className={styles.item}>
      <ItemIcon title={item.title}/>
      <div>
        <div className={styles.title}>
          {item.title}
        </div>
        <div className={styles.description}>
          <p>
            {item.description}
          </p>
          <p>
            <span className={styles.password}>
              {showPassword ? item.password : [...Array(item.password.length)].map(() => '*')}
            </span>
            <button className={styles.showPassword} onClick={toggleShowPassword}>
            {showPassword ? 'Hide password' : 'Show password'}
            </button>
          </p>
          <p>
            Created on: <strong>{new Date(item.createdAt).toString()}</strong>
          </p>
        </div>
      </div>
      <button className={styles.update} onClick={() => handleSetActiveItem(item)}>
        Update Password
      </button>
    </li>
  )
}

export default List
