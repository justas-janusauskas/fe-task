import { passwords } from '../data';

export const updateItem = (item) => {
  const passwordIndex = passwords.findIndex((password) => password.id === item.id)
  passwords[passwordIndex] = {
    ...item
  }
}

export const getItems = () => passwords
