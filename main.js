const {app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut, screen} = require("electron");
const fs = require("fs");
const path = require("path");
const robot = require("robotjs");

var tray, isQuiting;
app.on("before-quit", function () {
  tray.destroy();
  isQuiting = true;
});
var settings = JSON.parse(fs.readFileSync(path.join(__dirname, "settings.json")));
var shortcuts = JSON.parse(fs.readFileSync(path.join(__dirname, "shortcuts.json")));
var speed = settings["speed.default"];
var active = settings.startActive;
var mouseDown = {};
var testRunning = false;
var doTray = true;
// doTray = false;

labels = ["👍 Activate", "👎 Deativate"];
template = [
  {
    label: active ? labels[1] : labels[0], click: function () {
      toggleActive();
    }
  },
  {
    label: "❌ Quit", click: function () {
      isQuiting = true;
      app.quit();
    }
  }
];

function createWindow() {
  if (doTray) {
    tray = new Tray(path.join(__dirname, active ? "image/icon-active.png" : "image/icon.png"));
    tray.setContextMenu(Menu.buildFromTemplate(template));
    tray.setToolTip("Mousr");
  }

  if (doTray) {
    tray.on("click", toggleActive);
  }

  globalShortcut.register(shortcuts["activate"], toggleActive);
  setShortcuts();

  console.log("Mousr Started");
}

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function setShortcuts() {
  globalShortcut.register(shortcuts["terminate"], () => {
    if (active) {
      app.quit();
    }
  });
  globalShortcut.register(shortcuts["move.up"], () => {
    if (active) {
      var mouse = robot.getMousePos();
      robot["moveMouse" + (settings.smoothMove ? "Smooth" : "")](
        mouse.x,
        mouse.y - speed,
      );
      console.log(`Moved UP ${speed} pixels`);
    }
  });
  globalShortcut.register(shortcuts["move.left"], () => {
    if (active) {
      var mouse = robot.getMousePos();
      robot["moveMouse" + (settings.smoothMove ? "Smooth" : "")](
        mouse.x - speed,
        mouse.y,
      );
      console.log(`Moved LEFT ${speed} pixels`);
    }
  });
  globalShortcut.register(shortcuts["move.down"], () => {
    if (active) {
      var mouse = robot.getMousePos();
      robot["moveMouse" + (settings.smoothMove ? "Smooth" : "")](
        mouse.x,
        mouse.y + speed,
      );
      console.log(`Moved DOWN ${speed} pixels`);
    }
  });
  globalShortcut.register(shortcuts["move.right"], () => {
    if (active) {
      var mouse = robot.getMousePos();
      robot["moveMouse" + (settings.smoothMove ? "Smooth" : "")](
        mouse.x + speed,
        mouse.y,
      );
      console.log(`Moved RIGHT ${speed} pixels`);
    }
  });
  globalShortcut.register(shortcuts["speed.increase"], () => {
    if (active) {
      speed *= settings["speed.change"];
      setSpeed();
      console.log(`Set speed to ${speed} pixels`);
    }
  });
  globalShortcut.register(shortcuts["speed.decrease"], () => {
    if (active) {
      speed /= settings["speed.change"];
      setSpeed();
      console.log(`Set speed to ${speed} pixels`);
    }
  });
  globalShortcut.register(shortcuts["speed.reset"], () => {
    if (active) {
      resetSpeed();
    }
  });
  globalShortcut.register(shortcuts["speed.smooth"], () => {
    if (active) {
      toggleSmooth();
    }
  });
  globalShortcut.register(shortcuts["click.left"], () => {
    if (active) {
      robot.mouseToggle("up", "left");
      mouseDown.left = false;
      robot.mouseClick("left");
      console.log("LEFT Clicked");
    }
  });
  globalShortcut.register(shortcuts["toggle.left"], () => {
    if (active) {
      if (mouseDown.left) {
        robot.mouseToggle("up", "left");
        mouseDown.left = false;
        console.log("LEFT Up");
      } else {
        robot.mouseToggle("down", "left");
        mouseDown.left = true;
        console.log("LEFT Down");
      }
    }
  });
  globalShortcut.register(shortcuts["click.middle"], () => {
    if (active) {
      robot.mouseToggle("up", "middle");
      mouseDown.middle = false;
      robot.mouseClick("middle");
      console.log("MIDDLE Clicked");
    }
  });
  globalShortcut.register(shortcuts["toggle.middle"], () => {
    if (active) {
      if (mouseDown.middle) {
        robot.mouseToggle("up", "middle");
        mouseDown.middle = false;
        console.log("MIDDLE Up");
      } else {
        robot.mouseToggle("down", "middle");
        mouseDown.middle = true;
        console.log("MIDDLE Down");
      }
    }
  });
  globalShortcut.register(shortcuts["click.right"], () => {
    if (active) {
      robot.mouseToggle("up", "right");
      mouseDown.right = false;
      robot.mouseClick("right");
      console.log("RIGHT Clicked");
    }
  });
  globalShortcut.register(shortcuts["toggle.right"], () => {
    if (active) {
      if (mouseDown.right) {
        robot.mouseToggle("up", "right");
        mouseDown.right = false;
        console.log("RIGHT Up");
      } else {
        robot.mouseToggle("down", "right");
        mouseDown.right = true;
        console.log("RIGHT Down");
      }
    }
  });
  globalShortcut.register(shortcuts["scroll.up"], () => {
    if (active) {
      robot.scrollMouse(0, speed * settings["speed.scroll"]);
      console.log(`Scrolled UP ${speed * settings["speed.scroll"]}`);
    }
  });
  globalShortcut.register(shortcuts["scroll.left"], () => {
    if (active) {
      robot.scrollMouse(speed * settings["speed.scroll"], 0);
      console.log(`Scrolled LEFT ${speed * settings["speed.scroll"]}`);
    }
  });
  globalShortcut.register(shortcuts["scroll.down"], () => {
    if (active) {
      robot.scrollMouse(0, - speed * settings["speed.scroll"]);
      console.log(`Scrolled DOWN ${speed * settings["speed.scroll"]}`);
    }
  });
  globalShortcut.register(shortcuts["scroll.right"], () => {
    if (active) {
      robot.scrollMouse(- speed * settings["speed.scroll"], 0);
      console.log(`Scrolled RIGHT ${speed * settings["speed.scroll"]}`);
    }
  });
  globalShortcut.register(shortcuts["test"], () => {
    if (active) {
      test();
    }
  });
}

function removeShortcuts() {
  globalShortcut.unregister(shortcuts["terminate"]);
  globalShortcut.unregister(shortcuts["move.up"]);
  globalShortcut.unregister(shortcuts["move.left"]);
  globalShortcut.unregister(shortcuts["move.down"]);
  globalShortcut.unregister(shortcuts["move.right"]);
  globalShortcut.unregister(shortcuts["click.left"]);
  globalShortcut.unregister(shortcuts["toggle.left"]);
  globalShortcut.unregister(shortcuts["click.middle"]);
  globalShortcut.unregister(shortcuts["toggle.middle"]);
  globalShortcut.unregister(shortcuts["click.right"]);
  globalShortcut.unregister(shortcuts["toggle.right"]);
  globalShortcut.unregister(shortcuts["speed.decrease"]);
  globalShortcut.unregister(shortcuts["speed.increase"]);
  globalShortcut.unregister(shortcuts["speed.reset"]);
  globalShortcut.unregister(shortcuts["speed.smooth"]);
  globalShortcut.unregister(shortcuts["scroll.up"]);
  globalShortcut.unregister(shortcuts["scroll.left"]);
  globalShortcut.unregister(shortcuts["scroll.down"]);
  globalShortcut.unregister(shortcuts["scroll.right"]);
  globalShortcut.unregister(shortcuts["test"]);
}

async function test() {
  if (!testRunning) {
    console.log("Testing!");
    testRunning = true;
    mouse = robot.getMousePos();
    size = settings["test.size"];
    amount = settings["test.amount"];
    time = settings["test.time"] / 10 / amount;
    for (i = 0; i < amount; i++) {
      if (!active) {
        return;
      }
      robot.moveMouse(
        mouse.x - Math.sin((i / amount) * Math.PI * 2) * size,
        mouse.y - Math.cos((i / amount) * Math.PI * 2) * size + size,
      );
      await sleep(time);
    }
    if (!active) {
      return;
    }
    robot.moveMouse(
      mouse.x,
      mouse.y,
    );
    testRunning = false;
  }
}
function setSpeed() {
  speed = Math.round(Math.max(settings["speed.min"], Math.min(settings["speed.max"], speed)));
}
function resetSpeed() {
  speed = settings["speed.default"];
  console.log("Speed RESET");
}
function toggleActive() {
  active = !active;
  if (active) {
    setShortcuts();
    tray.setImage(path.join(__dirname, "image/icon-active.png"));
    template[0].label = labels[1];
    console.log("Activated");
  } else {
    removeShortcuts();
    testRunning = false;
    if (mouseDown.left) {
      robot.mouseToggle("up", "left");
    }
    if (mouseDown.middle) {
      robot.mouseToggle("up", "middle");
    }
    if (mouseDown.right) {
      robot.mouseToggle("up", "right");
    }
    tray.setImage(path.join(__dirname, "image/icon.png"));
    template[0].label = labels[0];
    console.log("Dectivated");
  }
  tray.setContextMenu(Menu.buildFromTemplate(template));
}
function toggleSmooth() {
  settings.smoothMove = !settings.smoothMove;
  console.log("Smooth is set to " + (settings.smoothMove ? "TRUE" : "FALSE"));
}

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time * 1000);
  });
}