DROP DATABASE IF EXISTS skeeball_test;
CREATE DATABASE skeeball_test;
USE skeeball_test;

set foreign_key_checks=0;

-- --------------------------------------------------------

CREATE TABLE divisions (
  division_id int UNSIGNED NOT NULL AUTO_INCREMENT,
  day_name varchar(20) DEFAULT NULL,
  PRIMARY KEY (division_id)
);

-- --------------------------------------------------------

CREATE TABLE downloads (
  download_id int UNSIGNED NOT NULL AUTO_INCREMENT,
  download_desc varchar(50) NOT NULL,
  file_name varchar(50) NOT NULL,
  show_download int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (download_id)
);

-- --------------------------------------------------------

CREATE TABLE players (
  player_id int UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name varchar(40) DEFAULT NULL,
  store_id int UNSIGNED NOT NULL,
  FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  PRIMARY KEY (player_id)
);

-- --------------------------------------------------------

CREATE TABLE results (
  results_id int UNSIGNED NOT NULL AUTO_INCREMENT,
  season_id int UNSIGNED NOT NULL,
  FOREIGN KEY (season_id) REFERENCES seasons(season_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  store_id int UNSIGNED NOT NULL,
  FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  division_id int UNSIGNED NOT NULL,
  FOREIGN KEY (division_id) REFERENCES divisions(division_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  week_id int UNSIGNED NOT NULL,
  team_id int UNSIGNED NOT NULL,
  FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  player_num int UNSIGNED NOT NULL,
  player_id int UNSIGNED NOT NULL,
  FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  g1 int UNSIGNED NOT NULL,
  g2 int UNSIGNED NOT NULL,
  g3 int UNSIGNED NOT NULL,
  g4 int UNSIGNED NOT NULL,
  g5 int UNSIGNED NOT NULL,
  g6 int UNSIGNED NOT NULL,
  g7 int UNSIGNED NOT NULL,
  g8 int UNSIGNED NOT NULL,
  g9 int UNSIGNED NOT NULL,
  g10 int UNSIGNED NOT NULL,
  PRIMARY KEY (results_id),
  INDEX results_idx (season_id, store_id, division_id)
);

-- --------------------------------------------------------

CREATE TABLE schedule (
  schedule_id int NOT NULL AUTO_INCREMENT,
  season_id int UNSIGNED NOT NULL,
  FOREIGN KEY (season_id) REFERENCES seasons(season_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  store_id int UNSIGNED NOT NULL,
  FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  division_id int UNSIGNED NOT NULL,
  FOREIGN KEY (division_id) REFERENCES divisions(division_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  week_id int UNSIGNED NOT NULL,
  week_date date NOT NULL,
  start_time varchar(20) DEFAULT NULL,
  alley int UNSIGNED NOT NULL,
  away_team_id int UNSIGNED NOT NULL,
  home_team_id int UNSIGNED NOT NULL,
  PRIMARY KEY (schedule_id),
  INDEX schedule_idx (season_id, store_id, division_id)
);

-- --------------------------------------------------------

CREATE TABLE schedule_temp (
  store_id int UNSIGNED NOT NULL,
  division_id int UNSIGNED NOT NULL,
  away_team_id varchar(50) NOT NULL,
  home_team_id varchar(50) NOT NULL,
  week_id int UNSIGNED NOT NULL,
  alley int UNSIGNED NOT NULL,
  start_time varchar(20) DEFAULT NULL,
  week_date date NOT NULL,
  season_id int UNSIGNED NOT NULL
);

-- --------------------------------------------------------

CREATE TABLE seasons (
  season_id int UNSIGNED NOT NULL AUTO_INCREMENT,
  season_num int UNSIGNED NOT NULL,
  season_name varchar(20) NOT NULL,
  year int UNSIGNED NOT NULL,
  season_games int UNSIGNED NOT NULL,
  tourny_team_id int NOT NULL,
  comments text NOT NULL,
  reg_ends date DEFAULT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  tourny_date date DEFAULT NULL,
  PRIMARY KEY (season_id)
);

-- --------------------------------------------------------

CREATE TABLE settings (
  setting_id int UNSIGNED NOT NULL AUTO_INCREMENT,
  tourny_rankings_status int UNSIGNED NOT NULL,
  num_leaders int UNSIGNED NOT NULL,
  current_season_id int UNSIGNED NOT NULL,
  FOREIGN KEY (current_season_id) REFERENCES seasons(season_id) ON DELETE CASCADE ON UPDATE CASCADE,
  display_schedule int UNSIGNED NOT NULL,
  show_reg_button int UNSIGNED NOT NULL,
  reg_button_url varchar(50) NOT NULL,
  reg_button_text text NOT NULL,
  text_box_heading text NOT NULL,
  text_box_text text NOT NULL,
  PRIMARY KEY (setting_id)
);

-- --------------------------------------------------------

CREATE TABLE standings (
  standings_id int NOT NULL AUTO_INCREMENT,
  season_id int UNSIGNED NOT NULL,
  FOREIGN KEY (season_id) REFERENCES seasons(season_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  store_id int UNSIGNED NOT NULL,
  FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  division_id int UNSIGNED NOT NULL,
  FOREIGN KEY (division_id) REFERENCES divisions(division_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  team_id int UNSIGNED NOT NULL,
  FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  wins int NOT NULL,
  losses int NOT NULL,
  ties int NOT NULL,
  total_points int NOT NULL,
  standings_order int UNSIGNED NOT NULL,
  PRIMARY KEY (standings_id)
);

-- --------------------------------------------------------

CREATE TABLE stores (
  store_id int UNSIGNED NOT NULL AUTO_INCREMENT,
  store_name varchar(40) DEFAULT NULL,
  store_address varchar(30) DEFAULT NULL,
  store_city varchar(20) DEFAULT NULL,
  store_state varchar(20) DEFAULT NULL,
  store_zip varchar(30) DEFAULT NULL,
  store_phone varchar(20) DEFAULT NULL,
  map_url varchar(255) DEFAULT NULL,
  active int UNSIGNED NOT NULL,
  PRIMARY KEY (store_id)
);

-- --------------------------------------------------------

CREATE TABLE store_text (
  page_id int UNSIGNED NOT NULL AUTO_INCREMENT,
  store_id int UNSIGNED NOT NULL,
  content_heading varchar(100) NOT NULL,
  page_content text,
  text_date date DEFAULT NULL,
  display_content int UNSIGNED NOT NULL,
  PRIMARY KEY (page_id)
);

-- --------------------------------------------------------

CREATE TABLE teams (
  team_id int UNSIGNED NOT NULL AUTO_INCREMENT,
  team_name varchar(50) NOT NULL,
  store_id int UNSIGNED NOT NULL,
  FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  tourny_show int UNSIGNED NOT NULL DEFAULT '1',
  real_team int UNSIGNED NOT NULL DEFAULT '1',
  PRIMARY KEY (team_id)
);

-- --------------------------------------------------------

CREATE TABLE users (
  user_id int UNSIGNED NOT NULL AUTO_INCREMENT,
  store_id int UNSIGNED NOT NULL,
  FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  division_id int UNSIGNED NOT NULL,
  FOREIGN KEY (division_id) REFERENCES divisions(division_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  username varchar(20) DEFAULT NULL,
  hashed_password char(64) DEFAULT NULL,
  PRIMARY KEY (user_id)
);

-- --------------------------------------------------------

CREATE TABLE sessions (
    session_id varchar(128) COLLATE utf8mb4_bin NOT NULL,
    expires int unsigned NOT NULL,
    data mediumtext COLLATE utf8mb4_bin,
    PRIMARY KEY (session_id)
);

-- --------------------------------------------------------

set foreign_key_checks=1;