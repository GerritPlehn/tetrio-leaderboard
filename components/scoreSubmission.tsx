import { FormEvent, useState } from 'react'
import { Replay } from '../types/replay'

let uploadReplay: Replay.RootObject
const setUploadScore = (replay: Replay.RootObject) => {
  uploadReplay = replay
}
const getUploadScore = () => {
  return uploadReplay
}

export default function ScoreSubmission({
  replayInfoExchanger,
}: {
  replayInfoExchanger: (replayDetail: Replay.RootObject) => void
}) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      name: { value: string }
      replay: { value: string }
    }
    const data = {
      name: target.name.value,
      replay: getUploadScore(),
    }

    const JSONdata = JSON.stringify(data)
    const endpoint = '/api/scores'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    // await response.json()
  }

  const handleScore = (e: FormEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    const files = (e.target as HTMLInputElement).files
    if (!files) {
      console.error('no file')
      return
    }
    fileReader.readAsText(files[0], 'UTF-8')
    fileReader.onload = (e) => {
      const jsonString = e.target?.result?.toString()
      const score = jsonString ? JSON.parse(jsonString) : undefined
      setUploadScore(score)
      replayInfoExchanger(uploadReplay)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="uploadReplay">Replay</label>
      <input
        type="file"
        id="uploadReplay"
        name="uploadReplay"
        onChange={handleScore}
        required
      />

      <button type="submit">Submit</button>
    </form>
  )
}

interface ScoreSubmission {
  name: string
  replay: string
}
