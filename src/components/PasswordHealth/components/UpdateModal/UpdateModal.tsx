import { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'

import updateItem from '~/services/updateItem'

import {IItem} from '~/services/getUserItems'

interface IUpdateItem extends IItem {
  status?: number,
  error?: string,
}

interface IUpdateModal {
  item: IUpdateItem,
  handleClose: () => void,
}

const UpdateModal: FC<IUpdateModal> = ({ item, handleClose }) => {
  const dispatch = useDispatch()

  const [newPass, setNewPass] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const allItems = useSelector(state => state.allItems) || []

  useEffect(() => {
    setNewPass('')
    setErrorMessage('')
  }, [item])

  const handleUpdateItem = async(): Promise<void> => {
    const newAllItems = [...allItems]
    const newItemData = {
      ...item,
      password: newPass,
    }

    await updateItem(newItemData).then((updatedItemData: IUpdateItem) => {
      if (updatedItemData.status !== 200) {
        setErrorMessage(updatedItemData.error)
        return
      }
      const updateIndex = newAllItems.findIndex((findItem) => findItem.id === updatedItemData.id)
      newAllItems[updateIndex] = updatedItemData
      dispatch({type: 'set', allItems: newAllItems})
      handleClose()
    })
  }

  return (
    <Modal
      className="modal"
      isOpen={!!item}
      ariaHideApp={false}
      onRequestClose={handleClose}
      contentLabel="Example Modal"
    >
      <h3>Suggestions for secure password</h3>
      <ul>
        <li>Include at least one small letter</li>
        <li>Include at least one capital letter</li>
        <li>Include at least one number</li>
        <li>Include at least one special symbol (@,!(, etc.)</li>
      </ul>
      <input
        placeholder={`New password for ${item?.title}`}
        className="input"
        value={newPass}
        onChange={(event) => setNewPass(event.target.value)} 
      />
      <div className="errorMessage">
        {errorMessage}
      </div>
      <div className="pt-12px text-center">
        <button className="button" onClick={handleUpdateItem}>Change</button>
        <button className="button ml-12px" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default UpdateModal
