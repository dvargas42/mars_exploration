import { useState } from 'react';
import Modal from 'react-modal';

import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard';
import { NewRoverMovementModal } from './components/NewRoverMovementModal'
import { MovementsProvider } from './hooks/useMovements';

import 'react-toastify/dist/ReactToastify.css';
import './styles/global.scss'

Modal.setAppElement('#root');

export function App() {
  const [isNewRoverMovementModalOpen, setIsNewRoverMovementModalOpen] = useState(false)

  function handleOpenNewRoverMovementModal() {
    setIsNewRoverMovementModalOpen(true)
  }

  function handleCloseNewRoverMovementModal() {
    setIsNewRoverMovementModalOpen(false)
  }

  return (
    <MovementsProvider>
      <Header onOpenRoverMovementModal={handleOpenNewRoverMovementModal}/>

      <NewRoverMovementModal
        isOpen={isNewRoverMovementModalOpen}
        onRequestClose={handleCloseNewRoverMovementModal}
      />

      <Dashboard />
    </MovementsProvider>

  );
}