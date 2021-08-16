# Mousr

Move mouse cursor with keyboard

Issues, Bugs and Missing Features are very likely to occur, so please submit them [HERE](https://github.com/darccyy/mousr/issues/new/choose)

Pronounced `/ˈmaʊsɜ˞̆ɹ̩/`

> Powered by [RobotJS](https://github.com/octalmage/robotjs/)

# How to use

## Installation

1. Download the [latest release](https://github.com/darccyy/mousr/releases/tag/v1.2.2)

- - Or: Download [previous versions](https://github.com/darccyy/mousr/releases)

2. Run the executable file
3. Press 'More info' and then 'Run anyway'
4. Wait for it to install

- It should open automatically
- To open anytime, just search 'Mousr' in search bar, or click shortcut icon

## Controls

- Use `PrintScreen` to test if program is working (Cursor should spin in circle) but DO NOT HOLD IT DOWN! Unless you want lag and cringe :)
- Use `WASD` to move cursor (Up, Left, Down, Right)
- - Hold `Shift` while using these to go slower (Relative to set speed)
- Use `Q`, `E`, and `Z` to Left, Middle, and Right click respectively
- - Press `Shift` while using these to hold button instead of clicking. Press again (with `Shift`) to unclick
- Use `X` and `C` to change cursor movement and scroll speed
- Use `V` to reset speed
- - Use `Shift+V` to toggle smooth mouse movement
- Use `TFGH` to scroll (Up, Left, Down, Right)
- Use `Alt + Insert` to activate / deactivate (You should see icon change in the taskbar tray)
- - Use `Ctrl + Alt + Insert` terminate and close program (Only when activated)

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
