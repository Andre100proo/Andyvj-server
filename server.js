{
  /*jslint node: true */
  /*jshint -W061 */
  /*global goog, Map, let */
  ("use strict");

  // General requires
  require("google-closure-library");
  goog.require("goog.structs.PriorityQueue"); 
  goog.require("goog.structs.QuadTree");

  // Import game settings.
  const c = require("./config.json");

  // Import utilities.
  const util = require("./lib/util");
  const ran = require("./lib/random");
  const hshg = require("./lib/hshg");

  // Let's get a cheaper array removal thing
  Array.prototype.remove = (index) => {
    if (index === this.length - 1) {
      return this.pop();
    } else {
      let r = this[index];
      this[index] = this.pop();
      return r;
    }
  };

  // Set up room.
  global.fps = "Unknown";
  var roomSpeed = c.gameSpeed;
  const room = {
    lastCycle: undefined,
    cycleSpeed: 1000 / roomSpeed / 30,
    width: c.WIDTH,
    height: c.HEIGHT,
    setup: c.ROOM_SETUP,
    xgrid: c.X_GRID,
    ygrid: c.Y_GRID,
    //xgridWidth: c.WIDTH / c.X_GRID.length,
    //xgridWidthDread: c.WIDTH / c.Y_GRID.length, // 3,
    //ygridHeight: c.HEIGHT / c.Y_GRID.length,
    gameMode: c.MODE,
    skillBoost: c.SKILL_BOOST,
    scale: {
      square: (c.WIDTH * c.HEIGHT) / 100000000,
      linear: Math.sqrt((c.WIDTH * c.HEIGHT) / 100000000),
    },
    maxFood: ((c.WIDTH * c.HEIGHT) / 2000000000000000000) * c.FOOD_AMOUNT,
    isInRoom: (location) => {
      return (
        location.x >= 0 &&
        location.x <= c.WIDTH &&
        location.y >= 0 &&
        location.y <= c.HEIGHT
      );
    },
    topPlayerID: -1,
  };
  room.findType = (type) => {
    let output = [];
    let j = 0;
    room.setup.forEach((row) => {
      let i = 0;
      row.forEach((cell) => {
        if (cell === type) {
          output.push({
            x: ((i + 0.5) * room.width) / room.xgrid,
            y: ((j + 0.5) * room.height) / room.ygrid,
          });
        }
        i++;
      });
      j++;
    });
    room[type] = output;
  };
  room.findType("nest");
  room.findType("norm");
  room.findType("bas1");
  room.findType("bas2");
  room.findType("bas3");
  room.findType("bas4");
  room.findType("bas0");
  room.findType("bas5");
  room.findType("roid");
  room.findType("rock");
  room.findType("boss");
  room.findType("maze");
  room.findType("cent");
  room.findType("wall");
  room.findType("wal1");
  room.findType("wal2");
  room.findType("wal3");
  room.findType("wal4");
  room.findType("wal5");
  room.findType("wal6");
  room.findType("wal7");
  room.findType("wald");
  room.findType("obsl");
  room.findType("bap1");
  room.findType("bap2");
  room.findType("bap3");
  room.findType("bap4");
  room.findType("cent");
  room.findType("edge");
  room.findType("port");
  room.nestFoodAmount =
    (100000000000000 * Math.sqrt(room.nest.length)) / room.xgrid / room.ygrid;
  room.random = () => {
    return {
      x: ran.irandom(room.width),
      y: ran.irandom(room.height),
    };
  };
  room.randomType = (type) => {
    let selection = room[type][ran.irandom(room[type].length - 1)];
    return {
      x:
        ran.irandom((0.5 * room.width) / room.xgrid) * ran.choose([-1, 1]) +
        selection.x,
      y:
        ran.irandom((0.5 * room.height) / room.ygrid) * ran.choose([-1, 1]) +
        selection.y,
    };
  };
  room.gauss = (clustering) => {
    let output;
    do {
      output = {
        x: ran.gauss(room.width / 2, room.height / clustering),
        y: ran.gauss(room.width / 2, room.height / clustering),
      };
    } while (!room.isInRoom(output));
  };
  room.gaussInverse = (clustering) => {
    let output;
    do {
      output = {
        x: ran.gaussInverse(0, room.width, clustering),
        y: ran.gaussInverse(0, room.height, clustering),
      };
    } while (!room.isInRoom(output));
    return output;
  };
  room.gaussRing = (radius, clustering) => {
    let output;
    do {
      output = ran.gaussRing(room.width * radius, clustering);
      output = {
        x: output.x + room.width / 2,
        y: output.y + room.height / 2,
      };
    } while (!room.isInRoom(output));
    return output;
  };
  room.isIn = (type, location) => {
    if (room.isInRoom(location)) {
      let a = Math.floor((location.y * room.ygrid) / room.height);
      let b = Math.floor((location.x * room.xgrid) / room.width);
      return type === room.setup[a][b];
    } else {
      return false;
    }
  };
  room.isInNorm = (location) => {
    if (room.isInRoom(location)) {
      let a = Math.floor((location.y * room.ygrid) / room.height);
      let b = Math.floor((location.x * room.xgrid) / room.width);
      let v = room.setup[a][b];
      return v !== "nest";
    } else {
      return false;
    }
  };
  room.gaussType = (type, clustering) => {
    let selection = room[type][ran.irandom(room[type].length - 1)];
    let location = {};
    do {
      location = {
        x: ran.gauss(selection.x, room.width / room.xgrid / clustering),
        y: ran.gauss(selection.y, room.height / room.ygrid / clustering),
      };
    } while (!room.isIn(type, location));
    return location;
  };
  util.log(
    room.width +
      " x " +
      room.height +
      " room initalized.  Max food: " +
      room.maxFood +
      ", max nest food: " +
      room.maxFood * room.nestFoodAmount +
      "."
  );

  // Define a vector
  class Vector {
    constructor(x, y) {
      //Vector constructor.
      this.x = x;
      this.y = y;
    }

    update() {
      this.len = this.length;
      this.dir = this.direction;
    }

    isShorterThan(d) {
      return this.x * this.x + this.y * this.y <= d * d;
    }

    get length() {
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    get direction() {
      return Math.atan2(this.y, this.x);
    }
  }
  function nullVector(v) {
    v.x = 0;
    v.y = 0; //this guy's useful
  }

  // Get class definitions and index them
  var Class = (() => {
    let def = require("./lib/definitions"),
      i = 0;
    for (let k in def) {
      if (!def.hasOwnProperty(k)) continue;
      def[k].index = i++;
    }
    return def;
  })();

  // Define IOs (AI)
  function nearest(
    array,
    location,
    test = () => {
      return true;
    }
  ) {
    let list = new goog.structs.PriorityQueue();
    let d;
    if (!array.length) {
      return undefined;
    }
    array.forEach(function (instance) {
      d =
        Math.pow(instance.x - location.x, 2) +
        Math.pow(instance.y - location.y, 2);
      if (test(instance, d)) {
        list.enqueue(d, instance);
      }
    });
    return list.dequeue();
  }
  function timeOfImpact(p, v, s) {
    // Requires relative position and velocity to aiming point
    let a = s * s - (v.x * v.x + v.y * v.y);
    let b = p.x * v.x + p.y * v.y;
    let c = p.x * p.x + p.y * p.y;

    let d = b * b + a * c;

    let t = 0;
    if (d >= 0) {
      t = Math.max(0, (b + Math.sqrt(d)) / a);
    }

    return t * 0.9;
  }
  class IO {
    constructor(body) {
      this.body = body;
      this.acceptsFromTop = true;
    }

    think() {
      return {
        target: null,
        goal: null,
        fire: null,
        main: null,
        alt: null,
        power: null,
      };
    }
  }
  class io_doNothing extends IO {
    constructor(body) {
      super(body);
      this.acceptsFromTop = false;
    }

    think() {
      return {
        goal: {
          x: this.body.x,
          y: this.body.y,
        },
        main: false,
        alt: false,
        fire: false,
      };
    }
  }
  class io_moveInCircles extends IO {
    constructor(body) {
      super(body);
      this.acceptsFromTop = false;
      this.timer = ran.irandom(10) + 3;
      this.goal = {
        x: this.body.x + 10 * Math.cos(-this.body.facing),
        y: this.body.y + 10 * Math.sin(-this.body.facing),
      };
    }

    think() {
      if (!this.timer--) {
        this.timer = 10;
        this.goal = {
          x: this.body.x + 10 * Math.cos(-this.body.facing),
          y: this.body.y + 10 * Math.sin(-this.body.facing),
        };
      }
      return { goal: this.goal };
    }
  }
  class io_listenToPlayer extends IO {
    constructor(b, p) {
      super(b);
      this.player = p;
      this.acceptsFromTop = false;
    }

    // THE PLAYER MUST HAVE A VALID COMMAND AND TARGET OBJECT

    think() {
      let targ = {
        x: this.player.target.x,
        y: this.player.target.y,
      };
      if (this.player.command.autospin) {
        let kk =
          Math.atan2(this.body.control.target.y, this.body.control.target.x) +
          0.02;
        targ = {
          x: 100 * Math.cos(kk),
          y: 100 * Math.sin(kk),
        };
      }
      if (this.body.invuln) {
        if (
          this.player.command.right ||
          this.player.command.left ||
          this.player.command.up ||
          this.player.command.down ||
          this.player.command.lmb
        ) {
          this.body.invuln = false;
        }
      }
      this.body.autoOverride = this.player.command.override;
      if (this.player.command.ReversedMouse) {
        return {
          alt: this.player.command.rmb,
          fire: this.player.command.lmb || this.player.command.autofire,
        };
      }
      return {
        target: targ,
        goal: {
          x: this.body.x + this.player.command.right - this.player.command.left,
          y: this.body.y + this.player.command.down - this.player.command.up,
        },
        fire: this.player.command.lmb || this.player.command.autofire,
        alt: this.player.command.rmb,
        main:
          this.player.command.lmb ||
          this.player.command.autospin ||
          this.player.command.autofire ||
          this.player.command.ReversedMouse,
      };
    }
  }
  class io_mapTargetToGoal extends IO {
    constructor(b) {
      super(b);
    }

    think(input) {
      if (input.main || input.alt) {
        return {
          goal: {
            x: input.target.x + this.body.x,
            y: input.target.y + this.body.y,
          },
          power: 1,
        };
      }
    }
  }
  class io_boomerang extends IO {
    constructor(b) {
      super(b);
      this.r = 0;
      this.b = b;
      this.m = b.master;
      this.turnover = false;
      let len = 10 * util.getDistance({ x: 0, y: 0 }, b.master.control.target);
      this.myGoal = {
        x: 3 * b.master.control.target.x + b.master.x,
        y: 3 * b.master.control.target.y + b.master.y,
      };
    }
    think(input) {
      if (this.b.range > this.r) this.r = this.b.range;
      let t = 1; //1 - Math.sin(2 * Math.PI * this.b.range / this.r) || 1;
      if (!this.turnover) {
        if (this.r && this.b.range < this.r * 0.5) {
          this.turnover = true;
        }
        return {
          goal: this.myGoal,
          power: t,
        };
      } else {
        return {
          goal: {
            x: this.m.x,
            y: this.m.y,
          },
          power: t,
        };
      }
    }
  }
  class io_goToMasterTarget extends IO {
    constructor(body) {
      super(body);
      this.myGoal = {
        x: body.master.control.target.x + body.master.x,
        y: body.master.control.target.y + body.master.y,
      };
      this.countdown = 5;
    }

    think() {
      if (this.countdown) {
        if (util.getDistance(this.body, this.myGoal) < 1) {
          this.countdown--;
        }
        return {
          goal: {
            x: this.myGoal.x,
            y: this.myGoal.y,
          },
        };
      }
    }
  }
  class io_canRepel extends IO {
    constructor(b) {
      super(b);
    }

    think(input) {
      if (input.alt && input.target) {
        return {
          target: {
            x: -input.target.x,
            y: -input.target.y,
          },
          main: true,
        };
      }
    }
  }
  class io_alwaysFire extends IO {
    constructor(body) {
      super(body);
    }

    think() {
      return {
        fire: true,
      };
    }
  }
  class io_targetSelf extends IO {
    constructor(body) {
      super(body);
    }

    think() {
      return {
        main: true,
        target: { x: 0, y: 0 },
      };
    }
  }
  class io_mapAltToFire extends IO {
    constructor(body) {
      super(body);
    }

    think(input) {
      if (input.alt) {
        return {
          fire: true,
        };
      }
    }
  }
  class io_onlyAcceptInArc extends IO {
    constructor(body) {
      super(body);
    }

    think(input) {
      if (input.target && this.body.firingArc != null) {
        if (
          Math.abs(
            util.angleDifference(
              Math.atan2(input.target.y, input.target.x),
              this.body.firingArc[0]
            )
          ) >= this.body.firingArc[1]
        ) {
          return {
            fire: false,
            alt: false,
            main: false,
          };
        }
      }
    }
  }
  class io_nearestDifferentMaster extends IO {
    constructor(body) {
      super(body);
      this.targetLock = undefined;
      this.tick = ran.irandom(30);
      this.lead = 0;
      this.validTargets = this.buildList(body.fov / 2);
      this.oldHealth = body.health.display();
    }

    buildList(range) {
      // Establish whom we judge in reference to
      let m = { x: this.body.x, y: this.body.y },
        mm = { x: this.body.master.master.x, y: this.body.master.master.y },
        mostDangerous = 0,
        sqrRange = range * range,
        keepTarget = false;
      // Filter through everybody...
      let out = entities
        .map((e) => {
          // Only look at those within our view, and our parent's view, not dead, not our kind, not a bullet/trap/block etc
          if (e.health.amount > 0) {
            if (!e.invuln) {
            //if (e.alpha) {
              if (e.master.master.team !== this.body.master.master.team) {
                if (e.master.master.team !== -101) {
                  if (
                    e.type === "tank" ||
                    e.type === "crasher" ||
                    e.type === "miniboss" ||
                    e.type === "Sanctuaries" ||
                    e.type === "dreadnought" ||
                    (!this.body.aiSettings.shapefriend && e.type === "food")
                  ) {
                    if (
                      Math.abs(e.x - m.x) < range &&
                      Math.abs(e.y - m.y) < range
                    ) {
                      if (
                        !this.body.aiSettings.blind ||
                        (Math.abs(e.x - mm.x) < range &&
                          Math.abs(e.y - mm.y) < range)
                      )
                        return e;
                    }
                  }
                }
              }
            //}
            }
          }
        })
        .filter((e) => {
          return e;
        });

      if (!out.length) return [];

      out = out
        .map((e) => {
          // Only look at those within range and arc (more expensive, so we only do it on the few)
          let yaboi = false;
          if (
            Math.pow(this.body.x - e.x, 2) + Math.pow(this.body.y - e.y, 2) <
            sqrRange
          ) {
            if (this.body.firingArc == null || this.body.aiSettings.view360) {
              yaboi = true;
            } else if (
              Math.abs(
                util.angleDifference(
                  util.getDirection(this.body, e),
                  this.body.firingArc[0]
                )
              ) < this.body.firingArc[1]
            )
              yaboi = true;
          }
          if (yaboi) {
            mostDangerous = Math.max(e.dangerValue, mostDangerous);
            return e;
          }
        })
        .filter((e) => {
          // Only return the highest tier of danger
          if (e != null) {
            if (this.body.aiSettings.farm || e.dangerValue === mostDangerous) {
              if (this.targetLock) {
                if (e.id === this.targetLock.id) keepTarget = true;
              }
              return e;
            }
          }
        });
      // Reset target if it's not in there
      if (!keepTarget) this.targetLock = undefined;
      return out;
    }

    think(input) {
      // Override target lock upon other commands
      if (input.main || input.alt || this.body.master.autoOverride) {
        this.targetLock = undefined;
        return {};
      }
      // Otherwise, consider how fast we can either move to ram it or shoot at a potiential target.
      let tracking = this.body.topSpeed,
        range = this.body.fov / 2;
      // Use whether we have functional guns to decide
      for (let i = 0; i < this.body.guns.length; i++) {
        if (this.body.guns[i].canShoot && !this.body.aiSettings.skynet) {
          let v = this.body.guns[i].getTracking();
          tracking = v.speed;
          range = Math.min(range, v.speed * v.range);
          break;
        }
      }
      // Check if my target's alive
      if (this.targetLock) {
        if (this.targetLock.health.amount <= 0) {
          this.targetLock = undefined;
          this.tick = 100;
        }
      }
      // Check additional conditions (invisible and speed)
      if (
        this.targetLock &&
        this.targetLock.invisible &&
        Array.isArray(this.targetLock.invisible) &&
        this.targetLock.invisible.length === 2 &&
        this.targetLock.invisible[0] === 1 &&
        this.targetLock.invisible[1] <= 0.01 &&
        this.targetLock.body &&
        this.targetLock.body.velocity &&
        this.targetLock.body.velocity.x <= 0.1 &&
        this.targetLock.body.velocity.y <= 0.1
      ) {
        // Do not attack the entity if it's invisible and has low speed
        this.targetLock = undefined;
      }
      // Think damn hard
      if (this.tick++ > 15 * roomSpeed) {
        this.tick = 0;
        this.validTargets = this.buildList(range);
        // Ditch our old target if it's invalid
        if (
          this.targetLock &&
          this.validTargets.indexOf(this.targetLock) === -1
        ) {
          this.targetLock = undefined;
        }
        // Lock new target if we still don't have one.
        if (this.targetLock == null && this.validTargets.length) {
          this.targetLock =
            this.validTargets.length === 1
              ? this.validTargets[0]
              : nearest(this.validTargets, { x: this.body.x, y: this.body.y });
          this.tick = -90;
        }
      }
      // Lock onto whoever's shooting me.
      // let damageRef = (this.body.bond == null) ? this.body : this.body.bond;
      // if (damageRef.collisionArray.length && damageRef.health.display() < this.oldHealth) {
      //     this.oldHealth = damageRef.health.display();
      //     if (this.validTargets.indexOf(damageRef.collisionArray[0]) === -1) {
      //         this.targetLock = (damageRef.collisionArray[0].master.id === -1) ? damageRef.collisionArray[0].source : damageRef.collisionArray[0].master;
      //     }
      // }
      // Consider how fast it's moving and shoot at it
      if (this.targetLock != null) {
        let radial = this.targetLock.velocity;
        let diff = {
          x: this.targetLock.x - this.body.x,
          y: this.targetLock.y - this.body.y,
        };
        /// Refresh lead time
        if (this.tick % 4 === 0) {
          this.lead = 0;
          // Find lead time (or don't)
          if (!this.body.aiSettings.chase) {
            let toi = timeOfImpact(diff, radial, tracking);
            this.lead = toi;
          }
        }
        // And return our aim
        return {
          target: {
            x: diff.x + this.lead * radial.x,
            y: diff.y + this.lead * radial.y,
          },
          fire: true,
          main: true,
        };
      }
      return {};
    }
  }
  class io_nearestSameMaster extends IO {
    constructor(body) {
      super(body);
      this.targetLock = undefined;
      this.tick = ran.irandom(30);
      this.lead = 0;
      this.validTargets = this.buildList(body.fov / 2);
      this.oldHealth = body.health.display();
    }
  
    buildList(range) {
      let m = { x: this.body.x, y: this.body.y },
          mm = { x: this.body.master.master.x, y: this.body.master.master.y },
          mostDangerous = 0,
          sqrRange = range * range,
          keepTarget = false;
  
      let out = entities
        .map((e) => {
          if (e.health.amount > 0 && !e.invuln) {
            if (e.master.master.team === this.body.master.master.team) { // Cambiado para atacar solo al mismo equipo
              if (e.master.master.team !== -101) {
                if (
                  e.type === "tank" ||
                  e.type === "crasher" ||
                  e.type === "miniboss" ||
                  e.type === "Sanctuaries" ||
                  e.type === "dreadnought" ||
                  (!this.body.aiSettings.shapefriend && e.type === "food")
                ) {
                  if (
                    Math.abs(e.x - m.x) < range &&
                    Math.abs(e.y - m.y) < range
                  ) {
                    if (
                      !this.body.aiSettings.blind ||
                      (Math.abs(e.x - mm.x) < range &&
                        Math.abs(e.y - mm.y) < range)
                    )
                      return e;
                  }
                }
              }
            }
          }
        })
        .filter((e) => e);
  
      if (!out.length) return [];
  
      out = out
        .map((e) => {
          let yaboi = false;
          if (
            Math.pow(this.body.x - e.x, 2) + Math.pow(this.body.y - e.y, 2) <
            sqrRange
          ) {
            if (this.body.firingArc == null || this.body.aiSettings.view360) {
              yaboi = true;
            } else if (
              Math.abs(
                util.angleDifference(
                  util.getDirection(this.body, e),
                  this.body.firingArc[0]
                )
              ) < this.body.firingArc[1]
            )
              yaboi = true;
          }
          if (yaboi) {
            mostDangerous = Math.max(e.dangerValue, mostDangerous);
            return e;
          }
        })
        .filter((e) => {
          if (e != null) {
            if (this.body.aiSettings.farm || e.dangerValue === mostDangerous) {
              if (this.targetLock) {
                if (e.id === this.targetLock.id) keepTarget = true;
              }
              return e;
            }
          }
        });
  
      if (!keepTarget) this.targetLock = undefined;
      return out;
    }
  
    think(input) {
      if (input.main || input.alt || this.body.master.autoOverride) {
        this.targetLock = undefined;
        return {};
      }
  
      let tracking = this.body.topSpeed,
          range = this.body.fov / 2;
  
      for (let i = 0; i < this.body.guns.length; i++) {
        if (this.body.guns[i].canShoot && !this.body.aiSettings.skynet) {
          let v = this.body.guns[i].getTracking();
          tracking = v.speed;
          range = Math.min(range, v.speed * v.range);
          break;
        }
      }
  
      if (this.targetLock) {
        if (this.targetLock.health.amount <= 0) {
          this.targetLock = undefined;
          this.tick = 100;
        }
      }
  
      if (this.tick++ > 15 * roomSpeed) {
        this.tick = 0;
        this.validTargets = this.buildList(range);
  
        if (
          this.targetLock &&
          this.validTargets.indexOf(this.targetLock) === -1
        ) {
          this.targetLock = undefined;
        }
  
        if (this.targetLock == null && this.validTargets.length) {
          this.targetLock =
            this.validTargets.length === 1
              ? this.validTargets[0]
              : nearest(this.validTargets, { x: this.body.x, y: this.body.y });
          this.tick = -90;
        }
      }
  
      if (this.targetLock != null) {
        let radial = this.targetLock.velocity;
        let diff = {
          x: this.targetLock.x - this.body.x,
          y: this.targetLock.y - this.body.y,
        };
  
        if (this.tick % 4 === 0) {
          this.lead = 0;
          if (!this.body.aiSettings.chase) {
            let toi = timeOfImpact(diff, radial, tracking);
            this.lead = toi;
          }
        }
  
        return {
          target: {
            x: diff.x + this.lead * radial.x,
            y: diff.y + this.lead * radial.y,
          },
          fire: true,
          main: true,
        };
      }
      return {};
    }
  }
  class io_CloserControl extends IO {
    constructor(body) {
      super(body);
      this.targetLock = undefined;
      this.tick = ran.irandom(30);
      this.lead = 0;
      this.validTargets = this.buildList(body.fov / 2);
      this.oldHealth = body.health.display();
    }

    buildList(range) {
      // Establish whom we judge in reference to
      let m = { x: this.body.x, y: this.body.y },
        mm = { x: this.body.master.master.x, y: this.body.master.master.y },
        mostDangerous = 0,
        sqrRange = range * range,
        keepTarget = false;
      // Filter through everybody...
      let out = entities
        .map((e) => {
          // Only look at those within our view, and our parent's view, not dead, not our kind, not a bullet/trap/block etc
          if (e.health.amount > 0) {
            if (!e.invuln) {
              if (e.master.master.team !== this.body.master.master.team) {
                if (e.master.master.team !== -101) {
                  if (
                    e.type === "developer" ||
                    e.type === "tank" ||
                    e.type === "crasher" ||
                    e.type === "miniboss" ||
                    e.type === "Sanctuaries" ||
                    e.type === "dreadnought" ||
                    e.type === "turrets" ||
                    e.type === "" ||
                    (!this.body.aiSettings.shapefriend && e.type === "food")
                  ) {
                    if (
                      Math.abs(e.x - m.x) < range &&
                      Math.abs(e.y - m.y) < range
                    ) {
                      if (
                        !this.body.aiSettings.blind ||
                        (Math.abs(e.x - mm.x) < range &&
                          Math.abs(e.y - mm.y) < range)
                      )
                        return e;
                    }
                  }
                }
              }
            }
          }
        })
        .filter((e) => {
          return e;
        });

      if (!out.length) return [];

      out = out
        .map((e) => {
          // Only look at those within range and arc (more expensive, so we only do it on the few)
          let yaboi = false;
          if (
            Math.pow(this.body.x - e.x, 2) + Math.pow(this.body.y - e.y, 2) <
            sqrRange
          ) {
            if (this.body.firingArc == null || this.body.aiSettings.view360) {
              yaboi = true;
            } else if (
              Math.abs(
                util.angleDifference(
                  util.getDirection(this.body, e),
                  this.body.firingArc[0]
                )
              ) < this.body.firingArc[1]
            )
              yaboi = true;
          }
          if (yaboi) {
            mostDangerous = Math.max(e.dangerValue, mostDangerous);
            return e;
          }
        })
        .filter((e) => {
          // Only return the highest tier of danger
          if (e != null) {
            if (this.body.aiSettings.farm || e.dangerValue === mostDangerous) {
              if (this.targetLock) {
                if (e.id === this.targetLock.id) keepTarget = true;
              }
              return e;
            }
          }
        });
      // Reset target if it's not in there
      if (!keepTarget) this.targetLock = undefined;
      return out;
    }

    think(input) {
      // Override target lock upon other commands
      if (input.main || input.alt || this.body.master.autoOverride) {
        this.targetLock = undefined;
        return {};
      }
      // Otherwise, consider how fast we can either move to ram it or shoot at a potiential target.
      let tracking = this.body.topSpeed,
        range = this.body.fov / 2;
      // Use whether we have functional guns to decide
      for (let i = 0; i < this.body.guns.length; i++) {
        if (this.body.guns[i].canShoot && !this.body.aiSettings.skynet) {
          let v = this.body.guns[i].getTracking();
          tracking = v.speed;
          range = Math.min(range, v.speed * v.range);
          break;
        }
      }
      // Check if my target's alive
      if (this.targetLock) {
        if (this.targetLock.health.amount <= 0) {
          this.targetLock = undefined;
          this.tick = 100;
        }
      }
      // Think damn hard
      if (this.tick++ > 15 * roomSpeed) {
        this.tick = 0;
        this.validTargets = this.buildList(range);
        // Ditch our old target if it's invalid
        if (
          this.targetLock &&
          this.validTargets.indexOf(this.targetLock) === -1
        ) {
          this.targetLock = undefined;
        }
        // Lock new target if we still don't have one.
        if (this.targetLock == null && this.validTargets.length) {
          this.targetLock =
            this.validTargets.length === 1
              ? this.validTargets[0]
              : nearest(this.validTargets, { x: this.body.x, y: this.body.y });
          this.tick = -90;
        }
      }
      // Lock onto whoever's shooting me.
      // let damageRef = (this.body.bond == null) ? this.body : this.body.bond;
      // if (damageRef.collisionArray.length && damageRef.health.display() < this.oldHealth) {
      //     this.oldHealth = damageRef.health.display();
      //     if (this.validTargets.indexOf(damageRef.collisionArray[0]) === -1) {
      //         this.targetLock = (damageRef.collisionArray[0].master.id === -1) ? damageRef.collisionArray[0].source : damageRef.collisionArray[0].master;
      //     }
      // }
      // Consider how fast it's moving and shoot at it
      if (this.targetLock != null) {
        let radial = this.targetLock.velocity;
        let diff = {
          x: this.targetLock.x - this.body.x,
          y: this.targetLock.y - this.body.y,
        };
        /// Refresh lead time
        if (this.tick % 4 === 0) {
          this.lead = 0;
          // Find lead time (or don't)
          if (!this.body.aiSettings.chase) {
            let toi = timeOfImpact(diff, radial, tracking);
            this.lead = toi;
          }
        }
        // And return our aim
        return {
          target: {
            x: diff.x + this.lead * radial.x,
            y: diff.y + this.lead * radial.y,
          },
          fire: true,
          main: true,
        };
      }
      return {};
    }
  }
  class io_avoid extends IO {
    constructor(body) {
      super(body);
    }

    think(input) {
      let masterId = this.body.master.id;
      let range = this.body.size * this.body.size * 100;
      this.avoid = nearest(
        entities,
        { x: this.body.x, y: this.body.y },
        function (test, sqrdst) {
          return (
            test.master.id !== masterId &&
            (test.type === "bullet" ||
              test.type === "drone" ||
              test.type === "swarm" ||
              test.type === "trap" ||
              test.type === "block") &&
            sqrdst < range
          );
        }
      );
      // Aim at that target
      if (this.avoid != null) {
        // Consider how fast it's moving.
        let delt = new Vector(
          this.body.velocity.x - this.avoid.velocity.x,
          this.body.velocity.y - this.avoid.velocity.y
        );
        let diff = new Vector(
          this.avoid.x - this.body.x,
          this.avoid.y - this.body.y
        );
        let comp =
          (delt.x * diff.x + delt.y * diff.y) / delt.length / diff.length;
        let goal = {};
        if (comp > 0) {
          if (input.goal) {
            let goalDist = Math.sqrt(
              range /
                (input.goal.x * input.goal.x + input.goal.y * input.goal.y)
            );
            goal = {
              x: input.goal.x * goalDist - diff.x * comp,
              y: input.goal.y * goalDist - diff.y * comp,
            };
          } else {
            goal = {
              x: -diff.x * comp,
              y: -diff.y * comp,
            };
          }
          return goal;
        }
      }
    }
  }
  class io_aura extends IO {
    constructor(b) {
      super(b);
    }
    think(input) {
      this.body.x = this.body.source.x;
      this.body.y = this.body.source.y;
      this.body.accel.x = 0;
      this.body.accel.y = 0;
    }
  }
  class io_minion extends IO {
    constructor(body) {
      super(body);
      this.turnwise = 1;
    }

    think(input) {
      /*
      if (this.body.aiSettings.reverseDirection && ran.chance(0.005)) {
        this.turnwise = -1 * this.turnwise;
      }/*/
      if (input.target != null && (input.alt || input.main)) {
        let sizeFactor = Math.sqrt(
          this.body.master.size / this.body.master.SIZE
        );
        let leash = 60 * sizeFactor;
        let orbit = 120 * sizeFactor;
        let repel = 135 * sizeFactor;
        let goal;
        let power = 1;
        let target = new Vector(input.target.x, input.target.y);
        if (input.alt) {
          // Leash
          if (target.length < leash) {
            goal = {
              x: this.body.x + target.x,
              y: this.body.y + target.y,
            };
            // Spiral repel
          } else if (target.length < repel) {
            let dir = -this.turnwise * target.direction + Math.PI / 5;
            goal = {
              x: this.body.x + Math.cos(dir),
              y: this.body.y + Math.sin(dir),
            };
            // Free repel
          } else {
            goal = {
              x: this.body.x - target.x,
              y: this.body.y - target.y,
            };
          }
        } else if (input.main) {
          // Orbit point
          let dir = this.turnwise * target.direction + 0.01;
          goal = {
            x: this.body.x + target.x - orbit * Math.cos(dir),
            y: this.body.y + target.y - orbit * Math.sin(dir),
          };
          if (Math.abs(target.length - orbit) < this.body.size * 2) {
            power = 0.7;
          }
        }
        return {
          goal: goal,
          power: power,
        };
      }
    }
  }
  class io_whirlwindOrbit extends IO {
    constructor(body) {
      super(body);
      this.turnwise = 1;
    }

    think(input) {
      /*
      if (this.body.aiSettings.reverseDirection && ran.chance(0.005)) {
        this.turnwise = -1 * this.turnwise;
      }/*/
      if (input.target != null && input.alt) {
        let sizeFactor = Math.sqrt(
          this.body.master.size / this.body.master.SIZE
        );
        let leash = 60 * sizeFactor;
        let orbit = 250 * sizeFactor;
        let repel = 135 * sizeFactor;
        let goal;
        let power = 1;
        let target = new Vector(input.target.x, input.target.y);
        if (input.alt) {
          // Orbit point
          let dir = this.turnwise * target.direction + 0.01;
          goal = {
            x: this.body.x + target.x - orbit * Math.cos(dir),
            y: this.body.y + target.y - orbit * Math.sin(dir),
          };
          if (Math.abs(target.length - orbit) < this.body.size * 2) {
            power = 0.7;
          }
        }
        return {
          goal: goal,
          power: power,
        };
      }
    }
  }
  class io_minionBoss extends IO {
    constructor(body) {
      super(body);
      this.turnwise = 1;
    }

    think(input) {
      if (this.body.aiSettings.reverseDirection && ran.chance(0.005)) {
        this.turnwise = -1 * this.turnwise;
      }
      if (input.target != null && (input.alt || input.main)) {
        let sizeFactor = Math.sqrt(
          this.body.master.size / this.body.master.SIZE
        );
        let leash = 60 * sizeFactor;
        let orbit = 480 * sizeFactor;
        let repel = 135 * sizeFactor;
        let goal;
        let power = 1;
        let target = new Vector(input.target.x, input.target.y);
        if (input.alt) {
          // Leash
          if (target.length < leash) {
            goal = {
              x: this.body.x + target.x,
              y: this.body.y + target.y,
            };
            // Spiral repel
          } else if (target.length < repel) {
            let dir = -this.turnwise * target.direction + Math.PI / 5;
            goal = {
              x: this.body.x + Math.cos(dir),
              y: this.body.y + Math.sin(dir),
            };
            // Free repel
          } else {
            goal = {
              x: this.body.x - target.x,
              y: this.body.y - target.y,
            };
          }
        } else if (input.main) {
          // Orbit point
          let dir = this.turnwise * target.direction + 0.01;
          goal = {
            x: this.body.x + target.x - orbit * Math.cos(dir),
            y: this.body.y + target.y - orbit * Math.sin(dir),
          };
          if (Math.abs(target.length - orbit) < this.body.size * 2) {
            power = 0.7;
          }
        }
        return {
          goal: goal,
          power: power,
        };
      }
    }
  }
  class io_hangOutNearMaster extends IO {
    constructor(body) {
      super(body);
      this.acceptsFromTop = false;
      this.orbit = 30;
      this.currentGoal = { x: this.body.source.x, y: this.body.source.y };
      this.timer = 0;
    }
    think(input) {
      if (this.body.source != this.body) {
        let bound1 = this.orbit * 0.8 + this.body.source.size + this.body.size;
        let bound2 = this.orbit * 1.5 + this.body.source.size + this.body.size;
        let dist = util.getDistance(this.body, this.body.source) + Math.PI / 8;
        let output = {
          target: {
            x: this.body.velocity.x,
            y: this.body.velocity.y,
          },
          goal: this.currentGoal,
          power: undefined,
        };
        // Set a goal
        if (dist > bound2 || this.timer > 30) {
          this.timer = 0;

          let dir =
            util.getDirection(this.body, this.body.source) +
            Math.PI * ran.random(0.5);
          let len = ran.randomRange(bound1, bound2);
          let x = this.body.source.x - len * Math.cos(dir);
          let y = this.body.source.y - len * Math.sin(dir);
          this.currentGoal = {
            x: x,
            y: y,
          };
        }
        if (dist < bound2) {
          output.power = 0.15;
          if (ran.chance(0.3)) {
            this.timer++;
          }
        }
        return output;
      }
    }
  }
  class io_hangOutNearMasterAtmosphere extends IO {
    constructor(body) {
      super(body);
      this.acceptsFromTop = false;
      this.orbit = 30;
      this.currentGoal = { x: this.body.source.x, y: this.body.source.y };
      this.timer = 0;
    }
    think(input) {
      if (this.body.source != this.body) {
        let bound1 = this.orbit * 0.8 + this.body.source.size + this.body.size;
        let bound2 = this.orbit * 1.5 + this.body.source.size + this.body.size;
        let dist = util.getDistance(this.body, this.body.source) + Math.PI / 8;
        let output = {
          target: {
            x: this.body.velocity.x,
            y: this.body.velocity.y,
          },
          goal: this.currentGoal,
          power: undefined,
        };
        // Set a goal
        if (dist > bound2 || this.timer > 30) {
          this.timer = 0;

          let dir =
            util.getDirection(this.body, this.body.source) +
            Math.PI * ran.random(0.5);
          let len = ran.randomRange(bound1, bound2);
          let x = this.body.source.x - len * Math.cos(dir);
          let y = this.body.source.y - len * Math.sin(dir);
          this.currentGoal = {
            x: x,
            y: y,
          };
        }
        if (dist < bound2) {
          output.power = 0.15;
          if (ran.chance(0.3)) {
            this.timer++;
          }
        }
        return output;
      }
    }
  }
  class io_newShitTanksOrbit extends IO {
    constructor(body) {
      super(body);
      this.acceptsFromTop = false;
      this.orbit = 30;
      this.currentGoal = { x: this.body.source.x, y: this.body.source.y };
      this.timer = 0;
    }
    think(input) {
      if (this.body.source != this.body) {
        let bound1 = this.orbit * 0.8 + this.body.source.size + this.body.size;
        let bound2 = this.orbit * 1.5 + this.body.source.size + this.body.size;
        let dist = util.getDistance(this.body, this.body.source) + Math.PI / 8;
        let output = {
          target: {
            x: this.body.velocity.x,
            y: this.body.velocity.y,
          },
          goal: this.currentGoal,
          power: undefined,
        };
        // Set a goal
        if (dist > bound2 || this.timer > 30) {
          this.timer = 0;

          let dir =
            util.getDirection(this.body, this.body.source) +
            Math.PI * ran.random(0.5);
          let len = ran.randomRange(bound1, bound2);
          let x = this.body.source.x - len * Math.cos(dir);
          let y = this.body.source.y - len * Math.sin(dir);
          this.currentGoal = {
            x: x,
            y: y,
          };
        }
        if (dist < bound2) {
          output.power = 0.15;
          if (ran.chance(0.3)) {
            this.timer++;
          }
        }
        return output;
      }
    }
  }
  class io_spin extends IO {
    constructor(b) {
      super(b);
      this.a = 0;
    }

    think(input) {
      this.a += 0.05;
      let offset = 0;
      if (this.body.bond != null) {
        offset = this.body.bound.angle;
      }
      return {
        target: {
          x: Math.cos(this.a + offset),
          y: Math.sin(this.a + offset),
        },
        main: true,
      };
    }
  }
  class io_spin2 extends IO {
    constructor(b) {
      super(b);
      this.a = 0;
    }

    think(input) {
      this.a += 0.035;
      let offset = 0;
      if (this.body.bond != null) {
        offset = this.body.bound.angle;
      }
      return {
        target: {
          x: Math.cos(this.a + offset),
          y: Math.sin(this.a + offset),
        },
        main: true,
      };
    }
  }
  class io_spin2slow extends IO {
    constructor(b) {
      super(b);
      this.a = 0;
    }

    think(input) {
      this.a += 0.035 / 4.5;
      let offset = 0;
      if (this.body.bond != null) {
        offset = this.body.bound.angle;
      }
      return {
        target: {
          x: Math.cos(this.a + offset),
          y: Math.sin(this.a + offset),
        },
        main: true,
      };
    }
  }
  class io_fastspin extends IO {
    constructor(b) {
      super(b);
      this.a = 0;
    }

    think(input) {
      this.a += 0.072;
      let offset = 0;
      if (this.body.bond != null) {
        offset = this.body.bound.angle;
      }
      return {
        target: {
          x: Math.cos(this.a + offset),
          y: Math.sin(this.a + offset),
        },
        main: true,
      };
    }
  }
  class io_reversespin extends IO {
    constructor(b) {
      super(b);
      this.a = 0;
    }

    think(input) {
      this.a -= 0.05;
      let offset = 0;
      if (this.body.bond != null) {
        offset = this.body.bound.angle;
      }
      return {
        target: {
          x: Math.cos(this.a + offset),
          y: Math.sin(this.a + offset),
        },
        main: true,
      };
    }
  }
  class io_reversespinreal extends IO {
    constructor(b) {
      super(b);
      this.a = 0;
    }

    think(input) {
      this.a -= 0.02;
      let offset = 0;
      if (this.body.bond != null) {
        offset = this.body.bound.angle;
      }
      return {
        target: {
          x: Math.cos(this.a + offset),
          y: Math.sin(this.a + offset),
        },
        main: true,
      };
    }
  }
  class io_halfreversespin extends IO {
    constructor(b) {
      super(b);
      this.a = 0;
    }

    think(input) {
      this.a -= 0.01;
      let offset = 0;
      if (this.body.bond != null) {
        offset = this.body.bound.angle;
      }
      return {
        target: {
          x: Math.cos(this.a + offset),
          y: Math.sin(this.a + offset),
        },
        main: true,
      };
    }
  }
  class io_spinNorm extends IO {
    constructor(b) {
      super(b);
      this.a = 0;
    }

    think(input) {
      this.a += 0.02;
      let offset = 0;
      if (this.body.bond != null) {
        offset = this.body.bound.angle;
      }
      return {
        target: {
          x: Math.cos(this.a + offset),
          y: Math.sin(this.a + offset),
        },
        main: true,
      };
    }
  }
  class io_dontTurn extends IO {
    constructor(b) {
      super(b);
    }

    think(input) {
      return {
        target: {
          x: 1,
          y: 0,
        },
        main: true,
      };
    }
  }
  class io_fleeAtLowHealth extends IO {
    constructor(b) {
      super(b);
      this.fear = util.clamp(ran.gauss(0.7, 0.15), 0.1, 0.9);
    }

    think(input) {
      if (
        input.fire &&
        input.target != null &&
        this.body.health.amount < this.body.health.max * this.fear
      ) {
        return {
          goal: {
            x: this.body.x - input.target.x,
            y: this.body.y - input.target.y,
          },
        };
      }
    }
  }
  class io_shootAtLowHealth extends IO {
    constructor(b) {
      super(b);
      this.fear = util.clamp(ran.gauss(0.7, 0.15), 0.1, 0.9);
    }

    think(input) {
      if (
        input.fire &&
        input.target != null &&
        this.body.health.amount < this.body.health.max * this.fear
      ) {
        return {
          goal: {
            fire: this.body.fire,
          },
        };
      }
    }
  }
class io_curveMovement extends IO {
  constructor(body) {
    super(body);
    this.acceptsFromTop = false;
    this.time = 1; // Controla la evolución del movimiento en el tiempo
    this.frequency = 0.3; // Ajusta la cantidad de oscilaciones
    this.amplitude = 0.5; // Ajusta la desviación de la trayectoria
  }

  think() {
    this.time += 0.1; // Incrementamos el tiempo para la onda
    let curveFactor = this.amplitude * Math.sin(this.time * this.frequency);

    // Calculamos el nuevo ángulo de la bala sumando la desviación
    let newDirection = this.body.facing + curveFactor;

    // Aplicamos el nuevo vector de movimiento
    let speed = 10; // Asegurarnos de que la bala mantiene una velocidad constante
    return {
      goal: {
        x: this.body.x + Math.cos(newDirection) * speed,
        y: this.body.y + Math.sin(newDirection) * speed,
      },
      power: 1,
    };
  }
}

  

  class io_zoom extends IO {
    constructor(body) {
      super(body);
      this.distance = 225;
    }

    think(input) {
      if (input.alt && input.target) {
        if (this.body.cameraOverrideX === null) {
          let direction = Math.atan2(input.target.y, input.target.x);
          this.body.cameraOverrideX =
            this.body.x + this.distance * Math.cos(direction);
          this.body.cameraOverrideY =
            this.body.y + this.distance * Math.sin(direction);
          
        }
      } else {
        this.body.cameraOverrideX = null;
        this.body.cameraOverrideY = null;
      }
    }
  }
  class io_longZoom extends IO {
    constructor(body) {
      super(body);
      this.distance = 550;
    }

    think(input) {
      if (input.alt && input.target) {
        if (this.body.cameraOverrideX === null) {
          let direction = Math.atan2(input.target.y, input.target.x);
          this.body.cameraOverrideX =
            this.body.x + this.distance * Math.cos(direction);
          this.body.cameraOverrideY =
            this.body.y + this.distance * Math.sin(direction);
        }
      }/* else {
        this.body.cameraOverrideX = null;
        this.body.cameraOverrideY = null;
      }*/
    }
  }
  class io_altCamera extends IO {
  constructor(body) {
    super(body);
      this.distance = 225;
  }

  think(input) {
    if (input.main) {
          let direction = Math.atan2(input.target.y, input.target.x);
      this.body.vx =
            this.body.x + this.distance * Math.cos(direction);
      this.body.vy  =
            this.body.y + this.distance * Math.sin(direction);
    }/* else {
      this.body.vx = 0;
      this.body.vy = 0;
    }*/
  }
}
  /*
class io_followPlayer extends IO {
  constructor(body, player) {
    super(body);
    this.acceptsFromTop = false;
    this.player = player;
  }

  think(input) {
    let playerPosition = {
      x: this.player.x,
      y: this.player.y,
    };

    let output = {
      target: {
        x: this.body.velocity.x,
        y: this.body.velocity.y,
      },
      goal: playerPosition,
      power: 1,  // Puedes ajustar esto según tus necesidades
    };

    return output;
  }
}


    constructor(b, p) {
      super(b);
      this.player = p;
      this.acceptsFromTop = false;
    }

    // THE PLAYER MUST HAVE A VALID COMMAND AND TARGET OBJECT

    think() {
      let targ = {
        x: this.player.target.x,
        y: this.player.target.y,
      };
      if (this.player.command.autospin) {
        let kk =
          Math.atan2(this.body.control.target.y, this.body.control.target.x) +
          0.02;
        targ = {
          x: 100 * Math.cos(kk),
          y: 100 * Math.sin(kk),
        };
      }
      if (this.body.invuln) {
        if (
          this.player.command.right ||
          this.player.command.left ||
          this.player.command.up ||
          this.player.command.down ||
          this.player.command.lmb
        ) {
          this.body.invuln = false;
        }
      }
      this.body.autoOverride = this.player.command.override;
      return {
        target: targ,
        goal: {
          x: this.body.x + this.player.command.right - this.player.command.left,
          y: this.body.y + this.player.command.down - this.player.command.up,
        },
        fire: this.player.command.lmb || this.player.command.autofire,
        main:
          this.player.command.lmb ||
          this.player.command.autospin ||
          this.player.command.autofire,
        alt: this.player.command.rmb,
      };
    }
*/
  /*
  class io_followPlayer extends IO {
    constructor(b, p) {
      super(b);
      this.player = p;
      //this.acceptsFromTop = false;
    }

    // THE PLAYER MUST HAVE A VALID COMMAND AND TARGET OBJECT

    think() {
      let targ = {
        x: this.player.target.x,
        y: this.player.target.y,
      };
      if (this.body.invuln) {
        if (
          this.player.command.right ||
          this.player.command.left ||
          this.player.command.up ||
          this.player.command.down 
        ) {
          this.body.invuln = false;
        }
      }
      return {
        target: targ,
        goal: {
          x: this.body.x + this.player.command.right - this.player.command.left,
          y: this.body.y + this.player.command.down - this.player.command.up,
        },
      };
    }
  }*/

  /***** ENTITIES *****/
  // Define skills
  const skcnv = {
    rld: 0,
    pen: 1,
    str: 2,
    dam: 3,
    spd: 4,

    shi: 5,
    atk: 6,
    hlt: 7,
    rgn: 8,
    mob: 9,
  };
  let cero = 0;
  let mil = 1000;
  const levelers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
    44, 45 /*
    // growth or dreadnoughts
    47, 49, 50, 52, 55, 57, 59, 60, 64, 69, 70, 79, 74, 80, 85, 89, 90, 95, 99,
    100, 105, 110, 115, 120, 121, 125, 130, 131, 135, 141, 145, 149, 151, 161,
    171, 181, 191, 201, 211, 221, 231, 241, 251, 261, 271, 281, 291*/,
  ];
  class Skill {
    constructor(inital = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {
      // Just skill stuff.
      this.raw = inital;
      this.caps = [];
      this.setCaps([
        c.MAX_SKILL,
        c.MAX_SKILL,
        c.MAX_SKILL,
        c.MAX_SKILL,
        c.MAX_SKILL,
        c.MAX_SKILL,
        c.MAX_SKILL,
        c.MAX_SKILL,
        c.MAX_SKILL,
        c.MAX_SKILL,
      ]);
      this.name = [
        "Reload",
        "Bullet Penetration",
        "Bullet Health",
        "Bullet Damage",
        "Bullet Speed",
        "Shield Capacity",
        "Body Damage",
        "Max Health",
        "Shield Regeneration",
        "Movement Speed",
      ];
      this.atk = 0;
      this.hlt = 0;
      this.spd = 0;
      this.str = 0;
      this.pen = 0;
      this.dam = 0;
      this.rld = 0;
      this.mob = 0;
      this.rgn = 0;
      this.shi = 0;
      this.rst = 0;
      this.brst = 0;
      this.ghost = 0;
      this.acl = 0;

      this.reset();
    }

    reset() {
      this.points = 0;
      this.score = 0;
      this.deduction = 0;
      this.level = 0;
      this.canUpgrade = false;
      this.update();
      this.maintain();
    }

    update() {
      let curve = (() => {
        function make(x) {
          return Math.log(4 * x + 1) / Math.log(5);
        }
        let a = [];
        for (let i = 0; i < c.MAX_SKILL * 2; i++) {
          a.push(make(i / c.MAX_SKILL));
        }
        // The actual lookup function
        return (x) => {
          return a[x * c.MAX_SKILL];
        };
      })();
      function apply(f, x) {
        return x < 0 ? 1 / (1 - x * f) : f * x + 1;
      }
      for (let i = 0; i < 10; i++) {
        if (this.raw[i] > this.caps[i]) {
          this.points += this.raw[i] - this.caps[i];
          this.raw[i] = this.caps[i];
        }
      }
      let attrib = [];
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 2; j += 1) {
          attrib[i + 5 * j] = curve(
            (this.raw[i + 5 * j] + this.bleed(i, j)) / c.MAX_SKILL
          );
        }
      }
      this.rld = Math.pow(0.5, attrib[skcnv.rld]);
      this.pen = apply(2.5, attrib[skcnv.pen]);
      this.str = apply(2, attrib[skcnv.str]);
      this.dam = apply(3, attrib[skcnv.dam]);
      this.spd = 0.5 + apply(1.5, attrib[skcnv.spd]);

      this.acl = apply(0.5, attrib[skcnv.rld]);

      this.rst = 0.5 * attrib[skcnv.str] + 2.5 * attrib[skcnv.pen];
      this.ghost = attrib[skcnv.pen];

      this.shi =
        c.GLASS_HEALTH_FACTOR *
        apply(3 / c.GLASS_HEALTH_FACTOR - 1, attrib[skcnv.shi]);
      this.atk = apply(1, attrib[skcnv.atk]);
      this.hlt =
        c.GLASS_HEALTH_FACTOR *
        apply(2 / c.GLASS_HEALTH_FACTOR - 1, attrib[skcnv.hlt]);
      this.mob = apply(0.8, attrib[skcnv.mob]);
      this.rgn = apply(25, attrib[skcnv.rgn]);

      this.brst =
        0.3 *
        (0.5 * attrib[skcnv.atk] + 0.5 * attrib[skcnv.hlt] + attrib[skcnv.rgn]);
    }

    set(thing) {
      this.raw[0] = thing[0];
      this.raw[1] = thing[1];
      this.raw[2] = thing[2];
      this.raw[3] = thing[3];
      this.raw[4] = thing[4];
      this.raw[5] = thing[5];
      this.raw[6] = thing[6];
      this.raw[7] = thing[7];
      this.raw[8] = thing[8];
      this.raw[9] = thing[9];
      this.update();
    }

    setCaps(thing) {
      this.caps[0] = thing[0];
      this.caps[1] = thing[1];
      this.caps[2] = thing[2];
      this.caps[3] = thing[3];
      this.caps[4] = thing[4];
      this.caps[5] = thing[5];
      this.caps[6] = thing[6];
      this.caps[7] = thing[7];
      this.caps[8] = thing[8];
      this.caps[9] = thing[9];
      this.update();
    }

    maintain() {
      if (this.level < c.SKILL_CAP) {
        //(this.score - this.deduction >= this.levelScore)
        if (this.score - this.deduction >= this.levelScore) {
          this.deduction += this.levelScore;
          this.level += 1;
          this.points += this.levelPoints;
          if (
            this.level == c.TIER_0 ||
            this.level == c.TIER_1 ||
            this.level == c.TIER_2 ||
            this.level == c.TIER_3 ||
            this.level == c.TIER_4 || //arms race
            this.level == c.TIER_5 || //dreadnougths 90 egg
            this.level == c.TIER_6 || // agin dreadnougths 90
            this.level == c.TIER_7 || //dreadnougths 120 square
            this.level == c.TIER_8 || //dreadnougths old 150
            this.level == c.TIER_9 || //dreadnougths old 150 Tier 2
            this.level == c.TIER_10 || //tier 10 upgrade
            this.level == c.TIER_11 || //dreadnougths 180 triangle
            this.level == c.TIER_12 || //dreadnougths 210 pentagon
            this.level == c.TIER_13
          ) {
            this.canUpgrade = true;
          }
          this.update();
          return true;
        }
      }
      return false;
    }

    get levelScore() {
      return Math.ceil(
        1.8 * Math.pow(this.level + 1, 1.8) - 2 * this.level + 1
      );
    }

    get progress() {
      return this.levelScore
        ? (this.score - this.deduction) / this.levelScore
        : 0;
    }

    get levelPoints() {
      if (
        levelers.findIndex((e) => {
          return e === this.level;
        }) != -1
      ) {
        return 1;
      }
      return 0;
    }

    cap(skill, real = false) {
      if (!real && this.level < c.SKILL_SOFT_CAP) {
        return Math.round(this.caps[skcnv[skill]] * c.SOFT_MAX_SKILL);
      }
      return this.caps[skcnv[skill]];
    }

    bleed(i, j) {
      let a = ((i + 2) % 5) + 5 * j,
        b = ((i + (j === 1 ? 1 : 4)) % 5) + 5 * j;
      let value = 0;
      let denom = Math.max(c.MAX_SKILL, this.caps[i + 5 * j]);
      value +=
        (1 - Math.pow(this.raw[a] / denom - 1, 2)) * this.raw[a] * c.SKILL_LEAK;
      value -= Math.pow(this.raw[b] / denom, 2) * this.raw[b] * c.SKILL_LEAK;

      return value;
    }

    upgrade(stat) {
      if (this.points && this.amount(stat) < this.cap(stat)) {
        this.change(stat, 1);
        this.points -= 1;
        return true;
      }
      return false;
    }

    title(stat) {
      return this.name[skcnv[stat]];
    }

    /*
    let i = skcnv[skill] % 5,
        j = (skcnv[skill] - i) / 5;
    let roundvalue = Math.round(this.bleed(i, j) * 10);
    let string = '';
    if (roundvalue > 0) { string += '+' + roundvalue + '%'; }
    if (roundvalue < 0) { string += '-' + roundvalue + '%'; }

    return string;
    */

    amount(skill) {
      return this.raw[skcnv[skill]];
    }

    change(skill, levels) {
      this.raw[skcnv[skill]] += levels;
      this.update();
    }
  }

  const lazyRealSizes = (() => {
    let o = [1, 1, 1];
    for (var i = 3; i < 16; i++) {
      // We say that the real size of a 0-gon, 1-gon, 2-gon is one, then push the real sizes of triangles, squares, etc...
      o.push(
        Math.sqrt(((2 * Math.PI) / i) * (1 / Math.sin((2 * Math.PI) / i)))
      );
    }
    return o;
  })();

  // Define how guns work
  class Gun {
    constructor(body, info) {
      this.lastShot = {
        time: 0,
        power: 0,
      };
      this.body = body;
      this.master = body.source;
      this.label = "";
      this.controllers = [];
      this.children = [];
      this.control = {
        target: new Vector(0, 0),
        goal: new Vector(0, 0),
        main: false,
        alt: false,
        fire: false,
      };
      this.canShoot = false;
      this.colorOverride = null;
      if (info.PROPERTIES != null && info.PROPERTIES.TYPE != null) {
        this.canShoot = true;
        this.label = info.PROPERTIES.LABEL == null ? "" : info.PROPERTIES.LABEL;
        if (Array.isArray(info.PROPERTIES.TYPE)) {
          // This is to be nicer about our definitions
          this.bulletTypes = info.PROPERTIES.TYPE;
          this.natural = info.PROPERTIES.TYPE.BODY;
        } else {
          this.bulletTypes = [info.PROPERTIES.TYPE];
        }
        // Pre-load bullet definitions so we don't have to recalculate them every shot
        let natural = {};
        this.bulletTypes.forEach(function setNatural(type) {
          if (type.PARENT != null) {
            // Make sure we load from the parents first
            for (let i = 0; i < type.PARENT.length; i++) {
              setNatural(type.PARENT[i]);
            }
          }
          if (type.BODY != null) {
            // Get values if they exist
            for (let index in type.BODY) {
              natural[index] = type.BODY[index];
            }
          }
        });
        this.natural = natural; // Save it
        if (info.PROPERTIES.GUN_CONTROLLERS != null) {
          let toAdd = [];
          let self = this;
          info.PROPERTIES.GUN_CONTROLLERS.forEach(function (ioName) {
            toAdd.push(eval("new " + ioName + "(self)"));
          });
          this.controllers = toAdd.concat(this.controllers);
        }
        this.autofire =
          info.PROPERTIES.AUTOFIRE == null ? false : info.PROPERTIES.AUTOFIRE;
        this.altFire =
          info.PROPERTIES.ALT_FIRE == null ? false : info.PROPERTIES.ALT_FIRE;
        this.reverseTank =
          info.PROPERTIES.REVERSED_TANK == null
            ? false
            : info.PROPERTIES.REVERSED_TANK;
        this.settings =
          info.PROPERTIES.SHOOT_SETTINGS == null
            ? []
            : info.PROPERTIES.SHOOT_SETTINGS;
        this.calculator =
          info.PROPERTIES.STAT_CALCULATOR == null
            ? "default"
            : info.PROPERTIES.STAT_CALCULATOR;
        this.waitToCycle =
          info.PROPERTIES.WAIT_TO_CYCLE == null
            ? false
            : info.PROPERTIES.WAIT_TO_CYCLE;
        this.bulletStats =
          info.PROPERTIES.BULLET_STATS == null ||
          info.PROPERTIES.BULLET_STATS == "master"
            ? "master"
            : new Skill(info.PROPERTIES.BULLET_STATS);
        this.settings =
          info.PROPERTIES.SHOOT_SETTINGS == null
            ? []
            : info.PROPERTIES.SHOOT_SETTINGS;
        this.countsOwnKids =
          info.PROPERTIES.MAX_CHILDREN == null
            ? false
            : info.PROPERTIES.MAX_CHILDREN;
        this.syncsSkills =
          info.PROPERTIES.SYNCS_SKILLS == null
            ? false
            : info.PROPERTIES.SYNCS_SKILLS;
        this.negRecoil =
          info.PROPERTIES.NEGATIVE_RECOIL == null
            ? false
            : info.PROPERTIES.NEGATIVE_RECOIL;
        if (info.PROPERTIES.COLOR_OVERRIDE != null)
          this.colorOverride = info.PROPERTIES.COLOR_OVERRIDE;
      }
      let position = info.POSITION;
      this.length = position[0] / 10;
      this.width = position[1] / 10;
      this.aspect = position[2];
      let _off = new Vector(position[3], position[4]);
      this.angle = (position[5] * Math.PI) / 180;
      this.direction = _off.direction;
      this.offset = _off.length / 10;
      this.delay = position[6];

      this.position = 0;
      this.motion = 0;
      if (this.canShoot) {
        this.cycle = !this.waitToCycle - this.delay;
        this.trueRecoil = this.settings.recoil;
      }
    }

    recoil() {
      if (this.motion || this.position) {
        // Simulate recoil
        this.motion -= (0.25 * this.position) / roomSpeed;
        this.position += this.motion;
        if (this.position < 0) {
          // Bouncing off the back
          this.position = 0;
          this.motion = -this.motion;
        }
        if (this.motion > 0) {
          this.motion *= 0.75;
        }
      }
      if (this.canShoot && !this.body.settings.hasNoRecoil) {
        // Apply recoil to motion
        if (this.motion > 0) {
          let recoilForce =
            (-this.position * this.trueRecoil * 0.045) / roomSpeed;
          this.body.accel.x +=
            recoilForce * Math.cos(this.body.facing + this.angle);
          this.body.accel.y +=
            recoilForce * Math.sin(this.body.facing + this.angle);
        }
      }
    }

    getSkillRaw() {
      if (this.bulletStats === "master") {
        return [
          this.body.skill.raw[0],
          this.body.skill.raw[1],
          this.body.skill.raw[2],
          this.body.skill.raw[3],
          this.body.skill.raw[4],
          0,
          0,
          0,
          0,
          0,
        ];
      }
      return this.bulletStats.raw;
    }

    getLastShot() {
      return this.lastShot;
    }

    live() {
      // Do
      this.recoil();
      // Dummies ignore this
      if (this.canShoot) {
        // Find the proper skillset for shooting
        let sk =
          this.bulletStats === "master" ? this.body.skill : this.bulletStats;
        // Decides what to do based on child-counting settings
        let shootPermission = this.countsOwnKids
          ? this.countsOwnKids >
            this.children.length * (this.calculator == "necro" ? sk.rld : 1)
          : this.body.maxChildren
          ? this.body.maxChildren >
            this.body.children.length *
              (this.calculator == "necro" ? sk.rld : 1)
          : true;
        // Override in invuln
        if (this.body.master.invuln) {
          shootPermission = false;
        }
        // Cycle up if we should
        if (shootPermission || !this.waitToCycle) {
          if (this.cycle < 1) {
            this.cycle +=
              1 /
              this.settings.reload /
              roomSpeed /
              (this.calculator == "necro" || this.calculator == "fixed reload"
                ? 1
                : sk.rld);
          }
        }
        // Firing routines
        if (
          shootPermission &&
          (this.autofire ||
            (this.altFire ? this.body.control.alt : this.body.control.fire))
        ) {
          if (this.cycle >= 1) {
            // Find the end of the gun barrel
            let gx =
              this.offset *
                Math.cos(this.direction + this.angle + this.body.facing) +
              (1.5 * this.length - (this.width * this.settings.size) / 2) *
                Math.cos(this.angle + this.body.facing);
            let gy =
              this.offset *
                Math.sin(this.direction + this.angle + this.body.facing) +
              (1.5 * this.length - (this.width * this.settings.size) / 2) *
                Math.sin(this.angle + this.body.facing);
            // Shoot, multiple times in a tick if needed
            while (shootPermission && this.cycle >= 1) {
              this.fire(gx, gy, sk);
              // Figure out if we may still shoot
              shootPermission = this.countsOwnKids
                ? this.countsOwnKids > this.children.length
                : this.body.maxChildren
                ? this.body.maxChildren > this.body.children.length
                : true;
              // Cycle down
              this.cycle -= 1;
            }
          } // If we're not shooting, only cycle up to where we'll have the proper firing delay
        } else if (this.cycle > !this.waitToCycle - this.delay) {
          this.cycle = !this.waitToCycle - this.delay;
        }
      }
    }

    syncChildren() {
      if (this.syncsSkills) {
        let self = this;
        this.children.forEach(function (o) {
          o.define({
            BODY: self.interpret(),
            SKILL: self.getSkillRaw(),
          });
          o.refreshBodyAttributes();
        });
      }
    }

    fire(gx, gy, sk) {
      // Recoil
      this.lastShot.time = util.time();
      this.lastShot.power =
        3 * Math.log(Math.sqrt(sk.spd) + this.trueRecoil + 1) + 1;
      this.motion += this.lastShot.power;
      // Find inaccuracy
      let ss, sd;
      do {
        ss = ran.gauss(0, Math.sqrt(this.settings.shudder));
      } while (Math.abs(ss) >= this.settings.shudder * 2);
      do {
        sd = ran.gauss(0, this.settings.spray * this.settings.shudder);
      } while (Math.abs(sd) >= this.settings.spray / 2);
      sd *= Math.PI / 180;
      // Find speed
      let s = new Vector(
        (this.negRecoil ? -1 : 1) *
          this.settings.speed *
          c.runSpeed *
          sk.spd *
          (1 + ss) *
          Math.cos(this.angle + this.body.facing + sd),
        (this.negRecoil ? -1 : 1) *
          this.settings.speed *
          c.runSpeed *
          sk.spd *
          (1 + ss) *
          Math.sin(this.angle + this.body.facing + sd)
      );
      // Boost it if we shouldw
      if (this.body.velocity.length) {
        let extraBoost =
          Math.max(0, s.x * this.body.velocity.x + s.y * this.body.velocity.y) /
          this.body.velocity.length /
          s.length;
        if (extraBoost) {
          let len = s.length;
          s.x += (this.body.velocity.length * extraBoost * s.x) / len;
          s.y += (this.body.velocity.length * extraBoost * s.y) / len;
        }
      }
      // Create the bullet
      var o = new Entity(
        {
          x: this.body.x + this.body.size * gx - s.x,
          y: this.body.y + this.body.size * gy - s.y,
        },
        this.master.master
      );
      /*let jumpAhead = this.cycle - 1;
        if (jumpAhead) {
            o.x += s.x * this.cycle / jumpAhead;
            o.y += s.y * this.cycle / jumpAhead;
        }*/
      o.velocity = s;
      this.bulletInit(o);
      o.coreSize = o.SIZE;
    }

    bulletInit(o) {
      // Define it by its natural properties
      this.bulletTypes.forEach((type) => o.define(type));
      // Pass the gun attributes
      o.define({
        BODY: this.interpret(),
        SKILL: this.getSkillRaw(),
        SIZE: (this.body.size * this.width * this.settings.size) / 2,
        LABEL:
          this.master.label +
          (this.label ? " " + this.label : "") +
          " " +
          o.label,
      });
      o.color = this.body.master.color;
      // Keep track of it and give it the function it needs to deutil.log itself upon death
      if (this.colorOverride != null && !isNaN(this.colorOverride))
        o.color = this.colorOverride;
      else if (this.colorOverride === "random")
        o.color = Math.floor(42 * Math.random());
      if (this.countsOwnKids) {
        o.parent = this;
        this.children.push(o);
      } else if (this.body.maxChildren) {
        o.parent = this.body;
        this.body.children.push(o);
        this.children.push(o);
      }
      o.source = this.body;
      o.facing = o.velocity.direction;
      // Necromancers.
      let oo = o;
      o.necro = (host) => {
        let shootPermission = this.countsOwnKids
          ? this.countsOwnKids >
            this.children.length *
              (this.bulletStats === "master"
                ? this.body.skill.rld
                : this.bulletStats.rld)
          : this.body.maxChildren
          ? this.body.maxChildren >
            this.body.children.length *
              (this.bulletStats === "master"
                ? this.body.skill.rld
                : this.bulletStats.rld)
          : true;
        if (shootPermission) {
          let save = {
            facing: host.facing,
            size: host.SIZE,
          };
          host.define(Class.genericEntity);
          this.bulletInit(host);
          host.team = oo.master.master.team;
          host.master = oo.master;
          host.color = oo.color;
          if (this.colorOverride != null) {
            host.color = oo.colorOverride;
          } else {
            host.color = oo.color;
          }
          host.facing = save.facing;
          host.SIZE = save.size;
          host.health.amount = host.health.max;
          return true;
        }
        return false;
      };
      // Otherwise
      o.refreshBodyAttributes();
      o.life();
    }

    getTracking() {
      return {
        speed:
          c.runSpeed *
          (this.bulletStats == "master"
            ? this.body.skill.spd
            : this.bulletStats.spd) *
          this.settings.maxSpeed *
          this.natural.SPEED,
        range:
          Math.sqrt(
            this.bulletStats == "master"
              ? this.body.skill.spd
              : this.bulletStats.spd
          ) *
          this.settings.range *
          this.natural.RANGE,
      };
    }

    interpret() {
      let sizeFactor = this.master.size / this.master.SIZE;
      let shoot = this.settings;
      let sk =
        this.bulletStats == "master" ? this.body.skill : this.bulletStats;
      // Defaults
      let out = {
        SPEED: shoot.maxSpeed * sk.spd,
        HEALTH: shoot.health * sk.str,
        RESIST: shoot.resist + sk.rst,
        DAMAGE: shoot.damage * sk.dam,
        PENETRATION: Math.max(1, shoot.pen * sk.pen),
        RANGE: shoot.range / Math.sqrt(sk.spd),
        DENSITY: (shoot.density * sk.pen * sk.pen) / sizeFactor,
        PUSHABILITY: 1 / sk.pen,
        HETERO: 3 - 2.8 * sk.ghost,
      };
      // Special cases
      switch (this.calculator) {
        case "thruster":
          this.trueRecoil = this.settings.recoil * Math.sqrt(sk.rld * sk.spd);
          break;
        case "sustained":
          out.RANGE = shoot.range;
          break;
        case "swarm":
          out.PENETRATION = Math.max(1, shoot.pen * (0.5 * (sk.pen - 1) + 1));
          out.HEALTH /= shoot.pen * sk.pen;
          break;
        case "trap":
        case "block":
          out.PUSHABILITY = 1 / Math.pow(sk.pen, 0.5);
          out.RANGE = shoot.range;
          break;
        case "necro":
        case "drone":
          out.PUSHABILITY = 1;
          out.PENETRATION = Math.max(1, shoot.pen * (0.5 * (sk.pen - 1) + 1));
          out.HEALTH =
            (shoot.health * sk.str + sizeFactor) / Math.pow(sk.pen, 0.8);
          out.DAMAGE =
            shoot.damage * sk.dam * Math.sqrt(sizeFactor) * shoot.pen * sk.pen;
          out.RANGE = shoot.range * Math.sqrt(sizeFactor);
          break;
      }
      // Go through and make sure we respect its natural properties
      for (let property in out) {
        if (this.natural[property] == null || !out.hasOwnProperty(property))
          continue;
        out[property] *= this.natural[property];
      }
      return out;
    }
  }
  // Define entities
  var minimap = [];
  var views = [];
  var entitiesToAvoid = [];
  const dirtyCheck = (p, r) => {
    return entitiesToAvoid.some((e) => {
      return (
        Math.abs(p.x - e.x) < r + e.size && Math.abs(p.y - e.y) < r + e.size
      );
    });
  };
  const grid = new hshg.HSHG();
  var entitiesIdLog = 0;
  var entities = [];
  const purgeEntities = () => {
    entities = entities.filter((e) => {
      return !e.isGhost;
    });
  };

  var bringToLife = (() => {
    let remapTarget = (i, ref, self) => {
      if (i.target == null || (!i.main && !i.alt)) return undefined;
      return {
        x: i.target.x + ref.x - self.x,
        y: i.target.y + ref.y - self.y,
      };
    };
    let passer = (a, b, acceptsFromTop) => {
      return (index) => {
        if (
          a != null &&
          a[index] != null &&
          (b[index] == null || acceptsFromTop)
        ) {
          b[index] = a[index];
        }
      };
    };
    return (my) => {
      // Size
      if (my.SIZE - my.coreSize) my.coreSize += (my.SIZE - my.coreSize) / 100;
      // Think
      let faucet =
        my.settings.independent || my.source == null || my.source === my
          ? {}
          : my.source.control;
      let b = {
        target: remapTarget(faucet, my.source, my),
        goal: undefined,
        fire: faucet.fire,
        main: faucet.main,
        alt: faucet.alt,
        power: undefined,
      };
      // Seek attention
      if (my.settings.attentionCraver && !faucet.main && my.range) {
        my.range -= 1;
      }
      // Invisibility

      if (my.invisible[1]) {
        my.alpha = Math.max(0, my.alpha - my.invisible[1]);
        if (
          !(
            my.velocity.x * my.velocity.x + my.velocity.y * my.velocity.y <
            0.15 * 0.15
          ) ||
          my.damageReceived
        )
          my.alpha = Math.min(1, my.alpha + my.invisible[0]);
      }
      /*if (my.invisible[1]) {
      my.alpha = Math.max(0.001, my.alpha - my.invisible[1]);
      if (
        !(
          my.velocity.x * my.velocity.x + my.velocity.y * my.velocity.y <
          0.25 * 0.15
        ) ||
        my.damageRecieved
      ) {
        //my.alpha = Math.min(1, my.alpha + my.invisible[0]);
        my.alpha < 1 ? (my.alpha += 0.1) : [];
        my.dangerValue = 7; // Make it danger in AIs eyes so the AIs can attack it
      } else {
        if (my.alpha > 0.2) {
          my.dangerValue = -1; // when you invisible, the danger will be -1, that means the AIs will skip you and attack other things
        }
      }
    } else my.alpha = 1;*/
      /*if (my.transparency[1]) {
      my.alpha = Math.max(0.001, my.alpha - my.transparency[1]);
      if (
        !(
          my.velocity.x * my.velocity.x + my.velocity.y * my.velocity.y <
          0.25 * 0.15
        ) ||
        my.damageRecieved
      ) {
        //my.alpha = Math.min(1, my.alpha + my.transparency[0]);
        my.alpha < 1 ? (my.alpha += 0.1) : [];
        my.dangerValue = 7; // Make it danger in AIs eyes so the AIs can attack it
      } else {
        if (my.alpha > 0.2) {
          my.dangerValue = -1; // when you invisible, the danger will be -1, that means the AIs will skip you and attack other things
        }
      }
    } else my.alpha = 1;*/
      // So we start with my master's thoughts and then we filter them down through our control stack
      my.controllers.forEach((AI) => {
        let a = AI.think(b);
        let passValue = passer(a, b, AI.acceptsFromTop);
        passValue("target");
        passValue("goal");
        passValue("fire");
        passValue("main");
        passValue("alt");
        passValue("power");
      });
      my.control.target = b.target == null ? my.control.target : b.target;
      my.control.goal = b.goal;
      my.control.fire = b.fire;
      my.control.main = b.main;
      my.control.alt = b.alt;
      my.control.power = b.power == null ? 1 : b.power;
      // React
      my.move();
      my.face();
      // Handle guns and turrets if we've got them
      my.guns.forEach((gun) => gun.live());
      my.turrets.forEach((turret) => turret.life());
      if (my.skill.maintain()) my.refreshBodyAttributes();
    };
  })();

  class HealthType {
    constructor(health, type, resist = 0) {
      this.max = health;
      this.amount = health;
      this.type = type;
      this.resist = resist;
      this.regen = 0;
    }

    set(health, regen = 0) {
      this.amount = this.max ? (this.amount / this.max) * health : health;
      this.max = health;
      this.regen = regen;
    }

    display() {
      return this.max > 0 ? this.amount / this.max : -1;
    }

    getDamage(amount, capped = true) {
      switch (this.type) {
        case "dynamic":
          return capped
            ? Math.min(amount * this.permeability, this.amount)
            : amount * this.permeability;
        case "static":
          return capped ? Math.min(amount, this.amount) : amount;
      }
    }

    regenerate(boost = false) {
      boost /= 2;
      let cons = 5;
      switch (this.type) {
        case "static":
          if (this.amount >= this.max || !this.amount) break;
          this.amount += cons * (this.max / 10 / 60 / 2.5 + boost);
          break;
        case "dynamic":
          let r = util.clamp(this.amount / this.max, 0, 1);
          if (!r) {
            this.amount = 0.0001;
          }
          if (r === 1) {
            this.amount = this.max;
          } else {
            this.amount +=
              cons *
              ((this.regen *
                Math.exp(-50 * Math.pow(Math.sqrt(0.5 * r) - 0.4, 2))) /
                3 +
                (r * this.max) / 10 / 15 +
                boost);
          }
          break;
      }
      this.amount = util.clamp(this.amount, 0, this.max);
    }

    get permeability() {
      switch (this.type) {
        case "static":
          return 1;
        case "dynamic":
          return this.max ? util.clamp(this.amount / this.max, 0, 1) : 0;
      }
    }

    get ratio() {
      return this.max
        ? util.clamp(1 - Math.pow(this.amount / this.max - 1, 4), 0, 1)
        : 0;
    }
  }

  class Entity {
    constructor(position, master = this) {
      this.isGhost = false;
      this.killCount = { solo: 0, assists: 0, bosses: 0, killers: [] };
      this.creationTime = new Date().getTime();
      // Inheritance
      this.master = master;
      this.source = this;
      this.parent = this;
      this.control = {
        target: new Vector(0, 0),
        goal: new Vector(0, 0),
        main: false,
        alt: false,
        fire: false,
        power: 0,
      };
      this.isInGrid = false;
      this.removeFromGrid = () => {
        if (this.isInGrid) {
          grid.removeObject(this);
          this.isInGrid = false;
        }
      };
      this.addToGrid = () => {
        if (!this.isInGrid && this.bond == null) {
          grid.addObject(this);
          this.isInGrid = true;
        }
      };
      this.activation = (() => {
        let active = true;
        let timer = ran.irandom(15);
        return {
          update: () => {
            if (this.isDead()) return 0;
            // Check if I'm in anybody's view
            if (!active) {
              this.removeFromGrid();
              // Remove bullets and swarm
              if (this.settings.diesAtRange) this.kill();
              // Still have limited update cycles but do it much more slowly.
              if (!timer--) active = true;
            } else {
              this.addToGrid();
              timer = 15;
              active = views.some((v) => v.check(this, 0.6));
            }
          },
          check: () => {
            return active;
          },
        };
      })();
      this.autoOverride = false;
      this.controllers = [];
      this.blend = {
        color: "#FFFFFF",
        amount: 0,
      };
      // Objects
      this.skill = new Skill();
      this.health = new HealthType(1, "static", 0);
      this.shield = new HealthType(0, "dynamic");
      this.guns = [];
      this.turrets = [];
      this.upgrades = [];
      this.settings = {};
      this.aiSettings = {};
      this.children = [];
      // Define it
      this.SIZE = 1;
      this.define(Class.genericEntity);
      //this.upgradeToDread = [Class.dreadnougthOld];
      // Initalize physics and collision
      this.maxSpeed = 0;
      this.facing = 0;
      this.vfacing = 0;
      this.range = 0;
      this.damageRecieved = 0;
      this.stepRemaining = 1;
      this.x = position.x;
      this.y = position.y;
      this.cameraOverrideX = null;
      this.cameraOverrideY = null;
      this.velocity = new Vector(0, 0);
      this.accel = new Vector(0, 0);
      this.damp = 0.05;
      this.collisionArray = [];
      this.invuln = false;
      this.alpha = 1;
      this.killbullet = false;
      this.transparency = 0;
      // this.kill();
      this.invisible = [0, 0];
      this.skill.points = 0;
      this.randomtype = ran.choose([]);
      // Get a new unique id
      this.id = entitiesIdLog++;
      this.team = this.id;
      this.team = master.team;
      // This is for collisions
      this.updateAABB = () => {};
      this.getAABB = (() => {
        let data = {},
          savedSize = 0;
        let getLongestEdge = (x1, y1, x2, y2) => {
          return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
        };
        this.updateAABB = (active) => {
          if (this.bond != null) return 0;
          if (!active) {
            data.active = false;
            return 0;
          }
          // Get bounds
          let x1 =
            Math.min(this.x, this.x + this.velocity.x + this.accel.x) -
            this.realSize -
            5;
          let y1 =
            Math.min(this.y, this.y + this.velocity.y + this.accel.y) -
            this.realSize -
            5;
          let x2 =
            Math.max(this.x, this.x + this.velocity.x + this.accel.x) +
            this.realSize +
            5;
          let y2 =
            Math.max(this.y, this.y + this.velocity.y + this.accel.y) +
            this.realSize +
            5;
          // Size check
          let size = getLongestEdge(x1, y1, x2, y1);
          let sizeDiff = savedSize / size;
          // Update data
          data = {
            min: [x1, y1],
            max: [x2, y2],
            active: true,
            size: size,
          };
          // Update grid if needed
          if (sizeDiff > Math.SQRT2 || sizeDiff < Math.SQRT1_2) {
            this.removeFromGrid();
            this.addToGrid();
            savedSize = data.size;
          }
        };
        return () => {
          return data;
        };
      })();
      this.updateAABB(true);
      entities.push(this); // everything else
      views.forEach((v) => v.add(this));
    }

    life() {
      bringToLife(this);
    }

    addController(newIO) {
      if (Array.isArray(newIO)) {
        this.controllers = newIO.concat(this.controllers);
      } else {
        this.controllers.unshift(newIO);
      }
    }

    define(set) {
      if (set.PARENT != null) {
        for (let i = 0; i < set.PARENT.length; i++) {
          this.define(set.PARENT[i]);
        }
      }
      if (set.KILLBULLET != null) {
        this.killbullet = set.KILLBULLET;
      }
      if (set.index != null) {
        this.index = set.index;
      }
      if (set.NAME != null) {
        this.name = set.NAME;
      }
      if (set.LABEL != null) {
        this.label = set.LABEL;
      }
      if (set.TYPE != null) {
        this.type = set.TYPE;
      }
      if (set.RANDOM_TYPE != null) {
        this.randomtype = set.RANDOM_TYPE;
      }
      if (set.SHAPE != null) {
        this.shape = typeof set.SHAPE === "number" ? set.SHAPE : 0;
        this.shapeData = set.SHAPE;
      }
      if (set.COLOR != null) {
        this.color = set.COLOR;
      }
      if (set.COLOR_OVERRIDE != null) {
        this.colorOverride = set.COLOR_OVERRIDE;
      }
      if (set.CONTROLLERS != null) {
        let toAdd = [];
        set.CONTROLLERS.forEach((ioName) => {
          toAdd.push(eval("new io_" + ioName + "(this)"));
        });
        this.addController(toAdd);
      }
      if (set.MOTION_TYPE != null) {
        this.motionType = set.MOTION_TYPE;
      }
      if (set.FACING_TYPE != null) {
        this.facingType = set.FACING_TYPE;
      }
      if (set.DRAW_HEALTH != null) {
        this.settings.drawHealth = set.DRAW_HEALTH;
      }
      if (set.DRAW_SELF != null) {
        this.settings.drawShape = set.DRAW_SELF;
      }
      if (set.DAMAGE_EFFECTS != null) {
        this.settings.damageEffects = set.DAMAGE_EFFECTS;
      }
      if (set.RATIO_EFFECTS != null) {
        this.settings.ratioEffects = set.RATIO_EFFECTS;
      }
      if (set.MOTION_EFFECTS != null) {
        this.settings.motionEffects = set.MOTION_EFFECTS;
      }
      if (set.ACCEPTS_SCORE != null) {
        this.settings.acceptsScore = set.ACCEPTS_SCORE;
      }
      if (set.GIVE_KILL_MESSAGE != null) {
        this.settings.givesKillMessage = set.GIVE_KILL_MESSAGE;
      }
      if (set.CAN_GO_OUTSIDE_ROOM != null) {
        this.settings.canGoOutsideRoom = set.CAN_GO_OUTSIDE_ROOM;
      }
      if (set.HITS_OWN_TYPE != null) {
        this.settings.hitsOwnType = set.HITS_OWN_TYPE;
      }
      if (set.DIE_AT_LOW_SPEED != null) {
        this.settings.diesAtLowSpeed = set.DIE_AT_LOW_SPEED;
      }
      if (set.DIE_AT_RANGE != null) {
        this.settings.diesAtRange = set.DIE_AT_RANGE;
      }
      if (set.INDEPENDENT != null) {
        this.settings.independent = set.INDEPENDENT;
      }
      if (set.PERSISTS_AFTER_DEATH != null) {
        this.settings.persistsAfterDeath = set.PERSISTS_AFTER_DEATH;
      }
      if (set.CLEAR_ON_MASTER_UPGRADE != null) {
        this.settings.clearOnMasterUpgrade = set.CLEAR_ON_MASTER_UPGRADE;
      }
      if (set.HEALTH_WITH_LEVEL != null) {
        this.settings.healthWithLevel = set.HEALTH_WITH_LEVEL;
      }
      if (set.ACCEPTS_SCORE != null) {
        this.settings.acceptsScore = set.ACCEPTS_SCORE;
      }
      if (set.OBSTACLE != null) {
        this.settings.obstacle = set.OBSTACLE;
      }
      if (set.NECRO != null) {
        this.settings.isNecromancer = set.NECRO;
      }
      if (set.AUTO_UPGRADE != null) {
        this.settings.upgrading = set.AUTO_UPGRADE;
      }
      if (set.HAS_NO_RECOIL != null) {
        this.settings.hasNoRecoil = set.HAS_NO_RECOIL;
      }
      if (set.CRAVES_ATTENTION != null) {
        this.settings.attentionCraver = set.CRAVES_ATTENTION;
      }
      if (set.BROADCAST_MESSAGE != null) {
        this.settings.broadcastMessage =
          set.BROADCAST_MESSAGE === "" ? undefined : set.BROADCAST_MESSAGE;
      }
      if (set.DAMAGE_CLASS != null) {
        this.settings.damageClass = set.DAMAGE_CLASS;
      }
      if (set.BUFF_VS_FOOD != null) {
        this.settings.buffVsFood = set.BUFF_VS_FOOD;
      }
      if (set.CAN_BE_ON_LEADERBOARD != null) {
        this.settings.leaderboardable = set.CAN_BE_ON_LEADERBOARD;
      }
      if (set.INTANGIBLE != null) {
        this.intangibility = set.INTANGIBLE;
      }
      if (set.IS_SMASHER != null) {
        this.settings.reloadToAcceleration = set.IS_SMASHER;
      }
      if (set.STAT_NAMES != null) {
        this.settings.skillNames = set.STAT_NAMES;
      }
      if (set.AI != null) {
        this.aiSettings = set.AI;
      }
      if (set.ALPHA != null) {
        this.alpha = set.ALPHA;
      }
      if (set.TRANSPARENCY != null) {
        this.alpha = set.TRANSPARENCY;
      }
      if (set.INVISIBLE != null) {
        this.invisible = [set.INVISIBLE[0], set.INVISIBLE[1]];
      }
      if (set.DANGER != null) {
        this.dangerValue = set.DANGER;
      }
      if (set.NEXT_FORM != null) {
        this.nextForm = set.NEXT_FORM;
      }
      if (set.VARIES_IN_SIZE != null) {
        this.settings.variesInSize = set.VARIES_IN_SIZE;
        this.squiggle = this.settings.variesInSize
          ? ran.randomRange(0.8, 1.2)
          : 1;
      }
      if (set.RESET_UPGRADES) {
        this.upgrades = [];
      }
      for (let i = 0; i <= c.TIER_13; i++) {
        const upgradeTier = set[`UPGRADES_TIER_${i}`];
        if (upgradeTier != null) {
          upgradeTier.forEach((e) => {
            this.upgrades.push({
              class: e,
              tier: i,
              level: c[`TIER_${i}`],
              index: e.index,
            });
          });
        }
      }
      if (set.SIZE != null) {
        this.SIZE = set.SIZE * this.squiggle;
        if (this.coreSize == null) {
          this.coreSize = this.SIZE;
        }
      }
      if (set.SKILL != null && set.SKILL != []) {
        if (set.SKILL.length != 10) {
          throw "Inappropiate skill raws.";
        }
        this.skill.set(set.SKILL);
      }
      if (set.LEVEL != null) {
        if (set.LEVEL === -1) {
          this.skill.reset();
        }
        while (
          this.skill.level < c.SKILL_CHEAT_CAP &&
          this.skill.level < set.LEVEL
        ) {
          this.skill.score += this.skill.levelScore;
          this.skill.maintain();
        }
        this.refreshBodyAttributes();
      }
      if (set.SKILL_CAP != null && set.SKILL_CAP != []) {
        if (set.SKILL_CAP.length != 10) {
          throw "Inappropiate skill caps.";
        }
        this.skill.setCaps(set.SKILL_CAP);
      }
      if (set.VALUE != null) {
        this.skill.score = Math.max(
          this.skill.score,
          set.VALUE * this.squiggle
        );
      }
      if (set.ALT_ABILITIES != null) {
        this.abilities = set.ALT_ABILITIES;
      }
      if (set.GUNS != null) {
        let newGuns = [];
        set.GUNS.forEach((gundef) => {
          newGuns.push(new Gun(this, gundef));
        });
        this.guns = newGuns;
      }
      if (set.MAX_CHILDREN != null) {
        this.maxChildren = set.MAX_CHILDREN;
      }
      if (set.TEAM != null) {
        this.team = set.TEAM;
      }
      if (set.POINTS != null) {
        this.skill.points = set.POINTS;
      }
      if (set.ALPHA != null) {
        this.alpha = set.ALPHA;
      }
      /*
      if (set.AUTO_KILL != null) {
        this.kill = set.AUTO_KILL;
      }*/
      if (set.FOOD != null) {
        if (set.FOOD.LEVEL != null) {
          this.foodLevel = set.FOOD.LEVEL;
          this.foodCountup = 0;
        }
      }
      if (set.BODY != null) {
        if (set.BODY.ACCELERATION != null) {
          this.ACCELERATION = set.BODY.ACCELERATION;
        }
        if (set.BODY.SPEED != null) {
          this.SPEED = set.BODY.SPEED;
        }
        if (set.BODY.HEALTH != null) {
          this.HEALTH = set.BODY.HEALTH;
        }
        if (set.BODY.RESIST != null) {
          this.RESIST = set.BODY.RESIST;
        }
        if (set.BODY.SHIELD != null) {
          this.SHIELD = set.BODY.SHIELD;
        }
        if (set.BODY.REGEN != null) {
          this.REGEN = set.BODY.REGEN;
        }
        if (set.BODY.DAMAGE != null) {
          this.DAMAGE = set.BODY.DAMAGE;
        }
        if (set.BODY.PENETRATION != null) {
          this.PENETRATION = set.BODY.PENETRATION;
        }
        if (set.BODY.FOV != null) {
          this.FOV = set.BODY.FOV;
        }
        if (set.BODY.RANGE != null) {
          this.RANGE = set.BODY.RANGE;
        }
        if (set.BODY.SHOCK_ABSORB != null) {
          this.SHOCK_ABSORB = set.BODY.SHOCK_ABSORB;
        }
        if (set.BODY.DENSITY != null) {
          this.DENSITY = set.BODY.DENSITY;
        }
        if (set.BODY.STEALTH != null) {
          this.STEALTH = set.BODY.STEALTH;
        }
        if (set.BODY.PUSHABILITY != null) {
          this.PUSHABILITY = set.BODY.PUSHABILITY;
        }
        if (set.BODY.HETERO != null) {
          this.heteroMultiplier = set.BODY.HETERO;
        }
        this.refreshBodyAttributes();
      }
      if (set.TURRETS != null) {
        let o;
        this.turrets.forEach((o) => o.destroy());
        this.turrets = [];
        set.TURRETS.forEach((def) => {
          o = new Entity(this, this.master);
          (Array.isArray(def.TYPE) ? def.TYPE : [def.TYPE]).forEach((type) =>
            o.define(type)
          );
          o.bindToMaster(def.POSITION, this);
        });
      }
      if (set.mockup != null) {
        this.mockup = set.mockup;
      }
    }

    refreshBodyAttributes() {
      let speedReduce = Math.pow(this.size / (this.coreSize || this.SIZE), 1);

      this.acceleration = (c.runSpeed * this.ACCELERATION) / speedReduce;
      if (this.settings.reloadToAcceleration)
        this.acceleration *= this.skill.acl;

      this.topSpeed = (c.runSpeed * this.SPEED * this.skill.mob) / speedReduce;
      if (this.settings.reloadToAcceleration)
        this.topSpeed /= Math.sqrt(this.skill.acl);

      this.health.set(
        ((this.settings.healthWithLevel ? 2 * this.skill.level : 0) +
          this.HEALTH) *
          this.skill.hlt
      );

      this.health.resist = 1 - 1 / Math.max(1, this.RESIST + this.skill.brst);

      this.shield.set(
        ((this.settings.healthWithLevel ? 0.6 * this.skill.level : 0) +
          this.SHIELD) *
          this.skill.shi,
        Math.max(
          0,
          ((this.settings.healthWithLevel ? 0.006 * this.skill.level : 0) + 1) *
            this.REGEN *
            this.skill.rgn
        )
      );

      this.damage = this.DAMAGE * this.skill.atk;

      this.penetration =
        this.PENETRATION + 1.5 * (this.skill.brst + 0.8 * (this.skill.atk - 1));

      if (!this.settings.dieAtRange || !this.range) {
        this.range = this.RANGE;
      }

      this.fov =
        this.FOV * 250 * Math.sqrt(this.size) * (1 + 0.003 * this.skill.level);

      this.density = (1 + 0.08 * this.skill.level) * this.DENSITY;

      this.stealth = this.STEALTH;

      this.pushability = this.PUSHABILITY;
    }

    bindToMaster(position, bond) {
      this.bond = bond;
      this.source = bond;
      this.bond.turrets.push(this);
      this.skill = this.bond.skill;
      this.label = this.bond.label + " " + this.label;
      // It will not be in collision calculations any more nor shall it be seen.
      this.removeFromGrid();
      this.settings.drawShape = false;
      // Get my position.
      this.bound = {};
      this.bound.size = position[0] / 20;
      let _off = new Vector(position[1], position[2]);
      this.bound.angle = (position[3] * Math.PI) / 180;
      this.bound.direction = _off.direction;
      this.bound.offset = _off.length / 10;
      this.bound.arc = (position[4] * Math.PI) / 180;
      // Figure out how we'll be drawn.
      this.bound.layer = position[5];
      // Initalize.
      this.facing = this.bond.facing + this.bound.angle;
      this.facingType = "bound";
      this.motionType = "bound";
      this.move();
    }

    get size() {
      if (this.bond == null)
        return (this.coreSize || this.SIZE) * (1 + this.skill.level / 45);
      return this.bond.size * this.bound.size;
    }

    get mass() {
      return this.density * (this.size * this.size + 1);
    }

    get realSize() {
      return (
        this.size *
        (Math.abs(this.shape) > lazyRealSizes.length
          ? 1
          : lazyRealSizes[Math.abs(this.shape)])
      );
    }

    get m_x() {
      return (this.velocity.x + this.accel.x) / roomSpeed;
    }
    get m_y() {
      return (this.velocity.y + this.accel.y) / roomSpeed;
    }

    camera(tur = false) {
      return {
        type:
          0 +
          tur * 0x01 +
          this.settings.drawHealth * 0x02 +
          (this.type === "tank") * 0x04,
        id: this.id,
        index: this.index,
        x: this.x,
        y: this.y,
        vx: this.velocity.x,
        vy: this.velocity.y,
        size: this.size,
        rsize: this.realSize,
        status: 1,
        health: this.health.display(),
        shield: this.shield.display(),
        alpha: this.alpha,
        facing: this.facing,
        vfacing: this.vfacing,
        twiggle:
          this.facingType === "autospin" ||
          (this.facingType === "locksFacing" && this.control.alt),
        layer:
          this.bond != null
            ? this.bound.layer
            : this.type === "wall"
            ? 11
            : this.type === "food"
            ? 10
            : this.type === "tank"
            ? 5
            : this.type === "crasher"
            ? 1
            : 0,
        color: this.color,
        name: this.name,
        score: this.skill.score,
        guns: this.guns.map((gun) => gun.getLastShot()),
        turrets: this.turrets.map((turret) => turret.camera(true)),
      };
    }

    skillUp(stat) {
      let suc = this.skill.upgrade(stat);
      if (suc) {
        this.refreshBodyAttributes();
        this.guns.forEach(function (gun) {
          gun.syncChildren();
        });
      }
      return suc;
    }

    upgrade(number) {
      if (
        number < this.upgrades.length &&
        this.skill.level >= this.upgrades[number].level
      ) {
        let saveMe = this.upgrades[number].class;
        this.upgrades = [];
        this.define(saveMe);
        this.sendMessage("You have upgraded to " + this.label + ".");
        let ID = this.id;
        entities.forEach((instance) => {
          if (
            instance.settings.clearOnMasterUpgrade &&
            instance.master.id === ID
          ) {
            instance.kill();
          }
        });
        this.skill.update();
        this.refreshBodyAttributes();
      }
    }

    damageMultiplier() {
      switch (this.type) {
        case "swarm":
          return 0.25 + 1.5 * util.clamp(this.range / (this.RANGE + 1), 0, 1);
        default:
          return 1;
      }
    }

    move() {
      let g = {
          x: this.control.goal.x - this.x,
          y: this.control.goal.y - this.y,
        },
        gactive = g.x !== 0 || g.y !== 0,
        engine = {
          x: 0,
          y: 0,
        },
        a = this.acceleration / roomSpeed;
      switch (this.motionType) {
        case "glide":
          this.maxSpeed = this.topSpeed;
          this.damp = 0.05;
          break;
        case "motor":
          this.maxSpeed = 0;
          if (this.topSpeed) {
            this.damp = a / this.topSpeed;
          }
          if (gactive) {
            let len = Math.sqrt(g.x * g.x + g.y * g.y);
            engine = {
              x: (a * g.x) / len,
              y: (a * g.y) / len,
            };
          }
          break;
        case "swarm":
          this.maxSpeed = this.topSpeed;
          let l = util.getDistance({ x: 0, y: 0 }, g) + 1;
          if (gactive && l > this.size) {
            let desiredxspeed = (this.topSpeed * g.x) / l,
              desiredyspeed = (this.topSpeed * g.y) / l,
              turning = Math.sqrt(
                (this.topSpeed * Math.max(1, this.range) + 1) / a
              );
            engine = {
              x: (desiredxspeed - this.velocity.x) / Math.max(5, turning),
              y: (desiredyspeed - this.velocity.y) / Math.max(5, turning),
            };
          } else {
            if (this.velocity.length < this.topSpeed) {
              engine = {
                x: (this.velocity.x * a) / 20,
                y: (this.velocity.y * a) / 20,
              };
            }
          }
          break;
        case "chase":
          if (gactive) {
            let l = util.getDistance({ x: 0, y: 0 }, g);
            if (l > this.size * 2) {
              this.maxSpeed = this.topSpeed;
              let desiredxspeed = (this.topSpeed * g.x) / l,
                desiredyspeed = (this.topSpeed * g.y) / l;
              engine = {
                x: (desiredxspeed - this.velocity.x) * a,
                y: (desiredyspeed - this.velocity.y) * a,
              };
            } else {
              this.maxSpeed = 0;
            }
          } else {
            this.maxSpeed = 0;
          }
          break;
        case "drift":
          this.maxSpeed = 0;
          engine = {
            x: g.x * a,
            y: g.y * a,
          };
          break;
        case "bound":
          let bound = this.bound,
            ref = this.bond;
          this.x =
            ref.x +
            ref.size *
              bound.offset *
              Math.cos(bound.direction + bound.angle + ref.facing);
          this.y =
            ref.y +
            ref.size *
              bound.offset *
              Math.sin(bound.direction + bound.angle + ref.facing);
          this.bond.velocity.x += bound.size * this.accel.x;
          this.bond.velocity.y += bound.size * this.accel.y;
          this.firingArc = [ref.facing + bound.angle, bound.arc / 2];
          nullVector(this.accel);
          this.blend = ref.blend;
          break;
      }
      this.accel.x += engine.x * this.control.power;
      this.accel.y += engine.y * this.control.power;
    }

    face() {
      let t = this.control.target,
        tactive = t.x !== 0 || t.y !== 0,
        oldFacing = this.facing;
      switch (this.facingType) {
        case "autospin":
          this.facing += 0.02 / roomSpeed;
          break;
        case "InverseAutospin":
          this.facing += -0.02 / roomSpeed;
          break;
        case "QuickAutospin":
          this.facing += 0.04 / roomSpeed;
          break;
        case "QuickMoreAutospin":
          this.facing += 0.08 / roomSpeed;
          break;
        case "QuickInverseAutospin":
          this.facing += -0.04 / roomSpeed;
          break;
        case "MoreQuickInverseAutospin":
          this.facing += -0.08 / roomSpeed;
          break;
        case "InverseAutospinTwister":
          this.facing += -0.18 / roomSpeed;
          break;
        case "turnWithSpeed":
          this.facing += ((this.velocity.length / 90) * Math.PI) / roomSpeed;
          break;
        case "withMotion":
          this.facing = this.velocity.direction;
          break;
        case "smoothWithMotion":
        case "looseWithMotion":
          this.facing += util.loopSmooth(
            this.facing,
            this.velocity.direction,
            4 / roomSpeed
          );
          break;
        case "withTarget":
        case "toTarget":
          this.facing = Math.atan2(t.y, t.x);
          break;
        case "locksFacing":
          if (!this.control.alt) this.facing = Math.atan2(t.y, t.x);
          break;
        case "looseWithTarget":
        case "looseToTarget":
        case "smoothToTarget":
          this.facing += util.loopSmooth(
            this.facing,
            Math.atan2(t.y, t.x),
            4 / roomSpeed
          );
          break;
        case "bound":
          let givenangle;
          if (this.control.main) {
            givenangle = Math.atan2(t.y, t.x);
            let diff = util.angleDifference(givenangle, this.firingArc[0]);
            if (Math.abs(diff) >= this.firingArc[1]) {
              givenangle = this.firingArc[0]; // - util.clamp(Math.sign(diff), -this.firingArc[1], this.firingArc[1]);
            }
          } else {
            givenangle = this.firingArc[0];
          }
          this.facing += util.loopSmooth(
            this.facing,
            givenangle,
            4 / roomSpeed
          );
          break;
        case "sinusoidalVelocity":
          if (!this.time) this.time = 0; 
          this.time += 0.1; // Velocidad de oscilación
          let amplitude = 60; // Hace que la onda sea más alta
          let frequency = 0.05; // Mantiene la oscilación estable
          let waveOffset = Math.sin(this.time * frequency) * amplitude;
          let baseDirection = Math.atan2(this.velocity.y, this.velocity.x);
          let newDirection = baseDirection + Math.sin(this.time) * (amplitude / 500);
          let speed = this.velocity.length;
          this.velocity.x = Math.cos(newDirection) * speed;
          this.velocity.y = Math.sin(newDirection) * speed;
          break;
        case "sinusoidalVelocity2":
          if (!this.oscillation) this.oscillation = 0; // Inicializa la oscilación si no existe
          this.oscillation += 0.1; // Ajusta la velocidad de oscilación (más bajo = más lento)
          let angleOffset2 = Math.sin(this.oscillation) * 0.3; // Ajusta la amplitud de la onda
          let baseDirection2 = Math.atan2(this.velocity.y, this.velocity.x); // Dirección actual
          let newDirection2 = baseDirection2 + angleOffset2; // Aplica el desplazamiento en onda
          let speed2 = this.velocity.length; // Mantiene la velocidad constante
          this.velocity.x = Math.cos(newDirection2) * speed2;
          this.velocity.y = Math.sin(newDirection2) * speed2;
          break;

      }
      // Loop
      const TAU = 2 * Math.PI;
      this.facing = ((this.facing % TAU) + TAU) % TAU;
      this.vfacing = util.angleDifference(oldFacing, this.facing) * roomSpeed;
    }

    takeSelfie() {
      this.flattenedPhoto = null;
      this.photo = this.settings.drawShape
        ? this.camera()
        : (this.photo = undefined);
    }

    physics() {
      if (this.accel.x == null || this.velocity.x == null) {
        util.error("Void Error!");
        util.error(this.collisionArray);
        util.error(this.label);
        util.error(this);
        nullVector(this.accel);
        nullVector(this.velocity);
      }
      // Apply acceleration
      this.velocity.x += this.accel.x;
      this.velocity.y += this.accel.y;
      // Reset acceleration
      nullVector(this.accel);
      // Apply motion
      this.stepRemaining = 1;
      this.x += (this.stepRemaining * this.velocity.x) / roomSpeed;
      this.y += (this.stepRemaining * this.velocity.y) / roomSpeed;
    }

    friction() {
      var motion = this.velocity.length,
        excess = motion - this.maxSpeed;
      if (excess > 0 && this.damp) {
        var k = this.damp / roomSpeed,
          drag = excess / (k + 1),
          finalvelocity = this.maxSpeed + drag;
        this.velocity.x = (finalvelocity * this.velocity.x) / motion;
        this.velocity.y = (finalvelocity * this.velocity.y) / motion;
      }
    }

    confinementToTheseEarthlyShackles() {
      if (this.x == null || this.x == null) {
        util.error("Void Error!");
        util.error(this.collisionArray);
        util.error(this.label);
        util.error(this);
        nullVector(this.accel);
        nullVector(this.velocity);
        return 0;
      }
      if (!this.settings.canGoOutsideRoom) {
        this.accel.x -=
          (Math.min(this.x - this.realSize + 50, 0) * c.ROOM_BOUND_FORCE) /
          roomSpeed;
        this.accel.x -=
          (Math.max(this.x + this.realSize - room.width - 50, 0) *
            c.ROOM_BOUND_FORCE) /
          roomSpeed;
        this.accel.y -=
          (Math.min(this.y - this.realSize + 50, 0) * c.ROOM_BOUND_FORCE) /
          roomSpeed;
        this.accel.y -=
          (Math.max(this.y + this.realSize - room.height - 50, 0) *
            c.ROOM_BOUND_FORCE) /
          roomSpeed;
      }
      if (room.gameMode === "tdm" && this.type !== "food") {
        let loc = { x: this.x, y: this.y };
        if (
          (this.team !== -1 && room.isIn("bas1", loc)) ||
          (this.team !== -2 && room.isIn("bas2", loc)) ||
          (this.team !== -3 && room.isIn("bas3", loc)) ||
          (this.team !== -4 && room.isIn("bas4", loc))
        ) {
          {
            this.kill();
          }
        }
      }
      if (room.gameMode === "tdm" && this.type !== "food") {
        let loc = { x: this.x, y: this.y };
        if (
          (this.team !== -1 && room.isIn("bap1", loc)) ||
          (this.team !== -2 && room.isIn("bap2", loc)) ||
          (this.team !== -3 && room.isIn("bap3", loc)) ||
          (this.team !== -4 && room.isIn("bap4", loc))
        ) {
          //{ this.kill(); }
        }
      }
      if (room.gameMode === "tdm" && this.type !== "food") {
        let loc = { x: this.x, y: this.y };
        if (
          (this.team !== -100 && room.isIn("bas5", loc)) ||
          (this.team !== -100 && room.isIn("boss", loc))
        ) {
          //{ this.kill(); }
        }
      }

      if (this.upgradeToDread) {
      }
      if (this.type === "developer" || this.type === "developer") {
        this.skill.points = 10000;
      }
      if (
        this.label === "Mini Arena Closer" ||
        this.label === "Mini Arena Closer"
      ) {
        this.skill.points = 0;
      }


/*function changeRoom(player, newRoom) {
  if (newRoom === "port") {
    // Verificar si hay al menos dos habitaciones "port"
    const portRooms = room.findType("port");
    
    if (portRooms >= 2) {
      // Si hay al menos dos habitaciones "port", mover al jugador a una de ellas
      const randomPortRoom = ran.choose(portRooms);
      player.x = randomPortRoom.x;
      player.y = randomPortRoom.y;
    } else {
      // Si solo hay una habitación "port", mover al jugador a (5000, 5000)
      player.x = 5000;
      player.y = 5000;
    }
  }
}

// Supongamos que esta función maneja el evento cuando un jugador entra en la habitación "port"
function onPlayerEnterPort(player) {
  if (player.type !== "food" && player.type !== "drone" && player.type !== "bullet" &&
      player.type !== "swarm" && player.type !== "miniboss" && player.type !== "wall" &&
      player.type !== "trap") {
    changeRoom(player, "port");
    player.protect();
    player.invuln = true;
  } else if (["minion", "drone", "bullet", "swarm", "trap"].includes(player.type)) {
    // Aplicar la lógica para los tipos específicos
    changeRoom(player, "port");
    player.kill();
  }
}
class Player {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.protected = false;
    this.invuln = false;
    // Otras propiedades del jugador...
  }

  protect() {
    this.protected = true;
    // Lógica adicional para proteger al jugador...
  }

  // Otros métodos del jugador...
}
// Declara la variable antes de usarla
const jugadorEntrante = new Player("player", 100, 100);
// Luego, puedes llamar a la función con este jugador
onPlayerEnterPort(jugadorEntrante);*/

      
      if (c.DREADNOUGHTS_OLD === true) {
        if (
          room.gameMode === "ffa" &&
          this.type !== "food" &&
          this.type !== "dreadnought" &&
          this.type !== "turrets" &&
          this.type !== "drone" &&
          this.type !== "bullet" &&
          this.type !== "swarm" &&
          this.type !== "miniboss" &&
          this.type !== "wall" &&
          this.type !== "trap" &&
          this.type !== "developer"
        ) {
          let loc = { x: this.x, y: this.y };
          //let o = new Entity(room.randomType("cent"));
          if (this.team !== null && room.isIn("cent", loc)) {
            //if (this.level === 150) {
            // Change the class to "dreadnougthOld"
            this.define(Class.dreadnougthOldDef);
            //this.upgrades = [Class.sword, Class.pacifier, Class.invader, Class.centaur];
            this.invisible = [0, 0];

            // Modify any other properties of the player's new class if needed
            this.color = 17;
            // For example, you might want to set the player's body attributes here
            this.refreshBodyAttributes();

            // this.kill();
            //}
          }
        }

        if (
          room.gameMode === "tdm" &&
          this.type !== "food" &&
          this.type !== "dreadnought" &&
          this.type !== "turrets" &&
          this.type !== "drone" &&
          this.type !== "bullet" &&
          this.type !== "swarm" &&
          this.type !== "miniboss" &&
          this.type !== "wall" &&
          this.type !== "trap" &&
          this.type !== "developer"
        ) {
          let loc = { x: this.x, y: this.y };
          //let o = new Entity(room.randomType("cent"));
          if (
            (this.team !== -1 && room.isIn("cent", loc)) ||
            (this.team !== -2 && room.isIn("cent", loc)) ||
            (this.team !== -3 && room.isIn("cent", loc)) ||
            (this.team !== -4 && room.isIn("cent", loc))
          ) {
            //if (this.level === 150) {
            // Change the class to "dreadnougthOld"
            this.define(Class.dreadnougthOldDef);
            this.invisible = [0, 0];

            // Modify any other properties of the player's new class if needed
            this.color = 17;
            // For example, you might want to set the player's body attributes here
            this.refreshBodyAttributes();

            // this.kill();
            //}
          }
        }

        if (
          room.gameMode === "3tdm" &&
          this.type !== "food" &&
          this.type !== "dreadnought" &&
          this.type !== "turrets" &&
          this.type !== "drone" &&
          this.type !== "bullet" &&
          this.type !== "swarm" &&
          this.type !== "miniboss" &&
          this.type !== "wall" &&
          this.type !== "trap" &&
          this.type !== "developer"
        ) {
          let loc = { x: this.x, y: this.y };
          //let o = new Entity(room.randomType("cent"));
          if (
            (this.team !== -1 && room.isIn("cent", loc)) ||
            (this.team !== -2 && room.isIn("cent", loc)) ||
            (this.team !== -3 && room.isIn("cent", loc)) ||
            (this.team !== -4 && room.isIn("cent", loc))
          ) {
            //if (this.level === 150) {
            // Change the class to "dreadnougthOld"
            this.define(Class.dreadnougthOldDef);
            //this.upgrades = [Class.sword, Class.pacifier, Class.invader, Class.centaur];
            this.invisible = [0, 0];

            // Modify any other properties of the player's new class if needed
            this.color = 17;
            // For example, you might want to set the player's body attributes here
            this.refreshBodyAttributes();

            // this.kill();
            //}
          }
        }

        if (
          room.gameMode === "2tdm" &&
          this.type !== "food" &&
          this.type !== "dreadnought" &&
          this.type !== "turrets" &&
          this.type !== "drone" &&
          this.type !== "bullet" &&
          this.type !== "swarm" &&
          this.type !== "miniboss" &&
          this.type !== "wall" &&
          this.type !== "trap" &&
          this.type !== "developer"
        ) {
          let loc = { x: this.x, y: this.y };
          //let o = new Entity(room.randomType("cent"));
          if (
            (this.team !== -1 && room.isIn("cent", loc)) ||
            (this.team !== -2 && room.isIn("cent", loc)) ||
            (this.team !== -3 && room.isIn("cent", loc)) ||
            (this.team !== -4 && room.isIn("cent", loc))
          ) {
            //if (this.level === 150) {
            // Change the class to "dreadnougthOld"
            this.define(Class.dreadnougthOldDef);
            //this.upgrades = [Class.sword, Class.pacifier, Class.invader, Class.centaur];
            this.invisible = [0, 0];

            // Modify any other properties of the player's new class if needed
            this.color = 17;
            // For example, you might want to set the player's body attributes here
            this.refreshBodyAttributes();

            // this.kill();
            //}
          }
        }
      }
    }

    contemplationOfMortality() {
      if (this.invuln) {
        this.damageRecieved = 0;
        return 0;
      }
      // Life-limiting effects
      if (this.settings.diesAtRange) {
        this.range -= 1 / roomSpeed;
        if (this.range < 0) {
          this.kill();
        }
      }
      if (this.settings.diesAtLowSpeed) {
        if (
          !this.collisionArray.length &&
          this.velocity.length < this.topSpeed / 2
        ) {
          this.health.amount -= this.health.getDamage(1 / roomSpeed);
        }
      }
      // Shield regen and damage
      if (this.shield.max) {
        if (this.damageRecieved !== 0) {
          let shieldDamage = this.shield.getDamage(this.damageRecieved);
          this.damageRecieved -= shieldDamage;
          this.shield.amount -= shieldDamage;
        }
      }
      // Health damage
      if (this.damageRecieved !== 0) {
        let healthDamage = this.health.getDamage(this.damageRecieved);
        this.blend.amount = 1;
        this.health.amount -= healthDamage;
      }
      this.damageRecieved = 0;

      // Check for death
      if (this.isDead()) {
        // Initalize message arrays
        let killers = [],
          killTools = [],
          notJustFood = false;
        // If I'm a tank, call me a nameless player
        let name =
          this.master.name == ""
            ? this.master.type === "tank"
              ? "a nameless player's " + this.label
              : this.master.type === "miniboss"
              ? "a visiting " + this.label
              : util.addArticle(this.label)
            : this.master.name + "'s " + this.label;
        // Calculate the jackpot
        let jackpot = Math.ceil(
          util.getJackpot(this.skill.score) / this.collisionArray.length
        );
        // Now for each of the things that kill me...
        this.collisionArray.forEach((instance) => {
          if (instance.type === "wall") return 0;
          if (instance.master.settings.acceptsScore) {
            // If it's not food, give its master the score
            if (
              instance.master.type === "tank" ||
              instance.master.type === "miniboss"
            )
              notJustFood = true;
            instance.master.skill.score += jackpot;
            killers.push(instance.master); // And keep track of who killed me
          } else if (instance.settings.acceptsScore) {
            instance.skill.score += jackpot;
          }
          killTools.push(instance); // Keep track of what actually killed me
        });
        // Remove duplicates
        killers = killers.filter((elem, index, self) => {
          return index == self.indexOf(elem);
        });
        // If there's no valid killers (you were killed by food), change the message to be more passive
        let killText = notJustFood ? "" : "You have been killed by ",
          dothISendAText = this.settings.givesKillMessage;
        killers.forEach((instance) => {
          this.killCount.killers.push(instance.index);
          if (this.type === "tank") {
            if (killers.length > 1) instance.killCount.assists++;
            else instance.killCount.solo++;
          } else if (this.type === "miniboss") instance.killCount.bosses++;
        });
        // Add the killers to our death message, also send them a message
        if (notJustFood) {
          killers.forEach((instance) => {
            if (
              instance.master.type !== "food" &&
              instance.master.type !== "crasher"
            ) {
              killText +=
                instance.name == ""
                  ? killText == ""
                    ? "An unnamed player"
                    : "an unnamed player"
                  : instance.name;
              killText += " and ";
            }
            // Only if we give messages
            if (dothISendAText) {
              instance.sendMessage(
                "You killed " +
                  name +
                  (killers.length > 1 ? " (with some help)." : ".")
              );
            }
          });
          // Prepare the next part of the next
          killText = killText.slice(0, -4);
          killText += "killed you with ";
        }
        // Broadcast
        if (this.settings.broadcastMessage)
          sockets.broadcast(this.settings.broadcastMessage);
        // Add the implements to the message
        killTools.forEach((instance) => {
          killText += util.addArticle(instance.label) + " and ";
        });
        // Prepare it and clear the collision array.
        killText = killText.slice(0, -5);
        if (killText === "You have been killed")
          killText = "You have died a stupid death";
        this.sendMessage(killText + ".");
        // If I'm the leader, broadcast it:
        if (this.id === room.topPlayerID) {
          let usurptText = this.name === "" ? "The leader" : this.name;
          if (notJustFood) {
            usurptText += " has been usurped by";
            killers.forEach((instance) => {
              usurptText += " ";
              usurptText +=
                instance.name === "" ? "an unnamed player" : instance.name;
              usurptText += " and";
            });
            usurptText = usurptText.slice(0, -4);
            usurptText += "!";
          } else {
            usurptText += " fought a polygon... and the polygon won.";
            usurptText += "It is very stupid.";
          }
          sockets.broadcast(usurptText);
        }
        if (this.nextForm) {
          // NEXT_FORMの設定があったら
          let position = {
            x: this.x,
            y: this.y,
          };
          let o = new Entity(position);
          o.define(this.nextForm); // EntityをNEXT_FORMに設定された戦車にする
          o.team = this.team;
          o.master = this.master;
          o.skill = this.skill;
          o.facing = this.facing;
          o.SIZE = this.size;
        }
        // Kill it
        return 1;
      }
      return 0;
    }

    protect() {
      entitiesToAvoid.push(this);
      this.isProtected = true;
    }

    sendMessage(message) {} // Dummy

    kill() {
      this.health.amount = -1;
    }

    destroy() {
      // Remove from the protected entities list
      if (this.isProtected)
        util.remove(entitiesToAvoid, entitiesToAvoid.indexOf(this));
      // Remove from minimap
      let i = minimap.findIndex((entry) => {
        return entry[0] === this.id;
      });
      if (i != -1) util.remove(minimap, i);
      // Remove this from views
      views.forEach((v) => v.remove(this));
      // Remove from parent lists if needed
      if (this.parent != null)
        util.remove(this.parent.children, this.parent.children.indexOf(this));
      // Kill all of its children
      let ID = this.id;
      entities.forEach((instance) => {
        if (instance.source.id === this.id) {
          if (instance.settings.persistsAfterDeath) {
            instance.source = instance;
          } else {
            instance.kill();
          }
        }
        if (instance.parent && instance.parent.id === this.id) {
          instance.parent = null;
        }
        if (instance.master.id === this.id) {
          instance.kill();
          instance.master = instance;
        }
      });
      // Remove everything bound to it
      this.turrets.forEach((t) => t.destroy());
      // Remove from the collision grid
      this.removeFromGrid();
      this.isGhost = true;
    }

    isDead() {
      return this.health.amount <= 0;
    }
  }

  /*** SERVER SETUP ***/
  // Make a speed monitor
  var logs = (() => {
    let logger = (() => {
      // The two basic functions
      function set(obj) {
        obj.time = util.time();
      }
      function mark(obj) {
        obj.data.push(util.time() - obj.time);
      }
      function record(obj) {
        let o = util.averageArray(obj.data);
        obj.data = [];
        return o;
      }
      function sum(obj) {
        let o = util.sumArray(obj.data);
        obj.data = [];
        return o;
      }
      function tally(obj) {
        obj.count++;
      }
      function count(obj) {
        let o = obj.count;
        obj.count = 0;
        return o;
      }
      // Return the logger creator
      return () => {
        let internal = {
          data: [],
          time: util.time(),
          count: 0,
        };
        // Return the new logger
        return {
          set: () => set(internal),
          mark: () => mark(internal),
          record: () => record(internal),
          sum: () => sum(internal),
          count: () => count(internal),
          tally: () => tally(internal),
        };
      };
    })();
    // Return our loggers
    return {
      entities: logger(),
      collide: logger(),
      network: logger(),
      minimap: logger(),
      misc2: logger(),
      misc3: logger(),
      physics: logger(),
      life: logger(),
      selfie: logger(),
      master: logger(),
      activation: logger(),
      loops: logger(),
    };
  })();

  // Essential server requires
  var http = require("http"),
    url = require("url"),
    WebSocket = require("ws"),
    fs = require("fs"),
    mockupJsonData = (() => {
      function rounder(val) {
        if (Math.abs(val) < 0.00001) val = 0;
        return +val.toPrecision(6);
      }
      // Define mocking up functions
      function getMockup(e, positionInfo) {
        return {
          index: e.index,
          name: e.label,
          x: rounder(e.x),
          y: rounder(e.y),
          color: e.color,
          shape: e.shapeData,
          size: rounder(e.size),
          realSize: rounder(e.realSize),
          facing: rounder(e.facing),
          layer: e.layer,
          statnames: e.settings.skillNames,
          position: positionInfo,
          upgrades: e.upgrades.map((r) => ({ tier: r.tier, index: r.index })),
          guns: e.guns.map(function (gun) {
            return {
              offset: rounder(gun.offset),
              direction: rounder(gun.direction),
              length: rounder(gun.length),
              width: rounder(gun.width),
              aspect: rounder(gun.aspect),
              angle: rounder(gun.angle),
            };
          }),
          turrets: e.turrets.map(function (t) {
            let out = getMockup(t, {});
            out.sizeFactor = rounder(t.bound.size);
            out.offset = rounder(t.bound.offset);
            out.direction = rounder(t.bound.direction);
            out.layer = rounder(t.bound.layer);
            out.angle = rounder(t.bound.angle);
            return out;
          }),
        };
      }
      function getDimensions(entities) {
        /* Ritter's Algorithm (Okay it got serious modified for how we start it)
         * 1) Add all the ends of the guns to our list of points needed to be bounded and a couple points for the body of the tank..
         */
        let endpoints = [];
        let pointDisplay = [];
        let pushEndpoints = function (
          model,
          scale,
          focus = { x: 0, y: 0 },
          rot = 0
        ) {
          let s = Math.abs(model.shape);
          let z =
            Math.abs(s) > lazyRealSizes.length ? 1 : lazyRealSizes[Math.abs(s)];
          if (z === 1) {
            // Body (octagon if circle)
            for (let i = 0; i < 2; i += 0.5) {
              endpoints.push({
                x: focus.x + scale * Math.cos(i * Math.PI),
                y: focus.y + scale * Math.sin(i * Math.PI),
              });
            }
          } else {
            // Body (otherwise vertices)
            for (let i = s % 2 ? 0 : Math.PI / s; i < s; i++) {
              let theta = (i / s) * 2 * Math.PI;
              endpoints.push({
                x: focus.x + scale * z * Math.cos(theta),
                y: focus.y + scale * z * Math.sin(theta),
              });
            }
          }
          model.guns.forEach(function (gun) {
            let h =
              gun.aspect > 0
                ? ((scale * gun.width) / 2) * gun.aspect
                : (scale * gun.width) / 2;
            let r = Math.atan2(h, scale * gun.length) + rot;
            let l = Math.sqrt(scale * scale * gun.length * gun.length + h * h);
            let x =
              focus.x +
              scale * gun.offset * Math.cos(gun.direction + gun.angle + rot);
            let y =
              focus.y +
              scale * gun.offset * Math.sin(gun.direction + gun.angle + rot);
            endpoints.push({
              x: x + l * Math.cos(gun.angle + r),
              y: y + l * Math.sin(gun.angle + r),
            });
            endpoints.push({
              x: x + l * Math.cos(gun.angle - r),
              y: y + l * Math.sin(gun.angle - r),
            });
            pointDisplay.push({
              x: x + l * Math.cos(gun.angle + r),
              y: y + l * Math.sin(gun.angle + r),
            });
            pointDisplay.push({
              x: x + l * Math.cos(gun.angle - r),
              y: y + l * Math.sin(gun.angle - r),
            });
          });
          model.turrets.forEach(function (turret) {
            pushEndpoints(
              turret,
              turret.bound.size,
              {
                x: turret.bound.offset * Math.cos(turret.bound.angle),
                y: turret.bound.offset * Math.sin(turret.bound.angle),
              },
              turret.bound.angle
            );
          });
        };
        pushEndpoints(entities, 1);
        // 2) Find their mass center
        let massCenter = { x: 0, y: 0 };
        /*endpoints.forEach(function(point) {
                massCenter.x += point.x;
                massCenter.y += point.y;
            });
            massCenter.x /= endpoints.length;
            massCenter.y /= endpoints.length;*/
        // 3) Choose three different points (hopefully ones very far from each other)
        let chooseFurthestAndRemove = function (furthestFrom) {
          let index = 0;
          if (furthestFrom != -1) {
            let list = new goog.structs.PriorityQueue();
            let d;
            for (let i = 0; i < endpoints.length; i++) {
              let thisPoint = endpoints[i];
              d =
                Math.pow(thisPoint.x - furthestFrom.x, 2) +
                Math.pow(thisPoint.y - furthestFrom.y, 2) +
                1;
              list.enqueue(1 / d, i);
            }
            index = list.dequeue();
          }
          let output = endpoints[index];
          endpoints.splice(index, 1);
          return output;
        };
        let point1 = chooseFurthestAndRemove(massCenter); // Choose the point furthest from the mass center
        let point2 = chooseFurthestAndRemove(point1); // And the point furthest from that
        // And the point which maximizes the area of our triangle (a loose look at this one)
        let chooseBiggestTriangleAndRemove = function (point1, point2) {
          let list = new goog.structs.PriorityQueue();
          let index = 0;
          let a;
          for (let i = 0; i < endpoints.length; i++) {
            let thisPoint = endpoints[i];
            a =
              Math.pow(thisPoint.x - point1.x, 2) +
              Math.pow(thisPoint.y - point1.y, 2) +
              Math.pow(thisPoint.x - point2.x, 2) +
              Math.pow(thisPoint.y - point2.y, 2);
            /* We need neither to calculate the last part of the triangle
             * (because it's always the same) nor divide by 2 to get the
             * actual area (because we're just comparing it)
             */
            list.enqueue(1 / a, i);
          }
          index = list.dequeue();
          let output = endpoints[index];
          endpoints.splice(index, 1);
          return output;
        };
        let point3 = chooseBiggestTriangleAndRemove(point1, point2);
        // 4) Define our first enclosing circle as the one which seperates these three furthest points
        function circleOfThreePoints(p1, p2, p3) {
          let x1 = p1.x;
          let y1 = p1.y;
          let x2 = p2.x;
          let y2 = p2.y;
          let x3 = p3.x;
          let y3 = p3.y;
          let denom = x1 * (y2 - y3) - y1 * (x2 - x3) + x2 * y3 - x3 * y2;
          let xy1 = x1 * x1 + y1 * y1;
          let xy2 = x2 * x2 + y2 * y2;
          let xy3 = x3 * x3 + y3 * y3;
          let x =
            // Numerator
            (xy1 * (y2 - y3) + xy2 * (y3 - y1) + xy3 * (y1 - y2)) / (2 * denom);
          let y =
            // Numerator
            (xy1 * (x3 - x2) + xy2 * (x1 - x3) + xy3 * (x2 - x1)) / (2 * denom);
          let r = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
          let r2 = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
          let r3 = Math.sqrt(Math.pow(x - x3, 2) + Math.pow(y - y3, 2));
          if (r != r2 || r != r3) {
            //util.log('somethings fucky');
          }
          return { x: x, y: y, radius: r };
        }
        let c = circleOfThreePoints(point1, point2, point3);
        pointDisplay = [
          { x: rounder(point1.x), y: rounder(point1.y) },
          { x: rounder(point2.x), y: rounder(point2.y) },
          { x: rounder(point3.x), y: rounder(point3.y) },
        ];
        let centerOfCircle = { x: c.x, y: c.y };
        let radiusOfCircle = c.radius;
        // 5) Check to see if we enclosed everything
        function checkingFunction() {
          for (var i = endpoints.length; i > 0; i--) {
            // Select the one furthest from the center of our circle and remove it
            point1 = chooseFurthestAndRemove(centerOfCircle);
            let vectorFromPointToCircleCenter = new Vector(
              centerOfCircle.x - point1.x,
              centerOfCircle.y - point1.y
            );
            // 6) If we're still outside of this circle build a new circle which encloses the old circle and the new point
            if (vectorFromPointToCircleCenter.length > radiusOfCircle) {
              pointDisplay.push({ x: rounder(point1.x), y: rounder(point1.y) });
              // Define our new point as the far side of the cirle
              let dir = vectorFromPointToCircleCenter.direction;
              point2 = {
                x: centerOfCircle.x + radiusOfCircle * Math.cos(dir),
                y: centerOfCircle.y + radiusOfCircle * Math.sin(dir),
              };
              break;
            }
          }
          // False if we checked everything, true if we didn't
          return !!endpoints.length;
        }
        while (checkingFunction()) {
          // 7) Repeat until we enclose everything
          centerOfCircle = {
            x: (point1.x + point2.x) / 2,
            y: (point1.y + point2.y) / 2,
          };
          radiusOfCircle =
            Math.sqrt(
              Math.pow(point1.x - point2.x, 2) +
                Math.pow(point1.y - point2.y, 2)
            ) / 2;
        }
        // 8) Since this algorithm isn't perfect but we know our shapes are bilaterally symmetrical, we bind this circle along the x-axis to make it behave better
        return {
          middle: { x: rounder(centerOfCircle.x), y: 0 },
          axis: rounder(radiusOfCircle * 2),
          points: pointDisplay,
        };
      }
      // Save them
      let mockupData = [];
      for (let k in Class) {
        try {
          if (!Class.hasOwnProperty(k)) continue;
          let type = Class[k];
          // Create a reference entities which we'll then take an image of.
          let temptank = new Entity({ x: 0, y: 0 });
          temptank.define(type);
          temptank.name = type.LABEL; // Rename it (for the upgrades menu).
          // Fetch the mockup.
          type.mockup = {
            body: temptank.camera(true),
            position: getDimensions(temptank),
          };
          // This is to pass the size information about the mockup that we didn't have until we created the mockup
          type.mockup.body.position = type.mockup.position;
          // Add the new data to the thing.
          mockupData.push(getMockup(temptank, type.mockup.position));
          // Kill the reference entities.
          temptank.destroy();
        } catch (error) {
          util.error(error);
          util.error(k);
          util.error(Class[k]);
        }
      }
      // Remove them
      purgeEntities();
      // Build the function to return
      let writeData = JSON.stringify(mockupData);
      return writeData;
    })();

  let arenaclosed = false;
  //should the arena be closed?
  let shouldclose = false;
  //prevent repeat arena closer spawnings
  //find out whether players can spawn
  let canspawn = true;
  function closeArena() {
    ArenaClosed();
  }
  var loops = 0;
  function ArenaClosed() {
    loops++;
    if (loops < 31) {
      setTimeout(ArenaClosed, 2000);
    }
  }

  let spawnarenacloser = (loc, mode, type) => {
    let o = new Entity(loc);
    o.define(type);
    o.team = mode || -100;
    //o.color = [3][-mode];
  };
  function modeclose() {
    closemode();
  }
  var loops = 0;
  function closemode() {
    arenaclosed = true;
    loops++;
    if (loops < 4) {
      setTimeout(closemode, 1000);
    } else {
      sockets.broadcast("Arena Closed: No Players May Join");
      canspawn = false;
      ArenaClosed();
      if (room.gameMode === "ffa")
        room["norm"].forEach((loc) => {
          spawnarenacloser(
            loc,
            -0,
            ran.choose([Class.Closer, Class.Closer, Class.Closer], 1)
          );
        });
      if (room.gameMode === "tdm")
        room["norm"].forEach((loc) => {
          spawnarenacloser(
            loc,
            -0,
            ran.choose([Class.Closer, Class.Closer, Class.Closer], 1)
          );
        });
    }
  }
  // Websocket behavior
  const sockets = (() => {
    const protocol = require("./lib/fasttalk");
    let clients = [],
      players = [];
    return {
      broadcast: (message) => {
        clients.forEach((socket) => {
          socket.talk("m", message);
        });
      },
      broadcastChatMessage: (message) => {
        clients.forEach((socket) => {
          socket.talk("h", message);
        });
      },
      connect: (() => {
        // Define shared functions
        // Closing the socket
        function close(socket) {
          // Figure out who the player was
          let player = socket.player,
            index = players.indexOf(player);
          // Remove the player if one was created
          if (index != -1) {
            // Kill the body if it exists
            if (player.body != null) {
              player.body.invuln = false;
              setTimeout(() => {
                player.body.kill();
              }, 10000);
            }
            // Disconnect everything
            util.log("[INFO] User " + player.name + " disconnected!");
            sockets.broadcast("User " + player.name + " disconnected!");
            util.remove(players, index);
          } else {
            util.log("[INFO] A player disconnected before entering the game.");
          }
          // Free the view
          util.remove(views, views.indexOf(socket.view));
          // Remove the socket
          util.remove(clients, clients.indexOf(socket));
          util.log(
            "[INFO] Socket closed. Views: " +
              views.length +
              ". Clients: " +
              clients.length +
              "."
          );
          // Verificar si el jugador está en modo AFK
          if (player.body && player.body.isAFK) {
            // El jugador está en modo AFK, no realizar la expulsión
            return;
          }
        }
        // Being kicked
        function kick(socket, reason = "No reason given.") {
          util.warn(reason + " Kicking.");
          socket.lastWords("K");
        }
        // Handle incoming messages
        function incoming(message, socket) {
          // Only accept binary
          if (!(message instanceof ArrayBuffer)) {
            socket.kick("Non-binary packet.");
            return 1;
          }
          // Decode it
          let m = protocol.decode(message);
          // Make sure it looks legit
          if (m === -1) {
            socket.kick("Malformed packet.");
            return 1;
          }
          // Log the message request
          socket.status.requests++;
          // Remember who we are
          let player = socket.player;
          // Handle the request
          switch (m.shift()) {
            case "k":
              {
                // key verification
                if (m.length > 1) {
                  socket.kick("Ill-sized key request.");
                  return 1;
                }
                if (socket.status.verified) {
                  socket.kick("Duplicate player spawn attempt.");
                  return 1;
                }
                socket.talk("w", true);
                if (m.length === 1) {
                  let key = m[0];
                  socket.key = key;
                  util.log("[INFO] A socket was verified with the token: ");
                  util.log(key);
                }
                socket.verified = true;
                util.log("Clients: " + clients.length);
                sockets.broadcast(
                  "An User connected!; Clients: " + clients.length
                );
                /*if (m.length !== 1) { socket.kick('Ill-sized key request.'); return 1; }
                    // Get data
                    // Verify it
                    if (typeof key !== 'string') { socket.kick('Weird key offered.'); return 1; }
                    if (key.length > 64) { socket.kick('Overly-long key offered.'); return 1; }
                    if (socket.status.verified) { socket.kick('Duplicate player spawn attempt.'); return 1; }
                    // Otherwise proceed to check if it's available.
                    if (keys.indexOf(key) != -1) {
                        // Save the key
                        socket.key = key.substr(0, 64);
                        // Make it unavailable
                        util.remove(keys, keys.indexOf(key));
                        socket.verified = true;
                        // Proceed
                        socket.talk('w', true);
                        util.log('[INFO] A socket was verified with the token: '); util.log(key);
                        util.log('Clients: ' + clients.length);
                    } else {
                        // If not, kick 'em (nicely)
                        util.log('[INFO] Invalid player verification attempt.');
                        socket.lastWords('w', false);
                    }*/
              }
              break;
            case "s":
              {
                // spawn request
                if (!socket.status.deceased) {
                  socket.kick("Trying to spawn while already alive.");
                  return 1;
                }
                if (m.length !== 2) {
                  socket.kick("Ill-sized spawn request.");
                  return 1;
                }
                // Get data
                let name = m[0].replace(c.BANNED_CHARACTERS_REGEX, "");
                let needsRoom = m[1];
                // Verify it
                if (typeof name != "string") {
                  socket.kick("Bad spawn request.");
                  return 1;
                }
                if (encodeURI(name).split(/%..|./).length > 48) {
                  socket.kick("Overly-long name.");
                  return 1;
                }
                if (needsRoom !== -1 && needsRoom !== 0) {
                  socket.kick("Bad spawn request.");
                  return 1;
                }
                // Bring to life
                socket.status.deceased = false;
                // Define the player.
                if (players.indexOf(socket.player) != -1) {
                  util.remove(players, players.indexOf(socket.player));
                }
                // Free the old view
                if (views.indexOf(socket.view) != -1) {
                  util.remove(views, views.indexOf(socket.view));
                  socket.makeView();
                }
                socket.player = socket.spawn(name);
                // ===========================================
                // Chat System. Added by gf#9548
                // ===========================================
                socket.player.name = name;
                // Give it the room state
                if (!needsRoom) {
                  socket.talk(
                    "R",
                    room.width,
                    room.height,
                    JSON.stringify(c.ROOM_SETUP),
                    JSON.stringify(util.serverStartTime),
                    roomSpeed
                  );
                }
                // Start the update rhythm immediately
                socket.update(0);
                // Log it
                util.log(
                  "[INFO] " +
                    m[0] +
                    (needsRoom ? " joined" : " rejoined") +
                    " the game! Players: " +
                    players.length
                );
              }
              break;
            // =================================================================================
            // Chat System. Added by gf#9548
            // =================================================================================
            case "h":
              if (!socket.status.deceased) {
                // Basic chat spam control.
                if (util.time() - socket.status.lastChatTime >= 1000) {
                  let sanctuariesSpawnEnabled = false;
                  let bossesSpawnEnabled = false;
                  let foodSpawnEnabled = false;
                  let shouldCloseSocket = false;
                  let loc = { x: this.x, y: this.y };
                  let message = m[0].replace(c.BANNED_CHARACTERS_REGEX, "");
                  let maxLen = 200;
                  let afkCommad = ["AFK"];

                  // Verify it
                  if (typeof message != "string") {
                    socket.kick("Bad chat message request.");
                    return 1;
                  }
                  if (encodeURI(message).split(/%..|./).length > maxLen) {
                    socket.kick("Overly-long chat message.");
                    return 1;
                  }

                  let playerName = socket.player.name
                    ? socket.player.name
                    : "Unnamed";
                  let chatMessage = playerName + ": " + message;
                  /*if (chatMessage = playerName + ": " + "$" + message){
                    chatMessage = ""
                  }*/
                  let trimmedMessage =
                    chatMessage.length > maxLen
                      ? chatMessage.substring(0, maxLen - 3) + "..."
                      : chatMessage.substring(0, maxLen);

                  //sockets.broadcast(trimmedMessage);
                  util.log("[NEW MASSAGE] " + trimmedMessage);

                  // Basic chat spam control.
                  socket.status.lastChatTime = util.time();

                  let commandOutput = "";
                  const commandParts = message.split(" ");
                  const command = commandParts[0];
                  const cantidad = parseInt(commandParts[2]); // La cantidad estará en la tercera posición
                  // commands made by andre 100proo
                  if (message.startsWith("$")) {
                    if (
                      message == "$ help" ||
                      message == "$ h" ||
                      message == "$ Help" ||
                      message == "$ H" ||
                      message == "/ Help" ||
                      message == "/ H" ||
                      message == "/ help" ||
                      message == "/ h" ||
                      message == "/Help" ||
                      message == "/H" ||
                      message == "/help" ||
                      message == "/h"
                    ) {
                      if (socket.key == process.env.SECRET) {
                        player.body.sendMessage(
                          "Note: This is the beta menu, If there are errors, let me know."
                        );
                        player.body.sendMessage(
                          '17.- "$ random colors" is the command to change the colors to random'
                        );
                        player.body.sendMessage(
                          '16.- "$ kill Everyone" is the command that will give you a tank to kill everyone'
                        );
                        player.body.sendMessage(
                          '15.- "$ Spectator" is the command to be a spectator'
                        );
                        player.body.sendMessage(
                          '14.- "$ Ghost" is the command to be transparent'
                        );
                        player.body.sendMessage(
                          '13.- "$ Invisible" is the command to be invisible'
                        );
                        player.body.sendMessage(
                          '12.- "$ Bots + (bots amount)" is the command to change the bots amount in the server'
                        );
                        player.body.sendMessage(
                          '11.- "$ Infinite Score" is the command to obtain infinite score'
                        );
                        player.body.sendMessage(
                          '10.- "$ AFK" is the command to be AFK without being kicked out of the server and to avoid being killed'
                        );
                        player.body.sendMessage(
                          '9.- "$ suicide" is the command to commit suicide'
                        );
                        player.body.sendMessage(
                          '8.- "$ close arena" is the command to close the arena'
                        );
                        player.body.sendMessage(
                          '7.- "$ Sanctuaries disappear" is the command to deactivate the Sanctuaries of food'
                        );
                        player.body.sendMessage(
                          '6.- "$ Sanctuaries Spawn" is the command to activate the Sanctuaries of food'
                        );
                        player.body.sendMessage(
                          '5.- "$ Bosses disappear" is the command to deactivate the Bosses'
                        );
                        player.body.sendMessage(
                          '4.- "$ Bosses Spawn" is the command to activate the Bosses'
                        );
                        player.body.sendMessage(
                          '3.- "$ Food disappear" is the command to deactivate the food'
                        );
                        player.body.sendMessage(
                          '2.- "$ Food Spawn" is the command to activate the food'
                        );
                        player.body.sendMessage(
                          '1.- "help" is the help command'
                        );
                        player.body.sendMessage("This is the help menu:");
                        return 1;
                      }
                      if (socket.key !== process.env.SECRET) {
                        player.body.sendMessage(
                          "Note: This is the beta menu, If there are errors, let me know."
                        );
                        player.body.sendMessage(
                          '7.- "$ Spectator" is the command to be a spectator'
                        );
                        player.body.sendMessage(
                          '6.- "$ Ghost" is the command to be transparent'
                        );
                        player.body.sendMessage(
                          '5.- "$ Invisible" is the command to be invisible'
                        );
                        player.body.sendMessage(
                          '4.- "$ Infinite Score" is the command to obtain infinite score'
                        );
                        player.body.sendMessage(
                          '3.- "$ AFK" is the command to be AFK without being kicked out of the server and to avoid being killed'
                        );
                        player.body.sendMessage(
                          '2.- "$ suicide" is the command to commit suicide'
                        );
                        player.body.sendMessage(
                          '1.- "help" is the help command'
                        );
                        player.body.sendMessage("This is the help menu:");
                        return 1;
                      }
                      return 1;
                    }

                    if (
                      message === "$ Food Spawn" ||
                      message == "$ food Spawn" ||
                      message == "$ Food spawn" ||
                      message == "$ food spawn"
                    ) {
                      if (socket.key == process.env.SECRET) {
                        if (!foodSpawnEnabled) {
                          player.body.sendMessage("You have activated food");
                          sockets.broadcast(playerName + " activated the food");
                          util.log(playerName + " activated the food");
                          c.FOOD_SPAWN = true;
                          foodSpawnEnabled = true;
                        }
                        return 1;
                      }
                      if (socket.key !== process.env.SECRET) {
                        player.body.sendMessage(
                          "You do not have permission to use this command"
                        );
                        return 1;
                      }
                      player.body.sendMessage("You: " + message);
                      return 1;
                    } else if (
                      message === "$ Food disappear" ||
                      message == "$ food disappear" ||
                      message == "$ Food Disappear" ||
                      message == "$ food Disappear"
                    ) {
                      if (socket.key == process.env.SECRET) {
                        player.body.sendMessage("You have disabled food");
                        sockets.broadcast(playerName + " disabled the food");
                        util.log(playerName + " disabled the food");
                        c.FOOD_SPAWN = false;
                        foodSpawnEnabled = false;
                        return 1;
                      }
                      if (socket.key !== process.env.SECRET) {
                        player.body.sendMessage(
                          "You do not have permission to use this command"
                        );
                        return 1;
                      }
                      player.body.sendMessage("You: " + message);
                      return 1;
                    }

                    if (
                      message === "$ Bosses Spawn" ||
                      message == "$ Bosses spawn" ||
                      message == "$ bosses Spawn" ||
                      message == "$ bosses spawn" ||
                      message == "$ boss spawn" ||
                      message == "$ Boss Spawn" ||
                      message == "$ Boss spawn" ||
                      message == "$ boss Spawn"
                    ) {
                      if (socket.key == process.env.SECRET) {
                        if (!bossesSpawnEnabled) {
                          player.body.sendMessage(
                            "You have activated the bosses"
                          );
                          sockets.broadcast(
                            playerName + " activated the bosses"
                          );
                          util.log(playerName + " activated the bosses");
                          c.SPAWN_NORMAL_BOSSES = true;
                          bossesSpawnEnabled = true;
                        }
                        return 1;
                      }
                      if (socket.key !== process.env.SECRET) {
                        player.body.sendMessage(
                          "You do not have permission to use this command"
                        );
                        return 1;
                      }
                      player.body.sendMessage("You: " + message);
                      return 1;
                    } else if (
                      message === "$ Bosses disappear" ||
                      message == "$ Bosses disappear" ||
                      message == "$ bosses Disappear" ||
                      message == "$ Bosses Disappear" ||
                      message == "$ Boss disappear" ||
                      message == "$ Boss Disappear" ||
                      message == "$ boss Disappear" ||
                      message == "$ boss disappear"
                    ) {
                      if (socket.key == process.env.SECRET) {
                        player.body.sendMessage("You have disabled the bosses");
                        sockets.broadcast(playerName + " disabled the bosses");
                        util.log(playerName + " disabled the bosses");
                        c.SPAWN_NORMAL_BOSSES = false;
                        bossesSpawnEnabled = false;
                        return 1;
                      }
                      if (socket.key !== process.env.SECRET) {
                        player.body.sendMessage(
                          "You do not have permission to use this command"
                        );
                        return 1;
                      }
                      player.body.sendMessage("You: " + message);
                      return 1;
                    }

                    if (
                      message === "$ Sanctuaries Spawn" ||
                      message == "$ sanctuaries spawn" ||
                      message == "$ Sanctuaries spawn" ||
                      message == "$ sanctuaries Spawn" ||
                      message == "$ Sanctuary Spawn" ||
                      message == "$ sanctuary Spawn" ||
                      message == "$ Sanctuary spawn" ||
                      message == "$ sanctuary spawn"
                    ) {
                      if (socket.key == process.env.SECRET) {
                        if (!sanctuariesSpawnEnabled) {
                          player.body.sendMessage(
                            "You have activated the sanctuaries"
                          );
                          sockets.broadcast(
                            playerName + " activated the sanctuaries"
                          );
                          util.log(playerName + " activated the sanctuaries");
                          c.SPAWN_SANCTUARIES = true;
                          sanctuariesSpawnEnabled = true;
                        }
                        return 1;
                      }
                      if (socket.key !== process.env.SECRET) {
                        player.body.sendMessage(
                          "You do not have permission to use this command"
                        );
                        return 1;
                      }
                      player.body.sendMessage("You: " + message);
                      return 1;
                    } else if (
                      message === "$ Sanctuaries disappear" ||
                      message == "$ Sanctuaries Disappear" ||
                      message == "$ sanctuaries disappear" ||
                      message == "$ sanctuaries Disappear" ||
                      message == "$ Sanctuary disappear" ||
                      message == "$ Sanctuary Disappear" ||
                      message == "$ sanctuary Disappear" ||
                      message == "$ sanctuary disappear"
                    ) {
                      if (socket.key == process.env.SECRET) {
                        player.body.sendMessage(
                          "You have disabled the sanctuaries"
                        );
                        sockets.broadcast(
                          playerName + " disabled the sanctuaries"
                        );
                        util.log(playerName + " disabled the sanctuaries");
                        c.SPAWN_SANCTUARIES = false;
                        sanctuariesSpawnEnabled = false;
                        return 1;
                      }
                      if (socket.key !== process.env.SECRET) {
                        player.body.sendMessage(
                          "You do not have permission to use this command"
                        );
                        return 1;
                      }
                      player.body.sendMessage("You: " + message);
                      return 1;
                    }

                    if (
                      message == "$ close arena" ||
                      message == "$ Close Arena" ||
                      message == "$ Close arena" ||
                      message == "$ close Arena"
                    ) {
                      if (socket.key == process.env.SECRET) {
                        player.body.sendMessage("you have closed the arena");
                        sockets.broadcast(playerName + " closed the arena");
                        util.log(playerName + " closed the arena");
                        if (arenaclosed === false) {
                          setTimeout(() => closemode(), 5000);
                          setTimeout(() => sockets.broadcast("Closed!"), 10000);
                          setTimeout(() => util.CloseArenas(), 20000);
                        }
                        return 1;
                      }
                      if (socket.key !== process.env.SECRET) {
                        player.body.sendMessage(
                          "You do not have permission to use this command"
                        );
                        return 1;
                      }
                      player.body.sendMessage("You: " + message);
                      return 1;
                    }
                    if (message == "$ suicide" || message == "$ Suicide") {
                      player.body.sendMessage("you have committed suicide");
                      sockets.broadcast(playerName + " have committed suicide");
                      player.body.define(Class.CommitSuicide);
                      util.log(playerName + " have committed suicide");
                      player.body.sendMessage(playerName + ": " + message);
                      return 1;
                    }
                    if (
                      message == "$ AFK" ||
                      message == "$ A" ||
                      message == "$ a" ||
                      message == "$ afk"
                    ) {
                      if (!player.body.isAFK) {
                        // Activar el modo AFK
                        player.body.isAFK = true;

                        // Aplicar controles específicos para el modo AFK
                        player.body.sendMessage("Now you are AFK");
                        sockets.broadcast(playerName + " is now AFK");
                        util.log(playerName + " is now AFK");

                        // Iniciar el bucle solo si no está en modo AFK
                        (function afkLoop() {
                          if (player.body.isAFK) {
                            player.body.protect();
                            player.body.addController(
                              new io_doNothing(player.body, player)
                            );
                            player.body.invuln = true;

                            // Verificar si el jugador no está en modo AFK antes de ejecutar close(socket)
                            if (!player.body.isAFK) {
                              // La variable shouldCloseSocket no es necesaria en este caso
                              close(socket);
                            } else {
                              setTimeout(afkLoop, 1000); // El tiempo está en milisegundos (1 segundo en este caso).
                            }
                          }
                        })();
                      } else {
                        // Desactivar el modo AFK
                        player.body.isAFK = false;

                        // Detener el bucle
                        player.body.sendMessage("Now you are not AFK");
                        sockets.broadcast(playerName + " now is not AFK");
                        util.log(playerName + " now is not AFK");

                        // Restaurar controles normales
                        player.body.protect(false);
                        player.body.addController(
                          new io_listenToPlayer(player.body, player)
                        );
                        player.body.invuln = false;
                      }
                      player.body.sendMessage("You: " + message);
                      return 1;
                    }
                    if (
                      message == "$ Infinite Score" ||
                      message == "$ infinite Score" ||
                      message == "$ Infinite score" ||
                      message == "$ infinite score"
                    ) {
                      player.body.sendMessage(
                        "you have obtained infinite score"
                      );
                      sockets.broadcast(
                        playerName + " has obtained infinite score"
                      );
                      player.body.skill.score = Math.pow(
                        9999999999999,
                        9999999999
                      );
                      util.log(playerName + " have obtained infinite score");
                      player.body.sendMessage("You: " + message);
                      return 1;
                    }
                    if (
                      command === "$" &&
                      commandParts[1] === "Bots" &&
                      !isNaN(cantidad)
                    ) {
                      if (socket.key == process.env.SECRET) {
                        player.body.sendMessage(
                          "You have changed the number of bots to: " + cantidad
                        );
                        sockets.broadcast(
                          playerName +
                            " has changed the number of bots to: " +
                            cantidad
                        );
                        c.BOTS = cantidad;
                        util.log(
                          playerName +
                            " has changed the number of bots to: " +
                            cantidad
                        );
                        return 1;
                      }
                      if (socket.key !== process.env.SECRET) {
                        player.body.sendMessage(
                          "You do not have permission to use this command"
                        );
                        return 1;
                      }
                      player.body.sendMessage("You: " + message);
                      return 1;
                    }
                    if (message == "$ Invisible" || message == "$ invisible") {
                      player.body.sendMessage("you are invisible, stay still");
                      sockets.broadcast(playerName + " is invisible");
                      player.body.invisible = [1, 0.01];
                      util.log(playerName + " is invisible");
                      player.body.sendMessage("You: " + message);
                      return 1;
                    }
                    if (message == "$ Ghost" || message == "$ ghost") {
                      player.body.sendMessage("you are ghost");
                      sockets.broadcast(playerName + " is a ghost");
                      player.body.alpha = 0.1;
                      util.log(playerName + " is a ghost");
                      player.body.sendMessage("You: " + message);
                      return 1;
                    }
                    if (message == "$ Spectator" || message == "$ spectator") {
                      player.body.sendMessage("you are a Spectator");
                      sockets.broadcast(playerName + " is a spectator");
                      player.body.define(Class.spectator);
                      util.log(playerName + " is a spectator");
                      player.body.sendMessage("You: " + message);
                      return 1;
                    }
                    if (
                      message == "$ Random Colors" ||
                      message == "$ random Colors" ||
                      message == "$ Random colors" ||
                      message == "$ random colors"
                    ) {
                      if (socket.key == process.env.SECRET) {
                        player.body.sendMessage(
                          "you have changed the colors to random"
                        );
                        sockets.broadcast(
                          playerName + " has changed the colors to random"
                        );
                        c.RANDOM_COLORS = true;
                        util.log(
                          playerName + " has changed the colors to random"
                        );
                        return 1;
                      }
                      if (socket.key !== process.env.SECRET) {
                        player.body.sendMessage(
                          "You do not have permission to use this command"
                        );
                        return 1;
                      }
                      player.body.sendMessage("You: " + message);
                      return 1;
                    }
                    if (
                      message == "$ kill @e" ||
                      message == "$ kill @E" ||
                      message == "$ kill Everyone" ||
                      message == "$ kill everyone" ||
                      message == "$ Kill @e" ||
                      message == "$ Kill @E" ||
                      message == "$ Kill Everyone" ||
                      message == "$ Kill everyone"
                    ) {
                      if (socket.key == process.env.SECRET) {
                        player.body.define(Class.killeveryone);
                        util.log(playerName + " have used the command for kill everyone");
                        return 1;
                      }
                      if (socket.key !== process.env.SECRET) {
                        player.body.sendMessage(
                          "You do not have permission to use this command"
                        );
                        return 1;
                      }
                      player.body.sendMessage("You: " + message);
                      return 1;
                    }
                    let sizeChangeInterval;

                    if (
                      command === "$" &&
                      commandParts[1] === "size" &&
                      !isNaN(cantidad)
                    ) {
                      const numeroDeSize = parseFloat(commandParts[2]);

                      // Asegúrate de que el tamaño esté dentro de un rango válido (1 a 100)
                      if (numeroDeSize >= 1 && numeroDeSize <= 1000) {
                        // Detén el intervalo anterior si existe
                        clearInterval(sizeChangeInterval);

                        // Cambia el tamaño del jugador
                        player.body.coreSize = numeroDeSize;

                        // Envía mensajes informativos
                        player.body.sendMessage(
                          "You have changed your size to: " + numeroDeSize
                        );
                        sockets.broadcast(
                          playerName + " has changed size to: " + numeroDeSize
                        );
                        util.log(
                          playerName + " has changed size to: " + numeroDeSize
                        );

                        // Inicia un nuevo intervalo para cambiar el tamaño cada segundo
                        sizeChangeInterval = setInterval(() => {
                          // Verifica si la entidad llega a health = 0.1 y detén el intervalo
                          if (player.body.health.amount <= 0.1) {
                            clearInterval(sizeChangeInterval);
                            return;
                          }

                          // Cambia el tamaño del jugador
                          player.body.coreSize = numeroDeSize;
                        }, 1);
                      } else {
                        // Envía un mensaje si el tamaño está fuera del rango válido
                        player.body.sendMessage(
                          "Invalid size. Please choose a size between 1 and 1000."
                        );
                      }
                    }
                    const tankName = message.slice(9).trim(); // Extrae el nombre del tanque
                    if (message == `$ become ${tankName}`) {
                      if (socket.key == process.env.SECRET) {
                       const parts = message.split(" ");
                       if (parts.length < 3) {
                        player.body.sendMessage("Usage: $ become <tank_name>");
                        return 1;
                       }
                       
                       const tankName = parts[2]; // Obtiene el nombre del tanque
                       
                       if (!Class[tankName]) {
                         player.body.sendMessage(`Tank '${tankName}' not found.`);
                         return 1;
                       }
                       
                       player.body.sendMessage(`Transforming into ${tankName}...`);
                       player.body.define(Class[tankName]); // Transforma al jugador
                       sockets.broadcast(`${playerName} has transformed into ${tankName}!`);
                        
                       return 1;
                      }
                      if (socket.key !== process.env.SECRET) {
                        player.body.sendMessage(
                          "You do not have permission to use this command"
                        );
                        return 1;
                      }
                      
                      return 1;
                    }

                    if (
                      message !== "$ Random Colors" ||
                      message !== "$ random Colors" ||
                      message !== "$ Random colors" ||
                      message !== "$ random colors" ||
                      message !== "$ kill @e" ||
                      message !== "$ kill @E" ||
                      message !== "$ kill Everyone" ||
                      message !== "$ kill everyone" ||
                      message !== "$ Kill @e" ||
                      message !== "$ Kill @E" ||
                      message !== "$ Kill Everyone" ||
                      message !== "$ Kill everyone" ||
                      message !== ["$ size" + !isNaN(cantidad)] ||
                      message !== "$ Invisible" ||
                      message !== "$ invisible" ||
                      message !== "$ Ghost" ||
                      message !== "$ ghost" ||
                      message !== "$ Spectator" ||
                      message !== "$ spectator" ||
                      message !== ["$ Bots" + !isNaN(cantidad)] ||
                      message !== "$ help" ||
                      message !== "$ h" ||
                      message !== "$ Help" ||
                      message !== "$ H" ||
                      message !== "/ Help" ||
                      message !== "/ H" ||
                      message !== "/ help" ||
                      message !== "/ h" ||
                      message !== "/Help" ||
                      message !== "/H" ||
                      message !== "/help" ||
                      message !== "/h" ||
                      message !== "$ Food Spawn" ||
                      message !== "$ food Spawn" ||
                      message !== "$ Food spawn" ||
                      message !== "$ food spawn" ||
                      message !== "$ Food disappear" ||
                      message !== "$ food disappear" ||
                      message !== "$ Food Disappear" ||
                      message !== "$ food Disappear" ||
                      message !== "$ Bosses Spawn" ||
                      message !== "$ Bosses spawn" ||
                      message !== "$ bosses Spawn" ||
                      message !== "$ bosses spawn" ||
                      message !== "$ boss spawn" ||
                      message !== "$ Boss Spawn" ||
                      message !== "$ Boss spawn" ||
                      message !== "$ boss Spawn" ||
                      message !== "$ Bosses disappear" ||
                      message !== "$ Bosses disappear" ||
                      message !== "$ bosses Disappear" ||
                      message !== "$ Bosses Disappear" ||
                      message !== "$ Boss disappear" ||
                      message !== "$ Boss Disappear" ||
                      message !== "$ boss Disappear" ||
                      message !== "$ boss disappear" ||
                      message !== "$ Sanctuaries Spawn" ||
                      message !== "$ sanctuaries spawn" ||
                      message !== "$ Sanctuaries spawn" ||
                      message !== "$ sanctuaries Spawn" ||
                      message !== "$ Sanctuary Spawn" ||
                      message !== "$ sanctuary Spawn" ||
                      message !== "$ Sanctuary spawn" ||
                      message !== "$ sanctuary spawn" ||
                      message !== "$ Sanctuaries disappear" ||
                      message !== "$ Sanctuaries Disappear" ||
                      message !== "$ sanctuaries disappear" ||
                      message !== "$ sanctuaries Disappear" ||
                      message !== "$ Sanctuary disappear" ||
                      message !== "$ Sanctuary Disappear" ||
                      message !== "$ sanctuary Disappear" ||
                      message !== "$ sanctuary disappear" ||
                      message !== "$ close arena" ||
                      message !== "$ Close Arena" ||
                      message !== "$ Close arena" ||
                      message !== "$ close Arena" ||
                      message !== "$ AFK" ||
                      message !== "$ A" ||
                      message !== "$ a" ||
                      message !== "$ afk" ||
                      message !== "$ Infinite Score" ||
                      message !== "$ suicide" ||
                      message !== "$ Suicide" ||
                      message !== `$ become ${tankName}`
                    )
                      {
                        commandOutput = "Unknown command";
                        util.log(playerName + " Used an unknown command");
                        player.body.sendMessage("Unknown command");
                      }
                      return 1;
                  } else {
                    // Comando desconocido
                    commandOutput = "";
                    util.log(playerName + " Used an unknown command");
                  }
                  sockets.broadcast(trimmedMessage);
                  return 1;
                }
              }

              break;
            case "S":
              {
                // clock syncing
                if (m.length !== 1) {
                  socket.kick("Ill-sized sync packet.");
                  return 1;
                }
                // Get data
                let synctick = m[0];
                // Verify it
                if (typeof synctick !== "number") {
                  socket.kick("Weird sync packet.");
                  return 1;
                }
                // Bounce it back
                socket.talk("S", synctick, util.time());
              }
              break;
            case "p":
              {
                // ping
                if (m.length !== 1) {
                  socket.kick("Ill-sized ping.");
                  return 1;
                }
                // Get data
                let ping = m[0];
                // Verify it
                if (typeof ping !== "number") {
                  socket.kick("Weird ping.");
                  return 1;
                }
                // Pong
                socket.talk("p", m[0]); // Just pong it right back
                socket.status.lastHeartbeat = util.time();
              }
              break;
            case "d":
              {
                // downlink
                if (m.length !== 1) {
                  socket.kick("Ill-sized downlink.");
                  return 1;
                }
                // Get data
                let time = m[0];
                // Verify data
                if (typeof time !== "number") {
                  socket.kick("Bad downlink.");
                  return 1;
                }
                // The downlink indicates that the client has received an update and is now ready to receive more.
                socket.status.receiving = 0;
                socket.camera.ping = util.time() - time;
                socket.camera.lastDowndate = util.time();
                // Schedule a new update cycle
                // Either fires immediately or however much longer it's supposed to wait per the config.
                socket.update(
                  Math.max(
                    0,
                    1000 / c.networkUpdateFactor -
                      (util.time() - socket.camera.lastUpdate)
                  )
                );
              }
              break;
            case "C":
              {
                // command packet
                if (m.length !== 3) {
                  socket.kick("Ill-sized command packet.");
                  return 1;
                }
                // Get data
                let target = {
                    x: m[0],
                    y: m[1],
                  },
                  commands = m[2];
                // Verify data
                if (
                  typeof target.x !== "number" ||
                  typeof target.y !== "number" ||
                  typeof commands !== "number"
                ) {
                  socket.kick("Weird downlink.");
                  return 1;
                }
                if (commands > 255) {
                  socket.kick("Malformed command packet.");
                  return 1;
                }
                // Put the new target in
                player.target = target;
                // Process the commands
                if (player.command != null && player.body != null) {
                  player.command.up = commands & 1;
                  player.command.down = (commands & 2) >> 1;
                  player.command.left = (commands & 4) >> 2;
                  player.command.right = (commands & 8) >> 3;
                  player.command.lmb = (commands & 16) >> 4;
                  player.command.mmb = (commands & 32) >> 5;
                  player.command.rmb = (commands & 64) >> 6; /*
                  player.command.nmb = (commands & 128) >> 7;
                  player.command.omb = (commands & 256) >> 8;*/
                }
                // Update the thingy
                socket.timeout.set(commands);
              }
              break;
            case "t":
              {
                // player toggle
                if (m.length !== 1) {
                  socket.kick("Ill-sized toggle.");
                  return 1;
                }
                // Get data
                let given = "",
                  tog = m[0];
                // Verify request
                if (typeof tog !== "number") {
                  socket.kick("Weird toggle.");
                  return 1;
                }
                // Decipher what we're supposed to do.
                switch (tog) {
                  case 0:
                    given = "autospin";
                    break;
                  case 1:
                    given = "autofire";
                    break;
                  case 2:
                    given = "override";
                    break;
                  case 3:
                    given = "b"; // reverse tank control
                    break;
                  case 4:
                    given = "v"; // reverse mouse control
                    break;
                  // Kick if it sent us shit.
                  /*default:
                    socket.kick("Bad toggle.");
                    return 1;*/
                }
                // Apply a good request.
                if (player.command != null && player.body != null) {
                  player.command[given] = !player.command[given];
                  // Send a message.
                  player.body.sendMessage(
                    given.charAt(0).toUpperCase() +
                      given.slice(1) +
                      (player.command[given] ? " enabled." : " disabled.")
                  );
                }
              }
              break;
            case "U":
              {
                // upgrade request
                if (m.length !== 1) {
                  socket.kick("Ill-sized upgrade request.");
                  return 1;
                }
                // Get data
                let number = m[0];
                // Verify the request
                if (typeof number != "number" || number < 0) {
                  socket.kick("Bad upgrade request.");
                  return 1;
                }
                // Upgrade it
                if (player.body != null) {
                  player.body.upgrade(number); // Ask to upgrade
                }
              }
              break;
            case "x":
              {
                // skill upgrade request
                if (m.length !== 1) {
                  socket.kick("Ill-sized skill request.");
                  return 1;
                }
                let number = m[0],
                  stat = "";
                // Verify the request
                if (typeof number != "number") {
                  socket.kick("Weird stat upgrade request.");
                  return 1;
                }
                // Decipher it
                switch (number) {
                  case 0:
                    stat = "atk";
                    break;
                  case 1:
                    stat = "hlt";
                    break;
                  case 2:
                    stat = "spd";
                    break;
                  case 3:
                    stat = "str";
                    break;
                  case 4:
                    stat = "pen";
                    break;
                  case 5:
                    stat = "dam";
                    break;
                  case 6:
                    stat = "rld";
                    break;
                  case 7:
                    stat = "mob";
                    break;
                  case 8:
                    stat = "rgn";
                    break;
                  case 9:
                    stat = "shi";
                    break;
                  default:
                    socket.kick("Unknown stat upgrade request.");
                    return 1;
                }
                // Apply it
                if (player.body != null) {
                  player.body.skillUp(stat); // Ask to upgrade a stat
                }
              }
              break;
            case "L":
              {
                // level up cheat
                if (m.length !== 0) {
                  socket.kick("Ill-sized level-up request.");
                  return 1;
                }
                // cheatingbois
                if (player.body != null) {
                  if (
                    player.body.skill.level < c.SKILL_CHEAT_CAP ||
                    (socket.key === process.env.SECRET &&
                      player.body.skill.level < 45) /*
                    (socket.key === process.env.SECRET1 &&
                      player.body.skill.level < 45)*/
                  ) {
                    player.body.skill.score += player.body.skill.levelScore;
                    player.body.skill.maintain();
                    player.body.refreshBodyAttributes();
                  }
                }
              }
              break;
            case "0":
              {
                // testbed cheat
                if (m.length !== 0) {
                  /*socket.kick('Ill-sized testbed request.');*/ return 1;
                }
                // cheatingbois
                if (player.body != null) {
                  if (socket.key === process.env.SECRET) {
                    player.body.define(Class.testbed);
                    player.body.sendMessage("Please do not abuse these tanks.");
                  }
                }
                if (m.length !== 0) {
                  /*socket.kick('Ill-sized testbed request.');*/ return 1;
                }
                // cheatingbois
                if (player.body != null) {
                  if (socket.key === process.env.SECRET1) {
                    player.body.define(Class.testbed);
                    player.body.sendMessage("Please do not abuse these tanks.");
                  }
                } /*
                    if (m.length !== 0) { return 1; }
                    // cheatingbois
                    if (player.body != null) { if (socket.key === process.env.SECRET2) {
                        player.body.define(Class.dreadnougthDef);
                    } }
                    if (m.length !== 0) {  return 1; }
                    // cheatingbois
                    if (player.body != null) { if (socket.key === process.env.SECRET3) {
                        player.body.define(Class.dreadnougthOldDef);
                    } }*/
                if (m.length !== 0) {
                  return 1;
                }
                // cheatingbois
                if (player.body != null) {
                  if (socket.key === process.env.ARMS_RACE_TANKS) {
                    player.body.define(Class.testbed);
                    player.body.sendMessage("Please do not abuse these tanks.");
                  }
                }
              }
              break;
            case "o":
              {
                // Get data
                let given = "",
                  tog = m[0];
                // Apply a good request.
                if (player.command != null && player.body != null) {
                  player.command[given] = !player.command[given];
                  // Send a message.
                  player.body.sendMessage();
                }
              }
              break;
            /*
          case "A":
            {
              // cheatingbois
              if (player.body != null) {
                  switch(player.body.team){
                    case -1:
                      player.body.team = -1;
                      player.body.color = 10;
                      player.body.broadcast = "changed to the team 1";
                      break;
                    case -2:
                      player.body.team = -2;
                      player.body.color = 11;
                      player.body.broadcast = "changed to the team 2";
                      break;
                    case -3:
                      player.body.team = -3;
                      player.body.color = 13;
                      player.body.broadcast = "changed to the team 3";
                      break;
                    case -4:
                      player.body.team = -4;
                      player.body.color = 15;
                      player.body.broadcast = "changed to the team 4";
                      break;
                    case -5:
                      player.body.team = null;
                      //player.body.color = 10;
                      break;
                  }
              }
            }
            break;*/
            //default:
              socket.kick("Bad packet index.");
          }
        }
        // Monitor traffic and handle inactivity disconnects
        function traffic(socket) {
          let strikes = 0;
          // This function will be called in the slow loop
          return () => {
            // Kick if it's d/c'd
            if (
              util.time() - socket.status.lastHeartbeat >
              c.maxHeartbeatInterval
            ) {
              socket.kick("Heartbeat lost.");
              return 0;
            }
            // Add a strike if there's more than 50 requests in a second
            if (socket.status.requests > 50) {
              strikes++;
            } else {
              strikes = 0;
            }
            // Kick if we've had 3 violations in a row
            if (strikes > 3) {
              socket.kick("Socket traffic volume violation!");
              return 0;
            }
            // Reset the requests
            socket.status.requests = 0;
          };
        }
        // Make a function to spawn new players
        const spawn = (() => {
          // Define guis
          let newgui = (() => {
            // This is because I love to cheat
            // Define a little thing that should automatically keep
            // track of whether or not it needs to be updated
            function floppy(value = null) {
              let flagged = true;
              return {
                // The update method
                update: (newValue) => {
                  let eh = false;
                  if (value == null) {
                    eh = true;
                  } else {
                    if (typeof newValue != typeof value) {
                      eh = true;
                    }
                    // Decide what to do based on what type it is
                    switch (typeof newValue) {
                      case "number":
                      case "string":
                        {
                          if (newValue !== value) {
                            eh = true;
                          }
                        }
                        break;
                      case "object": {
                        if (Array.isArray(newValue)) {
                          if (newValue.length !== value.length) {
                            eh = true;
                          } else {
                            for (
                              let i = 0, len = newValue.length;
                              i < len;
                              i++
                            ) {
                              if (newValue[i] !== value[i]) eh = true;
                            }
                          }
                          break;
                        }
                      } // jshint ignore:line
                      default:
                        util.error(newValue);
                        throw new Error("Unsupported type for a floppyvar!");
                    }
                  }
                  // Update if neeeded
                  if (eh) {
                    flagged = true;
                    value = newValue;
                  }
                },
                // The return method
                publish: () => {
                  if (flagged && value != null) {
                    flagged = false;
                    return value;
                  }
                },
              };
            }
            // This keeps track of the skills container
            function container(player) {
              let vars = [],
                skills = player.body.skill,
                out = [],
                statnames = [
                  "atk",
                  "hlt",
                  "spd",
                  "str",
                  "pen",
                  "dam",
                  "rld",
                  "mob",
                  "rgn",
                  "shi",
                ];
              // Load everything (b/c I'm too lazy to do it manually)
              statnames.forEach((a) => {
                vars.push(floppy());
                vars.push(floppy());
                vars.push(floppy());
              });
              return {
                update: () => {
                  let needsupdate = false,
                    i = 0;
                  // Update the things
                  statnames.forEach((a) => {
                    vars[i++].update(skills.title(a));
                    vars[i++].update(skills.cap(a));
                    vars[i++].update(skills.cap(a, true));
                  });
                  /* This is a forEach and not a find because we need
                   * each floppy cyles or if there's multiple changes
                   * (there will be), we'll end up pushing a bunch of
                   * excessive updates long after the first and only
                   * needed one as it slowly hits each updated value
                   */
                  vars.forEach((e) => {
                    if (e.publish() != null) needsupdate = true;
                  });
                  if (needsupdate) {
                    // Update everything
                    statnames.forEach((a) => {
                      out.push(skills.title(a));
                      out.push(skills.cap(a));
                      out.push(skills.cap(a, true));
                    });
                  }
                },
                /* The reason these are seperate is because if we can
                 * can only update when the body exists, we might have
                 * a situation where we update and it's non-trivial
                 * so we need to publish but then the body dies and so
                 * we're forever sending repeated data when we don't
                 * need to. This way we can flag it as already sent
                 * regardless of if we had an update cycle.
                 */
                publish: () => {
                  if (out.length) {
                    let o = out.splice(0, out.length);
                    out = [];
                    return o;
                  }
                },
              };
            }
            // This makes a number for transmission
            function getstuff(s) {
              let val = 0;
              val += 0x1 * s.amount("atk");
              val += 0x10 * s.amount("hlt");
              val += 0x100 * s.amount("spd");
              val += 0x1000 * s.amount("str");
              val += 0x10000 * s.amount("pen");
              val += 0x100000 * s.amount("dam");
              val += 0x1000000 * s.amount("rld");
              val += 0x10000000 * s.amount("mob");
              val += 0x100000000 * s.amount("rgn");
              val += 0x1000000000 * s.amount("shi");
              return val.toString(36);
            }
            // These are the methods
            function update(gui) {
              let b = gui.master.body;
              // We can't run if we don't have a body to look at
              if (!b) return 0;
              gui.bodyid = b.id;
              // Update most things
              gui.fps.update(Math.min(1, (global.fps / roomSpeed / 1000) * 30));
              gui.color.update(gui.master.teamColor);
              gui.label.update(b.index);
              gui.score.update(b.skill.score);
              gui.points.update(b.skill.points);
              // Update the upgrades
              let upgrades = [];
              b.upgrades.forEach(function (e) {
                if (b.skill.level >= e.level) {
                  upgrades.push(e.index);
                }
              });
              gui.upgrades.update(upgrades);
              // Update the stats and skills
              gui.stats.update();
              gui.skills.update(getstuff(b.skill));
              // Update physics
              gui.accel.update(b.acceleration);
              gui.topspeed.update(b.topSpeed);
            }
            function publish(gui) {
              let o = {
                fps: gui.fps.publish(),
                label: gui.label.publish(),
                score: gui.score.publish(),
                points: gui.points.publish(),
                upgrades: gui.upgrades.publish(),
                color: gui.color.publish(),
                statsdata: gui.stats.publish(),
                skills: gui.skills.publish(),
                accel: gui.accel.publish(),
                top: gui.topspeed.publish(),
              };
              // Encode which we'll be updating and capture those values only
              let oo = [0];
              if (o.fps != null) {
                oo[0] += 0x0001;
                oo.push(o.fps || 1);
              }
              if (o.label != null) {
                oo[0] += 0x0002;
                oo.push(o.label);
                oo.push(o.color || gui.master.teamColor);
                oo.push(gui.bodyid);
              }
              if (o.score != null) {
                oo[0] += 0x0004;
                oo.push(o.score);
              }
              if (o.points != null) {
                oo[0] += 0x0008;
                oo.push(o.points);
              }
              if (o.upgrades != null) {
                oo[0] += 0x0010;
                oo.push(o.upgrades.length, ...o.upgrades);
              }
              if (o.statsdata != null) {
                oo[0] += 0x0020;
                oo.push(...o.statsdata);
              }
              if (o.skills != null) {
                oo[0] += 0x0040;
                oo.push(o.skills);
              }
              if (o.accel != null) {
                oo[0] += 0x0080;
                oo.push(o.accel);
              }
              if (o.top != null) {
                oo[0] += 0x0100;
                oo.push(o.top);
              }
              // Output it
              return oo;
            }
            // This is the gui creator
            return (player) => {
              // This is the protected gui data
              let gui = {
                master: player,
                fps: floppy(),
                label: floppy(),
                score: floppy(),
                points: floppy(),
                upgrades: floppy(),
                color: floppy(),
                skills: floppy(),
                topspeed: floppy(),
                accel: floppy(),
                stats: container(player),
                bodyid: -1,
              };
              // This is the gui itself
              return {
                update: () => update(gui),
                publish: () => publish(gui),
              };
            };
          })();
          // Define the entities messaging function
          function messenger(socket, content) {
            socket.talk("m", content);
          }
          // The returned player definition function
          return (socket, name) => {
            let player = {},
              loc = {};
            // Find the desired team (if any) and from that, where you ought to spawn
            player.team = socket.rememberedTeam;
            switch (room.gameMode) {
              case "tdm":
                {
                  // Count how many others there are
                  let census = [1, 1, 1, 1],
                    scoreCensus = [1, 1, 1, 1];
                  players.forEach((p) => {
                    census[p.team - 1]++;
                    if (p.body != null) {
                      scoreCensus[p.team - 1] += p.body.skill.score;
                    }
                  });
                  let possiblities = [];
                  for (let i = 0, m = 0; i < 4; i++) {
                    let v = Math.round(
                      (1000000 * (room["bas" + (i + 1)].length + 1)) /
                        (census[i] + 1) /
                        scoreCensus[i]
                    );
                    if (v > m) {
                      m = v;
                      possiblities = [i];
                    }
                    if (v == m) {
                      possiblities.push(i);
                    }
                  }
                  // Choose from one of the least ones
                  if (player.team == null) {
                    player.team = ran.choose(possiblities) + 1;
                  }
                  // Make sure you're in a base
                  if (room["bas" + player.team].length)
                    do {
                      loc = room.randomType("bas" + player.team);
                    } while (dirtyCheck(loc, 50));
                  else
                    do {
                      loc = room.randomType("boss", "nest");
                    } while (dirtyCheck(loc, 50));
                }
                break;
              case "3tdm":
                {
                  // Count how many others there are
                  let census = [1, 1, 1 /*, 1*/],
                    scoreCensus = [1, 1, 1, 1];
                  players.forEach((p) => {
                    census[p.team - 1]++;
                    if (p.body != null) {
                      scoreCensus[p.team - 1] += p.body.skill.score;
                    }
                  });
                  let possiblities = [];
                  for (let i = 0, m = 0; i < 3; i++) {
                    let v = Math.round(
                      (1000000 * (room["bas" + (i + 1)].length + 1)) /
                        (census[i] + 1) /
                        scoreCensus[i]
                    );
                    if (v > m) {
                      m = v;
                      possiblities = [i];
                    }
                    if (v == m) {
                      possiblities.push(i);
                    }
                  }
                  // Choose from one of the least ones
                  if (player.team == null) {
                    player.team = ran.choose(possiblities) + 1;
                  }
                  // Make sure you're in a base
                  if (room["bas" + player.team].length)
                    do {
                      loc = room.randomType("bas" + player.team);
                    } while (dirtyCheck(loc, 50));
                  else
                    do {
                      loc = room.randomType("boss", "nest");
                    } while (dirtyCheck(loc, 50));
                }
                break;
              case "2tdm":
                {
                  // Count how many others there are
                  let census = [1, 1 /* 1, 1*/],
                    scoreCensus = [1, 1, 1, 1];
                  players.forEach((p) => {
                    census[p.team - 1]++;
                    if (p.body != null) {
                      scoreCensus[p.team - 1] += p.body.skill.score;
                    }
                  });
                  let possiblities = [];
                  for (let i = 0, m = 0; i < 3; i++) {
                    let v = Math.round(
                      (1000000 * (room["bas" + (i + 1)].length + 1)) /
                        (census[i] + 1) /
                        scoreCensus[i]
                    );
                    if (v > m) {
                      m = v;
                      possiblities = [i];
                    }
                    if (v == m) {
                      possiblities.push(i);
                    }
                  }
                  // Choose from one of the least ones
                  if (player.team == null) {
                    player.team = ran.choose(possiblities) + 1;
                  }
                  // Make sure you're in a base
                  if (room["bas" + player.team].length)
                    do {
                      loc = room.randomType("bas" + player.team);
                    } while (dirtyCheck(loc, 50));
                  else
                    do {
                      loc = room.randomType("boss", "nest");
                    } while (dirtyCheck(loc, 50));
                }
                break;
                const NBrooms = ["boss", "nest"];
                let censusRom = ran.choose(NBrooms);
              default:
                /*
                do {
                  loc = room.gaussInverse(5);
                } while (dirtyCheck(loc, 50));*/
                do {
                  loc = room.randomType("boss", "nest");
                } while (dirtyCheck(loc, 50));
            }
            socket.rememberedTeam = player.team;
            // Create and bind a body for the player host
            let body = new Entity(loc);
            body.protect();
            //body.define(Class.car); // Start as a basic tank
            body.define(Class.basic); // Start as a basic tank
            if (socket.key === process.env.SECRET) {
              body.define(Class.testbed);
              body.sendMessage("Please do not abuse these tanks.");
              body.name = name; // Define the name
              body.addController(new io_listenToPlayer(body, player)); // Make it listen
              body.sendMessage = (content) => messenger(socket, content); // Make it speak
              body.invuln = true; // Make it safe
              body.define({ CAN_BE_ON_LEADERBOARD: true });
            }
            if (socket.key === process.env.SECRET2) {
              body.define(Class.dreadnougthDef);
              body.sendMessage("now you're a dreadnought");
              body.name = name; // Define the name
              body.addController(new io_listenToPlayer(body, player)); // Make it listen
              body.sendMessage = (content) => messenger(socket, content); // Make it speak
              body.invuln = true; // Make it safe
              body.define({ CAN_BE_ON_LEADERBOARD: true });
              body.level = 90;
            }
            if (socket.key === process.env.SECRET3) {
              body.define(Class.dreadnougthOldDef);
              body.sendMessage("now you're an old dreadnought");
              body.name = name; // Define the name
              body.addController(new io_listenToPlayer(body, player)); // Make it listen
              body.sendMessage = (content) => messenger(socket, content); // Make it speak
              body.invuln = true; // Make it safe
              body.define({ CAN_BE_ON_LEADERBOARD: true });
              body.level = 150;
            }
            if (socket.key === process.env.ARMS_RACE_TANKS) {
              body.define(Class.testbed);
              //body.sendMessage("now you can see arms race tanks");
              body.name = name; // Define the name
              body.addController(new io_listenToPlayer(body, player)); // Make it listen
              body.sendMessage = (content) => messenger(socket, content); // Make it speak
              body.invuln = true; // Make it safe
              body.define({ CAN_BE_ON_LEADERBOARD: true });
            }
            body.name = name; // Define the name
            // Dev hax
            if (socket.key === "testl" || socket.key === "testk") {
              body.name = "\u200b" + body.name;
              body.define({ CAN_BE_ON_LEADERBOARD: false });
            }
            body.addController(new io_listenToPlayer(body, player)); // Make it listen
            body.sendMessage = (content) => messenger(socket, content); // Make it speak
            body.invuln = true; // Make it safe
            player.body = body;
            // Decide how to color and team the body
            switch (room.gameMode) {
              case "tdm":
                {
                  body.team = -player.team;
                  body.color = [10, 11, 12, 15][player.team - 1];
                }
                break;
              case "3tdm":
                {
                  body.team = -player.team;
                  body.color = [10, 11, 12][player.team - 1];
                }
                break;
              case "2tdm":
                {
                  body.team = -player.team;
                  body.color = [10, 11][player.team - 1];
                }
                break;
              default: {
                body.color = c.RANDOM_COLORS
                  ? ran.choose([
                      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                      17,
                    ])
                  : 12; // red
              }
            }
            // Decide what to do about colors when sending updates and stuff
            player.teamColor =
              !c.RANDOM_COLORS && room.gameMode === "ffa" ? 10 : body.color; // blue

            // Set up the targeting structure
            player.target = {
              x: 0,
              y: 0,
            };
            // Set up the command structure
            player.command = {
              up: false,
              down: false,
              left: false,
              right: false,
              lmb: false,
              mmb: false,
              rmb: false,
              autofire: false,
              autospin: false,
              override: false,
              ReversedMouse: false,
              ReversedTank: false,
              autoguide: false,
            };
            // Set up the recording commands
            player.records = (() => {
              let begin = util.time();
              return () => {
                return [
                  player.body.skill.score,
                  Math.floor((util.time() - begin) / 1000),
                  player.body.killCount.solo,
                  player.body.killCount.assists,
                  player.body.killCount.bosses,
                  player.body.killCount.killers.length,
                  ...player.body.killCount.killers,
                ];
              };
            })();
            // Set up the player's gui
            player.gui = newgui(player);
            // Save the the player
            player.socket = socket;
            players.push(player);
            // Focus on the new player
            socket.camera.x = body.x;
            socket.camera.y = body.y;
            socket.camera.fov = 2000;
            // Mark it as spawned
            socket.status.hasSpawned = true;
            body.sendMessage("Press 'h' to chat");
            body.sendMessage(
              "This isn't a server official. If you've problems, contact me!"
            );
            body.sendMessage("You have spawned! Welcome to the game.");
            body.sendMessage(
              "You will be invulnerable until you move or shoot."
            );
            // Move the client camera
            socket.talk(
              "c",
              socket.camera.x,
              socket.camera.y,
              socket.camera.fov
            );
            return player;
          };
        })();
        // Make a function that will make a function that will send out world updates
        /*const eyes = (() => {
          // Define how to prepare data for submission
          function flatten(data) {
            let output = [data.type]; // We will remove the first entry in the persepective method
            if (data.type & 0x01) {
              output.push(
                // 1: facing
                data.facing,
                // 2: layer
                data.layer
              );
            } else {
              output.push(
                // 1: id
                data.id,
                // 2: index
                data.index,
                // 3: x
                data.x,
                // 4: y
                data.y,
                // 5: vx
                data.vx,
                // 6: vy
                data.vy,
                // 7: size
                data.size,
                // 8: facing
                data.facing,
                // 9: vfacing
                data.vfacing,
                // 10: twiggle
                data.twiggle,
                // 11: layer
                data.layer,
                // 12: color
                data.color,
                // 13: health
                Math.ceil(255 * data.health),
                // 14: shield
                Math.round(255 * data.shield),
                // 15: alpha
                Math.round(255 * data.alpha)
              );
              if (data.type & 0x04) {
                output.push(
                  // 15: name
                  data.name,
                  // 16: score
                  data.score
                );
              }
            }
            // Add the gun data to the array
            let gundata = [data.guns.length];
            data.guns.forEach((lastShot) => {
              gundata.push(lastShot.time, lastShot.power);
            });
            output.push(...gundata);
            // For each turret, add their own output
            let turdata = [data.turrets.length];
            data.turrets.forEach((turret) => {
              turdata.push(...flatten(turret));
            });
            // Push all that to the array
            output.push(...turdata);
            // Return it
            return output;
          }
          function perspective(e, player, data) {
            if (player.body != null) {
              if (player.body.id === e.master.id) {
                data = data.slice(); // So we don't mess up references to the original
                // Set the proper color if it's on our team
                data[12] = player.teamColor;
                // And make it force to our mouse if it ought to
                if (player.command.autospin) {
                  data[10] = 1;
                }
                if (player.command.reversed) {
                  data[10] = 2;
                }
              }
            }
            return data;
          }
          function check(camera, obj) {
            return (
              Math.abs(obj.x - camera.x) <
                camera.fov * 0.6 + 1.5 * obj.size + 100 &&
              Math.abs(obj.y - camera.y) <
                camera.fov * 0.6 * 0.5625 + 1.5 * obj.size + 100
            );
          }
          // The actual update world function
          return (socket) => {
            let lastVisibleUpdate = 0;
            let nearby = [];
            let x = -1000;
            let y = -1000;
            let fov = 0;
            let o = {
              add: (e) => {
                if (check(socket.camera, e)) nearby.push(e);
              },
              remove: (e) => {
                let i = nearby.indexOf(e);
                if (i !== -1) util.remove(nearby, i);
              },
              check: (e, f) => {
                return check(socket.camera, e);
              }, //Math.abs(e.x - x) < e.size + f*fov && Math.abs(e.y - y) < e.size + f*fov; },
              gazeUpon: () => {
                logs.network.set();
                let player = socket.player,
                  camera = socket.camera;
                // If nothing has changed since the last update, wait (approximately) until then to update
                let rightNow = room.lastCycle;
                if (rightNow === camera.lastUpdate) {
                  socket.update(5 + room.cycleSpeed - util.time() + rightNow);
                  return 1;
                }
                // ...elseeeeee...
                // Update the record.
                camera.lastUpdate = rightNow;
                // Get the socket status
                socket.status.receiving++;
                // Now prepare the data to emit
                let setFov = camera.fov;
                // If we are alive, update the camera
                if (player.body != null) {
                  // But I just died...
                  if (player.body.isDead()) {
                    socket.status.deceased = true;
                    // Let the client know it died
                    socket.talk("F", ...player.records());
                    // Remove the body
                    player.body = null;
                  }
                  // I live!
                  else if (player.body.photo) {
                    // Update camera position and motion
                    camera.x = player.body.photo.x;
                    camera.y = player.body.photo.y;
                    camera.vx = player.body.photo.vx;
                    camera.vy = player.body.photo.vy;
                    // Get what we should be able to see
                    setFov = player.body.fov;
                    // Get our body id
                    player.viewId = player.body.id;
                  }
                }
                if (player.body == null) {
                  // u dead bro
                  setFov = 2000;
                }
                // Smoothly transition view size
                camera.fov += Math.max(
                  (setFov - camera.fov) / 30,
                  setFov - camera.fov
                );
                // Update my stuff
                x = camera.x;
                y = camera.y;
                fov = camera.fov;
                // Find what the user can see.
                // Update which entities are nearby
                if (
                  camera.lastUpdate - lastVisibleUpdate >
                  c.visibleListInterval
                ) {
                  // Update our timer
                  lastVisibleUpdate = camera.lastUpdate;
                  // And update the nearby list
                  nearby = entities
                    .map((e) => {
                      if (check(socket.camera, e)) return e;
                    })
                    .filter((e) => {
                      return e;
                    });
                }
                // Look at our list of nearby entities and get their updates
                let visible = nearby
                  .map(function mapthevisiblerealm(e) {
                    if (e.photo) {
                      if (
                        Math.abs(e.x - x) < fov / 2 + 1.5 * e.size &&
                        Math.abs(e.y - y) < (fov / 2) * (9 / 16) + 1.5 * e.size
                      ) {
                        // Grab the photo
                        if (!e.flattenedPhoto)
                          e.flattenedPhoto = flatten(e.photo);
                        return perspective(e, player, e.flattenedPhoto);
                      }
                    }
                  })
                  .filter((e) => {
                    return e;
                  });
                // Spread it for upload
                let numberInView = visible.length,
                  view = [];
                visible.forEach((e) => {
                  view.push(...e);
                });
                // Update the gui
                player.gui.update();
                // Send it to the player
                socket.talk(
                  "u",
                  rightNow,
                  camera.x,
                  camera.y,
                  setFov,
                  camera.vx,
                  camera.vy,
                  ...player.gui.publish(),
                  numberInView,
                  ...view
                );
                // Queue up some for the front util.log if needed
                if (socket.status.receiving < c.networkFrontlog) {
                  socket.update(
                    Math.max(
                      0,
                      1000 / c.networkUpdateFactor -
                        (camera.lastDowndate - camera.lastUpdate),
                      camera.ping / c.networkFrontlog
                    )
                  );
                } else {
                  socket.update(c.networkFallbackTime);
                }
                logs.network.mark();
              },
            };
            views.push(o);
            return o;
          };
        })();*/
        const eyes = (() => {
          // Define how to prepare data for submission
          function flatten(data) {
            let output = [data.type]; // We will remove the first entry in the persepective method
            if (data.type & 0x01) {
              output.push(
                // 1: facing
                data.facing,
                // 2: layer
                data.layer
              );
            } else {
              output.push(
                // 1: id
                data.id,
                // 2: index
                data.index,
                // 3: x
                data.x,
                // 4: y
                data.y,
                // 5: vx
                data.vx,
                // 6: vy
                data.vy,
                // 7: size
                data.size,
                // 8: facing
                data.facing,
                // 9: vfacing
                data.vfacing,
                // 10: twiggle
                data.twiggle,
                // 11: layer
                data.layer,
                // 12: color
                data.color,
                // 13: health
                Math.ceil(255 * data.health),
                // 14: shield
                Math.round(255 * data.shield),
                // 15: alpha
                Math.round(255 * data.alpha)
              );
              if (data.type & 0x04) {
                output.push(
                  // 15: name
                  data.name,
                  // 16: score
                  data.score
                );
              }
            }
            // Add the gun data to the array
            let gundata = [data.guns.length];
            for (let i = 0; i < data.guns.length; i++)
              gundata.push(data.guns[i].time, data.guns[i].power);
            output.push(...gundata);
            // For each turret, add their own output
            let turdata = [data.turrets.length];
            for (let i = 0; i < data.turrets.length; i++)
              turdata.push(...flatten(data.turrets[i]));
            // Push all that to the array
            output.push(...turdata);
            // Return it
            return output;
          }

          function perspective(e, player, data) {
            if (player.body != null) {
              if (player.body.id === e.master.id) {
                data = data.slice(); // So we don't mess up references to the original
                // Set the proper color if it's on our team
                data[12] = player.teamColor; //player.type === "tank" ? player.teamColor : player.body.color;
                // And make it force to our mouse if it ought to
                if (player.command.autospin) {
                  data[10] = 1;
                }
              }
              if (player.body.team === e.source.team && c.GROUPS) {
                // GROUPS
                data = data.slice();
                data[12] = player.teamColor;
              }
            }
            return data;
          }

          function check(camera, obj) {
            let a =
              Math.abs(obj.x - camera.x) <
              camera.fov * 0.6 + 1.5 * obj.size + 100;
            let b =
              Math.abs(obj.y - camera.y) <
              camera.fov * 0.6 * 0.5625 + 1.5 * obj.size + 100;
            return a && b;
          }
          // The actual update world function
          return (socket) => {
            let lastVisibleUpdate = 0;
            let nearby = [];
            let x = -1000;
            let y = -1000;
            let fov = 0;
            let o = {
              add: (e) => {
                if (check(socket.camera, e)) nearby.push(e);
              },
              remove: (e) => {
                let i = nearby.indexOf(e);
                if (i !== -1) util.remove(nearby, i);
              },
              check: (e, f) => {
                return check(socket.camera, e);
              }, //Math.abs(e.x - x) < e.size + f*fov && Math.abs(e.y - y) < e.size + f*fov; },
              gazeUpon: () => {
                logs.network.set();
                let player = socket.player,
                  camera = socket.camera;
                // If nothing has changed since the last update, wait (approximately) until then to update
                let rightNow = room.lastCycle;
                // ...elseeeeee...
                // Update the record.
                camera.lastUpdate = rightNow;
                // Get the socket status
                socket.status.receiving++;
                // Now prepare the data to emit
                let setFov = camera.fov;
                // If we are alive, update the camera
                if (player.body != null) {
                  // But I just died...
                  if (player.body.isDead()) {
                    socket.status.deceased = true;
                    // Let the client know it died
                    socket.talk("F", ...player.records());
                    // Remove the body
                    player.body = null;
                  }
                  // I live!
                  else if (player.body.photo) {
                    // Update camera position and motion
                    camera.x =
                      player.body.cameraOverrideX === null
                        ? player.body.photo.x
                        : player.body.cameraOverrideX;
                    camera.y =
                      player.body.cameraOverrideY === null
                        ? player.body.photo.y
                        : player.body.cameraOverrideY;
                    camera.vx = player.body.photo.vx;
                    camera.vy = player.body.photo.vy;
                    camera.vx = player.body.vx;
                    camera.vy = player.body.vy;
                    // Get what we should be able to see
                    setFov = player.body.fov;
                    // Get our body id
                    player.viewId = player.body.id;
                  }
                }
                if (player.body == null) {
                  // u dead bro
                  setFov = 2000;
                  if (socket.spectateEntity != null) {
                    if (socket.spectateEntity) {
                      camera.x = socket.spectateEntity.x;
                      camera.y = socket.spectateEntity.y;
                    }
                  }
                }
                // Smoothly transition view size
                camera.fov += Math.max(
                  (setFov - camera.fov) / 30,
                  setFov - camera.fov
                );
                // Update my stuff
                x = camera.x;
                y = camera.y;
                fov = camera.fov;
                // Find what the user can see.
                // Update which entities are nearby
                if (
                  camera.lastUpdate - lastVisibleUpdate >
                  c.visibleListInterval
                ) {
                  // Update our timer
                  lastVisibleUpdate = camera.lastUpdate;
                  // And update the nearby list
                  nearby = entities
                    .map((e) => {
                      if (check(socket.camera, e)) return e;
                    })
                    .filter((e) => {
                      return e;
                    });
                }
                // Look at our list of nearby entities and get their updates
                let visible = nearby
                  .map(function mapthevisiblerealm(e) {
                    if (e.photo) {
                      if (
                        Math.abs(e.x - x) < fov / 2 + 1.5 * e.size &&
                        Math.abs(e.y - y) < (fov / 2) * (9 / 16) + 1.5 * e.size
                      ) {
                        // Grab the photo
                        if (!e.flattenedPhoto)
                          e.flattenedPhoto = flatten(e.photo);
                        return perspective(e, player, e.flattenedPhoto);
                      }
                    }
                  })
                  .filter((e) => {
                    return e;
                  });
                // Spread it for upload
                let numberInView = visible.length,
                  view = [];
                for (let instance of visible) {
                  view.push(...instance);
                }

                // Update the gui
                player.gui.update();
                // Send it to the player
                socket.talk(
                  "u",
                  rightNow,
                  camera.x,
                  camera.y,
                  setFov,
                  camera.vx,
                  camera.vy,
                  ...player.gui.publish(),
                  numberInView,
                  ...view
                );
                logs.network.mark();
              },
            };
            views.push(o);
            return o;
          };
        })();
        // Make a function that will send out minimap
        // and leaderboard updates. We'll also start
        // the mm/lb updating loop here. It runs at 1Hz
        // and also kicks inactive sockets
        const broadcast = (() => {
          // This is the public information we need for broadcasting
          let readlb;
          // Define fundamental functions
          let bloquear;
          bloquear;
          const getminimap = (() => {
            let all = {
              walls: [500],
              players: {},
              minibosses: [],
            };
            let updateMaze = () => {
              let walls = (all.walls = []);
              for (let my of entities)
                if (my.type === "wall" && my.alpha > 0.2) {
                  walls.push(
                    my.shape === 4 ? 2 : 1,
                    my.id,
                    util.clamp(Math.floor((256 * my.x) / room.width), 0, 255),
                    util.clamp(Math.floor((256 * my.y) / room.height), 0, 255),
                    my.color,
                    Math.round(my.SIZE)
                  );
                }
            };
            setTimeout(updateMaze, 2500);
            setInterval(updateMaze, 10000);
            setInterval(() => {
              let minimaps = (all.players = {
                [1]: [],
                [2]: [],
                [3]: [],
                [4]: [],
              });
              let minibosses = (all.minibosses = []);
              for (let my of entities)
                if (
                  my.type === "miniboss" ||
                  (my.type === "tank" && my.lifetime)
                ) {
                  minibosses.push(
                    0,
                    my.id,
                    util.clamp(Math.floor((256 * my.x) / room.width), 0, 255),
                    util.clamp(Math.floor((256 * my.y) / room.height), 0, 255),
                    my.color
                  );
                } else if (
                  my.type === "tank" &&
                  -1 >= my.team &&
                  my.team >= -4 &&
                  my.master === my
                ) {
                  minimaps[-my.team].push(
                    0,
                    my.id,
                    util.clamp(Math.floor((256 * my.x) / room.width), 0, 255),
                    util.clamp(Math.floor((256 * my.y) / room.height), 0, 255),
                    my.color
                  );
                }
            }, 250);
            return all;
          })();
          const getleaderboard = (() => {
            let lb = { full: [], updates: [] };
            // We'll reuse these lists over and over again
            let list = [];
            // This puts things in the data structure
            function listify(instance) {
              if (
                instance.settings.leaderboardable &&
                instance.settings.drawShape &&
                (instance.type === "tank" ||
                  instance.killCount.solo ||
                  instance.killCount.assists) /*&&
                (instance.type === "dreadnought" ||
                  instance.killCount.solo ||
                  instance.killCount.assists) &&
                (instance.type === "developer" ||
                  instance.killCount.solo ||
                  instance.killCount.assists)*/
              ) {
                list.push(instance);
              }
            }
            // Build a function to prepare for export
            let flatten = (() => {
              let leaderboard = {};
              // Define our index manager
              let indices = (() => {
                let data = [],
                  removed = [];
                // Provide the index manager methods
                return {
                  flag: () => {
                    for (let index of data) index.status = -1;
                    if (data == null) {
                      data = [];
                    }
                  },
                  cull: () => {
                    removed = [];
                    data = data.filter((index) => {
                      let doit = index.status === -1;
                      if (doit) removed.push(index.id);
                      return !doit;
                    });
                    return removed;
                  },
                  add: (id) => {
                    data.push({ id: id, status: 1 });
                  },
                  stabilize: (id) => {
                    data.find((index) => {
                      return index.id === id;
                    }).status = 0;
                  },
                };
              })();
              // This processes it
              let process = (() => {
                // A helpful thing
                function barcolor(entry) {
                  switch (entry.team) {
                    case -100:
                      return entry.color;
                    case -1:
                      return 10;
                    case -2:
                      return 11;
                    case -3:
                      return 12;
                    case -4:
                      return 15;
                    case -5:
                      return 17;
                    case -6:
                      return entry.color;
                    default: {
                      if (
                        room.gameMode[0] === "2" ||
                        room.gameMode[0] === "3" ||
                        room.gameMode[0] === "4"
                      )
                        return entry.color;
                      return 11;
                    }
                  }
                }
                // A shared (and protected) thing
                function getfull(entry) {
                  return [
                    -entry.id,
                    Math.round(entry.skill.score),
                    entry.index,
                    entry.name,
                    entry.color,
                    barcolor(entry),
                  ];
                }
                return {
                  normal: (entry) => {
                    // Check if the entry is already there
                    let id = entry.id,
                      score = Math.round(entry.skill.score);
                    let lb = leaderboard["_" + id];
                    if (lb != null) {
                      // Unflag it for removal
                      indices.stabilize(id);
                      // Figure out if we need to update anything
                      if (lb.score !== score || lb.index !== entry.index) {
                        // If so, update our record first
                        lb.score = score;
                        lb.index = entry.index;
                        // Return it for broadcasting
                        return [id, score, entry.index];
                      }
                    } else {
                      // Record it
                      indices.add(id);
                      leaderboard["_" + id] = {
                        score: score,
                        name: entry.name,
                        index: entry.index,
                        color: entry.color,
                        bar: barcolor(entry),
                      };
                      // Return it for broadcasting
                      return getfull(entry);
                    }
                  },
                  full: (entry) => getfull(entry),
                };
              })();
              // The flattening functions
              return (data) => {
                // Start
                indices.flag();
                // Flatten the orders
                let orders = data.map(process.normal).filter((e) => e),
                  refresh = data.map(process.full).filter((e) => e),
                  flatorders = [],
                  flatrefresh = [];
                for (let e of orders) flatorders.push(...e);
                for (let e of refresh) flatrefresh.push(...e);
                // Find the stuff to remove
                let removed = indices.cull();
                // Make sure we sync the leaderboard
                for (let id of removed) {
                  delete leaderboard["_" + id];
                }
                return {
                  updates: [
                    removed.length,
                    ...removed,
                    orders.length,
                    ...flatorders,
                  ],
                  full: [-1, refresh.length, ...flatrefresh], // The -1 tells the client it'll be a full refresh
                };
              };
            })();
            // The update function (returns a reader)
            return () => {
              list = [];
              // Sort everything
              for (let e of entities) listify(e);
              // Get the top ten
              let topTen = [];
              for (let i = 0; i < 10 && list.length; i++) {
                let top,
                  is = 0;
                for (let j = 0; j < list.length; j++) {
                  let val = list[j].skill.score;
                  if (val > is) {
                    is = val;
                    top = j;
                  }
                }
                if (is === 0) break;
                topTen.push(list[top]);
                list.splice(top, 1);
              }
              room.topPlayerID = topTen.length ? topTen[0].id : -1;
              // Remove empty values and process it
              lb = flatten(topTen);
              // Return the reader
              return (full) => (full ? lb.full : lb.updates);
            };
          })(); /*bloquear*/
          // Util
          let getBarColor = (entry) => {
            switch (entry.team) {
              case -100:
                return entry.color;
              case -1:
                return 10;
              case -2:
                return 11;
              case -3:
                return 12;
              case -4:
                return 15;
              case -5:
                return 17;
              case -6:
                return entry.color;
              default:
                if (
                  room.gameMode[0] === "2" ||
                  room.gameMode[0] === "3" ||
                  room.gameMode[0] === "4"
                )
                  return entry.color;
                return 11;
            }
          };
          // Delta Calculator
          const Delta = class {
            constructor(dataLength, finder) {
              this.dataLength = dataLength;
              this.finder = finder;
              this.now = finder();
            }
            update() {
              let old = this.now;
              let now = this.finder();
              this.now = now;

              let oldIndex = 0;
              let nowIndex = 0;
              let updates = [];
              let updatesLength = 0;
              let deletes = [];
              let deletesLength = 0;

              while (oldIndex < old.length && nowIndex < now.length) {
                let oldElement = old[oldIndex];
                let nowElement = now[nowIndex];

                if (oldElement.id === nowElement.id) {
                  // update
                  nowIndex++;
                  oldIndex++;

                  let updated = false;
                  for (let i = 0; i < this.dataLength; i++)
                    if (oldElement.data[i] !== nowElement.data[i]) {
                      updated = true;
                      break;
                    }

                  if (updated) {
                    updates.push(nowElement.id, ...nowElement.data);
                    updatesLength++;
                  }
                } else if (oldElement.id < nowElement.id) {
                  // delete
                  deletes.push(oldElement.id);
                  deletesLength++;
                  oldIndex++;
                } else {
                  // create
                  updates.push(nowElement.id, ...nowElement.data);
                  updatesLength++;
                  nowIndex++;
                }
              }

              for (let i = oldIndex; i < old.length; i++) {
                deletes.push(old[i].id);
                deletesLength++;
              }
              for (let i = nowIndex; i < now.length; i++) {
                updates.push(now[i].id, ...now[i].data);
                updatesLength++;
              }

              let reset = [0, now.length];
              for (let element of now) reset.push(element.id, ...element.data);
              let update = [
                deletesLength,
                ...deletes,
                updatesLength,
                ...updates,
              ];
              return { reset, update };
            }
          };
          // Deltas
          let minimapAll = new Delta(5, () => {
            let all = [];
            for (let my of entities)
              if (
                (my.type === "wall" && my.alpha > 0.2) ||
                //my.type === "wall" ||
                my.type === "miniboss" ||
                (my.type === "tank" && my.lifetime) ||
                my.type === "Sanctuaries" // ||
                //my.type === "wall"
                //my.type === "turrets"
              )
                all.push({
                  id: my.id,
                  data: [
                    my.type === "wall" ? (my.shape === 4 ? 2 : 1) : 0,
                    util.clamp(Math.floor((256 * my.x) / room.width), 0, 255),
                    util.clamp(Math.floor((256 * my.y) / room.height), 0, 255),
                    my.color,
                    Math.round(my.SIZE),
                  ],
                });
            return all;
          });
          let minimapTeams = [1, 2, 3, 4].map(
            (team) =>
              new Delta(3, () => {
                let all = [];
                for (let my of entities)
                  if (
                    my.type === "tank" &&
                    my.team === -team &&
                    my.master === my &&
                    !my.lifetime
                  )
                    all.push({
                      id: my.id,
                      data: [
                        util.clamp(
                          Math.floor((256 * my.x) / room.width),
                          0,
                          255
                        ),
                        util.clamp(
                          Math.floor((256 * my.y) / room.height),
                          0,
                          255
                        ),
                        my.color,
                      ],
                    });
                return all;
              })
          );
          let leaderboard = new Delta(5, () => {
            let list = [];
            for (let instance of entities)
              if (
                instance.settings.leaderboardable &&
                instance.settings.drawShape &&
                (instance.type === "tank" ||
                  instance.killCount.solo ||
                  instance.killCount.assists)
              ) {
                list.push(instance);
              }

            let topTen = [];
            for (let i = 0; i < 10 && list.length; i++) {
              let top,
                is = 0;
              for (let j = 0; j < list.length; j++) {
                let val = list[j].skill.score;
                if (val > is) {
                  is = val;
                  top = j;
                }
              }
              if (is === 0) break;
              let entry = list[top];
              topTen.push({
                id: entry.id,
                data: [
                  Math.round(entry.skill.score),
                  entry.index,
                  entry.name,
                  entry.color,
                  getBarColor(entry),
                ],
              });
              list.splice(top, 1);
            }
            room.topPlayerID = topTen.length ? topTen[0].id : -1;

            return topTen.sort((a, b) => a.id - b.id);
          });

          // Periodically give out updates
          let subscribers = [];
          setInterval(() => {
            logs.minimap.set();
            let minimapUpdate = minimapAll.update();
            let minimapTeamUpdates = minimapTeams.map((r) => r.update());
            let leaderboardUpdate = leaderboard.update();
            for (let socket of subscribers) {
              if (!socket.status.hasSpawned) continue;
              let team = minimapTeamUpdates[socket.player.team - 1];
              if (socket.status.needsNewBroadcast) {
                socket.talk(
                  "b",
                  ...minimapUpdate.reset,
                  ...(team ? team.reset : [0, 0]),
                  ...(socket.anon ? [0, 0] : leaderboardUpdate.reset)
                );
                socket.status.needsNewBroadcast = false;
              } else {
                socket.talk(
                  "b",
                  ...minimapUpdate.update,
                  ...(team ? team.update : [0, 0]),
                  ...(socket.anon ? [0, 0] : leaderboardUpdate.update)
                );
              }
            }

            logs.minimap.mark();

            let time = util.time();
            for (let socket of clients) {
              if (socket.timeout.check(time)) socket.lastWords("K");
              if (time - socket.statuslastHeartbeat > c.maxHeartbeatInterval)
                socket.kick("Lost heartbeat.");
            }
          }, 250);

          return {
            subscribe(socket) {
              subscribers.push(socket);
            },
            unsubscribe(socket) {
              let i = subscribers.indexOf(socket);
              if (i !== -1) util.remove(subscribers, i);
            },
          };
        })();
        // Build the returned function
        // This function initalizes the socket upon connection
        return (socket, req) => {
          // Get information about the new connection and verify it
          util.log("A client is trying to connect...");
          // Set it up
          socket.binaryType = "arraybuffer";
          socket.key = "";
          socket.player = { camera: {} };
          socket.timeout = (() => {
            let mem = 0;
            let timer = 0;
            return {
              set: (val) => {
                if (mem !== val) {
                  mem = val;
                  timer = util.time();
                }
              },
              check: (time) => {
                return timer && time - timer > c.maxHeartbeatInterval;
              },
            };
          })();
          // Set up the status container
          socket.status = {
            verified: false,
            receiving: 0,
            deceased: true,
            requests: 0,
            hasSpawned: false,
            needsFullMap: true,
            needsNewBroadcast: true,
            lastHeartbeat: util.time(),
            lastChatTime: util.time(),
          };
          // Set up loops
          socket.loops = (() => {
            let nextUpdateCall = null; // has to be started manually
            let trafficMonitoring = setInterval(() => traffic(socket), 1500);
            broadcast.subscribe(socket);
            // Return the loop methods
            return {
              setUpdate: (timeout) => {
                nextUpdateCall = timeout;
              },
              cancelUpdate: () => {
                clearTimeout(nextUpdateCall);
              },
              terminate: () => {
                clearTimeout(nextUpdateCall);
                clearTimeout(trafficMonitoring);
                broadcast.unsubscribe(socket);
              },
              AFK: () => {},
            };
          })();
          // Set up the camera
          socket.camera = {
            x: undefined,
            y: undefined,
            vx: 0,
            vy: 0,
            lastUpdate: util.time(),
            lastDowndate: undefined,
            fov: 2000,
          };
          // Set up the viewer
          socket.makeView = () => {
            socket.view = eyes(socket);
          };
          socket.makeView();
          // Put the fundamental functions in the socket
          socket.kick = (reason) => kick(socket, reason);
          socket.talk = (...message) => {
            if (socket.readyState === socket.OPEN) {
              socket.send(protocol.encode(message), { binary: true });
            }
          };
          socket.lastWords = (...message) => {
            if (socket.readyState === socket.OPEN) {
              socket.send(protocol.encode(message), { binary: true }, () =>
                setTimeout(() => socket.terminate(), 1000)
              );
            }
          };
          socket.on("message", (message) => incoming(message, socket));
          let player = socket.player;
          socket.on("close", () => {
            /*if(player.body.isAFK){
            };
            if(!player.body.isAFK){*/
            socket.loops.terminate();
            close(socket);
            //};
          });
          socket.on("error", (e) => {
            util.log("[ERROR]:");
            util.error(e);
          });
          // Put the player functions in the socket
          socket.spawn = (name) => {
            return spawn(socket, name);
          };
          // And make an update
          socket.update = (time) => {
            socket.loops.cancelUpdate();
            socket.loops.setUpdate(
              setTimeout(() => {
                socket.view.gazeUpon();
              }, time)
            );
          };
          // Log it
          clients.push(socket);
          util.log("[INFO] New socket opened");
        };
      })(),
    };
  })();

  /**** GAME SETUP ****/
  // Define how the game lives
  // The most important loop. Fast looping.
  var gameloop = (() => {
    // Collision stuff
    let collide = (() => {
      function simplecollide(my, n) {
        let diff = (1 + util.getDistance(my, n) / 2) * roomSpeed;
        let a = my.intangibility ? 1 : my.pushability,
          b = n.intangibility ? 1 : n.pushability,
          c = (0.05 * (my.x - n.x)) / diff,
          d = (0.05 * (my.y - n.y)) / diff;
        my.accel.x += (a / (b + 0.3)) * c;
        my.accel.y += (a / (b + 0.3)) * d;
        n.accel.x -= (b / (a + 0.3)) * c;
        n.accel.y -= (b / (a + 0.3)) * d;
      }
      function firmcollide(my, n, buffer = 0) {
        let item1 = { x: my.x + my.m_x, y: my.y + my.m_y };
        let item2 = { x: n.x + n.m_x, y: n.y + n.m_y };
        let dist = util.getDistance(item1, item2);
        let s1 = Math.max(my.velocity.length, my.topSpeed);
        let s2 = Math.max(n.velocity.length, n.topSpeed);
        let strike1, strike2;
        if (buffer > 0 && dist <= my.realSize + n.realSize + buffer) {
          let repel =
            ((my.acceleration + n.acceleration) *
              (my.realSize + n.realSize + buffer - dist)) /
            buffer /
            roomSpeed;
          my.accel.x += (repel * (item1.x - item2.x)) / dist;
          my.accel.y += (repel * (item1.y - item2.y)) / dist;
          n.accel.x -= (repel * (item1.x - item2.x)) / dist;
          n.accel.y -= (repel * (item1.y - item2.y)) / dist;
        }
        while (dist <= my.realSize + n.realSize && !(strike1 && strike2)) {
          strike1 = false;
          strike2 = false;
          if (my.velocity.length <= s1) {
            my.velocity.x -= (0.05 * (item2.x - item1.x)) / dist / roomSpeed;
            my.velocity.y -= (0.05 * (item2.y - item1.y)) / dist / roomSpeed;
          } else {
            strike1 = true;
          }
          if (n.velocity.length <= s2) {
            n.velocity.x += (0.05 * (item2.x - item1.x)) / dist / roomSpeed;
            n.velocity.y += (0.05 * (item2.y - item1.y)) / dist / roomSpeed;
          } else {
            strike2 = true;
          }
          item1 = { x: my.x + my.m_x, y: my.y + my.m_y };
          item2 = { x: n.x + n.m_x, y: n.y + n.m_y };
          dist = util.getDistance(item1, item2);
        }
      }
      function reflectcollide(wall, bounce) {
        let delt = new Vector(wall.x - bounce.x, wall.y - bounce.y);
        let dist = delt.length;
        let diff = wall.size + bounce.size - dist;
        if (diff > 0) {
          bounce.accel.x -= (diff * delt.x) / dist;
          bounce.accel.y -= (diff * delt.y) / dist;
          return 1;
        }
        return 0;
      }
      function reflectCollide(wall, bounce) {
        //if (bounce.type === ('developer') && bounce.type === ('dreadnought') && bounce.type === ('turrets') || bounce.passThroughWalls)
        if (bounce.type === "developer" || bounce.passThroughWalls) return;
        //if (bounce.type === ('dreadnought') || bounce.passThroughWalls) return;
        if (bounce.type === "turrets" || bounce.passThroughWalls) return;
        if (bounce.type === "atmosphere" || bounce.passThroughWalls) return;
        if (bounce.type === "aura3" || bounce.passThroughWalls) return;
        if (bounce.type === "aura2" || bounce.passThroughWalls) return;
        if (
          bounce.x + bounce.size < wall.x - wall.size ||
          bounce.x - bounce.size > wall.x + wall.size ||
          bounce.y + bounce.size < wall.y - wall.size ||
          bounce.y - bounce.size > wall.y + wall.size
        )
          return 0;
        if (wall.intangibility) return 0;
        let bounceBy =
          bounce.type ===
          ("developer",
          "miniboss",
          "tank",
          "turrets",
          "Sanctuaries",
          "aura2",
          "aura3",
          "atmosphere",
          "dreadnought")
            ? 1.0
            : bounce.type === /*'miniboss',*/ "bobboss"
            ? 2.5
            : 0.1;

        let pushVertical = wall.facing === Math.PI / 2;
        let pushHorizontal = wall.facing === Math.PI;

        // cases:   normal       sided
        // top     C T T T C   C T T T C
        // exposed L I T I R   T T T T T
        //         L L X R R   X X X X X
        // exposed L I B I R   B B B B B
        // bottom  C B B B C   C B B B C
        // C = corner with check
        // I = corner inverse
        // X = push toward nearest side

        let left = bounce.x < wall.x - wall.size;
        let right = bounce.x > wall.x + wall.size;
        let top = bounce.y < wall.y - wall.size;
        let bottom = bounce.y > wall.y + wall.size;

        let leftExposed = bounce.x - bounce.size < wall.x - wall.size;
        let rightExposed = bounce.x + bounce.size > wall.x + wall.size;
        let topExposed = bounce.y - bounce.size < wall.y - wall.size;
        let bottomExposed = bounce.y + bounce.size > wall.y + wall.size;

        let intersected = true;

        if (left && right) {
          left = right = false;
        }
        if (top && bottom) {
          top = bottom = false;
        }
        if (leftExposed && rightExposed) {
          leftExposed = rightExposed = false;
        }
        if (topExposed && bottomExposed) {
          topExposed = bottomExposed = false;
        }

        if (pushVertical) {
          left = leftExposed = false;
          right = rightExposed = false;
          top = topExposed = bounce.y < wall.y;
          bottom = bottomExposed = bounce.y > wall.y;
          bounceBy *= 0.2;
        } else if (pushHorizontal) {
          top = topExposed = false;
          bottom = bottomExposed = false;
          left = leftExposed = bounce.x < wall.x;
          right = rightExposed = bounce.x > wall.x;
          bounceBy *= 0.2;
        }

        if (
          (left && !top && !bottom) ||
          (leftExposed && !topExposed && !bottomExposed)
        ) {
          bounce.accel.x -=
            (bounce.x + bounce.size - wall.x + wall.size) * bounceBy;
        } else if (
          (right && !top && !bottom) ||
          (rightExposed && !topExposed && !bottomExposed)
        ) {
          bounce.accel.x -=
            (bounce.x - bounce.size - wall.x - wall.size) * bounceBy;
        } else if (
          (top && !left && !right) ||
          (topExposed && !leftExposed && !rightExposed)
        ) {
          bounce.accel.y -=
            (bounce.y + bounce.size - wall.y + wall.size) * bounceBy;
        } else if (
          (bottom && !left && !right) ||
          (bottomExposed && !leftExposed && !rightExposed)
        ) {
          bounce.accel.y -=
            (bounce.y - bounce.size - wall.y - wall.size) * bounceBy;
        } else {
          let x = leftExposed ? -wall.size : rightExposed ? wall.size : 0;
          let y = topExposed ? -wall.size : bottomExposed ? wall.size : 0;

          let point = new Vector(wall.x + x - bounce.x, wall.y + y - bounce.y);

          if (!x || !y) {
            if (bounce.x + bounce.y < wall.x + wall.y) {
              // top left
              if (bounce.x - bounce.y < wall.x - wall.y) {
                // bottom left
                bounce.accel.x -=
                  (bounce.x + bounce.size - wall.x + wall.size) * bounceBy;
              } else {
                // top right
                bounce.accel.y -=
                  (bounce.y + bounce.size - wall.y + wall.size) * bounceBy;
              }
            } else {
              // bottom right
              if (bounce.x - bounce.y < wall.x - wall.y) {
                // bottom left
                bounce.accel.y -=
                  (bounce.y - bounce.size - wall.y - wall.size) * bounceBy;
              } else {
                // top right
                bounce.accel.x -=
                  (bounce.x - bounce.size - wall.x - wall.size) * bounceBy;
              }
            }
          } else if (!(left || right || top || bottom)) {
            let force = ((bounce.size / point.length - 1) * bounceBy) / 2;
            bounce.accel.x += point.x * force;
            bounce.accel.y += point.y * force;
          } else if (point.isShorterThan(bounce.size)) {
            //let force = (bounce.size - point.length) / point.length * bounceBy
            // once to get collision amount, once to norm
            let force = ((bounce.size / point.length - 1) * bounceBy) / 2; // simplified
            bounce.accel.x -= point.x * force;
            bounce.accel.y -= point.y * force;
          } else {
            intersected = false;
          }
        }

        if (intersected) {
          if (bounce.type === "food") {
            if (
              bounce.collisionArray.some(
                (r) => r.type === "wall" && r.shape === 4
              )
            )
              bounce.kill();
          } else if (
            bounce.type !== "tank" &&
            bounce.type !== "miniboss" &&
            bounce.type !== "bobboss" &&
            bounce.type !== "developer" &&
            bounce.type !== "turrets" &&
            bounce.type !== "dreadnought" &&
            bounce.type !== "Sanctuaries"
          ) {
            bounce.kill();
          }
          bounce.collisionArray.push(wall);
        }
      }
      function invisibleWallCollide(wall, bounce) {
        //if (bounce.type === ('developer') && bounce.type === ('turrets') || bounce.passThroughWalls)
        if (bounce.type === "developer" || bounce.passThroughWalls) return;
        if (bounce.type === "dreadnought" || bounce.passThroughWalls) return;
        if (bounce.type === "turrets" || bounce.passThroughWalls) return;
        if (bounce.type === "food" || bounce.passThroughWalls) return;
        if (bounce.type === "atmosphere" || bounce.passThroughWalls) return;
        if (bounce.type === "aura2" || bounce.passThroughWalls) return;
        if (bounce.type === "aura3" || bounce.passThroughWalls) return;
        if (
          bounce.x + bounce.size < wall.x - wall.size ||
          bounce.x - bounce.size > wall.x + wall.size ||
          bounce.y + bounce.size < wall.y - wall.size ||
          bounce.y - bounce.size > wall.y + wall.size
        )
          return 0;
        if (wall.intangibility) return 0;
        let bounceBy =
          bounce.type ===
          ("atmosphere",
          "developer",
          "miniboss",
          "tank",
          "turrets",
          "Sanctuaries",
          "dreadnought",
          "trap",
          "bullet",
          "drone",
          "crasher",
          "aura3",
          "aura",
          "kill_bullet")
            ? 1.0
            : bounce.type === /*'miniboss',*/ "bobboss"
            ? 2.5
            : 0.1;

        let pushVertical = wall.facing === Math.PI / 2;
        let pushHorizontal = wall.facing === Math.PI;

        // cases:   normal       sided
        // top     C T T T C   C T T T C
        // exposed L I T I R   T T T T T
        //         L L X R R   X X X X X
        // exposed L I B I R   B B B B B
        // bottom  C B B B C   C B B B C
        // C = corner with check
        // I = corner inverse
        // X = push toward nearest side

        let left = bounce.x < wall.x - wall.size;
        let right = bounce.x > wall.x + wall.size;
        let top = bounce.y < wall.y - wall.size;
        let bottom = bounce.y > wall.y + wall.size;

        let leftExposed = bounce.x - bounce.size < wall.x - wall.size;
        let rightExposed = bounce.x + bounce.size > wall.x + wall.size;
        let topExposed = bounce.y - bounce.size < wall.y - wall.size;
        let bottomExposed = bounce.y + bounce.size > wall.y + wall.size;

        let intersected = true;

        if (left && right) {
          left = right = false;
        }
        if (top && bottom) {
          top = bottom = false;
        }
        if (leftExposed && rightExposed) {
          leftExposed = rightExposed = false;
        }
        if (topExposed && bottomExposed) {
          topExposed = bottomExposed = false;
        }

        if (pushVertical) {
          left = leftExposed = false;
          right = rightExposed = false;
          top = topExposed = bounce.y < wall.y;
          bottom = bottomExposed = bounce.y > wall.y;
          bounceBy *= 0.2;
        } else if (pushHorizontal) {
          top = topExposed = false;
          bottom = bottomExposed = false;
          left = leftExposed = bounce.x < wall.x;
          right = rightExposed = bounce.x > wall.x;
          bounceBy *= 0.2;
        }

        if (
          (left && !top && !bottom) ||
          (leftExposed && !topExposed && !bottomExposed)
        ) {
          bounce.accel.x -=
            (bounce.x + bounce.size - wall.x + wall.size) * bounceBy;
        } else if (
          (right && !top && !bottom) ||
          (rightExposed && !topExposed && !bottomExposed)
        ) {
          bounce.accel.x -=
            (bounce.x - bounce.size - wall.x - wall.size) * bounceBy;
        } else if (
          (top && !left && !right) ||
          (topExposed && !leftExposed && !rightExposed)
        ) {
          bounce.accel.y -=
            (bounce.y + bounce.size - wall.y + wall.size) * bounceBy;
        } else if (
          (bottom && !left && !right) ||
          (bottomExposed && !leftExposed && !rightExposed)
        ) {
          bounce.accel.y -=
            (bounce.y - bounce.size - wall.y - wall.size) * bounceBy;
        } else {
          let x = leftExposed ? -wall.size : rightExposed ? wall.size : 0;
          let y = topExposed ? -wall.size : bottomExposed ? wall.size : 0;

          let point = new Vector(wall.x + x - bounce.x, wall.y + y - bounce.y);

          if (!x || !y) {
            if (bounce.x + bounce.y < wall.x + wall.y) {
              // top left
              if (bounce.x - bounce.y < wall.x - wall.y) {
                // bottom left
                bounce.accel.x -=
                  (bounce.x + bounce.size - wall.x + wall.size) * bounceBy;
              } else {
                // top right
                bounce.accel.y -=
                  (bounce.y + bounce.size - wall.y + wall.size) * bounceBy;
              }
            } else {
              // bottom right
              if (bounce.x - bounce.y < wall.x - wall.y) {
                // bottom left
                bounce.accel.y -=
                  (bounce.y - bounce.size - wall.y - wall.size) * bounceBy;
              } else {
                // top right
                bounce.accel.x -=
                  (bounce.x - bounce.size - wall.x - wall.size) * bounceBy;
              }
            }
          } else if (!(left || right || top || bottom)) {
            let force = ((bounce.size / point.length - 1) * bounceBy) / 2;
            bounce.accel.x += point.x * force;
            bounce.accel.y += point.y * force;
          } else if (point.isShorterThan(bounce.size)) {
            //let force = (bounce.size - point.length) / point.length * bounceBy
            // once to get collision amount, once to norm
            let force = ((bounce.size / point.length - 1) * bounceBy) / 2; // simplified
            bounce.accel.x -= point.x * force;
            bounce.accel.y -= point.y * force;
          } else {
            intersected = false;
          }
        }

        if (intersected) {
          if (bounce.type === "food") {
            if (
              bounce.collisionArray.some(
                (r) => r.type === "wallInvisible" && r.shape === 4
              )
            )
              bounce.kill();
          } else if (
            bounce.type !== "tank" &&
            bounce.type !== "miniboss" &&
            bounce.type !== "bobboss" &&
            bounce.type !== "developer" &&
            bounce.type !== "turrets" &&
            bounce.type !== "dreadnought" &&
            bounce.type !== "Sanctuaries" &&
            bounce.type !== "trap" &&
            bounce.type !== "bullet" &&
            bounce.type !== "drone" &&
            bounce.type !== "food"
          ) {
            bounce.kill();
          }
          bounce.collisionArray.push(wall);
        }
      }
      function advancedcollide(
        my,
        n,
        doDamage,
        doInelastic,
        nIsFirmCollide = false
      ) {
        // Prepare to check
        let tock = Math.min(my.stepRemaining, n.stepRemaining),
          combinedRadius = n.size + my.size,
          motion = {
            _me: new Vector(my.m_x, my.m_y),
            _n: new Vector(n.m_x, n.m_y),
          },
          delt = new Vector(
            tock * (motion._me.x - motion._n.x),
            tock * (motion._me.y - motion._n.y)
          ),
          diff = new Vector(my.x - n.x, my.y - n.y),
          dir = new Vector(
            (n.x - my.x) / diff.length,
            (n.y - my.y) / diff.length
          ),
          component = Math.max(0, dir.x * delt.x + dir.y * delt.y);

        if (component >= diff.length - combinedRadius) {
          // A simple check
          // A more complex check
          let goahead = false,
            tmin = 1 - tock,
            tmax = 1,
            A = Math.pow(delt.x, 2) + Math.pow(delt.y, 2),
            B = 2 * delt.x * diff.x + 2 * delt.y * diff.y,
            C =
              Math.pow(diff.x, 2) +
              Math.pow(diff.y, 2) -
              Math.pow(combinedRadius, 2),
            det = B * B - 4 * A * C,
            t;

          if (!A || det < 0 || C < 0) {
            // This shall catch mathematical errors
            t = 0;
            if (C < 0) {
              // We have already hit without moving
              goahead = true;
            }
          } else {
            let t1 = (-B - Math.sqrt(det)) / (2 * A),
              t2 = (-B + Math.sqrt(det)) / (2 * A);
            if (t1 < tmin || t1 > tmax) {
              // 1 is out of range
              if (t2 < tmin || t2 > tmax) {
                // 2 is out of range;
                t = false;
              } else {
                // 1 is out of range but 2 isn't
                t = t2;
                goahead = true;
              }
            } else {
              // 1 is in range
              if (t2 >= tmin && t2 <= tmax) {
                // They're both in range!
                t = Math.min(t1, t2);
                goahead = true; // That means it passed in and then out again.  Let's use when it's going in
              } else {
                // Only 1 is in range
                t = t1;
                goahead = true;
              }
            }
          }
          /********* PROCEED ********/
          if (goahead) {
            // Add to record
            my.collisionArray.push(n);
            n.collisionArray.push(my);
            if (t) {
              // Only if we still need to find the collision
              // Step to where the collision occured
              my.x += motion._me.x * t;
              my.y += motion._me.y * t;
              n.x += motion._n.x * t;
              n.y += motion._n.y * t;

              my.stepRemaining -= t;
              n.stepRemaining -= t;

              // Update things
              diff = new Vector(my.x - n.x, my.y - n.y);
              dir = new Vector(
                (n.x - my.x) / diff.length,
                (n.y - my.y) / diff.length
              );
              component = Math.max(0, dir.x * delt.x + dir.y * delt.y);
            }
            let componentNorm = component / delt.length;
            /************ APPLY COLLISION ***********/
            // Prepare some things
            let reductionFactor = 1,
              deathFactor = {
                _me: 1,
                _n: 1,
              },
              accelerationFactor = delt.length
                ? combinedRadius /
                  4 /
                  (Math.floor(combinedRadius / delt.length) + 1)
                : 0.001,
              depth = {
                _me: util.clamp(
                  (combinedRadius - diff.length) / (2 * my.size),
                  0,
                  1
                ), //1: I am totally within it
                _n: util.clamp(
                  (combinedRadius - diff.length) / (2 * n.size),
                  0,
                  1
                ), //1: It is totally within me
              },
              combinedDepth = {
                up: depth._me * depth._n,
                down: (1 - depth._me) * (1 - depth._n),
              },
              pen = {
                _me: {
                  sqr: Math.pow(my.penetration, 2),
                  sqrt: Math.sqrt(my.penetration),
                },
                _n: {
                  sqr: Math.pow(n.penetration, 2),
                  sqrt: Math.sqrt(n.penetration),
                },
              },
              savedHealthRatio = {
                _me: my.health.ratio,
                _n: n.health.ratio,
              };
            if (doDamage) {
              let speedFactor = {
                // Avoid NaNs and infinities
                _me: my.maxSpeed
                  ? Math.pow(motion._me.length / my.maxSpeed, 0.25)
                  : 1,
                _n: n.maxSpeed
                  ? Math.pow(motion._n.length / n.maxSpeed, 0.25)
                  : 1,
              };

              /// DO DAMAGE 
              let bail = false;
              if (
                my.type === "aura" &&
                !(
                  n.type === "tank" ||
                  n.type === "miniboss" ||
                  my.type === "food"
                )
              ) {
                bail = true;
              } else if (
                n.type === "aura" &&
                !(
                  my.type === "tank" ||
                  my.type === "miniboss" ||
                  my.type === "food"
                )
              ) {
                bail = true;
              }
              if (
                my.shape === n.shape &&
                my.settings.isNecromancer &&
                n.type === "food"
              ) {
                bail = my.necro(n);
              } else if (
                my.shape === n.shape &&
                n.settings.isNecromancer &&
                my.type === "food"
              ) {
                bail = n.necro(my);
              }
              if (!bail) {
                // Calculate base damage
                let resistDiff = my.health.resist - n.health.resist,
                  damage = {
                    _me:
                      c.DAMAGE_CONSTANT *
                      my.damage *
                      (1 + resistDiff) *
                      (1 +
                        n.heteroMultiplier *
                          (my.settings.damageClass ===
                            n.settings.damageClass)) *
                      (my.settings.buffVsFood && n.settings.damageType === 1
                        ? 3
                        : 1) *
                      my.damageMultiplier() *
                      Math.min(
                        2,
                        Math.max(speedFactor._me, 1) * speedFactor._me
                      ),
                    _n:
                      c.DAMAGE_CONSTANT *
                      n.damage *
                      (1 - resistDiff) *
                      (1 +
                        my.heteroMultiplier *
                          (my.settings.damageClass ===
                            n.settings.damageClass)) *
                      (n.settings.buffVsFood && my.settings.damageType === 1
                        ? 3
                        : 1) *
                      n.damageMultiplier() *
                      Math.min(2, Math.max(speedFactor._n, 1) * speedFactor._n),
                  };
                // Advanced damage calculations
                if (my.settings.ratioEffects) {
                  damage._me *= Math.min(
                    1,
                    Math.pow(
                      Math.max(my.health.ratio, my.shield.ratio),
                      1 / my.penetration
                    )
                  );
                }
                if (n.settings.ratioEffects) {
                  damage._n *= Math.min(
                    1,
                    Math.pow(
                      Math.max(n.health.ratio, n.shield.ratio),
                      1 / n.penetration
                    )
                  );
                }
                if (my.settings.damageEffects) {
                  damage._me *=
                    (accelerationFactor *
                      (1 +
                        ((componentNorm - 1) * (1 - depth._n)) /
                          my.penetration) *
                      (1 + pen._n.sqrt * depth._n - depth._n)) /
                    pen._n.sqrt;
                }
                if (n.settings.damageEffects) {
                  damage._n *=
                    (accelerationFactor *
                      (1 +
                        ((componentNorm - 1) * (1 - depth._me)) /
                          n.penetration) *
                      (1 + pen._me.sqrt * depth._me - depth._me)) /
                    pen._me.sqrt;
                }
                // Find out if you'll die in this cycle, and if so how much damage you are able to do to the other target
                let damageToApply = {
                  _me: damage._me,
                  _n: damage._n,
                };
                if (n.shield.max) {
                  damageToApply._me -= n.shield.getDamage(damageToApply._me);
                }
                if (my.shield.max) {
                  damageToApply._n -= my.shield.getDamage(damageToApply._n);
                }
                let stuff = my.health.getDamage(damageToApply._n, false);
                deathFactor._me =
                  stuff > my.health.amount ? my.health.amount / stuff : 1;
                stuff = n.health.getDamage(damageToApply._me, false);
                deathFactor._n =
                  stuff > n.health.amount ? n.health.amount / stuff : 1;

                reductionFactor = Math.min(deathFactor._me, deathFactor._n);

                // Now apply it
                my.damageRecieved += damage._n * deathFactor._n;
                n.damageRecieved += damage._me * deathFactor._me;
              }
            }
            /************* DO MOTION ***********/
            if (nIsFirmCollide < 0) {
              nIsFirmCollide *= -0.5;
              my.accel.x -= nIsFirmCollide * component * dir.x;
              my.accel.y -= nIsFirmCollide * component * dir.y;
              n.accel.x += nIsFirmCollide * component * dir.x;
              n.accel.y += nIsFirmCollide * component * dir.y;
            } else if (nIsFirmCollide > 0) {
              n.accel.x +=
                nIsFirmCollide * (component * dir.x + combinedDepth.up);
              n.accel.y +=
                nIsFirmCollide * (component * dir.y + combinedDepth.up);
            } else {
              // Calculate the impulse of the collision
              let elasticity =
                2 - (4 * Math.atan(my.penetration * n.penetration)) / Math.PI;
              if (
                doInelastic &&
                my.settings.motionEffects &&
                n.settings.motionEffects
              ) {
                elasticity *=
                  savedHealthRatio._me / pen._me.sqrt +
                  savedHealthRatio._n / pen._n.sqrt;
              } else {
                elasticity *= 2;
              }
              let spring =
                  (2 * Math.sqrt(savedHealthRatio._me * savedHealthRatio._n)) /
                  roomSpeed,
                elasticImpulse =
                  (Math.pow(combinedDepth.down, 2) *
                    elasticity *
                    component *
                    my.mass *
                    n.mass) /
                  (my.mass + n.mass),
                springImpulse =
                  c.KNOCKBACK_CONSTANT * spring * combinedDepth.up,
                impulse =
                  -(elasticImpulse + springImpulse) *
                  (1 - my.intangibility) *
                  (1 - n.intangibility),
                force = {
                  x: impulse * dir.x,
                  y: impulse * dir.y,
                },
                modifiers = {
                  _me:
                    ((c.KNOCKBACK_CONSTANT * my.pushability) / my.mass) *
                    deathFactor._n,
                  _n:
                    ((c.KNOCKBACK_CONSTANT * n.pushability) / n.mass) *
                    deathFactor._me,
                };
              // Apply impulse as force
              my.accel.x += modifiers._me * force.x;
              my.accel.y += modifiers._me * force.y;
              n.accel.x -= modifiers._n * force.x;
              n.accel.y -= modifiers._n * force.y;
            }
          }
        }
      }
      function healcollide(my, n) {
        if (n.team === my.team) {
          if (n.health.max > n.health.amount) {
            n.health.amount += my.damage * my.penetration * 0.1;
            my.master.skill.score += my.penetration * my.damage * 13;
          }
          if (n.health.max == n.health.amount) {
            if (n.shield.max > n.shield.amount) {
              n.shield.amount += my.damage;
              my.master.skill.score += 10;
            }
          }
        }
        if (my.team !== n.team) {
          if (my.type === "kill_bullet") {
            if (n.type !== "kill_bullet") {
              if (n.damage <= 0) {
              } else if (n.damage > 0) {
                my.kill();
              }
            }
          }
          if (n.type === "kill_bullet") {
            if (my.type !== "kill_bullet") {
              if (my.damage <= 0) {
              } else if (n.damage > 0) {
                n.kill();
              }
            }
          }
        }
      }
      // The actual collision resolution function
      return (collision) => {
        // Pull the two objects from the collision grid
        let instance = collision[0],
          other = collision[1];
        // Check for ghosts...
        if (other.isGhost) {
          util.error("GHOST FOUND");
          util.error(other.label);
          util.error("x: " + other.x + " y: " + other.y);
          util.error(other.collisionArray);
          util.error("health: " + other.health.amount);
          util.warn("Ghost removed.");
          if (grid.checkIfInHSHG(other)) {
            util.warn("Ghost removed.");
            grid.removeObject(other);
          }
          return 0;
        }
        if (instance.isGhost) {
          util.error("GHOST FOUND");
          util.error(instance.label);
          util.error("x: " + instance.x + " y: " + instance.y);
          util.error(instance.collisionArray);
          util.error("health: " + instance.health.amount);
          if (grid.checkIfInHSHG(instance)) {
            util.warn("Ghost removed.");
            grid.removeObject(instance);
          }
          return 0;
        }
        if (!instance.activation.check() && !other.activation.check()) {
          util.warn("Tried to collide with an inactive instance.");
          return 0;
        }
        // Handle walls
        /*if (instance.type === "wall" || other.type === "wall") {
          let a =
            instance.type === "bullet" || other.type === "bullet"
              ? 1 +
                10 /
                  (Math.max(instance.velocity.length, other.velocity.length) +
                    10)
              : 1;
          if (instance.type === "wall")
            advancedcollide(instance, other, false, false, a);
          else advancedcollide(other, instance, false, false, a);
        }*/
        // If they can firm collide, do that
        ///////// NOT A GIT MERGE CONFLICT /////////
        if (instance.type === "wall" || other.type === "wall") {
          if (instance.type === "wall" && other.type === "wall") return;
          let wall = instance.type === "wall" ? instance : other;
          let entity = instance.type === "wall" ? other : instance;
          if (wall.shape === 4) {
            reflectCollide(wall, entity);
          } else {
            let a =
              entity.type === "bullet"
                ? 1 + 10 / (entity.velocity.length + 10)
                : 1;
            advancedcollide(wall, entity, false, false, a);
          }
        } else if (instance.type === "fixed" || other.type === "fixed") {
          if (instance.type === "fixed" && other.type === "fixed") return;
          if (
            instance.team === other.team &&
            (instance.settings.hitsOwnType === "never" ||
              other.settings.hitsOwnType === "never")
          )
            return;
          if (instance.type === "fixed")
            advancedcollide(
              instance,
              other,
              instance.team !== other.team,
              instance.team === other.team,
              false,
              1
            );
          else
            advancedcollide(
              other,
              instance,
              instance.team !== other.team,
              instance.team === other.team,
              false,
              1
            );
        } else if (
          instance.type === "wallInvisible" ||
          other.type === "wallInvisible"
        ) {
          if (
            instance.type === "wallInvisible" &&
            other.type === "wallInvisible"
          )
            return;
          let wall = instance.type === "wallInvisible" ? instance : other;
          let entity = instance.type === "wallInvisible" ? other : instance;
          if (wall.shape === 4) {
            invisibleWallCollide(wall, entity);
          } else {
            let a =
              entity.type === "bullet"
                ? 1 + 10 / (entity.velocity.length + 10)
                : 1;
            advancedcollide(wall, entity, false, false, a);
          }
        } else if (instance.type === "fixed" || other.type === "fixed") {
          if (instance.type === "fixed" && other.type === "fixed") return;
          if (
            instance.team === other.team &&
            (instance.settings.hitsOwnType === "never" ||
              other.settings.hitsOwnType === "never")
          )
            return;
          if (instance.type === "fixed")
            advancedcollide(
              instance,
              other,
              instance.team !== other.team,
              instance.team === other.team,
              false,
              1
            );
          else
            advancedcollide(
              other,
              instance,
              instance.team !== other.team,
              instance.team === other.team,
              false,
              1
            );
        } else if (
          (instance.type === "crasher" && other.type === "food") ||
          (other.type === "crasher" && instance.type === "food")
        ) {
          firmcollide(instance, other);
        }
        // Otherwise, collide normally if they're from different teams
        else if (instance.team !== other.team) {
          advancedcollide(instance, other, true, true);
        }
        // Ignore them if either has asked to be
        else if (
          instance.settings.hitsOwnType == "never" ||
          other.settings.hitsOwnType == "never"
        ) {
          // Do jack
        }
        // Standard collision resolution
        if (instance.settings.hitsOwnType === other.settings.hitsOwnType) {
          switch (instance.settings.hitsOwnType) {
            case "push":
              advancedcollide(instance, other, false, false);
              break;
            case "hard":
              firmcollide(instance, other);
              break;
            case "hardWithBuffer":
              firmcollide(instance, other, 30);
              break;
            case "repel":
              simplecollide(instance, other);
              break;
            case "tank":
              if (instance.type === "tank" && other.type === "tank")
                firmcollide(instance, other);
              break;
          }
        } else if (
          (instance.type === "kill_bullet" && other.type !== "kill_bullet") ||
          (other.type === "kill_bullet" && instance.type !== "kill_bullet")
        ) {
          healcollide(instance, other);
        }
      };
    })();
    // Living stuff
    function entitiesactivationloop(my) {
      // Update collisions.
      my.collisionArray = [];
      // Activation
      my.activation.update();
      my.updateAABB(my.activation.check());
    }
    function entitiesliveloop(my) {
      // Consider death.
      if (my.contemplationOfMortality()) my.destroy();
      else {
        if (my.bond == null) {
          // Resolve the physical behavior from the last collision cycle.
          logs.physics.set();
          my.physics();
          logs.physics.mark();
        }
        if (my.activation.check()) {
          logs.entities.tally();
          // Think about my actions.
          logs.life.set();
          my.life();
          logs.life.mark();
          // Apply friction.
          my.friction();
          my.confinementToTheseEarthlyShackles();
          logs.selfie.set();
          my.takeSelfie();
          logs.selfie.mark();
        }
      }
      // Update collisions.
      my.collisionArray = [];
    }
    let time;
    // Return the loop function
    return () => {
      logs.loops.tally();
      logs.master.set();
      logs.activation.set();
      entities.forEach((e) => entitiesactivationloop(e));
      logs.activation.mark();
      // Do collisions
      logs.collide.set();
      if (entities.length > 1) {
        // Load the grid
        grid.update();
        // Run collisions in each grid
        grid
          .queryForCollisionPairs()
          .forEach((collision) => collide(collision));
      }
      logs.collide.mark();
      // Do entities life
      logs.entities.set();
      entities.forEach((e) => entitiesliveloop(e));
      logs.entities.mark();
      logs.master.mark();
      // Remove dead entities
      purgeEntities();
      room.lastCycle = util.time();
    };
    //let expected = 1000 / c.gameSpeed / 30;
    //let alphaFactor = (delta > expected) ? expected / delta : 1;
    //roomSpeed = c.gameSpeed * alphaFactor;
    //setTimeout(moveloop, 1000 / roomSpeed / 30 - delta);
  })();
  // A less important loop. Runs at an actual 5Hz regardless of game speed.
  var maintainloop = (() => {
    // Place obstacles
    function placeRoids() {
      function placeRoid(type, entityClass) {
        let x = 0;
        let position;
        do {
          position = room.randomType(type);
          x++;
          if (x > 200) {
            util.warn("Could not place some roids.");
            return 0;
          }
        } while (dirtyCheck(position, 10 + entityClass.SIZE));
        let o = new Entity(position);
        o.define(entityClass);
        o.team = -101;
        o.facing = ran.randomAngle();
        o.protect();
        o.life();
      }
      // Start placing them
      let roidcount =
        (room.roid.length * room.width * room.height) /
        room.xgrid /
        room.ygrid /
        50000 /
        1.5;
      let rockcount =
        (room.rock.length * room.width * room.height) /
        room.xgrid /
        room.ygrid /
        250000 /
        1.5;
      let ObslCount =
        (room.roid.length * room.width * room.height) /
        room.xgrid /
        room.ygrid /
        50000 /
        1.5;
      let count = 0;
      for (let i = Math.ceil(roidcount); i; i--) {
        count++;
        placeRoid("roid", Class.obstacle);
      }
      for (let i = Math.ceil(roidcount * 0.1); i; i--) {
        count++;
        placeRoid("roid", Class.babyObstacle);
      }
      for (let i = Math.ceil(rockcount * 0.1); i; i--) {
        count++;
        placeRoid("roid", Class.ObstacleMach);
      }
      for (let i = Math.ceil(rockcount * 0.1); i; i--) {
        count++;
        placeRoid("roid", Class.ObstacleBlock);
      }
      for (let i = Math.ceil(rockcount * 0.1); i; i--) {
        count++;
        placeRoid("roid", Class.trolleo_mi_pana);
      }
      for (let i = Math.ceil(rockcount * 0.1); i; i--) {
        count++;
        placeRoid("roid", Class.twinObstacle);
      }
      for (let i = Math.ceil(rockcount * 0.1); i; i--) {
        count++;
        placeRoid("roid", Class.escondite);
      }
      for (let i = Math.ceil(rockcount * 0.1); i; i--) {
        count++;
        placeRoid("rock", Class.obstacle);
      }
      for (let i = Math.ceil(rockcount * 0.1); i; i--) {
        count++;
        placeRoid("rock", Class.babyObstacle);
      }
      for (let i = Math.ceil(rockcount * 0.1); i; i--) {
        count++;
        placeRoid("rock", Class.ObstacleMach);
      }
      for (let i = Math.ceil(rockcount * 0.1); i; i--) {
        count++;
        placeRoid("rock", Class.ObstacleBlock);
      }
      for (let i = Math.ceil(rockcount * 0.1); i; i--) {
        count++;
        placeRoid("rock", Class.trolleo_mi_pana);
      }
      for (let i = Math.ceil(rockcount * 0.1); i; i--) {
        count++;
        placeRoid("rock", Class.twinObstacle);
      }
      for (let i = Math.ceil(rockcount * 0.1); i; i--) {
        count++;
        placeRoid("rock", Class.escondite);
      }
      util.log("Placing " + count + " obstacles!");
    }
    // FFA obstacles
    function placeFFARoids() {
      function placeRoid(type, entityClass) {
        let x = 0;
        let position;
        do {
          position = room.randomType(type);
          x++;
          if (x > 200) {
            util.warn("Could not place some Obstacles.");
            return 0;
          }
        } while (dirtyCheck(position, 10 + entityClass.SIZE));
        let o = new Entity(position);
        o.define(entityClass);
        o.team = -101;
        o.facing = ran.randomAngle();
        o.protect();
        o.life();
      }
      // Start placing them
      let ObslCount =
        (room.obsl.length * room.width * room.height) /
        room.xgrid /
        room.ygrid /
        150000 /
        1.5;
      let count = 0;
      for (let i = Math.ceil(ObslCount * 1.4); i; i--) {
        count++;
        placeRoid("obsl", Class.obstacle);
      }
      for (let i = Math.ceil(ObslCount * 0.9); i; i--) {
        count++;
        placeRoid("obsl", Class.babyObstacle);
      }
      util.log("Placing " + count + " obstacles!");
    }
    if (c.SPAWN_NORM_WALLS) {
      placeFFARoids();
    }
    if (c.SPAWN_RARE_WALLS) {
      placeRoids();
    }
    // Spawning functions
    let spawnBosses = (() => {
      let timer = 0;
      let boss = (() => {
        let i = 0,
          names = [],
          bois = [Class.egg],
          n = 0,
          begin = "yo some shit is about to move to a lower position",
          arrival =
            "Something happened lol u should probably let Neph know this broke",
          loc = "norm";
        let spawn = () => {
          let spot,
            m = 0;
          do {
            spot = room.randomType(loc);
            m++;
          } while (dirtyCheck(spot, 500) && m < 30);
          let o = new Entity(spot);
          o.define(ran.choose(bois));
          o.team = -100;
          o.name = names[i++];
        };
        return {
          prepareToSpawn: (
            classArray,
            number,
            nameClass,
            typeOfLocation = "norm"
          ) => {
            n = number;
            bois = classArray;
            loc = typeOfLocation;
            names = ran.chooseBossName(nameClass, number);
            i = 0;
            if (n === 1) {
              begin = "A visitor is coming.";
              arrival = names[0] + " has arrived.";
            } else {
              begin = "Visitors are coming.";
              arrival = "";
              for (let i = 0; i < n - 2; i++) arrival += names[i] + ", ";
              arrival +=
                names[n - 2] + " and " + names[n - 1] + " have arrived.";
            }
          },
          spawn: () => {
            sockets.broadcast(begin);
            for (let i = 0; i < n; i++) {
              setTimeout(spawn, ran.randomRange(3500, 5000));
            }
            // Wrap things up.
            setTimeout(() => sockets.broadcast(arrival), 5000);
            util.log("[SPAWN] " + arrival);
          },
        };
      })();
      return (census) => {
        if (timer > 1000 && ran.dice(1000 - timer)) {
          util.log("[SPAWN] Preparing to spawn...");
          timer = 1;
          let choice = [];
          let eliteCrashers = [
            Class.elite_destroyer,
            Class.elite_gunner,
            Class.elite_sprayer,
            Class.elite_factory,
            Class.elite_sentry,
            Class.elite_battleship,
            Class.elite_trapper,
            Class.elite_sprayerOld,
            Class.elite_basic,
          ];
          let tremblers = [
            Class.alphaskimmerlaunch,
            Class.the_master,
            Class.elite_skimmer,
            Class.hexa_boss,
            Class.Castle,
            Class.elite_twister,
            Class.elite_fortress,
            Class.OmegaTriangle,
          ];
          let diepBosses = [
            Class.summon,
            Class.defender,
            Class.Guardian,
            Class.fallenOverlord,
            Class.fallenBooster,
          ];
          let mysticals = [
            Class.Sorcerer,
            Class.summon,
            Class.Enchantress,
            Class.Exorcistor,
          ];
          let rogues = [Class.palisade, Class.rogueArmada];
          let Nesters = [
            Class.nest_keeper,
            Class.nest_Warden,
            Class.nest_Guardian,
          ];
          const bossChoice = Math.floor(Math.random() * 26); // Obtener un índice aleatorio entre 0 y 36
          switch (bossChoice) {
            case 0:
              choice = [
                [
                  Class.elite_destroyer,
                  Class.elite_gunner,
                  Class.elite_sprayer,
                  Class.elite_factory,
                  Class.elite_sentry,
                  Class.elite_battleship,
                  Class.elite_trapper,
                  Class.elite_sprayerOld,
                  Class.elite_basic,
                ],
                Math.floor(Math.random() * 1) + 1,
                "a",
                "nest",
              ];
              sockets.broadcast("an elite crasher is coming");
              break;
            case 1:
              choice = [
                [
                  Class.elite_destroyer,
                  Class.elite_gunner,
                  Class.elite_sprayer,
                  Class.elite_factory,
                  Class.elite_sentry,
                  Class.elite_battleship,
                  Class.elite_trapper,
                  Class.elite_sprayerOld,
                  Class.elite_basic,
                ],
                Math.floor(Math.random() * 3) + 2,
                "a",
                "nest",
              ];
              sockets.broadcast("some elite crashers are coming");
              break;
            case 3:
              choice = [
                [
                  Class.alphaskimmerlaunch,
                  Class.the_master,
                  Class.elite_skimmer,
                  Class.summon,
                  Class.palisade,
                  Class.hexa_boss,
                  Class.Castle,
                  Class.elite_twister,
                  Class.elite_fortress,
                  Class.OmegaTriangle,
                ],
                Math.floor(Math.random() * 1) + 1,
                "a",
                "nest",
              ];
              sockets.broadcast("a strange trembling...");
              break;
            case 4:
              choice = [
                [
                  Class.alphaskimmerlaunch,
                  Class.the_master,
                  Class.elite_skimmer,
                  Class.summon,
                  Class.palisade,
                  Class.hexa_boss,
                  Class.Castle,
                  Class.elite_twister,
                  Class.elite_fortress,
                  Class.OmegaTriangle,
                ],
                Math.floor(Math.random() * 3) + 4,
                "a",
                "nest",
              ];
              sockets.broadcast("a strange trembling...");
              break;
            case 5:
              choice = [
                [
                  Class.summon,
                  Class.defender,
                  Class.Guardian,
                  Class.fallenOverlord,
                  Class.fallenBooster,
                ],
                Math.floor(Math.random() * 1) + 1,
                "Bosses",
                "boss",
              ];
              sockets.broadcast("a gap opens between two worlds...");
              break;
            case 6:
              choice = [
                [
                  Class.summon,
                  Class.defender,
                  Class.Guardian,
                  Class.fallenOverlord,
                  Class.fallenBooster,
                ],
                Math.floor(Math.random() * 3) + 4,
                "Bosses",
                "boss",
              ];
              sockets.broadcast("a gap opens between two worlds...");
              break;
            case 7:
              choice = [
                [
                  Class.Sorcerer,
                  Class.summon,
                  Class.Enchantress,
                  Class.Exorcistor,
                ],
                Math.floor(Math.random() * 1) + 1,
                "Bosses",
                "boss",
              ];
              sockets.broadcast("a leader of magic is coming...");
              break;
            case 8:
              choice = [
                [
                  Class.Sorcerer,
                  Class.summon,
                  Class.Enchantress,
                  Class.Exorcistor,
                ],
                Math.floor(Math.random() * 3) + 4,
                "Bosses",
                "boss",
              ];
              sockets.broadcast("the leaders of magic are coming...");
              break;
            case 9:
              choice = [
                [Class.palisade, Class.rogueArmada],
                Math.floor(Math.random() * 1) + 1,
                "castle",
                "boss",
              ];
              sockets.broadcast("A castle rises from the ruins...");
              break;
            case 10:
              choice = [
                [Class.palisade, Class.rogueArmada],
                Math.floor(Math.random() * 3) + 4,
                "castle",
                "boss",
              ];
              sockets.broadcast("Castles with rubble appear...");
              break;
            case 11:
              choice = [
                [Class.nest_keeper, Class.nest_Warden, Class.nest_Guardian],
                Math.floor(Math.random() * 1) + 1,
                "a",
                "nest",
              ];
              sockets.broadcast("a guardian comes to watch over the world...");
              break;
            case 12:
              choice = [
                [Class.nest_keeper, Class.nest_Warden, Class.nest_Guardian],
                Math.floor(Math.random() * 3) + 4,
                "a",
                "nest",
              ];
              sockets.broadcast("guardians come to watch over the world...");
              break;
            case 13:
              choice = [[Class.tyr], 1, "tyr", "boss"];
              sockets.broadcast(
                "The darkness arrives as the realms are ripped apart!"
              );
              break;
            case 14:
              choice = [[Class.fiolnir], 1, "fiolnir", "boss"];
              sockets.broadcast(
                "The darkness arrives as the realms are ripped apart!"
              );
              break;
            case 15:
              choice = [[Class.alviss], 1, "alviss", "boss"];
              sockets.broadcast(
                "The darkness arrives as the realms are ripped apart!"
              );
              break;
            case 16:
              choice = [[Class.thrud], 1, "thrud", "boss"];
              sockets.broadcast(
                "The darkness arrives as the realms are ripped apart!"
              );
              break;
            case 17:
              choice = [[Class.theia], 1, "theia", "boss"];
              sockets.broadcast(
                "The world tremors as the celestials are reborn anew!"
              );
              break;
            case 18:
              choice = [[Class.zaphkiel], 1, "zaphkiel", "boss"];
              sockets.broadcast(
                "The world tremors as the celestials are reborn anew!"
              );
              break;
            case 19:
              choice = [[Class.nyx], 1, "nyx", "boss"];
              sockets.broadcast(
                "The world tremors as the celestials are reborn anew!"
              );
              break;
            case 20:
              choice = [[Class.paladin], 1, "paladin", "boss"];
              sockets.broadcast(
                "The world tremors as the celestials are reborn anew!"
              );
              break;
            case 21:
              choice = [[Class.freyja], 1, "freyja", "boss"];
              sockets.broadcast(
                "The world tremors as the celestials are reborn anew!"
              );
              break;
            case 22:
              choice = [[Class.Ares], 1, "Ares", "boss"];
              sockets.broadcast(
                "The terrestrials arrives for cause the chaos on the world"
              );
              break;
            case 23:
              choice = [[Class.Gersemi], 1, "Gersemi", "boss"];
              sockets.broadcast(
                "The terrestrials arrives for cause the chaos on the world"
              );
              break;
            case 24:
              choice = [[Class.Ezekiel], 1, "Ezekiel", "boss"];
              sockets.broadcast(
                "The terrestrials arrives for cause the chaos on the world"
              );
              break;
            case 25:
              choice = [[Class.Eris], 1, "Eris", "boss"];
              sockets.broadcast(
                "The terrestrials arrives for cause the chaos on the world"
              );
              break;
            case 26:
              choice = [[Class.Selene], 1, "Selene", "boss"];
              sockets.broadcast(
                "The terrestrials arrives for cause the chaos on the world"
              );
              break;
            case 28:
              choice = [[Class.nothing], 1, "?", "norm"];
              sockets.broadcast("This is the end?");
              break;
            case 29:
              choice = [[Class.nothing], 1, "?", "norm"];
              sockets.broadcast("This is the end?");
              break;
            case 30:
              choice = [[Class.nothing], 1, "?", "norm"];
              sockets.broadcast("This is the end?");
              break;
            case 31:
              choice = [[Class.nothing], 1, "?", "norm"];
              sockets.broadcast("This is the end?");
              break;
            case 32:
              choice = [[Class.nothing], 1, "?", "norm"];
              sockets.broadcast("This is the end?");
              break;
            case 33:
              choice = [[Class.nothing], 1, "?", "norm"];
              sockets.broadcast("This is the end?");
              break;
            case 34:
              choice = [[Class.nothing], 1, "?", "norm"];
              sockets.broadcast("This is the end?");
              break;
            case 35:
              choice = [[Class.nothing], 1, "?", "norm"];
              sockets.broadcast("This is the end?");
              break;
            case 36:
              choice = [[Class.nothing], 1, "?", "norm"];
              sockets.broadcast("This is the end?");
              break; /*
                    case 15:
                        choice = [[Class.elite_of_elite], 1, 'supreme', 'norm'];
                        sockets.broadcast('a big earthquake too strange');
                        break;
                    case 16:
                        choice = [[Class.legionarycrasher], 1, 'LegionaryCrasher', 'norm'];
                        sockets.broadcast('The Elite Crasher´s were all but disciples for what you have awoken... What have you done?');
                        break;
                    case 17:
                        choice = [[Class.Ragnarok], 1, 'ragnarok', 'norm'];
                        sockets.broadcast('Do you beleibe in Ragnarok?');
                        break;
                    case 18:
                        choice = [[Class.kronos], 1, 'kronos', 'norm'];
                        sockets.broadcast('”The sky darkens as the ground slowly begins to crumble... The end is near.”.');
                        break;
                        */
          }
          boss.prepareToSpawn(...choice);
          setTimeout(boss.spawn, 120);
          // Set the timeout for the spawn functions
        } else if (!census.miniboss) timer++;
      };
    })();

    let spawnSanctuaries = (() => {
      let timer = 0;
      let boss = (() => {
        let i = 0,
          names = [],
          bois = [Class.egg],
          n = 0,
          begin = "yo some shit is about to move to a lower position",
          arrival =
            "Something happened lol u should probably let Neph know this broke",
          loc = "norm";
        let spawn = () => {
          let spot,
            m = 0;
          do {
            spot = room.randomType(loc);
            m++;
          } while (dirtyCheck(spot, 500) && m < 30);
          let o = new Entity(spot);
          o.define(ran.choose(bois));
          o.team = -100;
          o.name = names[i++];
        };
        return {
          prepareToSpawn: (
            classArray,
            number,
            nameClass,
            typeOfLocation = "norm"
          ) => {
            n = number;
            bois = classArray;
            loc = typeOfLocation;
            names = ran.chooseBossName(nameClass, number);
            i = 0;
            if (n === 1) {
              begin = "A sanctuary is coming.";
              arrival = names[0] + " has arrived.";
            } else {
              begin = "sanctuaries are coming.";
              arrival = "";
              for (let i = 0; i < n - 2; i++) arrival += names[i] + ", ";
              arrival +=
                names[n - 2] + " and " + names[n - 1] + " have arrived.";
            }
          },
          spawn: () => {
            sockets.broadcast(begin);
            for (let i = 0; i < n; i++) {
              setTimeout(spawn, ran.randomRange(3500, 5000));
            }
            // Wrap things up.
            setTimeout(() => sockets.broadcast(arrival), 5000);
            util.log("[SPAWN] " + arrival);
          },
        };
      })();
      return (census) => {
        if (timer > 3600 && ran.dice(3600 - timer)) {
          util.log("[SPAWN] new sanctuary");
          timer = 1;
          let choice = [];
          switch (ran.chooseChance(3, 2, 1, 0)) {
            case 0:
              choice = [
                [
                  Class.sanctuaryEgg,
                  Class.sanctuarySquare,
                  Class.sanctuaryTriangle,
                  Class.sanctuaryPentagon,
                  Class.sanctuaryHexagon
                ],
                Math.floor(Math.random() * 1) + 1,
                "sanctuaryFood",
                "norm",
              ];
              break;
            case 1:
              choice = [
                [
                  Class.sanctuaryEgg,
                  Class.sanctuarySquare,
                  Class.sanctuaryTriangle,
                  Class.sanctuaryPentagon,
                  Class.sanctuaryHexagon
                ],
                Math.floor(Math.random() * 1) + 2,
                "sanctuaryFood",
                "norm",
              ];
              break;
            case 2:
              choice = [
                [
                  Class.sanctuaryEgg,
                  Class.sanctuarySquare,
                  Class.sanctuaryTriangle,
                  Class.sanctuaryPentagon,
                  Class.sanctuaryHexagon
                ],
                Math.floor(Math.random() * 1) + 3,
                "sanctuaryFood",
                "norm",
              ];
              break;
            case 3:
              choice = [
                [
                  Class.sanctuaryEgg,
                  Class.sanctuarySquare,
                  Class.sanctuaryTriangle,
                  Class.sanctuaryPentagon,
                  Class.sanctuaryHexagon
                ],
                Math.floor(Math.random() * 1) + 4,
                "sanctuaryFood",
                "norm",
              ];
              break;
          }
          boss.prepareToSpawn(...choice);
          setTimeout(boss.spawn, 3600);
          // Set the timeout for the spawn functions
        } else if (!census.Sanctuaries) timer++;
      };
    })();

    let spawnCrasher = (census) => {
      if (
        ran.chance(
          1 - (0.5 * census.crasher) / room.maxFood / room.nestFoodAmount / 5
        )
      ) {
        let spot,
          i = 30;
        do {
          spot = room.randomType("nest");
          i--;
          if (!i) return 0;
        } while (dirtyCheck(spot, 100));
        let type = ran.dice(80)
          ? ran.choose([
              /*
              Class.sentry2,
              Class.sentry3,*/
              Class.sentryGun,
              Class.sentrySwarm,
              Class.sentryTrap,
              Class.squaretroll,
            ])
          : Class.crasher;
        let o = new Entity(spot);
        o.define(type);
        o.team = -100;
      }
    };

    var sec_left = 3600 * 50;
    var stopTime = 0;
    var reset = true;
    var timer;

    function timeThing() {
      timer = setInterval(function () {
        if (stopTime === 1) {
          clearInterval(timer);
          stopTime = 0;
        }
        if (sec_left <= 0) {
          clearInterval(timer);
          //sockets.broadcast('Your Team has Lost');
          if (arenaclosed === false) {
            setTimeout(() => closemode(), 1000);
          }
          reset = false;
        } else {
          if (sec_left === 3600 * 50) {
            sockets.broadcast("The server close in 1 hour");
            util.log("[CLOSE ARENA] The server close in 1 hours");
          }
          if (sec_left === 1800 * 50) {
            sockets.broadcast("The server close in 30 minutes");
            util.log("[CLOSE ARENA] The server close in 30 minutes");
          }
          if (sec_left === 900 * 50) {
            sockets.broadcast("The server close in 15 minutes");
            util.log("[CLOSE ARENA] The server close in 15 minutes");
          }
          if (sec_left === 600 * 50) {
            sockets.broadcast("The server close in 10 minutes");
            util.log("[CLOSE ARENA] The server close in 10 minutes");
          }
          if (sec_left === 300 * 50) {
            sockets.broadcast("The server close in 5 minutes");
            util.log("[CLOSE ARENA] The server close in 5 minutes");
          }
          if (sec_left === 60 * 50) {
            sockets.broadcast("The server close in 1 minute");
            util.log("[CLOSE ARENA] The server close in 1 minute");
          }
          if (sec_left === 10 * 50) {
            sockets.broadcast("Arena Closed: no may players can join");
            closemode();
          }
          if (sec_left === 1 * 50) {
            util.log("[CLOSE ARENA] Arena closed!");
            util.CloseArenas();
          }
        }
        sec_left -= 1;
      }, 3600 * 50);
    }

    function stopTimer() {
      stopTime = 1;
      if (reset === true) {
        sec_left = 50;
      }
    }

    // The NPC function
    let makenpcs = (() => {
      // Make base protectors if needed.
      let f = (loc, team) => {
        let o = new Entity(loc);
        //o.define(Class.sanctuary);
        o.define(ran.choose([Class.baseProtector]));
        o.team = -team;
        o.color = [10, 11, 12, 15, 13][team - 1];
      };
      for (let i = 1; i < 5; i++) {
        room["bas" + i].forEach((loc) => {
          f(loc, i);
        });
      }
      // Return the spawning function
      let bots = [];
      return () => {
        let census = {
          crasher: 0,
          miniboss: 0,
          tank: 0,
          Sanctuaries: 0,
          a: 0,
        };
        let npcs = entities
          .map(function npcCensus(instance) {
            if (census[instance.type] != null) {
              census[instance.type]++;
              return instance;
            }
          })
          .filter((e) => {
            return e;
          });

        // Spawning
        if (c.SPAWN_CRASHERS) {
          spawnCrasher(census);
        }
        if (c.SPAWN_NORMAL_BOSSES) {
          spawnBosses(census);
        }
        if (c.SPAWN_SANCTUARIES) {
          spawnSanctuaries(census);
        }
        if (c.TIMER) {
          timeThing();
        }
        // Inicio de la partida
        //util.log
        //spawnSomething(census);
        /* 4 types of bots added in Alpha 6.3 with 3 main functions 
            1.- remove shapes that cause server lag (eggs, squares, triangles, etc.)
            2.-create competitiveness on the server
            3.-avoid a server without chaos  */
        /*
        if (bots.length < c.BOTS) {
          let o = new Entity(room.random());
          o.color = 12;
          //o.define(Class.bot);
          o.define(
            ran.choose([
              Class.bot,
              Class.botBS,
              Class.bot2,
            ])
          );
          o.define(
            ran.choose([
              Class.twiner,
              Class.look,
              Class.machineAG,
              Class.flankAB,
              Class.driver,
              Class.pounderAB,
              Class.trap_autoBot,
              Class.manager,
              Class.tri,
              Class.Quad_Tank,
              Class.double,
              Class.auto3,
              Class.flanktrapBot,
              Class.hexa,
              Class.tritraperBot,
              Class.builder,
              Class.mega_trapperBot,
              Class.twin_trapBot,
              Class.destroy,
              Class.hunter,
              Class.Apounder,
              Class.artillery,
              Class.launcher,
              Class.overseer,
              Class.cruiser,
              Class.underseer,
              Class.spawnerBot,
              Class.mini,
              Class.gunner,
              Class.assassin,
              Class.rifle,
              Class.double,
              Class.bent,
              Class.MiniPinwheel,
              Class.spray,
            ])
          );
          o.name += ran.chooseBotName();
          o.refreshBodyAttributes();
          bots.push(o);
        }
        // Remove dead ones
        //bots = bots.filter((e) => {return !e.isDead();});
        // Slowly upgrade them
        bots.forEach((o) => {
          if (o.skill.level < 45) {
            //o.skill.score += 585;
            o.skill.score = 9192;
            o.skill.maintain();
          }
        });*/
        let higBotProbability = ran.choose([
          Class.machineBot,
          Class.nail5,
          Class.anniBot,
          Class.battleshipR,
          Class.single,
          Class.dual,
          Class.musket,
          Class.tripletwin,
          Class.split,
          Class.autodouble,
          Class.bentdouble,
          Class.doubleAB,
          Class.penta,
          Class.spread,
          Class.benthybrid,
          Class.triple,
          Class.bentAB,
          Class.autogunner,
          Class.nailgun,
          Class.auto4,
          Class.machinegunner,
          Class.gunner5,
          Class.cyclone,
          Class.overgunner,
          Class.gunnerAB,
          Class.ranger,
          Class.falcon,
          Class.autoass,
          Class.MegaLook,
          Class.preda,
          Class.poach,
          Class.ordnance,
          Class.hunteru,
          Class.construct,
          Class.autobuilder,
          Class.engineer,
          Class.boomer,
          Class.conqueror,
          Class.architect,
          Class.magician,
          Class.armsman,
          Class.crossbow,
          Class.rifler,
          Class.anni,
          Class.hybrid,
          Class.shotgun2,
          Class.Adestroy,
          Class.Exterminator,
          Class.destroyAB,
          Class.beekeeper,
          Class.machinery,
          Class.stream,
          Class.hybridmini,
          Class.aggressor,
          Class.fighter,
          Class.booster,
          Class.autotri,
          Class.brutalizer,
          Class.eagle,
          Class.police,
          Class.octo,
          Class.hexaAB,
          Class.auto5,
          Class.heavy3,
          Class.banshee,
          Class.terminator,
          Class.overlord,
          Class.autoverseer,
          Class.overdrive,
          Class.commander,
          Class.master,
          Class.oversible,
          Class.necromancer,
          Class.launch_guard,
          Class.Trianglemancer,
          Class.occultist,
          Class.carrier,
          Class.battleship,
          Class.autocruiser,
          Class.fisherman,
          Class.cruiserAS,
          Class.PounderAutoAB,
          Class.skimmer,
          Class.twister,
          Class.hiveshooter,
          Class.sidewind,
          Class.Rocketer,
          Class.launcherAB,
          Class.streapBot,
          Class.overtrapBot,
          Class.factory_trapBot,
          Class.fortressBot,
          Class.hexatrapBot,
          Class.heptatrapBot,
          Class.MtritrperBot,
          Class.auto_tritraperBot,
          Class.defensorBot,
          Class.Giga_trapperBot,
          Class.bunkBot,
          Class.launcher_trapBot,
          Class.build_trapBot,
          Class.Auto_mega_trapperBot,
          Class.TgunnerBot,
          Class.bulwarkBot,
          Class.Auto_twin_trapBot,
          Class.mixerBot,
          Class.factoryBot,
          Class.AspawnerBot,
          Class.factoryDBot,
          Class.factory_twinBot,
          Class.factory_bugBot,
          Class.super_spawnerBot,
          Class.spawnTrapperBot,
          Class.emperorBot,
          Class.spawnerAMBot,
          Class.guntrapBot,
          Class.bomberBot,
          Class.pinwheel,
          Class.BigCheeseBot,
          Class.FieldGunBot,
          Class.Redistributor,
          Class.Phoenix,
          Class.Atomizer,
          Class.Focal,
          Class.Vulture,
          Class.AlwaysInvisible,
          Class.carHeadlight,
          Class.bentInvisible,
          Class.military,
          Class.bush,
          Class.mechatronic,
          Class.grenadeLauncherBot,
          Class.Stalk,
          Class.masterHunter,
          Class.Fire,
          Class.shooter,
          Class.looker,
          Class.slinker,
          Class.founder,
          Class.tap,
          Class.wateringCan,
          Class.escapist,
          Class.Robot,
          Class.flanktrapInvisiblerBot,
          Class.refugeeBot,
          Class.managerDriver,
          Class.brownDwarf,
          Class.terroristBot,
          Class.Buildersible,
          Class.Spy,
          Class.flutist,
          Class.Spounder,
          Class.NinjaBot,
          Class.cross,
          Class.windmill,
          Class.MegaLauncherBot,
          Class.Biologist,
          Class.psychopathBot,
          Class.twinHacker,
          Class.Spounder,
          Class.camouflage,
          Class.machinhHacker,
          Class.BermudaTriangle,
          Class.secretRuler,
          Class.imposter,
          Class.vigilant,
          Class.hackAndSeek,
          Class.DionaeaMuscipula,
          Class.MegaIvy,
          Class.PoisonIvy,
          Class.ivysible,
          Class.plague,
          Class.BotanicalAP,
          Class.trojan,
        ]);
        let popularTanks = ran.choose([
          Class.penta,
          Class.spread,
          Class.triple,
          Class.autogunner,
          Class.nailgun,
          Class.auto4,
          Class.machinegunner,
          Class.overgunner,
          Class.preda,
          Class.construct,
          Class.autobuilder,
          Class.engineer,
          Class.anni,
          Class.hybrid,
          Class.shotgun2,
          Class.Exterminator,
          Class.destroyAB,
          Class.beekeeper,
          Class.fighter,
          Class.booster,
          Class.eagle,
          Class.octo,
          Class.overlord,
          Class.hiveshooter,
          Class.sidewind,
          Class.fortressBot,
          Class.defensorBot,
          Class.bunkBot,
          Class.TgunnerBot,
          Class.factoryBot,
          Class.AspawnerBot,
          Class.BigCheeseBot,
          Class.Redistributor,
          Class.Phoenix,
          Class.Atomizer,
          Class.AlwaysInvisible,
          Class.grenadeLauncherBot,
          Class.Stalk,
          Class.slinker,
          Class.Spy,
          Class.MegaLauncherBot,
          Class.Biologist,
        ]);
        let BestTanks = ran.choose([
          Class.penta,
          Class.triple,
          Class.nailgun,
          Class.overgunner,
          Class.preda,
          Class.engineer,
          Class.anni,
          Class.Exterminator,
          Class.booster,
          Class.overlord,
          Class.hiveshooter,
          Class.fortressBot,
          Class.defensorBot,
          Class.bunkBot,
          Class.factoryBot,
          Class.BigCheeseBot,
          Class.Phoenix,
          Class.AlwaysInvisible,
          Class.MegaLauncherBot,
          Class.Biologist,
        ]);
        const BotClasses = [Class.bot, Class.bot2, Class.bot3];
        const BotClasses2 = [Class.basicUB, Class.testbed51];
        const BlueTeamColor = 10; // Cambia esto al color que desees para el equipo azul
        const GreenTeamColor = 11; // Cambia esto al color que desees para el equipo verde
        const RedTeamColor = 12; // Cambia esto al color que desees para el equipo rojo
        const PurpleTeamColor = 15; // Cambia esto al color que desees para el equipo morado
        const dreadnoughtTeamColor = 17; // Cambia esto al color que desees para el equipo morado
        // Función para crear bots personalizados
        function createCustomBot() {
          let o = new Entity(room.random());
          o.define(ran.choose(BotClasses));
          o.define(ran.choose(BotClasses2));
          //o.define(Class.car);
          o.color = 12;
          o.name += ran.chooseBotName();
          o.refreshBodyAttributes();
          //o.color = (ran.choose(colors));
          //o.color = 12; // Establecer el color a rojo (color 12)
          //o.UPGRADES_TIER_8 = [Class.dreadnougthOldDef];
          if (c.DREDNOUGHTS_OLD_BOT_TEAMS === true) {
            if (room.gameMode === "2tdm") {
              const teamChoice = Math.random();
              if (teamChoice < 0.33333) {
                o.color = BlueTeamColor;
                o.team = -1; // Equipo azul
              } else if (teamChoice < 0.66667) {
                o.color = GreenTeamColor;
                o.team = -2; // Equipo verde
              } else {
                o.color = dreadnoughtTeamColor;
                o.team = -5; // Equipo dreadnought
              }
            } else if (room.gameMode === "3tdm") {
              const teamChoice = Math.random();
              if (teamChoice < 0.25) {
                o.color = BlueTeamColor;
                o.team = -1; // Equipo azul
              } else if (teamChoice < 0.5) {
                o.color = GreenTeamColor;
                o.team = -2; // Equipo verde
              } else if (teamChoice < 0.75) {
                o.color = RedTeamColor;
                o.team = -3; // Equipo rojo
              } else {
                o.color = dreadnoughtTeamColor;
                o.team = -5; // Equipo dreadnoght
              }
            } else if (room.gameMode === "tdm") {
              const teamChoice = Math.random();
              if (teamChoice < 1 / 5) {
                o.color = BlueTeamColor;
                o.team = -1; // Equipo azul
              } else if (teamChoice < (1 / 5) * 2) {
                o.color = GreenTeamColor;
                o.team = -2; // Equipo verde
              } else if (teamChoice < (1 / 5) * 3) {
                o.color = RedTeamColor;
                o.team = -3; // Equipo rojo
              } else if (teamChoice < (1 / 5) * 4) {
                o.color = PurpleTeamColor;
                o.team = -4; // Equipo morado
              } else {
                o.color = dreadnoughtTeamColor;
                o.team = -5; // Equipo dreadnoght
              }
            } else if (room.gameMode === "ffa") {
              const teamChoice = Math.random();
              if (teamChoice < 0.5) {
                o.color = RedTeamColor;
                o.team = null; // ningun equipo
              } else {
                o.color = dreadnoughtTeamColor;
              }
            }
          }
          if (room.gameMode === "2tdm") {
            const teamChoice = Math.random();
            if (teamChoice < 0.5) {
              o.color = BlueTeamColor;
              o.team = -1; // Equipo azul
            } else {
              o.color = GreenTeamColor;
              o.team = -2; // Equipo verde
            }
          } else if (room.gameMode === "3tdm") {
            const teamChoice = Math.random();
            if (teamChoice < 0.3333) {
              o.color = BlueTeamColor;
              o.team = -1; // Equipo azul
            } else if (teamChoice < 0.6667) {
              o.color = GreenTeamColor;
              o.team = -2; // Equipo verde
            } else {
              o.color = RedTeamColor;
              o.team = -3; // Equipo rojo
            }
          } else if (room.gameMode === "tdm") {
            const teamChoice = Math.random();
            if (teamChoice < 1 / 4) {
              o.color = BlueTeamColor;
              o.team = -1; // Equipo azul
            } else if (teamChoice < (1 / 4) * 2) {
              o.color = GreenTeamColor;
              o.team = -2; // Equipo verde
            } else if (teamChoice < (1 / 4) * 3) {
              o.color = RedTeamColor;
              o.team = -3; // Equipo rojo
            } else {
              o.color = PurpleTeamColor;
              o.team = -4; // Equipo morado
            }
          } else if (room.gameMode === "ffa") {
            const teamChoice = Math.random();
            if (teamChoice < 1) {
              o.color = RedTeamColor;
            }
          }
          // Generar una puntuación aleatoria para el bot entre 0 y 5
          const minScore = 26302;
          const maxScore = 99999;
          const randomScore =
            Math.floor(Math.random() * (maxScore + 9999 - minScore + 1)) +
            minScore;
          o.skill.score = randomScore;
          const minLevel = 1;
          const maxLevel = 180;
          const randomLevel =
            Math.floor(Math.random() * (maxLevel - minLevel)) + minLevel;
          o.skill.level = randomLevel;

          bots.push(o);
        }

        // Crear bots personalizados hasta alcanzar la cantidad deseada
        while (bots.length < c.BOTS) {
          createCustomBot();
        }

        // Eliminar bots muertos
        bots = bots.filter((e) => {
          return !e.isDead();
        });

        // Mejorar lentamente los bots
        bots.forEach((o) => {
          /*
  if (o.skill.level < 180) {
    o.skill.score = o.SCORE;
    o.skill.maintain();
  }*/
          if (o.upgrades.length && Math.random() > 0.5)
            o.upgrade(Math.floor(Math.random() * o.upgrades.length));
        });
        /*
        bots.forEach((o) => {
          if (o.skill.level < 45) {
            o.skill.score = ran.choose([26302, 43840]);
            //o.skill.score += 585;
            o.skill.maintain();
          }
        });*/
        /*
        
        if (bots.length < c.BOTS) {
          let o = new Entity(room.random());
          o.color = 12;
          //o.define(Class.bot);
          o.define(
            ran.choose([
              Class.bot,
              Class.botBS,
              Class.bot2,
            ])
          );
          o.define(
            ran.choose([
              Class.twin,
              Class.sniper,
              Class.machine,
              Class.flank,
              Class.director,
              Class.pounder,
              Class.trapperBot,
              Class.flankGuard,
              Class.Invisible,
              Class.Seeker,
            ])
          );
          o.name += ran.chooseBotName();
          o.refreshBodyAttributes();
          bots.push(o);
        }
        // Remove dead ones
        //bots = bots.filter((e) => {return !e.isDead();});
        // Slowly upgrade them
        bots.forEach((o) => {
          if (o.skill.level < 45) {
            //o.skill.score += 585;
            o.skill.score = 1431;
            o.skill.maintain();
          }
        });*/
        /*if (bots.length < c.BOTS) {
                    let o = new Entity(room.random());
                    o.color = 12;
                    o.define(Class.bot2);
                    o.define(Class.smash);
                    o.name += ran.chooseBotName();
                    o.refreshBodyAttributes();
                    bots.push(o);
                }
                // Remove dead ones
                bots = bots.filter(e => { return !e.isDead(); });
                // Slowly upgrade them
                bots.forEach(o => {
                    if (o.skill.level < 45) {
                        o.skill.score += 585;
                        o.skill.maintain();
                    }
              });*/
      };
    })();

    // The big food function
    let makefood = (() => {
      let food = [],
        foodSpawners = [];
      // The two essential functions
      function getFoodClass(level) {
        let a = {};
        let classOptions = [];
        const foodProbability = Math.random();
        switch (level) {
          case 0:
            //classOptions = [Class.egg, Class.egg, Class.egg, Class.egg, Class.egg, Class.betaEgg, Class.betaEgg, Class.alphaEgg];
            // Agregar gem con probabilidad 1/50000
            classOptions = [
              Class.egg,
              Class.egg,
              Class.egg,
              Class.egg,
              Class.egg,
              Class.betaEgg,
              Class.betaEgg,
              Class.alphaEgg,
            ];
            // Agregar gem con probabilidad 1/500000
            if (Math.random() < 0.000002) {
              classOptions = [Class.gem];
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar legendaryAlphaPentagon con probabilidad 1/1000000
            if (Math.random() < 0.0000001) {
              classOptions.push(Class.jewel);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            break;

          case 1:
            //classOptions = [Class.square, Class.square, Class.square, Class.square, Class.square, Class.betaSquare, Class.betaSquare, Class.alphaSquare];
            if (c.CHRISTMAS_SHAPES == false) {
              classOptions = [
                Class.square,
                Class.square,
                Class.square,
                Class.square,
                Class.square,
                Class.betaSquare,
                Class.betaSquare,
                Class.alphaSquare,
              ];
            }
            if (c.CHRISTMAS_SHAPES == true) {
              classOptions = [Class.snow, Class.snow];
            }
            // Agregar greensquare con probabilidad 1/500000
            if (Math.random() < 0.000002) {
              classOptions = [Class.greensquare];
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar legendarySquare con probabilidad 1/1000000
            if (Math.random() < 0.0000001) {
              classOptions.push(Class.legendarySquare);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar shadowsquare con probabilidad 1/3000000
            if (Math.random() < 1 / 3000000) {
              classOptions.push(Class.shadowsquare);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar rainbowsquare con probabilidad 1/76000000
            if (Math.random() < 1 / 76000000) {
              classOptions.push(Class.rainbowsquare);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar transsquare con probabilidad 1/152000000
            if (Math.random() < 1 / 152000000) {
              classOptions.push(Class.transsquare);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar albinosquare con probabilidad 1/2500000000
            if (Math.random() < 1 / 2500000000) {
              classOptions.push(Class.albinosquare);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar epilepsysquare con probabilidad 1/3000000000
            if (Math.random() < 1 / 3000000000) {
              classOptions.push(Class.epilepsysquare);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            break;

          case 2:
            //classOptions = [Class.triangle, Class.triangle, Class.triangle, Class.triangle, Class.triangle, Class.betaTriangle, Class.betaTriangle, Class.alphaTriangle];
            if (c.CHRISTMAS_SHAPES == false) {
              classOptions = [
                Class.triangle,
                Class.triangle,
                Class.triangle,
                Class.triangle,
                Class.triangle,
                Class.betaTriangle,
                Class.betaTriangle,
                Class.alphaTriangle,
              ];
            }
            if (c.CHRISTMAS_SHAPES == true) {
              classOptions = [Class.gingerbreadMan, Class.gingerbreadMan];
            }
            // Agregar greentriangle con probabilidad 1/500000
            if (Math.random() < 0.000002) {
              classOptions = [Class.greentriangle];
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar legendaryTriangle con probabilidad 1/1000000
            if (Math.random() < 0.0000001) {
              classOptions.push(Class.legendaryTriangle);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar shadowtriangle con probabilidad 1/3000000
            if (Math.random() < 1 / 3000000) {
              classOptions.push(Class.shadowtriangle);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar rainbowtriangle con probabilidad 1/76000000
            if (Math.random() < 1 / 76000000) {
              classOptions.push(Class.rainbowtriangle);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar transtriangle con probabilidad 1/152000000
            if (Math.random() < 1 / 152000000) {
              classOptions.push(Class.transtriangle);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar albinotriangle con probabilidad 1/2500000000
            if (Math.random() < 1 / 2500000000) {
              classOptions.push(Class.albinotriangle);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar epilepsytriangle con probabilidad 1/3000000000
            if (Math.random() < 1 / 3000000000) {
              classOptions.push(Class.epilepsytriangle);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            break;

          case 3:
            //classOptions = [Class.pentagon, Class.pentagon, Class.pentagon, Class.pentagon, Class.pentagon, Class.betaPentagon, Class.betaPentagon, Class.alphaPentagon];
            if (c.CHRISTMAS_SHAPES == false) {
              classOptions = [
                Class.pentagon,
                Class.pentagon,
                Class.pentagon,
                Class.pentagon,
                Class.pentagon,
                Class.betaPentagon,
                Class.betaPentagon,
                Class.alphaPentagon,
              ];
            }
            if (c.CHRISTMAS_SHAPES == true) {
              classOptions = [Class.snowMan, Class.snowMan];
            }
            // Agregar greenpentagon con probabilidad 1/500000
            if (Math.random() < 0.000002) {
              classOptions = [Class.greenpentagon];
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar legendaryPentagon con probabilidad 1/1000000
            if (Math.random() < 0.0000001) {
              classOptions.push(Class.legendaryPentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar shadowpentagon con probabilidad 1/3000000
            if (Math.random() < 1 / 3000000) {
              classOptions.push(Class.shadowpentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar rainbowpentagon con probabilidad 1/76000000
            if (Math.random() < 1 / 76000000) {
              classOptions.push(Class.rainbowpentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar transpentagon con probabilidad 1/152000000
            if (Math.random() < 1 / 152000000) {
              classOptions.push(Class.transpentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar albinopentagon con probabilidad 1/2500000000
            if (Math.random() < 1 / 2500000000) {
              classOptions.push(Class.albinopentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar epilepsypentagon con probabilidad 1/3000000000
            if (Math.random() < 1 / 3000000000) {
              classOptions.push(Class.epilepsypentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            break;

          case 4:
            //classOptions = [Class.hexagon, Class.hexagon, Class.hexagon, Class.hexagon, Class.hexagon, Class.betaHexagon, Class.betaHexagon, Class.alphaHexagon];
            if (c.CHRISTMAS_SHAPES == false) {
              classOptions = [
                Class.hexagon,
                Class.hexagon,
                Class.hexagon,
                Class.hexagon,
                Class.hexagon,
                Class.betaHexagon,
                Class.betaHexagon,
                Class.alphaHexagon,
              ];
            }
            if (c.CHRISTMAS_SHAPES == true) {
              classOptions = [Class.christmasTree, Class.christmasTree];
            }
            // Agregar greenbetapentagon con probabilidad 1/500000
            if (Math.random() < 0.000002) {
              classOptions = [Class.greenbetapentagon];
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar legendaryBetaPentagon con probabilidad 1/1000000
            if (Math.random() < 0.0000001) {
              classOptions.push(Class.legendaryBetaPentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar shadowbetapentagon con probabilidad 1/3000000
            if (Math.random() < 1 / 3000000) {
              classOptions.push(Class.shadowbetapentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar rainbowalphapentagon con probabilidad 1/76000000
            if (Math.random() < 1 / 76000000) {
              classOptions.push(Class.rainbowbetapentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar transbetapentagon con probabilidad 1/152000000
            if (Math.random() < 1 / 152000000) {
              classOptions.push(Class.transbetapentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar albinobetapentagon con probabilidad 1/2500000000
            if (Math.random() < 1 / 2500000000) {
              classOptions.push(Class.albinobetapentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar epilepsybetapentagon con probabilidad 1/3000000000
            if (Math.random() < 1 / 3000000000) {
              classOptions.push(Class.epilepsybetapentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            break;

          case 5:
            classOptions = [Class.hugePentagon];
            // Agregar greenalphapentagon con probabilidad 1/500000
            if (Math.random() < 0.000002) {
              classOptions = [Class.greenalphapentagon];
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar legendaryAlphaPentagon con probabilidad 1/1000000
            if (Math.random() < 0.0000001) {
              classOptions.push(Class.legendaryAlphaPentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar shadowalphapentagon con probabilidad 1/3000000
            if (Math.random() < 1 / 3000000) {
              classOptions.push(Class.shadowalphapentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar rainbowalphapentagon con probabilidad 1/76000000
            if (Math.random() < 1 / 76000000) {
              classOptions.push(Class.rainbowalphapentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar transalphapentagon con probabilidad 1/152000000
            if (Math.random() < 1 / 152000000) {
              classOptions.push(Class.transalphapentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar albinoalphapentagon con probabilidad 1/2500000000
            if (Math.random() < 1 / 2500000000) {
              classOptions.push(Class.albinoalphapentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            // Agregar epilepsyalphapentagon con probabilidad 1/3000000000
            if (Math.random() < 1 / 3000000000) {
              classOptions.push(Class.epilepsyalphapentagon);
              util.log("a rare polygon has spawned");
              sockets.broadcast("A rare polygon has spawned");
            }
            break;

          //default:
          // throw('bad food level');
        } /*
    switch (level) {
        case 0:
            classOptions = [Class.egg];
            break;
        case 1:
            classOptions = [Class.square];
            break;
        case 2:
            classOptions = [Class.triangle];
            break;
        case 3:
            classOptions = [Class.pentagon];
            break;
        case 4:
            classOptions = [Class.bigPentagon];
            break;
        case 5:
            classOptions = [Class.hugePentagon];
            break;
        case 6:
            classOptions = [Class.hexagon1];
            break;
        case 7:
            classOptions = [Class.septagon];
            break;
        case 8:
            classOptions = [Class.octogon];
            break;
        case 9:
            classOptions = [Class.nonagon];
            break;
        //default:
            //throw('bad food level');
    }*/
        a = ran.choose(classOptions);

        if (a !== {}) {
          a.BODY.ACCELERATION = 0.015 / (a.FOOD.LEVEL + 1);
        }

        return a;
      }

      let placeNewFood = (position, scatter, level, allowInNest = false) => {
        let o = nearest(food, position);
        let mitosis = false;
        let seed = false;

        // Find the nearest food and determine if we can do anything with it
        if (o != null) {
          for (let i = 50; i > 0; i--) {
            if (scatter == -1 || util.getDistance(position, o) < scatter) {
              if (ran.dice((o.foodLevel + 1) * (o.foodLevel + 1))) {
                mitosis = true;
                break;
              } else {
                seed = true;
                break;
              }
            }
          }
        }

        // Decide what to do
        if (scatter != -1 || mitosis || seed) {
          // Splitting
          if (
            o != null &&
            (mitosis || seed) &&
            room.isIn("nest", o) === allowInNest
          ) {
            let levelToMake;

            if (mitosis) {
              // Handle the evolution logic here
              if (Class === Class.gem) {
                levelToMake = Class.greensquare;
              } else if (Class === Class.greensquare) {
                levelToMake = Class.greentriangle;
              } else if (Class === Class.greentriangle) {
                levelToMake = Class.greenpentagon;
              } else if (Class === Class.greenpentagon) {
                levelToMake = Class.greenbetapentagon;
              } else if (Class === Class.greenbetapentagon) {
                levelToMake = Class.greenalphapentagon;
              } else {
                // If it's not one of the above types, just create a new entity of the same type
                levelToMake = o.foodLevel;
              }
            } else {
              levelToMake = level;
            }

            let place = {
              x: o.x + o.size * Math.cos(o.facing),
              y: o.y + o.size * Math.sin(o.facing),
            };

            let new_o = new Entity(place);
            new_o.define(getFoodClass(levelToMake));
            new_o.team = -100;
            new_o.facing = o.facing + ran.randomRange(Math.PI / 2, Math.PI);
            food.push(new_o);

            return new_o;
          }
          // Brand new
          else if (room.isIn("nest", position) === allowInNest) {
            if (!dirtyCheck(position, 20)) {
              o = new Entity(position);
              o.define(getFoodClass(level));
              o.team = -100;
              o.facing = ran.randomAngle();
              food.push(o);
              return o;
            }
          }
        }
      };

      // Define foodspawners
      class FoodSpawner {
        constructor() {
          this.foodToMake = Math.ceil(
            Math.abs(ran.gauss(0, room.scale.linear * 80))
          );
          this.size = Math.sqrt(this.foodToMake) * 25;

          // Determine where we ought to go
          let position = {};
          let o;
          do {
            position = room.gaussRing(1 / 3, 20);
            o = placeNewFood(position, this.size, 0);
          } while (o == null);

          // Produce a few more
          for (let i = Math.ceil(Math.abs(ran.gauss(0, 4))); i <= 0; i--) {
            placeNewFood(o, this.size, 0);
          }

          // Set location
          this.x = o.x;
          this.y = o.y;
          //util.debug('FoodSpawner placed at ('+this.x+', '+this.y+'). Set to produce '+this.foodToMake+' food.');
        }
        rot() {
          if (--this.foodToMake < 0) {
            //util.debug('FoodSpawner rotted, respawning.');
            util.remove(foodSpawners, foodSpawners.indexOf(this));
            foodSpawners.push(new FoodSpawner());
          }
        }
      }
      // Add them
      foodSpawners.push(new FoodSpawner());
      foodSpawners.push(new FoodSpawner());
      foodSpawners.push(new FoodSpawner());
      foodSpawners.push(new FoodSpawner());
      // Food making functions
      let makeGroupedFood = () => {
        // Create grouped food
        // Choose a location around a spawner
        let spawner = foodSpawners[ran.irandom(foodSpawners.length - 1)],
          bubble = ran.gaussRing(spawner.size, 1 / 4);
        placeNewFood(
          { x: spawner.x + bubble.x, y: spawner.y + bubble.y },
          -1,
          0
        );
        spawner.rot();
      };
      let makeDistributedFood = () => {
        // Distribute food everywhere
        //util.debug('Creating new distributed food.');
        let spot = {};
        do {
          spot = room.gaussRing(1 / 2, 2);
        } while (room.isInNorm(spot));
        placeNewFood(spot, 0.01 * room.width, 0);
      };
      let makeCornerFood = () => {
        // Distribute food in the corners
        let spot = {};
        do {
          spot = room.gaussInverse(5);
        } while (room.isInNorm(spot));
        placeNewFood(spot, 0.05 * room.width, 0);
      };
      let makeNestFood = () => {
        // Make nest pentagons
        let spot = room.randomType("nest");
        const foodType = Math.floor(Math.random() * 2) + 3;
        placeNewFood(spot, 0.01 * room.width, foodType, true);
      };
      // Return the full function
      return () => {
        // Find and understand all food
        let census = {
          [0]: 0, // Eggs
          [1]: 0, // Squares
          [2]: 0, // Triangles
          [3]: 0, // Penta
          [4]: 0, // Beta
          [5]: 0, // Alpha
          [6]: 0,
          tank: 0,
          sum: 0,
        };
        let censusNest = {
          [0]: 0, // Eggs
          [1]: 0, // Squares
          [2]: 0, // Triangle
          [3]: 0, // Penta
          [4]: 0, // Beta
          [5]: 0, // Alpha
          [6]: 0,
          sum: 0,
        }; /*
            let census = {
                [0]: 0, // Eggs
                [1]: 0, // Squares
                [2]: 0, // Triangles
                [3]: 0, // Penta
                [4]: 0, // Beta
                [5]: 0, // Alpha
                [6]: 0, // Hexagon
                [7]: 0, // Septagon
                [8]: 0, // Octagon
                [9]: 0, // Nonagon
                [10]: 0,
                tank: 0,
                sum: 0,
            };
            let censusNest = {
                [0]: 0, // Eggs
                [1]: 0, // Squares
                [2]: 0, // Triangle
                [3]: 0, // Penta
                [4]: 0, // Beta
                [5]: 0, // Alpha
                [6]: 0, // Hexagon
                [7]: 0, // Septagon
                [8]: 0, // Octagon
                [9]: 0, // Nonagon
                [10]: 0,
                sum: 0,
            };*/
        // Do the censusNest
        food = entities
          .map((instance) => {
            try {
              if (instance.type === "tank") {
                census.tank++;
              } else if (instance.foodLevel > -1) {
                if (room.isIn("nest", { x: instance.x, y: instance.y })) {
                  censusNest.sum++;
                  censusNest[instance.foodLevel]++;
                } else {
                  census.sum++;
                  census[instance.foodLevel]++;
                }
                return instance;
              }
            } catch (err) {
              util.error(instance.label);
              util.error(err);
              instance.kill();
            }
          })
          .filter((e) => {
            return e;
          });
        // Sum it up
        let maxFood = 1 + room.maxFood + 15 * census.tank;
        let maxNestFood = 2.5 + room.maxFood * room.nestFoodAmount;
        let foodAmount = census.sum;
        let nestFoodAmount = censusNest.sum;
        // ROT OLD SPAWNERS
        foodSpawners.forEach((spawner) => {
          if (ran.chance(1 - foodAmount / maxFood)) spawner.rot();
        });
        // MAKE FOOD
        while (
          ran.chance(0.8 * (1 - (foodAmount * foodAmount) / maxFood / maxFood))
        ) {
          switch (ran.chooseChance(10, 2, 1)) {
            case 0:
              makeGroupedFood();
              break;
            case 1:
              makeDistributedFood();
              break;
            case 2:
              makeCornerFood();
              break;
          }
        }
        while (
          ran.chance(
            0.5 *
              (1 -
                (nestFoodAmount * nestFoodAmount) / maxNestFood / maxNestFood)
          )
        )
          makeNestFood();
        // UPGRADE FOOD
        if (!food.length) return 0;
        for (let i = Math.ceil(food.length / 100); i > 0; i--) {
          let o = food[ran.irandom(food.length - 1)], // A random food instance
            oldId = -1000,
            overflow,
            location;
          // Bounce 6 times
          for (let j = 0; j < 6; j++) {
            overflow = 10;
            // Find the nearest one that's not the last one
            do {
              o = nearest(food, {
                x: ran.gauss(o.x, 30),
                y: ran.gauss(o.y, 30),
              });
            } while (o.id === oldId && --overflow);
            if (!overflow) continue;
            // Configure for the nest if needed
            let proportions = c.FOOD,
              cens = census,
              amount = foodAmount;
            if (room.isIn("nest", o)) {
              proportions = c.FOOD_NEST;
              cens = censusNest;
              amount = nestFoodAmount;
            }
            // Upgrade stuff
            o.foodCountup += Math.ceil(Math.abs(ran.gauss(0, 10)));
            while (o.foodCountup >= (o.foodLevel + 1) * 100) {
              o.foodCountup -= (o.foodLevel + 1) * 100;
              if (
                ran.chance(
                  1 -
                    cens[o.foodLevel + 1] /
                      amount /
                      proportions[o.foodLevel + 1]
                )
              ) {
                o.define(getFoodClass(o.foodLevel + 1));
              }
            }
          }
        }
      };
    })(); /*
    let makefood = (() => {
        let food = [], foodSpawners = [];
      let pentagonsFood = [
          ran.choose([Class.pentagon, Class.pentagon, Class.pentagon, Class.pentagon, Class.pentagon, Class.hugePentagon, Class.hugePentagon, Class.hugePentagon, Class.bigPentagon, Class.bigPentagon])
    ]
      let normFood = [
          ran.choose([Class.egg, Class.egg, Class.egg, Class.egg, Class.square, Class.square, Class.square, Class.square, Class.triangle, Class.triangle, Class.triangle, Class.pentagon])
    ]
    function placeNormFood() {
      function placeRoid(type, entityClass) {
        let x = 0;
        let position;
        do {
          position = room.randomType(type);
          x++;
          if (x > 200) {
            //util.warn("Could not place some Obstacles.");
            return 0;
          }
        } while (dirtyCheck(position, 10 + entityClass.SIZE));
        let o = new Entity(position);
        o.define(entityClass);
        o.team = -101;
        //o.facing = ran.randomAngle();
        //o.protect();
        //o.life();
      }
      // Start placing them
      let NormCount =
        (room.norm.length * room.width * room.height) /
        room.xgrid /
        room.ygrid /
        150000 /
        1.5;
      let count = 0;
      for (let i = Math.ceil(NormCount * 1.4); i; i--) {
        count++;
        placeRoid("norm", normFood)
      }
      for (let i = Math.ceil(NormCount * 0.9); i; i--) {
        count++;
        placeRoid("norm", normFood);
      }
    }
    function placeNestFood() {
      function placeRoid(type, entityClass) {
        let x = 0;
        let position;
        do {
          position = room.randomType(type);
          x++;
          if (x > 200) {
            //util.warn("Could not place some Obstacles.");
            return 0;
          }
        } while (dirtyCheck(position, 10 + entityClass.SIZE));
        let o = new Entity(position);
        o.define(entityClass);
        o.team = -101;
        //o.facing = ran.randomAngle();
        //o.protect();
        //o.life();
      }
      // Start placing them
      let NestCount =
        (room.nest.length * room.width * room.height) /
        room.xgrid /
        room.ygrid /
        150000 /
        1.5;
      let count = 0;
      for (let i = Math.ceil(NestCount * 1.4); i; i--) {
        count++;
        placeRoid("nest", pentagonsFood)
      }
      for (let i = Math.ceil(NestCount * 0.9); i; i--) {
        count++;
        placeRoid("nest", pentagonsFood);
      }
    }
        let makeGroupedFood = () => { // Create grouped food
            // Choose a location around a spawner
            let spawner = foodSpawners[ran.irandom(foodSpawners.length - 1)],
                bubble = ran.gaussRing(spawner.size, 1/4);
            placeNormFood({ x: spawner.x + bubble.x, y: spawner.y + bubble.y, }, -1, 0);
            spawner.rot();
        };
    }
  )()*/
    // Define food and food spawning
    return () => {
      // Do stuff
      makenpcs();
      //makefood();
      if (c.FOOD_SPAWN) {
        makefood();
      }
      // Regen health and update the grid
      entities.forEach((instance) => {
        if (instance.shield.max) {
          instance.shield.regenerate();
        }
        if (instance.health.amount) {
          instance.health.regenerate(
            instance.shield.max &&
              instance.shield.max === instance.shield.amount
          );
        }
      });
    };
  })();

  // This is the checking loop. Runs at 1Hz.
  var speedcheckloop = (() => {
    let fails = 0;
    // Return the function
    return () => {
      let activationtime = logs.activation.sum(),
        collidetime = logs.collide.sum(),
        movetime = logs.entities.sum(),
        playertime = logs.network.sum(),
        maptime = logs.minimap.sum(),
        physicstime = logs.physics.sum(),
        lifetime = logs.life.sum(),
        selfietime = logs.selfie.sum();
      let sum = logs.master.record();
      let loops = logs.loops.count(),
        active = logs.entities.count();
      global.fps = (1000 / sum).toFixed(2);
      if (sum > 1000 / roomSpeed / 30) {
        /*
        //fails++;
        util.warn(
          "~~ LOOPS: " +
            loops +
            ". ENTITY #: " +
            entities.length +
            "//" +
            Math.round(active / loops) +
            ". VIEW #: " +
            views.length +
            ". BACKLOGGED :: " +
            (sum * roomSpeed * 3).toFixed(3) +
            "%! ~~"
        );
        util.warn("Total activation time: " + activationtime);
        util.warn("Total collision time: " + collidetime);
        util.warn("Total cycle time: " + movetime);
        util.warn("Total player update time: " + playertime); 
        util.warn("Total lb+minimap processing time: " + maptime);
        util.warn("Total entity physics calculation time: " + physicstime);
        util.warn("Total entity life+thought cycle time: " + lifetime);
        util.warn("Total entity selfie-taking time: " + selfietime);
        util.warn(
          "Total time: " +
            (activationtime +
              collidetime +
              movetime +
              playertime +
              maptime +
              physicstime +
              lifetime +
              selfietime)
        );*/
        if (fails > 60) {
          util.error("FAILURE!");
          //process.exit(1);
        }
      } else {
        fails = 0;
      }
    };
  })();

  /** BUILD THE SERVERS **/
  // Turn the server on
  /*
  let server = http.createServer((req, res) => {
    let { pathname } = url.parse(req.url);
    switch (pathname) {
      case "/":
        res.writeHead(200);
        res.end(
          `<!DOCTYPE html><h3>Arras.io private server andre</h3><button onclick="location.href = 'http://arras.cx/#host=' + location.host">Click here</button>`
        );
        break;
      case "/mockups.json":
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end(mockupJsonData);
        break;
      default:
        res.writeHead(404);
        res.end();
    }
  });
*/
  let server = http.createServer((req, res) => {
    let { pathname } = url.parse(req.url);
    switch (pathname) {
      case "/":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background-image: url("https://cdn.glitch.global/8d75c513-57a5-44bf-aa43-1e439dd224e0/arras.io%20%20screenshot.png?v=1691901936965");
              background-size: cover;
            }
            h3 {
              font-size: 32px;
              font-family: 'Aharoni', sans-serif;
              color: #333;
              margin-bottom: 10px;
            }
            button {
              padding: 10px 20px;
              font-size: 18px;
              font-family: 'Lucida Console', sans-serif;
              background-color: #a9d86d;
              color: white;
              border: none;
              cursor: pointer;
              transition: background-color 0.3s; /* Agregar una transición de color suave */
            }
            button.clicked {
              background-color: #8abc3f;
            }
          </style>
        </head>
        <body>
          <h3>Arras.io private server andre</h3>
          <button id="hostButton" onclick="changeColor()">Click here</button>
          <script>
            function changeColor() {
              const button = document.getElementById('hostButton');
              button.classList.add('clicked'); // Agregar la clase 'clicked' al botón
              setTimeout(() => {
                button.classList.remove('clicked'); // Eliminar la clase 'clicked' después de un tiempo
              }, 300);
              location.href = 'http://arras.cx/#host=' + location.host;
            }
          </script>
        </body>
        </html>
      `);
        break;
      case "/mockups.json":
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end(mockupJsonData);
        break;
      default:
        res.writeHead(404);
        res.end();
    }
  });

  let websockets = (() => {
    // Configure the websocketserver
    let config = { server: server };
    server.listen(process.env.PORT || 8080, function httpListening() {
      util.log(
        new Date() +
          ". Joint HTTP+Websocket server turned on, listening on port " +
          server.address().port +
          "."
      );
    });
    /*if (c.servesStatic) {
    } else {
        config.port = 8080; 
        util.log((new Date()) + 'Websocket server turned on, listening on port ' + 8080 + '.'); 
    }*/
    // Build it
    return new WebSocket.Server(config);
  })().on("connection", sockets.connect);

  // Bring it to life
  setInterval(gameloop, room.cycleSpeed);
  setInterval(maintainloop, 200);
  setInterval(speedcheckloop, 1000); /*
if (room.wall)
  // Wall Spawner
  for (let loc of room.wall) {
    let o = new Entity(loc);
    o.define(Class.wallMaze);
    o.team = -100;
  }*/
  if (c.MAKE_WALLS) {
    if (room.wall) {
      // Probabilidad de aparición de muros (8.%)
      const wallSpawnProbability = 0.8;

      for (let loc of room.wall) {
        // Generar un número aleatorio entre 0 y 1
        const randomValue = Math.random();

        // Verificar si el número aleatorio es menor o igual a la probabilidad de aparición
        if (randomValue <= wallSpawnProbability) {
          let o = new Entity(loc);
          o.define(Class.wallMaze);
          o.team = -100;
          //o.SIZE = (room.xgridWidth + room.ygridHeight) / 4
        }
      }
    }
    if (room.wal1) {
      // Probabilidad de aparición de muros (50%)
      const wallSpawnProbability = 0.5;

      for (let loc of room.wal1) {
        // Generar un número aleatorio entre 0 y 1
        const randomValue = Math.random();

        // Verificar si el número aleatorio es menor o igual a la probabilidad de aparición
        if (randomValue <= wallSpawnProbability) {
          let o = new Entity(loc);
          o.define(Class.wallMaze);
          o.team = -100;
          //o.SIZE = (room.xgridWidth + room.ygridHeight) / 4
        }
      }
    }
    if (room.wal2) {
      // Probabilidad de aparición de muros (40%)
      const wallSpawnProbability = 0.4;

      for (let loc of room.wal2) {
        // Generar un número aleatorio entre 0 y 1
        const randomValue = Math.random();

        // Verificar si el número aleatorio es menor o igual a la probabilidad de aparición
        if (randomValue <= wallSpawnProbability) {
          let o = new Entity(loc);
          o.define(Class.wallMaze);
          o.team = -100;
          //o.SIZE = (room.xgridWidth + room.ygridHeight) / 4
        }
      }
    }
    if (room.wal3) {
      // Probabilidad de aparición de muros (35%)
      const wallSpawnProbability = 0.35;

      for (let loc of room.wal3) {
        // Generar un número aleatorio entre 0 y 1
        const randomValue = Math.random();

        // Verificar si el número aleatorio es menor o igual a la probabilidad de aparición
        if (randomValue <= wallSpawnProbability) {
          let o = new Entity(loc);
          o.define(Class.wallMaze);
          o.team = -100;
          //o.SIZE = (room.xgridWidth + room.ygridHeight) / 4
        }
      }
    }
    if (room.wald) {
      // Probabilidad de aparición de muros (75%)
      const wallSpawnProbability = 0.75;

      for (let loc of room.wald) {
        // Generar un número aleatorio entre 0 y 1
        const randomValue = Math.random();

        // Verificar si el número aleatorio es menor o igual a la probabilidad de aparición
        if (randomValue <= wallSpawnProbability) {
          let o = new Entity(loc);
          o.define(Class.wallMaze);
          o.team = -100;
          //o.SIZE = (room.xgridWidthDread + room.ygridHeight) / 4 + 120
        }
      }
    }
    if (room.wal4) {
      // Probabilidad de aparición de muros (60%)
      const wallSpawnProbability = 0.6;

      for (let loc of room.wal4) {
        // Generar un número aleatorio entre 0 y 1
        const randomValue = Math.random();

        // Verificar si el número aleatorio es menor o igual a la probabilidad de aparición
        if (randomValue <= wallSpawnProbability) {
          let o = new Entity(loc);
          o.define(Class.wallMaze);
          o.team = -100;
          //o.SIZE = (room.xgridWidthDread + room.ygridHeight) / 4 + 120
        }
      }
    }
    if (room.wal5) {
      // Probabilidad de aparición de muros (45%)
      const wallSpawnProbability = 0.45;

      for (let loc of room.wal5) {
        // Generar un número aleatorio entre 0 y 1
        const randomValue = Math.random();

        // Verificar si el número aleatorio es menor o igual a la probabilidad de aparición
        if (randomValue <= wallSpawnProbability) {
          let o = new Entity(loc);
          o.define(Class.wallMaze);
          o.team = -100;
          //o.SIZE = (room.xgridWidthDread + room.ygridHeight) / 4 + 120
        }
      }
    }
    if (room.wal6) {
      // Probabilidad de aparición de muros (25%)
      const wallSpawnProbability = 0.25;

      for (let loc of room.wal6) {
        // Generar un número aleatorio entre 0 y 1
        const randomValue = Math.random();

        // Verificar si el número aleatorio es menor o igual a la probabilidad de aparición
        if (randomValue <= wallSpawnProbability) {
          let o = new Entity(loc);
          o.define(Class.wallMaze);
          o.team = -100;
          //o.SIZE = (room.xgridWidthDread + room.ygridHeight) / 4 + 120
        }
      }
    }
    if (room.wal7) {
      // Probabilidad de aparición de muros (15%)
      const wallSpawnProbability = 0.15;

      for (let loc of room.wal7) {
        // Generar un número aleatorio entre 0 y 1
        const randomValue = Math.random();

        // Verificar si el número aleatorio es menor o igual a la probabilidad de aparición
        if (randomValue <= wallSpawnProbability) {
          let o = new Entity(loc);
          o.define(Class.wallMaze);
          o.team = -100;
          //o.SIZE = (room.xgridWidthDread + room.ygridHeight) / 4 + 120
        }
      }
    }
    if (room.edge) {
      // Probabilidad de aparición de muros (20%)
      const wallSpawnProbability = 1;

      for (let loc of room.edge) {
        // Generar un número aleatorio entre 0 y 1
        const randomValue = Math.random();

        // Verificar si el número aleatorio es menor o igual a la probabilidad de aparición
        if (randomValue <= wallSpawnProbability) {
          let o = new Entity(loc);
          o.define(Class.wallInvisible);
          o.team = -100;
          //o.SIZE = (room.xgridWidthDread + room.ygridHeight) / 4 + 120
        }
      }
    }
  }
  /*
  if (c.ROOM_SETUP === "dreadnoughts"){ 
    [
    ["norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss"],
    ["norm","wal3","wal3","wal3","wal4","wal4","wald","wald","wald","norm","norm","wald","wald","wald","wal4","wal4","wal3","wal3","wal3","norm","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss"],
    ["norm","wal3","wal2","wal2","wal1","wal1","wal1","wal6","wal6","wal6","wal6","wal6","wal6","wal1","wal1","wal1","wal2","wal2","wal3","norm","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss"],
    ["norm","wal3","wal2","norm","norm","norm","wal1","wal3","wal3","wal3","wal3","wal3","wal3","wal1","norm","norm","norm","wal2","wal3","norm","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss"],
    ["norm","wal4","wal1","norm","norm","norm","wal1","wal1","wal1","wal1","wal1","wal1","wal1","wal1","norm","norm","norm","wal1","wal4","norm","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss"],
    ["norm","wal4","wal1","norm","norm","norm","wal7","wal3","wal3","wal3","wal3","wal3","wal3","wal7","norm","norm","norm","wal1","wal4","norm","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss"],
    ["norm","wald","wal1","wal1","wal1","wal7","wal7","wal7","wal5","wal5","wal5","wal5","wal7","wal7","wal7","wal1","wal1","wal1","wald","norm","edge","edge","edge","edge","edge","edge","cent","cent","cent","cent","cent","cent","cent","cent","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","nest","nest","nest","nest","nest","nest","nest","nest","boss","boss","boss","boss","boss","boss"],
    ["norm","wald","wal6","wal3","wal1","wal3","wal7","wal7","wal3","wal3","wal3","wal3","wal7","wal7","wal3","wal1","wal3","wal6","wald","norm","edge","edge","edge","edge","edge","edge","cent","cent","cent","cent","cent","cent","cent","cent","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","nest","nest","nest","nest","nest","nest","nest","nest","boss","boss","boss","boss","boss","boss"],
    ["norm","wald","wal6","wal3","wal1","wal3","wal5","wal3","norm","norm","norm","norm","wal3","wal5","wal3","wal1","wal3","wal6","wald","norm","edge","edge","edge","edge","edge","edge","cent","cent","cent","cent","cent","cent","cent","cent","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","nest","nest","nest","nest","nest","nest","nest","nest","boss","boss","boss","boss","boss","boss"],
    ["norm","norm","wal6","wal3","wal1","wal3","wal5","wal3","norm","norm","norm","norm","wal3","wal5","wal3","wal1","wal3","wal6","norm","norm","edge","edge","edge","edge","edge","edge","cent","cent","cent","cent","cent","cent","cent","cent","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","nest","nest","nest","nest","nest","nest","nest","nest","boss","boss","boss","boss","boss","boss"],
    ["norm","norm","wal6","wal3","wal1","wal3","wal5","wal3","norm","norm","norm","norm","wal3","wal5","wal3","wal1","wal3","wal6","norm","norm","edge","edge","edge","edge","edge","edge","cent","cent","cent","cent","cent","cent","cent","cent","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","nest","nest","nest","nest","nest","nest","nest","nest","boss","boss","boss","boss","boss","boss"],
    ["norm","wald","wal6","wal3","wal1","wal3","wal5","wal3","norm","norm","norm","norm","wal3","wal5","wal3","wal1","wal3","wal6","wald","norm","edge","edge","edge","edge","edge","edge","cent","cent","cent","cent","cent","cent","cent","cent","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","nest","nest","nest","nest","nest","nest","nest","nest","boss","boss","boss","boss","boss","boss"],
    ["norm","wald","wal6","wal3","wal1","wal3","wal7","wal7","wal3","wal3","wal3","wal3","wal7","wal7","wal3","wal1","wal3","wal6","wald","norm","edge","edge","edge","edge","edge","edge","cent","cent","cent","cent","cent","cent","cent","cent","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","nest","nest","nest","nest","nest","nest","nest","nest","boss","boss","boss","boss","boss","boss"],
    ["norm","wald","wal1","wal1","wal1","wal7","wal7","wal7","wal5","wal5","wal5","wal5","wal7","wal7","wal7","wal1","wal1","wal1","wald","norm","edge","edge","edge","edge","edge","edge","cent","cent","cent","cent","cent","cent","cent","cent","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","nest","nest","nest","nest","nest","nest","nest","nest","boss","boss","boss","boss","boss","boss"],
    ["norm","wal4","wal1","norm","norm","norm","wal7","wal3","wal3","wal3","wal3","wal3","wal3","wal7","norm","norm","norm","wal1","wal4","norm","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss"],
    ["norm","wal4","wal1","norm","norm","norm","wal1","wal1","wal1","wal1","wal1","wal1","wal1","wal1","norm","norm","norm","wal1","wal4","norm","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss"],
    ["norm","wal3","wal2","norm","norm","norm","wal1","wal3","wal3","wal3","wal3","wal3","wal3","wal1","norm","norm","norm","wal2","wal3","norm","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss"],
    ["norm","wal3","wal2","wal2","wal1","wal1","wal1","wal6","wal6","wal6","wal6","wal6","wal6","wal1","wal1","wal1","wal2","wal2","wal3","norm","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss"],
    ["norm","wal3","wal3","wal3","wal4","wal4","wald","wald","wald","norm","norm","wald","wald","wald","wal4","wal4","wal3","wal3","wal3","norm","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss"],
    ["norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","norm","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","edge","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss","boss"]
  ]   
 }
  if (c.X_GRID === "dreadnoughts"){ 60 }
  if (c.Y_GRID === "dreadnoughts"){ 20 }*/
  /*const definitions = require('./lib/definitions');
const tankGenerator = definitions.tankGenerator;

// ...

// Ahora, puedes usar la función generarTipoAleatorio con ran
this.randomtype = ran.choose(tankGenerator.GUNS[1].PROPERTIES.TYPE);*/
  // Asumiendo que tankGenerator.GUNS[1].PROPERTIES.TYPE.NAME es un array de nombres
  /*const definitions = require('./lib/definitions');
const tankGenerator = definitions.tankGenerator;
const randomTypeName = ran.chooseBotName(tankGenerator.GUNS[1].PROPERTIES.TYPE.NAME);

// Luego, puedes usar este nombre aleatorio para construir el nombre completo
const randomTankName = "AI_" + randomTypeName;

// Ahora, puedes usar randomTankName donde lo necesites.
*/
  // Graceful shutdown
  let shutdownWarning = false;
  if (process.platform === "win32") {
    var rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("SIGINT", () => {
      process.emit("SIGINT");
    });
  }
  process.on("SIGINT", () => {
    if (!shutdownWarning) {
      shutdownWarning = true;
      sockets.broadcast("The server is shutting down.");
      util.log("Server going down! Warning broadcasted.");
      setTimeout(() => {
        sockets.broadcast("Arena closed.");
        util.log("Final warning broadcasted.");
        setTimeout(() => {
          util.warn("Process ended.");
          process.exit(1);
        }, 3000);
      }, 7500);
    }
  });
  /*  const Eris = require('eris');
const bot = new Eris(process.env.bot_token);   
var prefix = process.env.prefix 
var owner_id = process.env.owner_discord_id //Owner
var dev_id = process.env.dev_discord_id //Developer
var admin_id = process.env.admin_discord_id //Administrator
var mod_id = process.env.mod_discord_id //Moderator
var st_ids = process.env.st_discord_id //Senior Tester
var bt_ids = process.env.bt_discord_id //Beta Tester
 
bot.on('ready', () => {                             
    console.log('Bot is up and ready!');    
    var canLogToDiscord = true
});
 
function unauth(level_required) { return '```patch\n- ERROR: INSUFFICIENT PERMISSION LEVEL\n- PERMISSION LEVEL ' + String(level_required) + ' IS REQUIRED```' }
function arg_error(required, submitted) { return '```patch\n- ERROR: INSUFFICIENT ARGUMENTS SUPPLIED\n- ' + String(required) + ' ARGUMENTS ARE REQUIRED```' }
 
function parse(input) {
  let out =  input.split(" "); 
  return out
}
 
bot.on('messageCreate', (msg) => {
  try {
    if (msg.content.startsWith(prefix + "select ")) {
      let sendError = true
      let lookfor = msg.content.split(prefix + "select ").pop()
      entities.forEach(function(element) {
        if (typeof element.sendMessage == "function" && element.name == lookfor) {
          sendError = false
          bot.createMessage(msg.channel.id, String(element.name + '\nTank: ' + element.label + '\nId: ' + element.id + '\nAlpha: ' + element.alpha + '\nColor: ' + element.blend.amount + '\nMax Health: '  + element.health.max + '\nCurrent Health: '  + element.health.amount + '\nIs Invulnerable: ' + element.invuln + '\nScore: ' + element.photo.score + '\nLevel: ' + element.skill.level));
        }
      })
      if (sendError) {
        bot.createMessage(msg.channel.id, "Was unable to find an entity by that name");
      }
    }
    if (msg.content == prefix + 'ping') {
      bot.createMessage(msg.channel.id, 'Pong!\n' + "\nRunning on glitch: " + process.env.ISONGLITCH + "\nDirectory: " + __dirname + "\nFile name: " + __filename);
    }
    if (msg.content.includes(prefix + 'help')) {
        bot.createMessage(msg.channel.id, '***COMMANDS*** \nPrefix: ' + prefix + '\n(No space after prefix when running command) \n \n**ping**  -  tells u if the server is running\n**kill** *<id>*  -  Kills a player (Authorization required)\n**broadcast** *<message>*  -  broadcasts a message (Authorization required)\n**query** *<internalname>*  -  returns some data about a tank (must use internal name)\n**select** *<name>*  -  returns some data about in-game users\n**players**  -  list in-game players\n**stat** *<id> <path to stat> <new value>*  -  modifies a stat (Authorization required)\n**define** *<id> <tank>*  -  Defines someone as a tank (Authorization required)');
    }
    if (msg.content.startsWith(prefix + 'kill ')) {
      if (msg.author.id == owner_id) {
        let sendError = true
        let lookfor = msg.content.split(prefix + "kill ").pop()
        console.log(lookfor)
        entities.forEach(function(element) {
          if (element.id == lookfor) {
            sendError = false
            element.destroy()
            bot.createMessage(msg.channel.id, "User killed.");
          }
        })
        if (sendError) {
          bot.createMessage(msg.channel.id, "Was unable to find an entity by the id: " + lookfor);
        }
      } else {
        bot.createMessage(msg.channel.id, unauth(3));
      }
    }
    if (msg.content.startsWith(prefix + 'eval')) {
      if (msg.author.id == owner_id) {
        var command = msg.content.split(prefix + "eval ").pop()
        console.log('new eval: ', command)
        var output = eval(command)
        bot.createMessage(msg.channel.id, "Evaluated. Output: " + output);
      } else {
        console.log("Unauthorized user", msg.author.username, "tried to eval")
        bot.createMessage(msg.channel.id, unauth(3));
      }
    }
    if (msg.content.startsWith(prefix + 'broadcast')) {
        if (bt_ids.includes(msg.author.id) || msg.author.id == owner_id) {
        sockets.broadcast(msg.content.split(prefix + "broadcast").pop() + " - " + msg.author.username)
        bot.createMessage(msg.channel.id, 'Message Broadcast!');
      } else {
        console.log("Unauthorized user", msg.author.username, "tried to broadcast")
        bot.createMessage(msg.channel.id, unauth(2));
      }
    }
    if (msg.content.startsWith(prefix + 'query')) {
        let output = ''
        var query = msg.content.split(prefix + "query ").pop()
        try {
          var botreturn = eval('Class.' + query);
          for (var key in botreturn) {
            if (output.length > 500) {console.log(output.length); bot.createMessage(msg.channel.id, output); output = ''}
            output += String(key) + ': ' + eval('Class.' + query + '.' + String(key)) + '\n'
            var returned = typeof eval('Class.' + query + '.' + String(key))
            if (returned == 'object') {
              for (var key2 in eval('Class.' + query + '.' + String(key))) {
                  if (key2 != 'remove') {
                    try {
                      output += "^ " + String(key2) + ': ' + eval('Class.' + query + '.' + String(key) + '[' + String(key2) + ']') + '\n'
                      var returned = typeof eval('Class.' + query + '.' + String(key) + '[' + String(key2) + ']')
                      var returnedobj = eval('Class.' + query + '.' + String(key) + '[' + String(key2) + ']')
                    } catch(err) {
                      output += "^ " + String(key2) + ': ' + eval('Class.' + query + '.' + String(key) + '.' + String(key2)) + '\n'
                      var returned = typeof eval('Class.' + query + '.' + String(key) + '.' + String(key2))
                      var returnedobj = eval('Class.' + query + '.' + String(key) + '.' + String(key2))
                    }
                    if (returned == 'object') {
                      for (var key3 in returnedobj) {
                        if (key3 != 'remove') {
                          try {
                            output += "^ ^ " + String(key3) + ': ' + eval('Class.' + query + '.' + String(key) + '[' + String(key2) + ']' + '[' + String(key3) + ']') + '\n'
                          } catch(err) {
                            try {
                              output += "^ ^ " + String(key3) + ': ' + eval('Class.' + query + '.' + String(key) + '[' + String(key2) + ']' + '.' + String(key3)) + '\n'
                            } catch(err) {
                              try {
                                output += "^ ^ " + String(key3) + ': ' + eval('Class.' + query + '.' + String(key) + '.' + String(key2) + '[' + String(key3) + ']') + '\n'
                              } catch(err) {
                                output += "^ ^ " + String(key3) + ': ' + eval('Class.' + query + '.' + String(key) + '.' + String(key2) + '.' + String(key3)) + '\n'
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          } catch(err) {
            bot.createMessage(msg.channel.id, String(err));
          }
        bot.createMessage(msg.channel.id, output);
      }
  if (msg.content == prefix + 'players') {
    let output = '`'
    entities.forEach(function(element) {
    if (element.name != '') {
        output += String(element.name + '  -  ' + element.id + '\n')
    }}) 
    output += '`'
    bot.createMessage(msg.channel.id, output)}
  if (msg.content.startsWith(prefix + 'stat ')) {
    if (bt_ids.includes(msg.author.id) || msg.author.id == owner_id) {
    let s_command = parse(msg.content)
    let s_lookForId = s_command[1]
    let s_statpath = s_command[2]
    let s_newvalueTemp = s_command.slice(3)
    let s_newvalue = ''
    s_newvalueTemp.forEach(function(element) {
      s_newvalue += element + ' '
    });
    console.log("New stat command: ", s_lookForId, s_statpath, s_newvalue, "Sent by:", msg.author.username, '(' + msg.author.id + ')')
    if (s_newvalue != '') { 
    entities.forEach(function(element) {
    if (element.id == s_lookForId && s_lookForId != "ALL") {
      try {
        eval('element' + s_statpath + ' = ' + s_newvalue)
      } catch(err) {
        eval('element' + s_statpath + ' = "' + s_newvalue + '"')
      }
      element.sendMessage("your stat " + s_statpath + ' has been changed to ' + s_newvalue)
      bot.createMessage(msg.channel.id, "Value set to " + String(eval('element' + s_statpath)));
    }})
  if (s_lookForId == "ALL" && msg.author.id == owner_id) {
    entities.forEach(function(element) {
      try {
        eval('element' + s_statpath + ' = ' + s_newvalue)
      } catch(err) {
        eval('element' + s_statpath + ' = "' + s_newvalue + '"')
      }
      element.sendMessage("your stat " + s_statpath + ' has been changed to ' + s_newvalue)
    })
  bot.createMessage(msg.channel.id, "Values set to " + s_newvalue);
  } else {
    if (s_lookForId == 'ALL') bot.createMessage(msg.channel.id, unauth(3))
  }} else {
    bot.createMessage(msg.channel.id, arg_error(3));
  }
  } else {
    bot.createMessage(msg.channel.id, unauth(2));
  }}
  if (msg.content.startsWith(prefix + 'define ')) {
    let printerror = true
    let command = parse(msg.content)
    let inputid = command[1]
    let inputclass = command[2]
    if (bt_ids.includes(msg.author.id)) {
    if (msg.author.id == owner_id) {
    if (Class[inputclass] != undefined) {
      entities.filter(r => r.id == inputid)[0].define(Class[inputclass])
      printerror = false
      bot.createMessage(msg.channel.id, 'Defined user as Class.' + inputclass);
    } else {
      bot.createMessage(msg.channel.id, inputclass + ' is not a valid tank');
      printerror = false
    }
    if (printerror) {
      bot.createMessage(msg.channel.id, "Couldn't find any users by the id: " + inputid);
    }
    } else {
      bot.createMessage(msg.channel.id, unauth(3));
    }
  } else {
    bot.createMessage(msg.channel.id, unauth(2));
  }}
} catch(err) { // log the error in chat
  bot.createMessage(msg.channel.id, String(err));
}});
 
bot.editStatus('online', {
  name: prefix + 'help for commands!',
  type: 0
});
 
bot.connect();*/

}
//
