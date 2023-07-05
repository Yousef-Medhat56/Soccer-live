# Players
Get data about the player, such as: statistics and transfers.

## Endpoints
### GET: /player/[player_id]/[player_slug]
Return details about the player.

Available details:
1. Player nationality
2. The player's club
3. Player image.
4. Position.
5. Age.
6. Height.
7. Weight.

#### Example Request
`GET /api/player/39358/e-hazard`

Scraped from `btolat.com/player/39358/e-hazard`

#### Example Response
```
{
  "data": {
    "playerDetails": {
      "name": "إدين هازارد",
      "position": "مهاجم",
      "club": {
        "name": " ريال مدريد",
        "url": "16110/real-madrid"
      },
      "img": "https://img.btolat.com/playerslogo/39358.png?v=61",
      "nationality": "بلجيكا ",
      "age": 32,
      "height": 175,
      "weight": 74
    }
  }
}
```
