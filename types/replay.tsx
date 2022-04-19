export module Replay {
  export interface User {
    _id: string
    username: string
  }

  export interface Time {
    start: number
    zero: boolean
    locked: boolean
    prev: number
    frameoffset: number
  }

  export interface Clears {
    singles: number
    doubles: number
    triples: number
    quads: number
    realtspins: number
    minitspins: number
    minitspinsingles: number
    tspinsingles: number
    minitspindoubles: number
    tspindoubles: number
    tspintriples: number
    tspinquads: number
    allclear: number
  }

  export interface Garbage {
    sent: number
    received: number
    attack: number
    cleared: number
  }

  export interface Finesse {
    combo: number
    faults: number
    perfectpieces: number
  }

  export interface Endcontext {
    seed: number
    lines: number
    level_lines: number
    level_lines_needed: number
    inputs: number
    holds: number
    time: Time
    score: number
    zenlevel: number
    zenprogress: number
    level: number
    combo: number
    currentcombopower: number
    topcombo: number
    btb: number
    topbtb: number
    tspins: number
    piecesplaced: number
    clears: Clears
    garbage: Garbage
    kills: number
    finesse: Finesse
    finalTime: number
    gametype: string
  }

  export interface Replay {}

  export interface Source {}

  export interface Objective {
    type: string
    time: number
  }

  export interface Minoskin {
    z: string
    l: string
    o: string
    s: string
    i: string
    j: string
    t: string
    other: string
  }

  export interface Handling {
    arr: number
    das: number
    dcd: number
    sdf: number
    safelock: boolean
    cancel: boolean
  }

  export interface Options {
    version: number
    seed_random: boolean
    anchorseed: boolean
    allow180: boolean
    countdown: boolean
    countdown_interval: number
    precountdown: number
    prestart: number
    mission: string
    zoominto: string
    slot_counter1: string
    slot_counter2: string
    slot_counter3: string
    slot_counter5: string
    slot_bar2: string
    pro: boolean
    pro_alert: boolean
    pro_retry: boolean
    stride: boolean
    no_szo: boolean
    objective: Objective
    can_retry: boolean
    bgmnoreset: boolean
    levels: boolean
    levelspeed: number
    gbase: number
    seed: number
    garbagespeed: number
    garbagecap: number
    kickset: string
    boardwidth: number
    boardheight: number
    boardbuffer: number
    physical: boolean
    nextcount: number
    minoskin: Minoskin
    ghostskin: string
    boardskin: string
    handling: Handling
  }

  export interface Time2 {
    start: number
    zero: boolean
    locked: boolean
    prev: number
    frameoffset: number
  }

  export interface Clears2 {
    singles: number
    doubles: number
    triples: number
    quads: number
    realtspins: number
    minitspins: number
    minitspinsingles: number
    tspinsingles: number
    minitspindoubles: number
    tspindoubles: number
    tspintriples: number
    tspinquads: number
    allclear: number
  }

  export interface Garbage2 {
    sent: number
    received: number
    attack: number
    cleared: number
  }

  export interface Finesse2 {
    combo: number
    faults: number
    perfectpieces: number
  }

  export interface Stats {
    seed: number
    lines: number
    level_lines: number
    level_lines_needed: number
    inputs: number
    holds: number
    time: Time2
    score: number
    zenlevel: number
    zenprogress: number
    level: number
    combo: number
    currentcombopower: number
    topcombo: number
    btb: number
    topbtb: number
    tspins: number
    piecesplaced: number
    clears: Clears2
    garbage: Garbage2
    kills: number
    finesse: Finesse2
    finalTime?: number
  }

  export interface Hold {
    piece?: any
    locked: boolean
  }

  export interface Controlling {
    ldas: number
    ldasiter: number
    lshift: boolean
    rdas: number
    rdasiter: number
    rshift: boolean
    lastshift: number
    softdrop: boolean
  }

  export interface Handling2 {
    arr: number
    das: number
    dcd: number
    sdf: number
    safelock: boolean
    cancel: boolean
  }

  export interface Game {
    board: string[][]
    bag: string[]
    hold: Hold
    g: number
    controlling: Controlling
    handling: Handling2
    playing: boolean
  }

  export interface Killer {
    name?: any
    type: string
  }

  export interface Assumptions {}

  export interface Aggregatestats {
    apm: number
    pps: number
    vsscore: number
  }

  export interface Replay2 {}

  export interface Source2 {}

  export interface Objective2 {
    type: string
    time: number
  }

  export interface Minoskin2 {
    z: string
    l: string
    o: string
    s: string
    i: string
    j: string
    t: string
    other: string
  }

  export interface Options2 {
    version: number
    seed_random: boolean
    anchorseed: boolean
    allow180: boolean
    countdown: boolean
    countdown_interval: number
    precountdown: number
    prestart: number
    mission: string
    zoominto: string
    slot_counter1: string
    slot_counter2: string
    slot_counter3: string
    slot_counter5: string
    slot_bar2: string
    pro: boolean
    pro_alert: boolean
    pro_retry: boolean
    stride: boolean
    no_szo: boolean
    objective: Objective2
    can_retry: boolean
    bgmnoreset: boolean
    levels: boolean
    levelspeed: number
    gbase: number
    seed: number
    garbagespeed: number
    garbagecap: number
    kickset: string
    boardwidth: number
    boardheight: number
    boardbuffer: number
    physical: boolean
    nextcount: number
    minoskin: Minoskin2
    ghostskin: string
    boardskin: string
  }

  export interface Time3 {
    start: number
    zero: boolean
    locked: boolean
    prev: number
    frameoffset: number
  }

  export interface Clears3 {
    singles: number
    doubles: number
    triples: number
    quads: number
    realtspins: number
    minitspins: number
    minitspinsingles: number
    tspinsingles: number
    minitspindoubles: number
    tspindoubles: number
    tspintriples: number
    tspinquads: number
    allclear: number
  }

  export interface Garbage3 {
    sent: number
    received: number
    attack: number
    cleared: number
  }

  export interface Finesse3 {
    combo: number
    faults: number
    perfectpieces: number
  }

  export interface Stats2 {
    seed: number
    lines: number
    level_lines: number
    level_lines_needed: number
    inputs: number
    holds: number
    time: Time3
    score: number
    zenlevel: number
    zenprogress: number
    level: number
    combo: number
    currentcombopower: number
    topcombo: number
    btb: number
    topbtb: number
    tspins: number
    piecesplaced: number
    clears: Clears3
    garbage: Garbage3
    kills: number
    finesse: Finesse3
  }

  export interface Hold2 {
    piece?: any
    locked: boolean
  }

  export interface Controlling2 {
    ldas: number
    ldasiter: number
    lshift: boolean
    rdas: number
    rdasiter: number
    rshift: boolean
    lastshift: number
    softdrop: boolean
  }

  export interface Handling3 {
    arr: number
    das: number
    dcd: number
    sdf: number
    safelock: boolean
    cancel: boolean
  }

  export interface Game2 {
    board: string[][]
    bag: string[]
    hold: Hold2
    g: number
    controlling: Controlling2
    handling: Handling3
    playing: boolean
  }

  export interface Killer2 {
    name?: any
    type: string
  }

  export interface Assumptions2 {}

  export interface Aggregatestats2 {
    apm: number
    pps: number
    vsscore: number
  }

  export interface Export {
    successful: boolean
    gameoverreason: string
    replay: Replay2
    source: Source2
    options: Options2
    stats: Stats2
    targets: any[]
    fire: number
    game: Game2
    killer: Killer2
    assumptions: Assumptions2
    aggregatestats: Aggregatestats2
  }

  export interface Data2 {
    successful: boolean
    gameoverreason: string
    replay: Replay
    source: Source
    options: Options
    stats: Stats
    targets: any[]
    fire: number
    game: Game
    killer: Killer
    assumptions: Assumptions
    aggregatestats: Aggregatestats
    key: string
    hoisted?: boolean
    subframe?: number
    reason: string
    export: Export
  }

  export interface Event {
    frame: number
    type: string
    data: Data2
  }

  export interface Data {
    frames: number
    events: Event[]
  }

  export interface RootObject {
    user: User
    endcontext: Endcontext
    ts: Date
    data: Data
    gametype: string
    customtype: string
  }
}
