const {app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut, screen} = require("electron");
const path = require("path");
const robot = require("robotjs");

var tray, isQuiting;
app.on("before-quit", function () {
  tray.destroy();
  isQuiting = true;
});
var dist = 40;
var max = 300;
var min = 2;
var amount = 1.4;
var scroll = 1;
var active = true;
var doTray = true;
// doTray = false;

function createWindow() {
  warmup();
  if (doTray) {
    tray = new Tray(path.join(__dirname, "icon-active.png"));

    labels = ["👍 Activate", "👎 Deativate"];
    template = [
      {
        label: labels[1], click: function () {
          toggleActive();
          template[0].label = template[0].label == labels[0] ? labels[1] : labels[0];
          tray.setContextMenu(Menu.buildFromTemplate(template));
        }
      },
      {
        label: "❌ Quit", click: function () {
          isQuiting = true;
          app.quit();
        }
      }
    ];
    tray.setContextMenu(Menu.buildFromTemplate(template));
    tray.setToolTip("Mousr");
  }

  if (doTray) {
    tray.on("click", toggleActive);
  }

  globalShortcut.register("F8", toggleActive);
  setShortcuts();
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
  globalShortcut.register("W", () => {
    if (active) {
      var mouse = robot.getMousePos();
      robot.moveMouse(
        mouse.x,
        mouse.y - dist,
      );
      console.log(`Moved UP ${dist} pixels`);
    }
  });
  globalShortcut.register("A", () => {
    if (active) {
      var mouse = robot.getMousePos();
      robot.moveMouse(
        mouse.x - dist,
        mouse.y,
      );
      console.log(`Moved LEFT ${dist} pixels`);
    }
  });
  globalShortcut.register("S", () => {
    if (active) {
      var mouse = robot.getMousePos();
      robot.moveMouse(
        mouse.x,
        mouse.y + dist,
      );
      console.log(`Moved DOWN ${dist} pixels`);
    }
  });
  globalShortcut.register("D", () => {
    if (active) {
      var mouse = robot.getMousePos();
      robot.moveMouse(
        mouse.x + dist,
        mouse.y,
      );
      console.log(`Moved RIGHT ${dist} pixels`);
    }
  });
  globalShortcut.register("E", () => {
    if (active) {
      dist *= amount;
      setDist();
      console.log(`Set distance to ${dist} pixels`);
    }
  });
  globalShortcut.register("Q", () => {
    if (active) {
      dist /= amount;
      setDist();
      console.log(`Set distance to ${dist} pixels`);
    }
  });
  globalShortcut.register("X", () => {
    if (active) {
      robot.mouseClick("left");
      console.log("LEFT Clicked");
    }
  });
  globalShortcut.register("C", () => {
    if (active) {
      robot.mouseClick("middle");
      console.log("MIDDLE Clicked");
    }
  });
  globalShortcut.register("V", () => {
    if (active) {
      robot.mouseClick("right");
      console.log("RIGHT Clicked");
    }
  });
  globalShortcut.register("R", () => {
    if (active) {
      console.warn("Scroll not implemented!")
    }
  });
  globalShortcut.register("F", () => {
    if (active) {
      console.warn("Scroll not implemented!")
    }
  });
  globalShortcut.register("T", () => {
    if (active) {
      test();
    }
  });
}

function removeShortcuts() {
  globalShortcut.unregister("W");
  globalShortcut.unregister("A");
  globalShortcut.unregister("S");
  globalShortcut.unregister("D");
  globalShortcut.unregister("E");
  globalShortcut.unregister("Q");
  globalShortcut.unregister("X");
  globalShortcut.unregister("C");
  globalShortcut.unregister("V");
  globalShortcut.unregister("R");
  globalShortcut.unregister("F");
  globalShortcut.unregister("T");
}

function warmup() {
  /* Remove this? */
  var mouse = robot.getMousePos();
}
async function test() {
  console.log("Testing!");
  var mouse = robot.getMousePos();
  amount = 20;
  time = 0.03;
  mouse.y += amount * 1.5;
  mouse.x += amount * 0.5;
  robot.moveMouse(
    mouse.x + amount * 0.5,
    mouse.y - amount * 1.5,
  );
  await sleep(time);
  robot.moveMouse(
    mouse.x + amount * 1.5,
    mouse.y - amount * 0.5,
  );
  await sleep(time);
  robot.moveMouse(
    mouse.x + amount * 1.5,
    mouse.y + amount * 0.5,
  );
  await sleep(time);
  robot.moveMouse(
    mouse.x + amount * 0.5,
    mouse.y + amount * 1.5,
  );
  await sleep(time);
  robot.moveMouse(
    mouse.x - amount * 0.5,
    mouse.y + amount * 1.5,
  );
  await sleep(time);
  robot.moveMouse(
    mouse.x - amount * 1.5,
    mouse.y + amount * 0.5,
  );
  await sleep(time);
  robot.moveMouse(
    mouse.x - amount * 1.5,
    mouse.y - amount * 0.5,
  );
  await sleep(time);
  robot.moveMouse(
    mouse.x - amount * 0.5,
    mouse.y - amount * 1.5,
  );
}
function setDist() {
  dist = Math.round(Math.max(min, Math.min(max, dist)));
}
function toggleActive() {
  active = !active;
  if (active) {
    setShortcuts();
    tray.setImage(path.join(__dirname, "icon-active.png"));
    console.log("Activated");
  } else {
    removeShortcuts();
    tray.setImage(path.join(__dirname, "icon.png"));
    console.log("Dectivated");
  }
}

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time * 1000);
  });
}