import React, { FC } from 'react'
import "./loader.css"


export const Loaders = (): JSX.Element => {

  return (
    <div className={`lds-ellipsis my-3`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}
