# Mousr

Move mouse cursor with keyboard

Issues, Bugs and Missing Features are very likely to occur, so please submit them [HERE](https://github.com/darccyy/mousr/issues/new/choose)

Pronounced `/ˈmaʊsɜ˞̆ɹ̩/`

> Powered by [RobotJS](https://github.com/octalmage/robotjs/)

# How to use

## Installation

1. Download the [latest release](https://github.com/darccyy/mousr/releases/tag/v1.2.3)

- - Or: Download [previous versions](https://github.com/darccyy/mousr/releases)

2. Run the executable file
3. Press 'More info' and then 'Run anyway'
4. Wait for it to install

- It should open automatically
- To open anytime, just search 'Mousr' in search bar, or click shortcut icon

## Controls

- Use `F5` to test if program is working (Cursor should spin in circle)
- Use `IJKL` to move cursor (Up, Left, Down, Right)
- - Hold `Shift` while using these keys to go slower (Relative to set speed)
- Use `U`, `8`, and `O` to Left, Middle, and Right click respectively
- - Press `Shift` while using these keys to hold button instead of clicking. Press again with `Shift` to unclick
- Use `LeftArrow` (⇦) and `RightArrow` (⇨) to change cursor movement and scroll speed
- Use `Delete` to reset speed
- - Use `Shift+Delete` to toggle smooth mouse movement
- Use `WASD` to scroll (Up, Left, Down, Right)
- Use `Alt + Insert` to activate / deactivate (You should see icon change in the taskbar tray)
- - Use `Shift + Alt + Insert` terminate and close program (Only when activated)

# To Do

- [ ] Fix icon for low resolution

<details>
<summary>
Fixed
</summary>

- [x] Add Shift + WASD for easy slow mouse movements
- [x] Prevent multiple instances
- [x] Add Ctrl + Alt + Insert to terminate program
- [x] Stop test mode being ran multiple times
- [x] Press V for resetting speed
- [x] Added smooth move toggle
- [x] Change scroll keys (TFGH), Move Test key (PrintScreen)
- [x] Toggleable mouse
- [x] Scroll
- [x] Change keybinds
- [x] Add Shortcuts JSON file
- [x] Change tray menu dynamically when activated state updates

</details>

# Problems

- Cannot click button 4 and 5 with RobotJS

# Contributing

```bash
# Copy Repository
git clone https://github.com/darccyy/mousr.git

# Install Dependecies
npm install

# Test using Electron
electron .

# You may need to run:
npm run rebuild
# After installing RobotJS
```

### Created by [darcy](https://github.com/darccyy)

<img src="image/icon-display.png" type="image/png">
