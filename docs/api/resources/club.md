# Clubs
Return data about the club, such as: squad and matches.

## Endpoints
### GET: /club/[club_id]/[club_slug]
Get details about the club.

The available details:
1. The club country.
2. Year of foundation.
3. The club stadium.
4. The manager name.
5. The leagues that the club paricipates in.

#### Example Request
`GET /api/club/8883/al-ahly/`

Scraped from `btolat.com/team/8883/al-ahly/`

#### Example Response
```
{
  "data": {
    "clubDetails": {
      "name": "الأهلي",
      "participatingLeagues": [
        {
          "name": "الدوري المصري",
          "url": "1193/premier-league"
        },
        {
          "name": "دوري أبطال أفريقيا",
          "url": "1513/caf-champions-league"
        },
        ...
      ],
      "country": "مصر",
      "foundationYear": 1907,
      "manager": "M. Koller",
      "stadium": "إستاد القاهرة الدولى"
    }
  }
}
```
