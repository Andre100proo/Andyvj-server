# Arras.io Private Server Template Andre Andre

## Gamemode Code

You can add a gamemode code in the link to specify its gamemode, such as <https://arras.io/#host=andre-server-pro.glitch.me&mode=p> where `p` is the gamemode code.

Parts of the gamemode code must appear in the order below, all of which are optional:

- `p` for Private
- `e` for customized event names, which is followed by the length of the event name and then the event name itself, such as `e5space`
- `d` for customized event names with dashes, which is followed by the number of words and the length of each word and the word itself, such as `d21d3day`
- `o` for Open
- `m` for Maze
- `f` for FFA, `2` for 2 Teams, `3` for 3 Teams, or `4` for 4 Teams
- `d` for Domination, `m` for Mothership, or `a` for Assault
- `s` for Sandbox

Note:

- Maze FFA, 2 Teams Mothership, and 2 Teams Assault are replaced with just Maze, Mothership, and Assault
- Team modes without domination or mothership are changed to TDM instead of Teams
- Although Maze is before the team number in the gamemode code, they are moved to be after it in the displayed name (`m2` to 2TDM Maze)

