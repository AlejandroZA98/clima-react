import { ReactNode } from "react"


export default function Alert({children}: {children:ReactNode}) {
  return (
    <div className="text-red-400 ">{children}</div>  )
}
