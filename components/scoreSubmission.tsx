import { Input, Button, Upload, message, Form, notification } from 'antd'
import { UserOutlined, InboxOutlined } from '@ant-design/icons'
import type { FormInstance } from 'antd/es/form'
import type { Replay } from '../types/replay'
import React from 'react'
import { DraggerProps } from 'antd/lib/upload'
import type { ValidationResult } from '../types/validationResult'
import { validateReplay } from '../lib/validateScore'
import ValidationNotice from './validationNotice'
const { Dragger } = Upload

let uploadReplay: Replay
let validationResult: ValidationResult

const setUploadScore = (replay: Replay) => {
  uploadReplay = replay
  validationResult = validateReplay(replay)
}
const getUploadScore = () => {
  return uploadReplay
}

class ScoreSubmission extends React.Component< {replayInfoExchanger: (replayDetail: Replay) => void }, {}> {
  formRef = React.createRef<FormInstance>()

  onFinish = async (data: { name: string; file: Object }) => {
    console.log(data)

    const JSONdata = JSON.stringify({
      name: data.name,
      replay: getUploadScore(),
    })
    const endpoint = '/api/scores'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    try {
      const response = await fetch(endpoint, options)
      const body = await response.json()
      if (!response.ok) {
        throw new Error(body?.data || 'Error uploading score')
      }
      notification.open({
        message: 'Score uploaded',
        description: 'Score was successfully uploaded! Thanks for participating!'
      })
      this.formRef.current?.resetFields()
    } catch (error) {
      console.error('submit fail', error)
      notification.open({
        message: 'Submission failed',
        description: 'There was an issue while submitting your score. Please send the replay file to Gerrit!'
      })
    }
  }

  onReset = () => {
    this.formRef.current!.resetFields()
  }

  draggerProps: DraggerProps = {
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
        this.props.replayInfoExchanger(uploadReplay)
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

  constructor(props: { replayInfoExchanger: (replayDetail: Replay) => void }) {
    super(props)
  }

  render(): React.ReactNode {
    return (
      <div>
        <h2>Submit your own score</h2>
        <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input
              placeholder="Name"
              prefix={<UserOutlined />}
              addonAfter="@storyblok.com"
              required
            />
          </Form.Item>
          <Form.Item name="file" label="Replay" rules={[{ required: true }]}>
            <Dragger {...this.draggerProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </Form.Item>
          <ValidationNotice
            validationResult={validationResult}
          ></ValidationNotice>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              disabled={!validationResult?.valid}
            >
              Submit Score
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

interface ScoreSubmission {
  name: string
  replay: string
}

export default ScoreSubmission
