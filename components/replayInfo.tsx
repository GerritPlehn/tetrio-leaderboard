import { Descriptions } from 'antd'
import { Replay } from '../types/replay'

export default function ReplayInfo({ replay }: { replay: Replay }) {
  return (
    <div>
      <h2>Score Details</h2>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Score">
          {replay.endcontext.score}
        </Descriptions.Item>
        <Descriptions.Item label="Level">
          {replay.endcontext.level}
        </Descriptions.Item>
        <Descriptions.Item label="Pieces">
          {replay.endcontext.piecesplaced}
        </Descriptions.Item>
        <Descriptions.Item label="Pieces/second">
          {Math.round(
            (replay.endcontext.piecesplaced / replay.endcontext.finalTime) *
              100000
          ) / 100}
        </Descriptions.Item>
        <Descriptions.Item label="Lines">
          {replay.endcontext.lines}
        </Descriptions.Item>
        <Descriptions.Item label="Finesse">
          {replay.endcontext.finesse.faults}F (
          {Math.round(
            (replay.endcontext.finesse.perfectpieces /
              replay.endcontext.piecesplaced) *
              10000
          ) / 100}
          %)
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          {new Date(replay.ts).toLocaleString(['de', 'us'])}
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}
