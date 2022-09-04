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
    validationResult.valid = competitionRules[i].validate(score)
    if (!validationResult.valid)
      validationResult.message = `Failed to validate rule '${competitionRules[i].name}'`
    i++
  }
  return validationResult
}

type Rule = {
  name: string
  validate: (replay: Replay) => boolean
}

const competitionRules: Rule[] = [
  {
    name: 'gameMode',
    validate: (replay: Replay) =>
      replay.gametype === 'blitz' && replay.endcontext.gametype === 'blitz',
  },
  {
    name: 'timeRange',
    validate: (replay: Replay) => {
      const timestamp = new Date(replay.ts)
      return (
        timestamp > new Date('2022-09-01T00:00:00.000Z') &&
        timestamp < new Date('2022-10-01T00:00:00.000Z')
      )
    },
  },
]
