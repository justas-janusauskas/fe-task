import { FC } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './FilterTab.scss'

interface IFilterTab {
  title: string,
  count: number,
  path: string,
  noBorder?: boolean,
}

const FilterTab: FC<IFilterTab> = ({
  title,
  count,
  path,
  noBorder = false,
}) => {
  const { push } = useHistory()

  const filterTabClass = count === 0 || noBorder ? styles.filterTab : `${styles.filterTab} ${styles.filterTab_warning}`

  return (
    <div className={filterTabClass} onClick={() => push(path)}>
      {`${title} (${count})`}
    </div>
  )
}

export default FilterTab
