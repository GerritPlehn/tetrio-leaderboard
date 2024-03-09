create table
  tetrio_leaderboard.score (
    id text not null,
    player_id text not null,
    replay jsonb not null,
    score bigint not null,
    played_at timestamp with time zone not null,
    submitted_at timestamp with time zone not null default now(),
    player_name text null,
    constraint scores_pkey primary key (id)
  ) tablespace pg_default;

CREATE INDEX ON "tetrio_leaderboard"."score" USING btree (score);
CREATE INDEX ON "tetrio_leaderboard"."score" USING btree (player_id);

create view
  tetrio_leaderboard.highscores as
select distinct
  on (score.player_id) score.id,
  score.player_id,
  score.replay,
  score.score,
  score.played_at,
  score.submitted_at,
  score.player_name
from
  tetrio_leaderboard.score
order by
  score.player_id,
  score.score desc;
