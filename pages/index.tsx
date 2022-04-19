import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Leaderboard from '../components/leaderboard'
import ScoreSubmission from '../components/scoreSubmission'
import ReplayInfo from '../components/replayInfo'
import { useState } from 'react'
import { Replay } from '../types/replay'
const Home: NextPage = () => {
  const [replayDetail, setReplayDetail] = useState<
    Replay.RootObject | undefined
  >()
  const replayInfoExchanger = (replayDetail: Replay.RootObject) => {
    setReplayDetail(replayDetail)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Tetrio Leaderboard</title>
        <meta
          name="description"
          content="Leaderboard for Tetrio Community Challenges"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>Masters of the falling Bloks</h1>
        <p>
          Compete against others for glory and prizes! Show the world, why we
          are StoryBLOK!
        </p>
      </header>
      <main className={styles.main}>
        <div className={styles.leaderboard}>
          <Leaderboard replayInfoExchanger={replayInfoExchanger} />
        </div>
        <div className={styles.replayDetail}>
          {replayDetail && <ReplayInfo replay={replayDetail} />}
        </div>
      </main>
      <div className={styles.scoreSubmission}>
        <h2>Submit your own score</h2>
        <ScoreSubmission replayInfoExchanger={replayInfoExchanger} />
      </div>
    </div>
  )
}

export default Home
