import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR, { Key, Fetcher } from 'swr'

const Home: NextPage = () => {
  const { data, error } = useSWR(uid, fetcher)
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

      <main className={styles.main}>
        <h1 className={styles.title}>Masters of the falling Bloks</h1>
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
            {data?.map((leaderboardEntry, index) => (
              <tr key={leaderboardEntry.seed}>
                <td>{index + 1}</td>
                <td>{leaderboardEntry.level}</td>
                <td>{leaderboardEntry.name}</td>
                <td>{leaderboardEntry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}

const uid: Key =
  'https://dfvqarmcqpkvgykzcglz.supabase.co/rest/v1/scores?select=replay->endcontext->seed,name,replay->endcontext->score,replay->endcontext->level&order=replay->endcontext->score.desc&offset=0&limit=10'
const fetcher: Fetcher<LeaderboardEntry[], string> = (url) =>
  fetch(url, {
    headers: {
      apikey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmdnFhcm1jcXBrdmd5a3pjZ2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5NjI5ODgsImV4cCI6MTk2NTUzODk4OH0.9OUfiM-bMeuIOVqSsSpz6U0mdiF2XpsLhXtj1k5WJw0',
    },
  }).then((res) => res.json())

interface LeaderboardEntry {
  seed: string
  level: number
  name: string
  score: number
}

export default Home
