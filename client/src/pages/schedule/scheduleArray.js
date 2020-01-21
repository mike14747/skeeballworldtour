const originalArray = [
    {
        week_id: 1,
        week_date1: 'January 14, 2019',
        away_team_id: 853,
        away_team: 'Milk Duds',
        home_team_id: 154,
        home_team: 'MT Nesters',
        alley: 1,
        start_time: '6:30 PM',
    },
    {
        week_id: 1,
        week_date1: 'January 14, 2019',
        away_team_id: 622,
        away_team: 'Dysfunctional',
        home_team_id: 358,
        home_team: 'Hooptabogen',
        alley: 2,
        start_time: '6:30 PM',
    },
    {
        week_id: 1,
        week_date1: 'January 14, 2019',
        away_team_id: 152,
        away_team: 'Brewskees',
        home_team_id: 731,
        home_team: 'Ghost Team 660 (Mon)',
        alley: 1,
        start_time: '7:45 PM',
    },
    {
        week_id: 2,
        week_date1: 'January 21, 2019',
        away_team_id: 358,
        away_team: 'Hooptabogen',
        home_team_id: 152,
        home_team: 'Brewskees',
        alley: 1,
        start_time: '6:30 PM',
    },
    {
        week_id: 2,
        week_date1: 'January 21, 2019',
        away_team_id: 154,
        away_team: 'MT Nesters',
        home_team_id: 731,
        home_team: 'Ghost Team 660 (Mon)',
        alley: 2,
        start_time: '6:30 PM',
    },
    {
        week_id: 2,
        week_date1: 'January 21, 2019',
        away_team_id: 853,
        away_team: 'Milk Duds',
        home_team_id: 622,
        home_team: 'Dysfunctional',
        alley: 1,
        start_time: '7:45 PM',
    },
    {
        week_id: 3,
        week_date1: 'January 28, 2019',
        away_team_id: 358,
        away_team: 'Hooptabogen',
        home_team_id: 853,
        home_team: 'Milk Duds',
        alley: 1,
        start_time: '6:30 PM',
    },
    {
        week_id: 3,
        week_date1: 'January 28, 2019',
        away_team_id: 152,
        away_team: 'Brewskees',
        home_team_id: 154,
        home_team: 'MT Nesters',
        alley: 2,
        start_time: '6:30 PM',
    },
    {
        week_id: 3,
        week_date1: 'January 28, 2019',
        away_team_id: 731,
        away_team: 'Ghost Team 660 (Mon)',
        home_team_id: 622,
        home_team: 'Dysfunctional',
        alley: 1,
        start_time: '7:45 PM',
    },
    {
        week_id: 4,
        week_date1: 'February 04, 2019',
        away_team_id: 731,
        away_team: 'Ghost Team 660 (Mon)',
        home_team_id: 358,
        home_team: 'Hooptabogen',
        alley: 1,
        start_time: '6:30 PM',
    },
    {
        week_id: 4,
        week_date1: 'February 04, 2019',
        away_team_id: 853,
        away_team: 'Milk Duds',
        home_team_id: 152,
        home_team: 'Brewskees',
        alley: 2,
        start_time: '6:30 PM',
    },
    {
        week_id: 4,
        week_date1: 'February 04, 2019',
        away_team_id: 622,
        away_team: 'Dysfunctional',
        home_team_id: 154,
        home_team: 'MT Nesters',
        alley: 1,
        start_time: '7:45 PM',
    },
    {
        week_id: 5,
        week_date1: 'February 11, 2019',
        away_team_id: 731,
        away_team: 'Ghost Team 660 (Mon)',
        home_team_id: 853,
        home_team: 'Milk Duds',
        alley: 1,
        start_time: '6:30 PM',
    },
    {
        week_id: 5,
        week_date1: 'February 11, 2019',
        away_team_id: 154,
        away_team: 'MT Nesters',
        home_team_id: 358,
        home_team: 'Hooptabogen',
        alley: 2,
        start_time: '6:30 PM',
    },
    {
        week_id: 5,
        week_date1: 'February 11, 2019',
        away_team_id: 152,
        away_team: 'Brewskees',
        home_team_id: 622,
        home_team: 'Dysfunctional',
        alley: 1,
        start_time: '7:45 PM',
    },
    {
        week_id: 6,
        week_date1: 'February 18, 2019',
        away_team_id: 622,
        away_team: 'Dysfunctional',
        home_team_id: 358,
        home_team: 'Hooptabogen',
        alley: 1,
        start_time: '6:30 PM',
    },
    {
        week_id: 6,
        week_date1: 'February 18, 2019',
        away_team_id: 152,
        away_team: 'Brewskees',
        home_team_id: 731,
        home_team: 'Ghost Team 660 (Mon)',
        alley: 2,
        start_time: '6:30 PM',
    },
    {
        week_id: 6,
        week_date1: 'February 18, 2019',
        away_team_id: 154,
        away_team: 'MT Nesters',
        home_team_id: 853,
        home_team: 'Milk Duds',
        alley: 1,
        start_time: '7:45 PM',
    },
    {
        week_id: 7,
        week_date1: 'February 25, 2019',
        away_team_id: 358,
        away_team: 'Hooptabogen',
        home_team_id: 152,
        home_team: 'Brewskees',
        alley: 1,
        start_time: '6:30 PM',
    },
    {
        week_id: 7,
        week_date1: 'February 25, 2019',
        away_team_id: 853,
        away_team: 'Milk Duds',
        home_team_id: 622,
        home_team: 'Dysfunctional',
        alley: 2,
        start_time: '6:30 PM',
    },
    {
        week_id: 7,
        week_date1: 'February 25, 2019',
        away_team_id: 154,
        away_team: 'MT Nesters',
        home_team_id: 731,
        home_team: 'Ghost Team 660 (Mon)',
        alley: 1,
        start_time: '7:45 PM',
    },
    {
        week_id: 8,
        week_date1: 'March 04, 2019',
        away_team_id: 154,
        away_team: 'MT Nesters',
        home_team_id: 152,
        home_team: 'Brewskees',
        alley: 1,
        start_time: '6:30 PM',
    },
    {
        week_id: 8,
        week_date1: 'March 04, 2019',
        away_team_id: 731,
        away_team: 'Ghost Team 660 (Mon)',
        home_team_id: 622,
        home_team: 'Dysfunctional',
        alley: 2,
        start_time: '6:30 PM',
    },
    {
        week_id: 8,
        week_date1: 'March 04, 2019',
        away_team_id: 853,
        away_team: 'Milk Duds',
        home_team_id: 358,
        home_team: 'Hooptabogen',
        alley: 1,
        start_time: '7:45 PM',
    },
    {
        week_id: 9,
        week_date1: 'March 11, 2019',
        away_team_id: 152,
        away_team: 'Brewskees',
        home_team_id: 853,
        home_team: 'Milk Duds',
        alley: 1,
        start_time: '6:30 PM',
    },
    {
        week_id: 9,
        week_date1: 'March 11, 2019',
        away_team_id: 622,
        away_team: 'Dysfunctional',
        home_team_id: 154,
        home_team: 'MT Nesters',
        alley: 2,
        start_time: '6:30 PM',
    },
    {
        week_id: 9,
        week_date1: 'March 11, 2019',
        away_team_id: 358,
        away_team: 'Hooptabogen',
        home_team_id: 731,
        home_team: 'Ghost Team 660 (Mon)',
        alley: 1,
        start_time: '7:45 PM',
    },
];

const formattedArray = [
    
];