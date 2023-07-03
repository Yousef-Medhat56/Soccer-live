# Matches

Get information about the matches of a specific day.

## Endpoints

### GET: /matches

Return list of all the matches of a specific day (default: today).

#### Parameters

| Parameter | Type   | Required | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| date      | string | false    | The day's date<br>format: [YYYY-MM-DD] |

#### Example Request

`GET /api/matches?date=2023/06/10`

#### Example Response

```
{
    "data": {
        "allMatches": [
            {
                "leagueId": "1005",
                "leagueName": "دوري أبطال أوروبا",
                "leagueImg": "https://img.btolat.com/tourlogo/84aa6db5-64e9-439b-a595-2040420fa1e2.png",
                "matches": [
                    {
                        "matchId": "3325351",
                        "matchStatus": "finished",
                        "homeName": "مانشستر سيتي",
                        "homeImg": "https://img.btolat.com/teamslogo/9259.png?v=922",
                        "homeUrl": "/team/9259/manchester-city",
                        "homeScore": "1",
                        "awayName": "إنتر ميلان",
                        "awayImg": "https://img.btolat.com/teamslogo/11917.png?v=91",
                        "awayUrl": "/team/11917/internazionale",
                        "awayScore": "0"
                    }
                ]
            },
            {
                "leagueId": "1420",
                "leagueName": "الدوري التونسي",
                "leagueImg": "https://img.btolat.com/tourlogo/7818215b-7bdd-4e90-8bdc-aa5538018650.png",
                "matches": [
                    {
                        "matchId": "3315751",
                        "matchStatus": "finished",
                        "homeName": "النادي الأفريقي",
                        "homeImg": "https://img.btolat.com/teamslogo/16921.png?v=464",
                        "homeUrl": "/team/16921/club-africain",
                        "homeScore": "1",
                        "awayName": "الاتحاد المنستيري",
                        "awayImg": "https://img.btolat.com/teamslogo/16944.png?v=242",
                        "awayUrl": "/team/16944/monastir",
                        "awayScore": "1"
                    },
                    {
                        "matchId": "3315752",
                        "matchStatus": "finished",
                        "homeName": "النجم الساحلي",
                        "homeImg": "https://img.btolat.com/teamslogo/16934.png?v=717",
                        "homeUrl": "/team/16934/etoile-du-sahel",
                        "homeScore": "0",
                        "awayName": "الترجي التونسي",
                        "awayImg": "https://img.btolat.com/teamslogo/16933.png?v=298",
                        "awayUrl": "/team/16933/es-tunis",
                        "awayScore": "0"
                    }
                ]
            }
        ]
    }
}
```

### GET: /matches/{match_id}

Redirects to `/matches/{match_id}/stats` endpoint.

### GET: /matches/{match_id}/stats

Return statistics of the match.</br>

Available statistics:

1. Possession
2. Total shots
3. Shots on target
4. Saves
5. Yellow cards
6. Red cards
7. Offsides
8. Fouls

#### Example Request

`GET /api/matches/3325351/stats`

#### Example Response

```
{
    "data": {
        "matchId": "3325351",
        "possession": {
            "home": 56,
            "away": 44
        },
        "goals": {
            "home": 1,
            "away": 0
        },
        "yellowCards": {
            "home": 2,
            "away": 3
        },
        "redCards": {
            "home": 0,
            "away": 0
        },
        "shots": {
            "home": 7,
            "away": 14
        },
        "targetShots": {
            "home": 4,
            "away": 6
        },
        "offside": {
            "home": 1,
            "away": 1
        },
        "saves": {
            "home": 5,
            "away": 3
        },
        "fouls": {
            "home": 11,
            "away": 17
        }
    }
}
```

### GET: /matches/{match_id}/events

Return events of the match.</br>

Available events:

1. Goal
2. Yellow card
3. Red card
4. Substitution
5. Missed penalty

#### Example Request

`GET /api/matches/3325351/events`

#### Example Response

```
{
    "data": [
        {
            "atHomeTeam": true,
            "eventTime": "36",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "فيل فودين",
            "substituteName": "كيفين دي بروين"
        },
        {
            "atHomeTeam": false,
            "eventTime": "57",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "روميلو لوكاكو",
            "substituteName": "إيدين دجيكو"
        },
        {
            "atHomeTeam": false,
            "eventTime": "59",
            "eventImg": "https://static.btolat.com/images/yellowcard.png",
            "playerName": "نيكولو باريلا"
        },
        {
            "atHomeTeam": true,
            "eventTime": "68",
            "eventImg": "https://static.btolat.com/images/goal.png",
            "playerName": "رودريجو هيرنانديز"
        },
        {
            "atHomeTeam": true,
            "eventTime": "75",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "كايل ووكر",
            "substituteName": "مانويل أكانجي"
        },
        {
            "atHomeTeam": false,
            "eventTime": "77",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "راؤول بيلانوفا",
            "substituteName": "دينزل دومفريس"
        },
        {
            "atHomeTeam": true,
            "eventTime": "83",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "كايل ووكر",
            "substituteName": "جون ستونز"
        },
        {
            "atHomeTeam": false,
            "eventTime": "83",
            "eventImg": "https://static.btolat.com/images/yellowcard.png",
            "playerName": "روميلو لوكاكو"
        },
        {
            "atHomeTeam": false,
            "eventTime": "84",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "هنريخ مخيتاريان",
            "substituteName": "هاكان تشالهاناوجلو"
        },
        {
            "atHomeTeam": false,
            "eventTime": "84",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "دانيلو دامروزيو",
            "substituteName": "ماتيو دارميان"
        },
        {
            "atHomeTeam": false,
            "eventTime": "90+2",
            "eventImg": "https://static.btolat.com/images/yellowcard.png",
            "playerName": "أندريه أونانا"
        },
        {
            "atHomeTeam": true,
            "eventTime": "90+2",
            "eventImg": "https://static.btolat.com/images/yellowcard.png",
            "playerName": "إيرلينج هالاند"
        },
        {
            "atHomeTeam": true,
            "eventTime": "90+4",
            "eventImg": "https://static.btolat.com/images/yellowcard.png",
            "playerName": "ايديرسون"
        },
        {
            "atHomeTeam": false,
            "eventTime": "90+6",
            "eventImg": "https://static.btolat.com/images/yellowcard.png",
            "playerName": "S. Inzaghi"
        }
    ]
}
```

### GET: /matches/{match_id}/lineups

Return lineups of the match.</br>

Available datas:

1. Formation
2. Start XI and their positions
3. Substitutes

#### Example Request

`GET /api/matches/3325351/lineups`

#### Example Response

```
{
    "home": {
        "formation": "3-2-4-1",
        "mainPlayers": {
            "GK": {
                "name": "ايديرسون",
                "shirtNumber": "31",
                "positionNumber": "1"
            },
            "D": [
                {
                    "name": "مانويل أكانجي",
                    "shirtNumber": "25",
                    "positionNumber": "2"
                },
                {
                    "name": "روبن دياز",
                    "shirtNumber": "3",
                    "positionNumber": "3"
                },
                {
                    "name": "ناثان أكي",
                    "shirtNumber": "6",
                    "positionNumber": "4"
                }
            ],
            "DM": [
                {
                    "name": "جون ستونز",
                    "shirtNumber": "5",
                    "positionNumber": "5"
                },
                {
                    "name": "رودريجو هيرنانديز",
                    "shirtNumber": "16",
                    "positionNumber": "6"
                }
            ],
            "M": [],
            "AM": [
                {
                    "name": "برناردو سيلفا",
                    "shirtNumber": "20",
                    "positionNumber": "7"
                },
                {
                    "name": "كيفين دي بروين",
                    "shirtNumber": "17",
                    "positionNumber": "8"
                },
                {
                    "name": "إلكاي جوندوجان",
                    "shirtNumber": "8",
                    "positionNumber": "9"
                },
                {
                    "name": "جاك جريليش",
                    "shirtNumber": "10",
                    "positionNumber": "10"
                }
            ],
            "F": [
                {
                    "name": "إيرلينج هالاند",
                    "shirtNumber": "9",
                    "positionNumber": "11"
                }
            ]
        },
        "substitutes": [
            {
                "name": " سيرجيو جوميز",
                "shirtNumber": 21
            },
            {
                "name": " فيل فودين",
                "shirtNumber": 47
            },
            {
                "name": " إيميرك لابورتي",
                "shirtNumber": 14
            },
            {
                "name": " رياض محرز",
                "shirtNumber": 26
            },
            {
                "name": " ريكو لويس",
                "shirtNumber": 82
            },
            {
                "name": " كايل ووكر",
                "shirtNumber": 2
            },
            {
                "name": " كالفين فيليبس",
                "shirtNumber": 4
            },
            {
                "name": " M. Perrone",
                "shirtNumber": 32
            },
            {
                "name": " سكوت كارسون",
                "shirtNumber": 33
            },
            {
                "name": " كول بالمر",
                "shirtNumber": 80
            },
            {
                "name": " ستيفان اورتيجا",
                "shirtNumber": 18
            },
            {
                "name": " جوليان ألفاريز",
                "shirtNumber": 19
            }
        ]
    },
    "away": {
        "formation": "3-5-2",
        "mainPlayers": {
            "GK": {
                "name": "أندريه أونانا",
                "shirtNumber": "24",
                "positionNumber": "1"
            },
            "D": [
                {
                    "name": "ماتيو دارميان",
                    "shirtNumber": "36",
                    "positionNumber": "2"
                },
                {
                    "name": "فرانشيسكو أتشيربي",
                    "shirtNumber": "15",
                    "positionNumber": "3"
                },
                {
                    "name": "أليساندرو باستوني",
                    "shirtNumber": "95",
                    "positionNumber": "4"
                }
            ],
            "DM": [],
            "M": [
                {
                    "name": "دينزل دومفريس",
                    "shirtNumber": "2",
                    "positionNumber": "5"
                },
                {
                    "name": "نيكولو باريلا",
                    "shirtNumber": "23",
                    "positionNumber": "6"
                },
                {
                    "name": "مارسيلو بروزوفيتش",
                    "shirtNumber": "77",
                    "positionNumber": "7"
                },
                {
                    "name": "هاكان تشالهاناوجلو",
                    "shirtNumber": "20",
                    "positionNumber": "8"
                },
                {
                    "name": "فيديريكو ديماركو",
                    "shirtNumber": "32",
                    "positionNumber": "9"
                }
            ],
            "AM": [],
            "F": [
                {
                    "name": "إيدين دجيكو",
                    "shirtNumber": "9",
                    "positionNumber": "10"
                },
                {
                    "name": "لاوتارو مارتينيز",
                    "shirtNumber": "10",
                    "positionNumber": "11"
                }
            ]
        },
        "substitutes": [
            {
                "name": " راؤول بيلانوفا",
                "shirtNumber": 12
            },
            {
                "name": " روبيرتو جاليارديني",
                "shirtNumber": 5
            },
            {
                "name": " سمير هاندنوفيتش",
                "shirtNumber": 1
            },
            {
                "name": " K. Asllani",
                "shirtNumber": 14
            },
            {
                "name": " إيه. كورداز",
                "shirtNumber": 21
            },
            {
                "name": " هنريخ مخيتاريان",
                "shirtNumber": 22
            },
            {
                "name": " ستيفان دي فري",
                "shirtNumber": 6
            },
            {
                "name": " خواكين كوريا",
                "shirtNumber": 11
            },
            {
                "name": " روبن جوسينس",
                "shirtNumber": 8
            },
            {
                "name": " روميلو لوكاكو",
                "shirtNumber": 90
            },
            {
                "name": " دانيلو دامروزيو",
                "shirtNumber": 33
            },
            {
                "name": " ميلان سكرينيار",
                "shirtNumber": 37
            }
        ]
    }
}
```
