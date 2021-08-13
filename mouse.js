const robot = require("robotjs");

(async () => {
  switch (process.argv[2]) {
    case "move": {
      var mouse = robot.getMousePos();
      robot.moveMouse(
        mouse.x + parseFloat(process.argv[3]),
        mouse.y + parseFloat(process.argv[4]),
      );
      console.log(200);
    }; break;
    case "click": {
      robot.mouseClick(process.argv[3]);
    }; break;
    case "warmup": {
      var mouse = robot.getMousePos();
      console.log(200);
    }; break;
    case "get": {
      var mouse = robot.getMousePos();
      console.log(mouse);
    }; break;
    case "test": {
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
      console.log(200);
    }; break;
    case "scroll": {
      
    }; break;
    default: {
      throw `Unknown Argument '${process.argv[2]}'`;
    }
  }
})();

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time * 1000);
  });
}