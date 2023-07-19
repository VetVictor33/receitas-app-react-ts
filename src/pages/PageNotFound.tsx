import { generalDashboardPath } from "../utils/pathnameUtils";

export default function PageNotFound() {
  return (
    <div style={{ textAlign: 'center', height: '80vh' }}>
      <h2>
        | 404 |
      </h2>
      <h3>página não encontrada</h3>
      <a href={generalDashboardPath}>Retornar</a >
    </div>
  )
}
