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
          type: 'uint16',
        },
      },
      additionalProperties: true,
    },
    endcontext: {
      properties: {
        btb: {
          type: 'uint8',
        },
        clears: {
          properties: {
            allclear: {
              type: 'uint8',
            },
            doubles: {
              type: 'uint8',
            },
            minitspindoubles: {
              type: 'uint8',
            },
            minitspins: {
              type: 'uint8',
            },
            minitspinsingles: {
              type: 'uint8',
            },
            quads: {
              type: 'uint8',
            },
            realtspins: {
              type: 'uint8',
            },
            singles: {
              type: 'uint8',
            },
            triples: {
              type: 'uint8',
            },
            tspindoubles: {
              type: 'uint8',
            },
            tspinquads: {
              type: 'uint8',
            },
            tspinsingles: {
              type: 'uint8',
            },
            tspintriples: {
              type: 'uint8',
            },
          },
        },
        combo: {
          type: 'uint8',
        },
        currentcombopower: {
          type: 'uint8',
        },
        finalTime: {
          type: 'uint32',
        },
        finesse: {
          properties: {
            combo: {
              type: 'uint8',
            },
            faults: {
              type: 'uint8',
            },
            perfectpieces: {
              type: 'uint8',
            },
          },
        },
        gametype: {
          type: 'string',
        },
        garbage: {
          properties: {
            attack: {
              type: 'uint8',
            },
            cleared: {
              type: 'uint8',
            },
            received: {
              type: 'uint8',
            },
            sent: {
              type: 'uint8',
            },
          },
        },
        holds: {
          type: 'uint8',
        },
        inputs: {
          type: 'uint16',
        },
        kills: {
          type: 'uint8',
        },
        level: {
          type: 'uint8',
        },
        level_lines: {
          type: 'uint8',
        },
        level_lines_needed: {
          type: 'uint8',
        },
        lines: {
          type: 'uint8',
        },
        piecesplaced: {
          type: 'uint8',
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
              type: 'uint8',
            },
            locked: {
              type: 'boolean',
            },
            prev: {
              type: 'uint8',
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
          type: 'uint8',
        },
        topcombo: {
          type: 'uint8',
        },
        tspins: {
          type: 'uint8',
        },
        zenlevel: {
          type: 'uint8',
        },
        zenprogress: {
          type: 'uint8',
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
