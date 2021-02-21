import { FC, useState } from 'react'

import Item from './components/Item/Item'
import ItemIcon from './components/ItemIcon/ItemIcon'
import UpdateModal from '../UpdateModal/UpdateModal'

import {IItem} from "~/services/getUserItems"

import styles from './List.scss'

interface IList {
  items: Array<IItem>,
}

const List: FC<IList> = ({items}) => {
  const [activeItem, setActiveItem] = useState<IItem>(null)

  const handleSetActiveItem = (item: IItem) => {
    setActiveItem(item)
  }

  return (
    <>
      <ul className={styles.list}>
        {
          items.map((item) => (
            <Item
              key={item.id}
              item={item}
              handleSetActiveItem={() => handleSetActiveItem(item)}
            />
          ))
        }
      </ul>
      <UpdateModal
        key="modal"
        item={activeItem}
        handleClose={() => setActiveItem(null)}
      />
    </>
  )
}

export default List
