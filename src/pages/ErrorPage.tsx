import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div id="error-page" style={{ textAlign: 'center' }}>
      <hr />
      <h2>Oops!</h2>
      <h3>Ocorreu um erro</h3>
      <a href="/">Retornar</a>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <hr />
    </div >
  );
}