DROP DATABASE IF EXISTS skeeball_test;
CREATE DATABASE skeeball_test;
USE skeeball_test;

set foreign_key_checks=0;

-- --------------------------------------------------------

CREATE TABLE divisions (
  division_id tinyint(1) UNSIGNED NOT NULL AUTO_INCREMENT,
  day_name varchar(20) DEFAULT NULL,
  PRIMARY KEY (division_id)
);

-- --------------------------------------------------------

CREATE TABLE downloads (
  download_id int(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  download_desc varchar(50) NOT NULL,
  file_name varchar(50) NOT NULL,
  show_download tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (download_id)
);

-- --------------------------------------------------------

CREATE TABLE players (
  player_id int(6) UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name varchar(40) DEFAULT NULL,
  store_id tinyint(2) UNSIGNED NOT NULL,
  FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  PRIMARY KEY (player_id)
);

-- --------------------------------------------------------

CREATE TABLE results (
  results_id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  season_id int(3) UNSIGNED NOT NULL,
  FOREIGN KEY (season_id) REFERENCES seasons(season_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  store_id tinyint(2) UNSIGNED NOT NULL,
  FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  division_id tinyint(1) UNSIGNED NOT NULL,
  FOREIGN KEY (division_id) REFERENCES divisions(division_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  week_id tinyint(2) UNSIGNED NOT NULL,
  team_id int(4) UNSIGNED NOT NULL,
  FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  player_num tinyint(1) UNSIGNED NOT NULL,
  player_id int(6) UNSIGNED NOT NULL,
  FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  g1 int(3) UNSIGNED NOT NULL,
  g2 int(3) UNSIGNED NOT NULL,
  g3 int(3) UNSIGNED NOT NULL,
  g4 int(3) UNSIGNED NOT NULL,
  g5 int(3) UNSIGNED NOT NULL,
  g6 int(3) UNSIGNED NOT NULL,
  g7 int(3) UNSIGNED NOT NULL,
  g8 int(3) UNSIGNED NOT NULL,
  g9 int(3) UNSIGNED NOT NULL,
  g10 int(3) UNSIGNED NOT NULL,
  PRIMARY KEY (results_id),
  INDEX results_idx (season_id, store_id, division_id)
);

-- --------------------------------------------------------

CREATE TABLE schedule (
  schedule_id int(6) NOT NULL AUTO_INCREMENT,
  season_id int(3) UNSIGNED NOT NULL,
  FOREIGN KEY (season_id) REFERENCES seasons(season_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  store_id tinyint(2) UNSIGNED NOT NULL,
  FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  division_id tinyint(1) UNSIGNED NOT NULL,
  FOREIGN KEY (division_id) REFERENCES divisions(division_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  week_id int(2) UNSIGNED NOT NULL,
  week_date date NOT NULL,
  start_time varchar(20) DEFAULT NULL,
  alley int(2) UNSIGNED NOT NULL,
  away_team_id int(4) UNSIGNED NOT NULL,
  home_team_id int(4) UNSIGNED NOT NULL,
  PRIMARY KEY (schedule_id),
  INDEX schedule_idx (season_id, store_id, division_id)
);

-- --------------------------------------------------------

CREATE TABLE schedule_temp (
  store_id int(2) UNSIGNED NOT NULL,
  division_id tinyint(1) UNSIGNED NOT NULL,
  away_team_id varchar(50) NOT NULL,
  home_team_id varchar(50) NOT NULL,
  week_id int(2) UNSIGNED NOT NULL,
  alley int(2) UNSIGNED NOT NULL,
  start_time varchar(20) DEFAULT NULL,
  week_date date NOT NULL,
  season_id int(3) UNSIGNED NOT NULL
);

-- --------------------------------------------------------

CREATE TABLE seasons (
  season_id int(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  season_num tinyint(1) UNSIGNED NOT NULL,
  season_name varchar(20) NOT NULL,
  year int(4) UNSIGNED NOT NULL,
  season_games tinyint(2) UNSIGNED NOT NULL,
  tourny_team_id int(4) NOT NULL,
  comments text NOT NULL,
  reg_ends date DEFAULT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  tourny_date date DEFAULT NULL,
  PRIMARY KEY (season_id)
);

-- --------------------------------------------------------

CREATE TABLE settings (
  setting_id smallint(2) UNSIGNED NOT NULL AUTO_INCREMENT,
  tourny_rankings_status tinyint(1) UNSIGNED NOT NULL,
  num_leaders tinyint(2) UNSIGNED NOT NULL,
  current_season_id int(3) UNSIGNED NOT NULL,
  FOREIGN KEY (current_season_id) REFERENCES seasons(season_id) ON DELETE CASCADE ON UPDATE CASCADE,
  display_schedule tinyint(1) UNSIGNED NOT NULL,
  show_reg_button tinyint(1) UNSIGNED NOT NULL,
  reg_button_url varchar(50) NOT NULL,
  reg_button_text text NOT NULL,
  text_box_heading text NOT NULL,
  text_box_text text NOT NULL,
  PRIMARY KEY (setting_id)
);

-- --------------------------------------------------------

CREATE TABLE standings (
  standings_id int(6) NOT NULL AUTO_INCREMENT,
  season_id int(3) UNSIGNED NOT NULL,
  FOREIGN KEY (season_id) REFERENCES seasons(season_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  store_id tinyint(2) UNSIGNED NOT NULL,
  FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  division_id tinyint(1) UNSIGNED NOT NULL,
  FOREIGN KEY (division_id) REFERENCES divisions(division_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  team_id int(4) UNSIGNED NOT NULL,
  FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  wins int(2) NOT NULL,
  losses int(2) NOT NULL,
  ties int(2) NOT NULL,
  total_points int(6) NOT NULL,
  standings_order smallint(2) UNSIGNED NOT NULL,
  PRIMARY KEY (standings_id)
);

-- --------------------------------------------------------

CREATE TABLE stores (
  store_id tinyint(2) UNSIGNED NOT NULL AUTO_INCREMENT,
  store_name varchar(40) DEFAULT NULL,
  store_address varchar(30) DEFAULT NULL,
  store_city varchar(20) DEFAULT NULL,
  store_state varchar(20) DEFAULT NULL,
  store_zip varchar(30) DEFAULT NULL,
  store_phone varchar(20) DEFAULT NULL,
  map_url varchar(255) DEFAULT NULL,
  active tinyint(1) UNSIGNED NOT NULL,
  PRIMARY KEY (store_id)
);

-- --------------------------------------------------------

CREATE TABLE store_text (
  page_id int(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  store_id int(2) UNSIGNED NOT NULL,
  content_heading varchar(100) NOT NULL,
  page_content text,
  text_date date DEFAULT NULL,
  display_content tinyint(1) UNSIGNED NOT NULL,
  PRIMARY KEY (page_id)
);

-- --------------------------------------------------------

CREATE TABLE teams (
  team_id int(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  team_name varchar(50) NOT NULL,
  store_id tinyint(2) UNSIGNED NOT NULL,
  FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  tourny_show tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  real_team tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  PRIMARY KEY (team_id)
);

-- --------------------------------------------------------

CREATE TABLE users (
  user_id smallint(2) UNSIGNED NOT NULL AUTO_INCREMENT,
  username varchar(20) DEFAULT NULL,
  hashed_password char(64) DEFAULT NULL,
  PRIMARY KEY (user_id)
);

-- --------------------------------------------------------

CREATE TABLE sessions (
    session_id varchar(128) COLLATE utf8mb4_bin NOT NULL,
    expires int(11) unsigned NOT NULL,
    data mediumtext COLLATE utf8mb4_bin,
    PRIMARY KEY (session_id)
);

-- --------------------------------------------------------

set foreign_key_checks=1;