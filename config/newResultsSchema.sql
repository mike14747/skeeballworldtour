USE skeeball_test;
DROP TABLE IF EXISTS results_new;

-- --------------------------------------------------------

CREATE TABLE results_new (
  results_new_id int UNSIGNED NOT NULL AUTO_INCREMENT,
  season_id int UNSIGNED NOT NULL,
  store_id int UNSIGNED NOT NULL,
  division_id int UNSIGNED NOT NULL,
  week_id int UNSIGNED NOT NULL,
  team_id int UNSIGNED NOT NULL,
  player_num int UNSIGNED NOT NULL,
  player_id int UNSIGNED NOT NULL,
  game_num int UNSIGNED NOT NULL,
  score int UNSIGNED NOT NULL,
  PRIMARY KEY (results_new_id),
  INDEX results_new_season_store_division_idx (season_id, store_id, division_id),
  INDEX results_new_player_idx ([player_id)
);
