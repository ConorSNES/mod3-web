# Mod3 Solitaire, on web

|![game screen, not started](./_screenshots/game1.png)|![game screen, game in progress](./_screenshots/game2.png)|![in-progress game in dark mode](./_screenshots/game3.png)|
|---|---|---|

Basic Solitaire engine with [Mod3 ruleset](https://docs.kde.org/stable_kf6/en/kpat/kpat/rules-specific.html#mod3), implemented in .

Made as [the best solitaire (kpat) containing Mod3](https://apps.kde.org/en-gb/kpat/) doesn't have easily accessible builds for all platforms and systems. Web solves this problem (badly)!

Touch input support is only partial. Releasing touches do not trigger correctly, and is a known bug with the implementation.

## Codebase licence

All source code is [apache-2.0](./LICENCE.txt) ([web copy](https://www.apache.org/licenses/LICENSE-2.0)).

Graphical elements (for files within [`/src/lib/assets`](./src/lib/assets/)) are [cc-by-4.0](./src//lib/assets/LICENCE.txt) ([web copy](https://creativecommons.org/licenses/by/4.0/)).