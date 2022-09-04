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
          type: 'uint32',
        },
      },
      additionalProperties: true,
    },
    endcontext: {
      properties: {
        btb: {
          type: 'uint32',
        },
        clears: {
          properties: {
            allclear: {
              type: 'uint32',
            },
            doubles: {
              type: 'uint32',
            },
            minitspindoubles: {
              type: 'uint32',
            },
            minitspins: {
              type: 'uint32',
            },
            minitspinsingles: {
              type: 'uint32',
            },
            quads: {
              type: 'uint32',
            },
            realtspins: {
              type: 'uint32',
            },
            singles: {
              type: 'uint32',
            },
            triples: {
              type: 'uint32',
            },
            tspindoubles: {
              type: 'uint32',
            },
            tspinquads: {
              type: 'uint32',
            },
            tspinsingles: {
              type: 'uint32',
            },
            tspintriples: {
              type: 'uint32',
            },
          },
        },
        combo: {
          type: 'uint32',
        },
        currentcombopower: {
          type: 'uint32',
          nullable: true
        },
        finalTime: {
          type: 'float64',
        },
        finesse: {
          properties: {
            combo: {
              type: 'uint32',
            },
            faults: {
              type: 'uint32',
            },
            perfectpieces: {
              type: 'uint32',
            },
          },
        },
        gametype: {
          type: 'string',
        },
        garbage: {
          properties: {
            attack: {
              type: 'uint32',
            },
            cleared: {
              type: 'uint32',
            },
            received: {
              type: 'uint32',
            },
            sent: {
              type: 'uint32',
            },
          },
        },
        holds: {
          type: 'uint32',
        },
        inputs: {
          type: 'uint32',
        },
        kills: {
          type: 'uint32',
        },
        level: {
          type: 'uint32',
        },
        level_lines: {
          type: 'uint32',
        },
        level_lines_needed: {
          type: 'uint32',
        },
        lines: {
          type: 'uint32',
        },
        piecesplaced: {
          type: 'uint32',
        },
        score: {
          type: 'uint32',
        },
        seed: {
          type: 'uint32',
        },
        time: {
          properties: {
            frameoffset: {
              type: 'uint32',
            },
            locked: {
              type: 'boolean',
            },
            prev: {
              type: 'uint32',
            },
            start: {
              type: 'uint32',
            },
            zero: {
              type: 'boolean',
            },
          },
        },
        topbtb: {
          type: 'uint32',
        },
        topcombo: {
          type: 'uint32',
        },
        tspins: {
          type: 'uint32',
        },
        zenlevel: {
          type: 'uint32',
        },
        zenprogress: {
          type: 'uint32',
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
