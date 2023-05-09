import React, { FC } from 'react'
import "./loader.css"


export const Loaders = (): JSX.Element => {

  return (
    <div className={`lds-ellipsis`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}
