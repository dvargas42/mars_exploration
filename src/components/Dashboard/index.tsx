import { useMovements } from '../../hooks/useMovements'

import roverImg from '../../assets/profile.png'
import '../../styles/dashboard.scss'

export function Dashboard() {
  const { roversData } = useMovements()

  return (
    <main className="dashContainer">
      <div className="dashContent">
        { (roversData.length !== 0) ? (
          <ul className="cardContainer">
            {roversData.map(item => (
              <li className="cardContent"
                key={ item.roverName }
              >
                <img src={roverImg} alt="Avatar" />

                <ul>
                  <li>
                    <p>Name:</p>
                    {item.roverName}
                  </li>

                  <li className="right">
                    <p>Posição inicial:</p>
                    {`${item.xInitialPosition} ${item.yInitialPosition} ${item.initialDirection}`}
                  </li>

                  <li>
                    <p>Instrução:</p>
                    {item.instruction}
                  </li>

                  <li className="right">
                    <p>Posição final:</p>
                    {`${item.xFinalPosition} ${item.yFinalPosition} ${item.finalDirection}`}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        ):(
          <img className="heroImg" src={roverImg} alt="hero"></img>
        )}
    </div>
    </main>
  )
}