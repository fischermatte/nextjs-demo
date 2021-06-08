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
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-auto border-accent-normal border-2 p-4">Ein langer Text 1111111111111</div>
        <div className="flex-auto border-accent-normal border-2 p-4">Ein langer Text 2222222222222</div>
        <div className="flex-auto border-accent-normal border-2 p-4">Ein langer Text 2222222222222</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4">
        <div>A</div>
        <div>B</div>
        <div>C</div>
        <div>D</div>
      </div>

        <button className="btn">hello</button>
    </LayoutComponent>
  )
}
export default Home
