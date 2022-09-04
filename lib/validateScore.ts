import { schema } from '../types/replay'
import Ajv from 'ajv/dist/jtd'
const ajv = new Ajv()
import type { ValidationResult } from '../types/validationResult'
import type { Replay } from '../types/replay'

export const validateReplay = (replay: unknown): ValidationResult => {
  const validateSchema = ajv.compile<Replay>(schema)
  const score = JSON.parse(JSON.stringify(replay))
  const schemaValid = validateSchema(score)

  const validationResult: ValidationResult = {
    valid: schemaValid,
    message: null,
  }

  if (!validationResult.valid) {
    console.log(validateSchema.errors)
    validationResult.message = 'Replay format not recognized'
  }
  let i = 0
  while (validationResult.valid && i < competitionRules.length) {
    const ruleResult = competitionRules[i].validate(score)
    validationResult.valid = ruleResult.valid
    if (!validationResult.valid) validationResult.message = ruleResult.message
    i++
  }
  return validationResult
}

type Rule = {
  name: string
  validate: (replay: Replay) => { valid: boolean; message: string | null }
}

const competitionRules: Rule[] = [
  {
    name: 'gameMode',
    validate: (replay: Replay) => {
      const message = 'The score was not set on the correct game mode.'
      const valid =
        replay.gametype === 'blitz' && replay.endcontext.gametype === 'blitz'
      return { valid, message: valid ? null : message }
    },
  },
  {
    name: 'timeRange',
    validate: (replay: Replay) => {
      const timestamp = new Date(replay.ts)
      const message = 'The score was not within the competition time-frame.'
      const valid =
        timestamp > new Date('2022-09-01T00:00:00.000Z') &&
        timestamp < new Date('2022-10-01T00:00:00.000Z')
      return { valid, message: valid ? null : message }
    },
  },
]
