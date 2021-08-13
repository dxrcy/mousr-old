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
  globalShortcut.register(shortcuts["click.left"], () => {
    if (active) {
      robot.mouseClick("left");
      console.log("LEFT Clicked");
    }
  });
  globalShortcut.register(shortcuts["click.middle"], () => {
    if (active) {
      robot.mouseClick("middle");
      console.log("MIDDLE Clicked");
    }
  });
  globalShortcut.register(shortcuts["click.right"], () => {
    if (active) {
      robot.mouseClick("right");
      console.log("RIGHT Clicked");
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
      robot.scrollMouse(true, speed * settings["speed.scroll"]);
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
      robot.scrollMouse(true, - speed * settings["speed.scroll"]);
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
  globalShortcut.unregister(shortcuts["move.up"]);
  globalShortcut.unregister(shortcuts["move.left"]);
  globalShortcut.unregister(shortcuts["move.down"]);
  globalShortcut.unregister(shortcuts["move.right"]);
  globalShortcut.unregister(shortcuts["click.left"]);
  globalShortcut.unregister(shortcuts["click.middle"]);
  globalShortcut.unregister(shortcuts["click.right"]);
  globalShortcut.unregister(shortcuts["speed.decrease"]);
  globalShortcut.unregister(shortcuts["speed.increase"]);
  globalShortcut.unregister(shortcuts["scroll.up"]);
  globalShortcut.unregister(shortcuts["scroll.left"]);
  globalShortcut.unregister(shortcuts["scroll.down"]);
  globalShortcut.unregister(shortcuts["scroll.right"]);
  globalShortcut.unregister(shortcuts["test"]);
}

async function test() {
  console.log("Testing!");
  mouse = robot.getMousePos();
  size = settings["test.size"];
  amount = settings["test.amount"];
  time = settings["test.time"] / 10 / amount;
  for (i = 0; i < amount; i++) {
    robot.moveMouse(
      mouse.x - Math.sin((i / amount) * Math.PI * 2) * size,
      mouse.y - Math.cos((i / amount) * Math.PI * 2) * size + size,
    );
    await sleep(time);
  }
  robot.moveMouse(
    mouse.x,
    mouse.y,
  );
}
function setSpeed() {
  speed = Math.round(Math.max(settings["speed.min"], Math.min(settings["speed.max"], speed)));
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
    tray.setImage(path.join(__dirname, "image/icon.png"));
    template[0].label = labels[0];
    console.log("Dectivated");
  }
  tray.setContextMenu(Menu.buildFromTemplate(template));
}

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time * 1000);
  });
}