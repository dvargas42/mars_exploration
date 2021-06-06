import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import { useMovements } from '../../hooks/useMovements'
import logoImg from '../../assets/logo.png'

import '../../styles/header.scss'

interface HeaderProps {
  onOpenRoverMovementModal: () => void;
}

export function Header({onOpenRoverMovementModal}: HeaderProps) {
  const { createPlateauCoordinates } = useMovements()

  const [plateauCoordinates, setPlateauCoordinates] = useState('')
  
  function handlePlateauCoordinates() {
    try {
      if (!!plateauCoordinates) {
        createPlateauCoordinates(plateauCoordinates)
        onOpenRoverMovementModal()
      } else {
        throw('Por favor digite as coordenadas do platô')
      }
    } catch (e) {
      toast.error(e)
    }
  }

  return (
    <header className="headerContainer">
      <div className="headerContent">
        <div className="logo">
          <img src={logoImg} alt="rover" />
          <span>Rover Steering</span>
        </div>
        <div>
          <input 
            type="text"
            placeholder="Digite as coordenadas do platô"
            value={plateauCoordinates}
            onChange={event => setPlateauCoordinates(event.target.value)}
          />

          <button type="button" onClick={handlePlateauCoordinates}>
            Inserir rover
          </button>
        </div>
      </div>

      <ToastContainer />
    </header>
  )
}