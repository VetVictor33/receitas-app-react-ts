export const getItem = (key: string) => {
  const response = localStorage.getItem(key)
  if (!response) throw new Error('')
  return response
}

export const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value)

}

export const destroyItem = (key: string) => {
  localStorage.removeItem(key)
}

export const destroyStorage = () => {
  localStorage.clear()
}