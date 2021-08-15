# Mousr

Move mouse cursor with keyboard

# How to use

- Download and Run latest release from [HERE](https://github.com/darccyy/mousr/releases/tag/v1.0.0)
- Use `T` to test if program is working (Cursor should spin in circle) but DO NOT HOLD IT DOWN! Unless you want lag :)
- Use `WASD` to move cursor
- Use `Q`, `E`, and `Z` to Left, Middle, and Right click respectively
- Use `X` and `C` to change cursor movement speed
- Use `R` and `F` to scroll Up and Down
- Use `Shift + R` and `Shift + F` to scroll Left and Right
- Use `Alt + Insert` to activate / deactivate (You should see icon in the tray in the taskbar)

# To Do

- [ ] Toggleable mouse
- [ ] Fix icon for low resolution
- [ ] Prevent multiple instances
- [ ] Switch from Electron Shortcuts to ioHook? 
<details>
<summary>
Fixed
</summary>

- [x] Scroll
- [x] Change keybinds
- [x] Add Shortcuts JSON file
- [x] Change tray menu dynamically when activated state updates

</details>

# Problems

- Add Shift+Q for toggle LeftClick

- Cannot install ioHook
- - Install Visual Studio C++
- - Downgrade Electron

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
