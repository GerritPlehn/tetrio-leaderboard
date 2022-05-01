import useSWR, { Fetcher } from 'swr'
import React, { useState } from 'react'
import LeaderboardEntry from '../types/leaderboardEntry'
import Score from '../types/score'
import { Replay } from '../types/replay'

import { Table, TablePaginationConfig } from 'antd'
import { ColumnsType } from 'antd/lib/table'

let pageSize = 10

let totalScores = pageSize

function Page({
  pageIndex,
  setPageIndex,
  replayInfoExchanger,
}: {
  pageIndex: number
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
  replayInfoExchanger: (replayDetail: Replay.RootObject) => void
}): JSX.Element {
  let { data, error } = useSWR(`/api/scores?page=${pageIndex}`, entryFetcher)

  const columns: ColumnsType<LeaderboardEntry> = [
    {
      title: 'Rank',
      key: 'rank',
      render: (value, record, index) => {
        return pageIndex * pageSize + index + 1
      },
      width: 64
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      width: 64
    },
    {
      title: 'Score',
      dataIndex: 'score',
      width: 128
    },
  ]
  const pagination: TablePaginationConfig = {
    total: totalScores,
    pageSize,
    onChange: (page, newPageSize) => {
      pageSize = newPageSize
      pageIndex = page
      setPageIndex(page - 1)
    },
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <Table
        dataSource={data}
        rowKey="id"
        columns={columns}
        pagination={pagination}
        onRow={(data) => {
          return {
            onClick: async (event) => {
              const score = await detailFetcher(
                `/api/scores/${data.id.toString()}`
              )
              replayInfoExchanger(score.replay)
            }
          }
        }}
      ></Table>
    </div>
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
      <Page
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        replayInfoExchanger={replayInfoExchanger}
      />
      <div id="nextPage" style={{ display: 'none' }}>
        <Page
          pageIndex={pageIndex + 1}
          setPageIndex={setPageIndex}
          replayInfoExchanger={replayInfoExchanger}
        />
      </div>
    </div>
  )
}

const entryFetcher: Fetcher<LeaderboardEntry[], string> = (url) =>
  fetch(url).then(async (res) => {
    const entries = await res.json()
    totalScores = Number(res.headers.get('content-range')?.split('/').pop())
    console.log(totalScores)
    return entries
  })

const detailFetcher: Fetcher<Score, string> = (url) =>
  fetch(url).then(async (res) => {
    const entries = await res.json()
    return entries
  })
