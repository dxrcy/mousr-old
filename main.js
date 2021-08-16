/* Dependencies */
const {app, Tray, Menu, globalShortcut} = require("electron");
const fs = require("fs");
const robot = require("robotjs");

/* Global Variables */
var tray;
var mouseDown = {};
var testRunning = false;
var settings = JSON.parse(fs.readFileSync(__dirname + "/settings.json"));
var shortcuts = JSON.parse(fs.readFileSync(__dirname + "/shortcuts.json"));
var moveSpeed = settings["speed.default"];
var active = settings.startActive;

/* Tray Menu Template */
labels = ["👍 Activate", "👎 Deativate"];
template = [
  {
    label: labels[active ? 1 : 0],
    click: toggleActive,
  },
  {
    label: "❌ Quit",
    click: quit,
  }
];

/* Create Tray Icon */
function createTray() {
  tray = new Tray(__dirname + (active ? "/image/icon-active.png" : "/image/icon.png"));
  tray.setContextMenu(Menu.buildFromTemplate(template));
  tray.setToolTip("Mousr");
  tray.on("click", toggleActive);

  globalShortcut.register(shortcuts["activate"], toggleActive);
  setShortcuts();

  console.log("Mousr Started");
}

/* Stop Multiple Instances */
if (!app.requestSingleInstanceLock()) {
  console.log("Instance already open, Terminating self...\n");
  process.exit();
}

/* App Events */
app.whenReady().then(createTray);
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createTray();
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    quit();
  }
});
app.on("before-quit", function () {
  tray.destroy();
});

/* Create Shortcuts */
var groups = {
  move: ["up", "down", "left", "right", "slow.up", "slow.down", "slow.left", "slow.right"],
  click: ["left", "middle", "right", "toggle.left", "toggle.middle", "toggle.right"],
  scroll: ["up", "down", "left", "right"],
  speed: ["increase", "decrease", "reset", "smooth"],
};
function setShortcuts() {
  globalShortcut.register(shortcuts["terminate"], quit);
  globalShortcut.register(shortcuts["test"], actions.test);

  for (i in groups) {
    for (j in groups[i]) {
      globalShortcut.register(shortcuts[i + "." + groups[i][j]], actions[i][groups[i][j]]);
    }
  }
}

/* Remove Shortcuts */
function removeShortcuts() {
  for (i in shortcuts) {
    if (i !== "activate") {
      globalShortcut.unregister(shortcuts[i]);
    }
  }
}

/* Toggle Active State */
function toggleActive() {
  active = !active;
  if (active) {
    setShortcuts();
    tray.setImage(__dirname + "/image/icon-active.png");
    template[0].label = labels[1];
    console.log("Activated");
  } else {
    removeShortcuts();
    testRunning = false;
    if (mouseDown.left) {robot.mouseToggle("up", "left")}
    if (mouseDown.middle) {robot.mouseToggle("up", "middle")}
    if (mouseDown.right) {robot.mouseToggle("up", "right")}
    tray.setImage(__dirname + "/image/icon.png");
    template[0].label = labels[0];
    console.log("Dectivated");
  }
  tray.setContextMenu(Menu.buildFromTemplate(template));
}

/* Quit program safely */
function quit() {
  console.log("Quitting...");
  app.quit();
  process.exit(0);
}

/* Lots of Functions */
var actions = {
  /* Cursor Movement */
  move: {
    up: function () {
      if (active) {
        mouse = robot.getMousePos();
        robot["moveMouse" + (settings.smoothMove ? "Smooth" : "")](
          mouse.x,
          mouse.y - moveSpeed,
        );
        console.log(`Moved UP ${moveSpeed} px`);
      }
    },
    down: function () {
      if (active) {
        mouse = robot.getMousePos();
        robot["moveMouse" + (settings.smoothMove ? "Smooth" : "")](
          mouse.x,
          mouse.y + moveSpeed,
        );
        console.log(`Moved DOWN ${moveSpeed} px`);
      }
    },
    left: function () {
      if (active) {
        mouse = robot.getMousePos();
        robot["moveMouse" + (settings.smoothMove ? "Smooth" : "")](
          mouse.x - moveSpeed,
          mouse.y,
        );
        console.log(`Moved LEFT ${moveSpeed} px`);
      }
    },
    right: function () {
      if (active) {
        mouse = robot.getMousePos();
        robot["moveMouse" + (settings.smoothMove ? "Smooth" : "")](
          mouse.x + moveSpeed,
          mouse.y,
        );
        console.log(`Moved RIGHT ${moveSpeed} px`);
      }
    },
    "slow.up": function () {
      if (active) {
        mouse = robot.getMousePos();
        speed = Math.max(1, moveSpeed * settings["speed.slow"]);
        robot["moveMouse" + (settings.smoothMove ? "Smooth" : "")](
          mouse.x,
          mouse.y - speed,
        );
        console.log(`Moved UP slowly ${speed} px`);
      }
    },
    "slow.down": function () {
      if (active) {
        mouse = robot.getMousePos();
        speed = Math.max(1, moveSpeed * settings["speed.slow"]);
        robot["moveMouse" + (settings.smoothMove ? "Smooth" : "")](
          mouse.x,
          mouse.y + speed,
        );
        console.log(`Moved DOWN slowly ${speed} px`);
      }
    },
    "slow.left": function () {
      if (active) {
        mouse = robot.getMousePos();
        speed = Math.max(1, moveSpeed * settings["speed.slow"]);
        robot["moveMouse" + (settings.smoothMove ? "Smooth" : "")](
          mouse.x - speed,
          mouse.y,
        );
        console.log(`Moved LEFT slowly ${speed} px`);
      }
    },
    "slow.right": function () {
      if (active) {
        mouse = robot.getMousePos();
        speed = Math.max(1, moveSpeed * settings["speed.slow"]);
        robot["moveMouse" + (settings.smoothMove ? "Smooth" : "")](
          mouse.x + speed,
          mouse.y,
        );
        console.log(`Moved RIGHT slowly ${speed} px`);
      }
    },
  },

  /* Mouse Clicks */
  click: {
    left: function () {
      if (active) {
        if (mouseDown.left) {
          robot.mouseToggle("up", "left");
        }
        mouseDown.left = false;
        robot.mouseClick("left");
        console.log("LEFT Clicked");
      }
    },
    middle: function () {
      if (active) {
        if (mouseDown.middle) {
          robot.mouseToggle("up", "middle");
        }
        mouseDown.middle = false;
        robot.mouseClick("middle");
        console.log("MIDDLE Clicked");
      }
    },
    right: function () {
      if (active) {
        if (mouseDown.right) {
          robot.mouseToggle("up", "right");
        }
        mouseDown.right = false;
        robot.mouseClick("right");
        console.log("RIGHT Clicked");
      }
    },
    "toggle.left": function () {
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
    },
    "toggle.middle": function () {
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
    },
    "toggle.right": function () {
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
    },
  },

  /* Mouse Scrolls */
  scroll: {
    up: function () {
      if (active) {
        robot.scrollMouse(0, moveSpeed * settings["speed.scroll"]);
        console.log(`Scrolled UP ${moveSpeed * settings["speed.scroll"]}`);
      }
    },
    down: function () {
      if (active) {
        robot.scrollMouse(0, - moveSpeed * settings["speed.scroll"]);
        console.log(`Scrolled DOWN ${moveSpeed * settings["speed.scroll"]}`);
      }
    },
    left: function () {
      if (active) {
        robot.scrollMouse(moveSpeed * settings["speed.scroll"], 0);
        console.log(`Scrolled LEFT ${moveSpeed * settings["speed.scroll"]}`);
      }
    },
    right: function () {
      if (active) {
        robot.scrollMouse(- moveSpeed * settings["speed.scroll"], 0);
        console.log(`Scrolled RIGHT ${moveSpeed * settings["speed.scroll"]}`);
      }
    },
  },

  /* Speed Change */
  speed: {
    increase: function () {
      if (active) {
        moveSpeed *= settings["speed.change"];
        actions.speed.check();
        console.log(`Set speed to ${moveSpeed} px/c`);
      }
    },
    decrease: function () {
      if (active) {
        moveSpeed /= settings["speed.change"];
        actions.speed.check();
        console.log(`Set speed to ${moveSpeed} px/c`);
      }
    },
    reset: function () {
      if (active) {
        moveSpeed = settings["speed.default"];
        console.log(`Speed RESET to ${moveSpeed} px/c`);
      }
    },
    smooth: function () {
      if (active) {
        settings.smoothMove = !settings.smoothMove;
        console.log("Smooth is set to " + (settings.smoothMove ? "TRUE" : "FALSE"));
      }
    },
    check: function () {
      moveSpeed = Math.round(Math.max(settings["speed.min"], Math.min(settings["speed.max"], moveSpeed)));
    }
  },

  /* Spin Cursor in Circle */
  test: async function () {
    if (active && !testRunning) {
      testRunning = true;
      console.log("Testing!");
      mouse = robot.getMousePos();
      size = settings["test.size"];
      amount = settings["test.amount"];
      time = settings["test.time"] / 10 / amount;
      for (i = 0; i < amount; i++) {
        robot.moveMouse(
          mouse.x + Math.sin((i / amount) * Math.PI * 2) * size,
          mouse.y - Math.cos((i / amount) * Math.PI * 2) * size + size,
        );
        await new Promise(resolve => {
          setTimeout(resolve, time * 1000);
        });
        if (!active) {
          return;
        }
      }
      robot.moveMouse(
        mouse.x,
        mouse.y,
      );
      testRunning = false;
    }
  },
}