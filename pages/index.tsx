import type { NextPage } from 'next'
import Head from 'next/head'
import Leaderboard from '../components/leaderboard'
import ScoreSubmission from '../components/scoreSubmission'
import ReplayInfo from '../components/replayInfo'
import { CSSProperties, useState } from 'react'
import { Replay } from '../types/replay'

import { Layout } from 'antd'
import Rules from '../components/rules'
const { Content, Header } = Layout

const Home: NextPage = () => {
  const [replayDetail, setReplayDetail] = useState<
    Replay.RootObject | undefined
  >()
  const replayInfoExchanger = (replayDetail: Replay.RootObject) => {
    setReplayDetail(replayDetail)
  }
  return (
    <div>
      <Head>
        <title>Tetrio Leaderboard</title>
        <meta
          name="description"
          content="Leaderboard for Tetrio Community Challenges"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header>
          <h1 style={{ color: 'white' }}>Storyblok Tetris Tournament</h1>
        </Header>
        <Content style={styles.main}>
          <div style={styles.row}>
            <div style={styles.block}>
              <Leaderboard replayInfoExchanger={replayInfoExchanger} />
            </div>
            {replayDetail && (
              <div style={styles.block}>
                <ReplayInfo replay={replayDetail} />
              </div>
            )}
          </div>
          <div style={styles.row}>
            <div style={styles.block}>
              <Rules></Rules>
            </div>
            <div style={styles.block}>
              <ScoreSubmission replayInfoExchanger={replayInfoExchanger} />
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

const styles: { [className: string]: CSSProperties } = {
  main: {
    padding: '12px 12px',
  },
  row: {
    display: 'flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
  },
  block: {
    background: 'white',
    margin: '12px 0 0 12px',
    padding: '12px',
    flex: '350px',
  },
}

export default Home
