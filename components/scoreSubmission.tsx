import { Input, Button, Upload, message } from 'antd'
import { UserOutlined, InboxOutlined } from '@ant-design/icons'
import { FormEvent } from 'react'
import { Replay } from '../types/replay'
import { DraggerProps } from 'antd/lib/upload'
const { Dragger } = Upload

let uploadReplay: Replay
const setUploadScore = (replay: Replay) => {
  uploadReplay = replay
}
const getUploadScore = () => {
  return uploadReplay
}

export default function ScoreSubmission({
  replayInfoExchanger,
}: {
  replayInfoExchanger: (replayDetail: Replay) => void
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
  const props: DraggerProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    beforeUpload: (file) => {
      const fileReader = new FileReader()
      fileReader.readAsText(file, 'UTF-8')
      fileReader.onload = (e) => {
        const jsonString = e.target?.result?.toString()
        const score = jsonString ? JSON.parse(jsonString) : undefined
        setUploadScore(score)
        replayInfoExchanger(uploadReplay)
        console.log(score)
      }
      return false
    },
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }
  return (
    <div>
      <h2>Submit your own score</h2>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Name"
          prefix={<UserOutlined />}
          name="name"
          id="name"
          addonAfter="@storyblok.com"
          required
        />
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
        <Button type="primary" size="large" htmlType="submit">
          Submit Score
        </Button>
      </form>
    </div>
  )
}

interface ScoreSubmission {
  name: string
  replay: string
}
