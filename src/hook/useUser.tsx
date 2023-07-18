import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function useUser() {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return useContext(UserContext)
}