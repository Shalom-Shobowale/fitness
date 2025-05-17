import React from 'react'

const Button = ({name, px, py}) => {
  return (
   <button className={`bg-accent hover:bg-secondary text-primary font-semibold text-sm rounded-md ${px} ${py}`}>{name}</button>
  )
}

export default Button