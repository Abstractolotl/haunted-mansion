---
sidebar_position: 1
---

# Game Definition

The game definition is a JSON file that defines the structure of the game. It is located in the `config` directory of the game and is named `game.json`.

It contains the following properties:

- `author`: The author of the game. It can be a single author or an array of authors. Each author can have the following properties:
  - `name`: The name of the author.
  - `email`: The email address of the author.
  - `website`: The website of the author.
- `title`: The title of the game.
- `description`: A brief description of the game.
- `version`: The version of the game.
- `tags`: An array of tags that describe the game.
- `settings`: Additional settings for the game.
  - `indexPath`: The path to the index file of the game.
  - `entryRoomId`: The ID of the room where the player starts the game.
  - `startingItems`: An array of item IDs that the player starts with.
  - `interface`: The interface settings for the game.
    - `scene`: The size of the scene in characters (width, height).
    - `actionLog`: The width of the action log in characters.
    - `padding`: The padding around the scene in characters.
    - `inventory`: The inventory settings.
      - `rows`: The number of rows in the inventory.
      - `columns`: The number of columns in the inventory.
      - `slotSize`: The size of each inventory slot in characters (width, height).

## Example `game.json`

```json
{
  "author": [
    {
      "name": "Jona Elsinger"
    }
  ],

  "title": "Demo Game",
  "description": "This is a demo game.",
  "version": "0.1.0",
  "tags": ["demo", "protoype"],

  "settings": {
    "indexPath": "index.json",
    "entryRoomId": "entrance",
    "startingItems": [],
    "interface": {
      "scene": [124, 10],
      "actionLog": 32,
      "padding": 5,
      "inventory": {
        "rows": 2,
        "columns": 5,
        "slotSize": [5, 3]
      }
    }
  }
}
```