import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <main className='m-auto p-10 max-w-600'>
        <Header/>
        <Outlet/>
    </main>
  )
}

export default Layout