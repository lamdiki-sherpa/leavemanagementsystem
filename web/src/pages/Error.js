import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
<section>
<h2>Page not found</h2>
<Link to={'/'} className='btn'>Back home</Link>
</section>
  )
}

export default Error