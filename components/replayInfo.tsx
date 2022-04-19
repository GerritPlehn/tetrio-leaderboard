import { Replay } from '../types/replay'

export default function ReplayInfo({ replay }: { replay: Replay.RootObject }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>Score</td>
          <td>{replay.endcontext.score}</td>
        </tr>
        <tr>
          <td>Level</td>
          <td>{replay.endcontext.level}</td>
        </tr>
        <tr>
          <td>Pieces Placed</td>
          <td>{replay.endcontext.piecesplaced}</td>
        </tr>
        <tr>
          <td>Pieces / Second</td>
          <td>
            {Math.round(
              (replay.endcontext.piecesplaced / replay.endcontext.finalTime) *
                100000
            ) / 100}
          </td>
        </tr>
        <tr>
          <td>Lines</td>
          <td>{replay.endcontext.lines}</td>
        </tr>
        <tr>
          <td>Finesse %</td>
          <td>
            {replay.endcontext.finesse.faults}F (
            {Math.round(
              (replay.endcontext.finesse.perfectpieces /
                replay.endcontext.piecesplaced) *
                10000
            ) / 100}
            %)
          </td>
        </tr>
        <tr>
          <td>Date</td>
          <td>{new Date(replay.ts).toLocaleString(['de', 'us'])}</td>
        </tr>
      </tbody>
    </table>
  )
}
