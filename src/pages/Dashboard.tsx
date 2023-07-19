import { RecipePaginationFetchMethod } from '../@types/SwitchTypes'
import RecipePagination from '../components/recipe/RecipePagination'

export default function Dashboard({ method }: { method: RecipePaginationFetchMethod }) {
  return (
    <main>
      <RecipePagination method={method} />
    </main>
  )
}