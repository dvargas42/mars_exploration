
import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import {useMovements } from '../../hooks/useMovements';
import closeImg from '../../assets/close.svg'

import '../../styles/newRoverMovementModal.scss'


interface NewTransactionModalProps {
  isOpen: boolean,
  onRequestClose: () => void;
}

export function NewRoverMovementModal({ isOpen, onRequestClose }:NewTransactionModalProps){
  const { createRoverData } = useMovements()

  const [roverName, setRoverName] = useState('')
  const [roverInitialPosition, setRoverInitialPosition] = useState('')
  const [roverMovementIntruction, setRoverMovementIntruction] = useState('')

  function handleCreateNewRoverMovement(event: FormEvent){
    event.preventDefault();

    createRoverData({
      roverName,
      roverInitialPosition: roverInitialPosition.toUpperCase(),
      roverMovementIntruction: roverMovementIntruction.toUpperCase(),
    })
    setRoverName('');
    setRoverInitialPosition('');
    setRoverMovementIntruction('');
  }

  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal"/>
      </button>

      <form onSubmit={handleCreateNewRoverMovement}>
        <h2>Cadastrar Intruções do Rover</h2>

        <input
          placeholder="Nome do rover"
          value={roverName}
          onChange={event => setRoverName(event.target.value)}
        />

        <input
          placeholder="Posição do rover"
          value={roverInitialPosition}
          onChange={event => setRoverInitialPosition(event.target.value)}
        />

        <input
          placeholder="Instruções de movimentação do rover"
          value={roverMovementIntruction}
          onChange={event => setRoverMovementIntruction(event.target.value)}
        />

        <div className="buttonContainer">
          <button type="submit">
            Cadastrar
          </button>

          <button type="button" onClick={onRequestClose}>
            Sair
          </button>
        </div>
      </form>
    </Modal>
  )
}