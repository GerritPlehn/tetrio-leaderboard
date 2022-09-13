import { JTDDataType } from 'ajv/dist/jtd'

export const schema = {
  optionalProperties: {
    customtype: {
      type: 'string',
    },
    shortid: {
      type: 'string',
    },
    verified: {
      type: 'boolean',
    },
    _id: {
      type: 'string',
    },
  },
  properties: {
    data: {
      properties: {
        frames: {
          type: 'float64',
        },
      },
      additionalProperties: true,
    },
    endcontext: {
      properties: {
        btb: {
          type: 'float64',
        },
        clears: {
          properties: {
            allclear: {
              type: 'float64',
            },
            doubles: {
              type: 'float64',
            },
            minitspindoubles: {
              type: 'float64',
            },
            minitspins: {
              type: 'float64',
            },
            minitspinsingles: {
              type: 'float64',
            },
            quads: {
              type: 'float64',
            },
            realtspins: {
              type: 'float64',
            },
            singles: {
              type: 'float64',
            },
            triples: {
              type: 'float64',
            },
            tspindoubles: {
              type: 'float64',
            },
            tspinquads: {
              type: 'float64',
            },
            tspinsingles: {
              type: 'float64',
            },
            tspintriples: {
              type: 'float64',
            },
          },
        },
        combo: {
          type: 'float64',
        },
        currentcombopower: {
          type: 'float64',
          nullable: true
        },
        finalTime: {
          type: 'float64',
        },
        finesse: {
          properties: {
            combo: {
              type: 'float64',
            },
            faults: {
              type: 'float64',
            },
            perfectpieces: {
              type: 'float64',
            },
          },
        },
        gametype: {
          type: 'string',
        },
        garbage: {
          properties: {
            attack: {
              type: 'float64',
            },
            cleared: {
              type: 'float64',
            },
            received: {
              type: 'float64',
            },
            sent: {
              type: 'float64',
            },
          },
        },
        holds: {
          type: 'float64',
        },
        inputs: {
          type: 'float64',
        },
        kills: {
          type: 'float64',
        },
        level: {
          type: 'float64',
        },
        level_lines: {
          type: 'float64',
        },
        level_lines_needed: {
          type: 'float64',
        },
        lines: {
          type: 'float64',
        },
        piecesplaced: {
          type: 'float64',
        },
        score: {
          type: 'float64',
        },
        seed: {
          type: 'float64',
        },
        time: {
          properties: {
            frameoffset: {
              type: 'float64',
            },
            locked: {
              type: 'boolean',
            },
            prev: {
              type: 'float64',
            },
            start: {
              type: 'float64',
            },
            zero: {
              type: 'boolean',
            },
          },
        },
        topbtb: {
          type: 'float64',
        },
        topcombo: {
          type: 'float64',
        },
        tspins: {
          type: 'float64',
        },
        zenlevel: {
          type: 'float64',
        },
        zenprogress: {
          type: 'float64',
        },
      },
    },
    gametype: {
      type: 'string',
    },
    ts: {
      type: 'timestamp',
    },
    user: {
      properties: {
        _id: {
          type: 'string',
        },
        username: {
          type: 'string',
        },
      },
    },
  },
} as const

export type Replay = JTDDataType<typeof schema>
