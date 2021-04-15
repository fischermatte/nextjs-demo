import LayoutComponent from '../components/layout.component'
import React from 'react'

interface Props {
  title?: string
}

const Home: React.FC<Props> = () => {
  return (
    <LayoutComponent>
      <div className="flex justify-center items-center bg-accent-normal text-accent-dark text-xl h-32">Heyho</div>
      <h1 className="mt-12">Welcome to this Next.js Demo</h1>
      <div>Bla bla</div>
    </LayoutComponent>
  )
}
export default Home
