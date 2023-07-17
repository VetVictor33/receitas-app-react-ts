import { format } from 'date-fns'

export function formatDate(date: Date) {
  return format(new Date(date), 'dd/MM/yyyy HH:mm')
}

export function getUrl(imageUrl: string) {
  return `${import.meta.env.VITE_BASE_URL}${imageUrl}`
}

export function getFirstLetter(string: string) {
  return string.split('')[0]
}

export function normalizeString(string: string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}