'use client'
import { FC, useEffect } from "react"

const DialogHiddenScroll: FC<{ isOpen: boolean }> = ({ isOpen }) => {

  // console.log("Dialog está", isOpen ? "aberto" : "fechado")
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])
  

  return <></>
}
export default DialogHiddenScroll;