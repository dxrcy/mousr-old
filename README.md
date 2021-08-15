# Mousr

`/ˈmaʊsɜ˞̆ɹ̩/`

Move mouse cursor with keyboard

Powered by [RobotJS](https://github.com/octalmage/robotjs/)

Issues, Bugs and Missing Features are very likely to occur, so please submit them [HERE](https://github.com/darccyy/mousr/issues/new/choose)

# How to use

- Download and Run latest release from [HERE](https://github.com/darccyy/mousr/releases/tag/v1.1.0)
- Use `PrintScreen` to test if program is working (Cursor should spin in circle) but DO NOT HOLD IT DOWN! Unless you want lag and cringe :)
- Use `WASD` to move cursor (Up, Left, Down, Right)
- Use `Q`, `E`, and `Z` to Left, Middle, and Right click respectively
- Use `Shift + Q`, `Shift + E`, and `Shift + Z` to hold button Left, Middle, and Right click respectively. Press again to unclick
- Use `X` and `C` to change cursor movement and scroll speed
- Use `V` to reset speed
- Use `Shift+V` to toggle smooth mouse movement
- Use `TFGH` to scroll (Up, Left, Down, Right)
- Use `Alt + Insert` to activate / deactivate (You should see icon change in the taskbar tray)

# To Do

- [ ] Fix icon for low resolution
- [ ] Prevent multiple instances

<details>
<summary>
Fixed
</summary>

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
