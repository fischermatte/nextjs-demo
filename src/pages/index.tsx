import LayoutComponent from '../components/layout.component'
import dynamic from 'next/dynamic'
import React, {BaseSyntheticEvent, useState} from 'react'

interface Props {
  title?: string
}

const PhraseDialog = dynamic(() => import('../components/phrase-dialog'))

const Home: React.FC<Props> = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = (e: BaseSyntheticEvent): void => {
    e.preventDefault()
    setModalOpen(true)
  }

  const closeModal = (e: BaseSyntheticEvent): void => {
    e.preventDefault()
    setModalOpen(false)
  }

  return (
    <LayoutComponent>
      <div className="flex justify-center items-center bg-accent-normal text-accent-dark text-xl h-32">Heyho</div>
      <h1 className="mt-12">Welcome to this Next.js Demo</h1>
      <div>
        <div>
          Want to check a lazy loaded dialog with danymic content from server? Click {' '}
          <a
            role="button"
            className="link underline"
            tabIndex={0}
            onClick={e => openModal(e)}
            onKeyDown={e => {
              if (e.key === 'Enter') openModal(e)
            }}
          >
            here
          </a>
          .{modalOpen && <PhraseDialog phraseId="p-1" onClose={closeModal} />}
        </div>
      </div>
    </LayoutComponent>
  )
}
export default Home
