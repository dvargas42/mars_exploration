import { createContext, ReactNode,useContext, useState } from 'react'
import { toast } from 'react-toastify';

interface RoverInputProps {
  roverName: string;
  roverInitialPosition: string;
  roverMovementIntruction: string;
}

interface RoverDataProps {
  roverName: string;
  xInitialPosition: number;
  yInitialPosition: number;
  xFinalPosition: number;
  yFinalPosition: number;
  initialDirection: string;
  finalDirection: string,
  instruction: string,
}

interface MovementsRoverProps {
  roversData: RoverDataProps[];
  createPlateauCoordinates: (coordinates: string) => void;
  createRoverData: (roverMovement: RoverInputProps) => void;
}

interface MovementsProviderProps {
  children: ReactNode;
}

const MovementsContext = createContext<MovementsRoverProps>(
  {} as MovementsRoverProps
  )

export function MovementsProvider({ children }: MovementsProviderProps) {
  const [roversData, setRoversData] = useState<RoverDataProps[]>([])
  const [plateauCoordinates, setPlateauCoordinates] = useState<string>('')
  
  const cardinalPoints = ['W', 'N', 'E', 'S']

  function LeftRotate(points: string[], orientation: string) {
    let response

    points.forEach((point, index) => {
      if (point === orientation) {
        index = index - 1

        if (index === - 1) {
          index = 3
        }
        response = points[index]
      }
    })
    return response ? response : orientation
    
  }

  function RightRotate(points: string[], orientation: string) {
    let response

    points.forEach((point, index) => {
      if (point === orientation) {
        index = index + 1

        if (index === 4) {
          index = 0
        }
        response = points[index]
      }
    })
    return response ? response : orientation
  }

  function Displacement(
    reliefCoordinates: number[],
    roverPosition: number[],
    orientation: string)
  {
    try {
      switch (orientation) {
        case 'E':
          if (reliefCoordinates[0] < roverPosition[0] + 1){
            throw new Error('Atenção: Movimentos levarão rover a cair do Platô pelo lado Leste')
          }
          return [roverPosition[0] + 1, roverPosition[1]]
  
        case 'W':
          if (roverPosition[0] - 1 < 0){
            throw new Error('Atenção: Movimentos levarão rover a cair do Platô pelo lado Oeste')
          }
          return [roverPosition[0] - 1, roverPosition[1]]
        
        case 'N':
          if (reliefCoordinates[1] < roverPosition[1] + 1){
            throw new Error('Atenção: Movimentos levarão rover a cair do Platô pelo lado Norte')
          }
          return [roverPosition[0], roverPosition[1] + 1]
  
        case 'S':
          if (roverPosition[1] - 1 < 0){
            throw new Error('Atenção: Movimentos levarão rover a cair do Platô pelo lado Sul')
          }
          return [roverPosition[0], roverPosition[1] - 1]

        default:
          return [roverPosition[0], roverPosition[1]]
      } 
    } catch (error) {
      if(error.message){
        toast.error(error.message)
      } else {
        toast.error(error)
      }
      return [roverPosition[0], roverPosition[1]]
    }
    
  }

  function createPlateauCoordinates(coordinates: string) {
    setPlateauCoordinates(coordinates)
  }

  function createRoverData({
    roverName,
    roverInitialPosition,
    roverMovementIntruction}: RoverInputProps) {

    let orientation = roverInitialPosition.split(' ')[2]

    let finalPosition = [
      Number(roverInitialPosition.split(' ')[0]),
      Number(roverInitialPosition.split(' ')[1]),
    ]

    const realiefCoordinates = [
      Number(plateauCoordinates.split(' ')[0]),
      Number(plateauCoordinates.split(' ')[1])
    ]

    roverMovementIntruction.split('').map((move) => {
      switch (move) {
        case 'L':
          orientation = LeftRotate(cardinalPoints, orientation)
          break;

        case 'R':
          orientation = RightRotate(cardinalPoints, orientation)
          break;
        
        case 'M':
          finalPosition = Displacement(realiefCoordinates, finalPosition, orientation)
          break;

        default:
          throw new Error('Instrução incorreta')
      }
      return true;
    })

    const newRoverPosition = {
      roverName,
      xInitialPosition: Number(roverInitialPosition.split(' ')[0]),
      yInitialPosition: Number(roverInitialPosition.split(' ')[1]),
      xFinalPosition: finalPosition[0],
      yFinalPosition: finalPosition[1],
      initialDirection: roverInitialPosition.split(' ')[2],
      finalDirection: orientation,
      instruction: roverMovementIntruction,
    }

    setRoversData([...roversData, newRoverPosition])
  }



  return(
    <MovementsContext.Provider value={{ roversData, createRoverData, createPlateauCoordinates}}>
      {children}
    </MovementsContext.Provider>
  )
}

export function useMovements() {
  const context =useContext(MovementsContext)

  return context;
}