---
sidebar_position: 3
---
# File Structure

In this section we will explain the file structure of a game. This will help you to understand how to organize your game and where to put your files.

Below is an example of a file structure for a game:

```plaintext
my-game/                        # Root directory of the game
├── assets/                     # Contains all the assets of the game
│   ├── items/
│   │   ├── item1.txt
│   │   └── item2.txt
│   ├── objects/
│   │   ├── object1.txt
│   │   └── object2.txt
│   ├── background1.txt
│   └── background2.txt
│
└── config/                     # Contains all the configuration files
    ├── game.json
    ├── index.json
    ├── rooms/
    │   ├── room1.json
    │   └── room2.json
    ├── items/
    │   ├── item1.json
    │   └── item2.json
    └── notes/
        ├── note1.json
        └── note2.json
```

Please note that this is just an example and you can organize your game files in any way you like. Just make sure configuration files are in the `config` directory and assets are in the `assets` directory.

However, it is recommended to keep a consistent structure to make it easier to navigate and maintain your game.

## game.json

The `game.json` file is the main configuration file for the game. It contains general information about the game such as the title, description, author, and other settings.

Here is an example of a `game.json` file:

```json
{
  "author": [
    {
      "name": "<AUTHOR_NAME>",
      "email": "<EMAIL>",
      "website": "<URL>"
    }, ...
  ],

  "title": "<GAME_TITLE>",
  "description": "<GAME_DESCRIPTION>",
  "version": "1.0",
  "tags": ["adventure", "puzzle", "ascii"],
  
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
