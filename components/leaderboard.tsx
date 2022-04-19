import useSWR, { Fetcher } from 'swr'
import React, { useState } from 'react'
import LeaderboardEntry from '../types/leaderboardEntry'
import Score from '../types/score'
import { Replay } from '../types/replay'
const pageSize = 10

function Page({
  pageIndex,
  replayInfoExchanger,
}: {
  pageIndex: number
  replayInfoExchanger: (replayDetail: Replay.RootObject) => void
}): JSX.Element {
  const { data, error } = useSWR(`/api/scores?page=${pageIndex}`, entryFetcher)

  if (error || !data?.length) {
    return <div>No more scores</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Level</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((leaderboardEntry, index) => (
          <tr
            key={leaderboardEntry.id}
            onClick={async () => {
              const score = await detailFetcher(
                `/api/scores/${leaderboardEntry.id.toString()}`
              )
              replayInfoExchanger(score.replay)
            }}
          >
            <td>{pageIndex * pageSize + index + 1}</td>
            <td>{leaderboardEntry.level}</td>
            <td>{leaderboardEntry.name}</td>
            <td>{leaderboardEntry.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Leaderboard({
  replayInfoExchanger,
}: {
  replayInfoExchanger: (replayDetail: Replay.RootObject) => void
}) {
  const [pageIndex, setPageIndex] = useState(0)
  return (
    <div>
      <Page pageIndex={pageIndex} replayInfoExchanger={replayInfoExchanger} />
      <div id="nextPage" style={{ display: 'none' }}>
        <Page
          pageIndex={pageIndex + 1}
          replayInfoExchanger={replayInfoExchanger}
        />
      </div>

      <button
        onClick={() => setPageIndex(pageIndex - 1)}
        disabled={pageIndex == 0 ? true : false}
      >
        Previous
      </button>
      <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
    </div>
  )
}

const entryFetcher: Fetcher<LeaderboardEntry[], string> = (url) =>
  fetch(url).then(async (res) => {
    const entries = await res.json()
    return entries
  })

const detailFetcher: Fetcher<Score, string> = (url) =>
  fetch(url).then(async (res) => {
    const entries = await res.json()
    return entries
  })
