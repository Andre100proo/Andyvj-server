```
  //sword upgrades (Old)
  exports.sword = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sword",
    BODY: {
      FOV: 1.15
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  // sowrd (but whit 6 sides of turrets)
  exports.sword1 = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sword",
    BODY: {
      FOV: 1.15
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 6.5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.sabre = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sabre",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.gladius = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Gladius",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 120, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 240, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.sabreGladius = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sabre Gladius",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.gladiusSabre = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Gladius Sabre",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {// LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 120, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 240, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  
  exports.swordPacifier = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sword pacifier",
    BODY: {
      FOV: 1.15
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.sabreAppeaser = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sabre Appeaser",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.sabrePeacekeeper = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sabre Peacekeeper",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1.1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.sabreDiplomat = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sabre Diplomat",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 180, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 180, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 300, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 300, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.gladiusAppeaser = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Gladius Appeaser",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 120, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 240, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.gladiusPeacekeeper = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Gladius Peacekeeper",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 120, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 240, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1.1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.gladiusDiplomat = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Gladius Diplomat",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 120, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 240, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 180, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 180, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 300, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 300, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  
  exports.swordInvader = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sword Invader",
    BODY: {
      FOV: 1.15
    },
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [6, 8.5, 1.2, 8, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 4,
        },
      },
      {
        POSITION: [6, 8.5, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 4,
        },
      },
      {
        POSITION: [6, 8.5, 1.2, 8, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 4,
        },
      },
    ],
  };
  exports.sabreInquisitor = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sabre Inquisitor",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [7.5, 8.5, 1.2, 8, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
      {
        POSITION: [7.5, 8.5, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
      {
        POSITION: [7.5, 8.5, 1.2, 8, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
    ],
  };
  exports.sabreAssailant = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sabre Assailant",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        ////// LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [5, 8, 1, 9.5, 0, 60, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 60, 0],
      },
      {
        POSITION: [5, 8, 1, 9.5, 0, 180, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 180, 0],
      },
      {
        POSITION: [5, 8, 1, 9.5, 0, 300, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 300, 0],
      },
    ],
  };
  exports.sabreInfiltrator = (() => {
    let props = {
    SHOOT_SETTINGS: combineStats([
      g.swarm,
      g.battle,
      g.carrier,
      g.swarmDread,
    ]),
    TYPE: exports.swarm,
    STAT_CALCULATOR: gunCalcNames.swarm
    }
    return {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sabre Infiltrator",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        //// LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY
        POSITION: [4, 4, 0.8, 9, 3, 60, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 60, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 60, 0],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, 3, 180, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 180, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 180, 0],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, 3, 300, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 300, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 300, 0],
        PROPERTIES: props
      },
    ],
  };
  })();
  exports.gladiusInquisitor = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Gladius Inquisitor",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 120, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 240, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [7.5, 8.5, 1.2, 8, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
      {
        POSITION: [7.5, 8.5, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
      {
        POSITION: [7.5, 8.5, 1.2, 8, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
    ],
  };
  exports.gladiusAssailant = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Gladius Assailant",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 120, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 240, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        ////// LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [5, 8, 1, 9.5, 0, 60, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 60, 0],
      },
      {
        POSITION: [5, 8, 1, 9.5, 0, 180, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 180, 0],
      },
      {
        POSITION: [5, 8, 1, 9.5, 0, 300, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 300, 0],
      },
    ],
  };
  exports.gladiusInfiltrator = (() => {
    let props = {
    SHOOT_SETTINGS: combineStats([
      g.swarm,
      g.battle,
      g.carrier,
      g.swarmDread,
    ]),
    TYPE: exports.swarm,
    STAT_CALCULATOR: gunCalcNames.swarm
    }
    return {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Gladius Infiltrator",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 120, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 240, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        //// LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY
        POSITION: [4, 4, 0.8, 9, 3, 60, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 60, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 60, 0],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, 3, 180, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 180, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 180, 0],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, 3, 300, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 300, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 300, 0],
        PROPERTIES: props
      },
    ],
  };
  })();
  
  exports.swordCentaur = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sword Centaur",
    BODY: {
      FOV: 1.15
    },
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [3, 7, 1.55, 13, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [3, 7, 1.55, 13, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [3, 7, 1.55, 13, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
    ],
  };
  exports.sabreCerberus = (() => {
    let props = {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.twintrap,
            g.gunntrap,
            g.cerberus,
          ]),
          TYPE: exports.trap,
        }
    return {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sabre Cerberus",
    BODY: {
      FOV: 1.15
    },
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 60+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 60+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 60-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 60-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 60, 0],
        PROPERTIES: props
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 180+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 180+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 180-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 180-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 180, 0],
        PROPERTIES: props
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 300+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 300+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 300-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 300-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 300, 0],
        PROPERTIES: props
      },
    ],
  };
})();
  exports.sabreMinotaur = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sabre Minotaur",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14, 8, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 8, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 8, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
    ],
  };
  exports.sabreSiren = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sabre Siren",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
    ],
  };
  exports.gladiusCerberus = (() => {
    let props = {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.twintrap,
            g.gunntrap,
            g.cerberus,
          ]),
          TYPE: exports.trap,
        }
    return {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Gladius Cerberus",
    BODY: {
      FOV: 1.15
    },
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 120, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 240, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 60+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 60+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 60-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 60-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 60, 0],
        PROPERTIES: props
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 180+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 180+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 180-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 180-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 180, 0],
        PROPERTIES: props
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 300+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 300+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 300-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 300-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 300, 0],
        PROPERTIES: props
      },
    ],
  };
})();
  exports.gladiusMinotaur = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Gladius Minotaur",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 120, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 240, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14, 8, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 8, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 8, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
    ],
  };
  exports.gladiusSiren = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Gladius Siren",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 120, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 240, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
    ],
  };
  
  exports.swordAutomation = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sword Automation",
    BODY: {
      FOV: 1.15
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
    ],
    TURRETS: [
      {
        //  SIZE     X       Y     ANGLE    ARC 
        POSITION: [4, 6, 0, 30, 110, 1],
        TYPE: [exports.autoTurretDread, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 90, 110, 1],
        TYPE: [exports.autoTurretDread, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 150, 110, 1],
        TYPE: [exports.autoTurretDread, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 210, 110, 1],
        TYPE: [exports.autoTurretDread, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 270, 110, 1],
        TYPE: [exports.autoTurretDread, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 330, 110, 1],
        TYPE: [exports.autoTurretDread, { INDEPENDENT: true}],
      },
      {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: [exports.heavyGunDread, { INDEPENDENT: true}],
      },
    ],
  };
  exports.sabreMechanism = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Sabre Mechanism",
    BODY: {
      FOV: 1.15
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
    ],
    TURRETS: [
      {
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [4, 6, 0, 30, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 90, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 150, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 210, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 270, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 330, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: [exports.heavyGunDread, { INDEPENDENT: true}],
      },
    ],
  };
  exports.gladiusMechanism = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Gladius Mechanism",
    BODY: {
      FOV: 1.15
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 120, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 240, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
    ],
    TURRETS: [
      {
        //  SIZE     X       Y     ANGLE    ARC 
        POSITION: [4, 6, 0, 30, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 90, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 150, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 210, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 270, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 330, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: [exports.heavyGunDread, { INDEPENDENT: true}],
      },
    ],
  };
  
  //pacifier upgrades (Old)
  exports.pacifier = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Pacifier",
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  
  exports.pacifier1 = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Pacifier",
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.appeaser = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Appeaser",
    GUNS: [
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.appeaserPeacekeeper = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Appeaser Peacekeeper",
    GUNS: [
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
       },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.appeaserDiplomat = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Appeaser Diplomat",
    GUNS: [
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 180, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 180, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 300, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 300, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.diplomat = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Diplomat",
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 180, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 180, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 300, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 300, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.diplomatPeacekeeper = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Diplomat Peacekeeper",
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.diplomatAppeaser = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Diplomat Appeaser",
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.peacekeeper1 = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Peacekeeper",
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1.1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.peacekeeperAppeaser = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Peacekeeper Appeaser",
    GUNS: [
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.peacekeeperDiplomat = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Peacekeeper Diplomat",
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1.1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 180, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 180, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 300, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 300, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  
  exports.pacifierSword = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "pacifier sword",
    BODY: {
      FOV: 1.15
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 6.5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 6.5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.appeaserSabre = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Appeaser Sabre",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.peacekeeperSabre = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Peacekeeper Sabre",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1.1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.diplomatSabre = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Diplomat Sabre",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [21, 6.5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [21, 6.5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniperDread, g.sabre]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.appeaserGladius = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Appeaser Gladius",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.peacekeeperGladius = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Peacekeeper Gladius",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1.1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.diplomatGladius = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Diplomat Gladius",
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [19, 8, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [19, 8, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [21, 5.5, 1, 0, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniperDread, g.gladius]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  
  exports.pacifierInvader = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "pacifier Invader",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.15
    },
    GUNS: [
      {
        POSITION: [6, 8.5, 1.2, 8, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 4,
        },
      },
      {
        POSITION: [6, 8.5, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 4,
        },
      },
      {
        POSITION: [6, 8.5, 1.2, 8, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 4,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.appeaserInquisitor = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Appeaser Inquisitor",
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
       },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [7.5, 8.5, 1.2, 8, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
      {
        POSITION: [7.5, 8.5, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
      {
        POSITION: [7.5, 8.5, 1.2, 8, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
    ],
  };
  exports.appeaserAssailant = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Appeaser Assailant",
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
       },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        ////// LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [5, 8, 1, 9.5, 0, 60, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 60, 0],
      },
      {
        POSITION: [5, 8, 1, 9.5, 0, 180, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 180, 0],
      },
      {
        POSITION: [5, 8, 1, 9.5, 0, 300, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 300, 0],
      },
    ],
  };
  exports.appeaserInfiltrator = (() => {
    let props = {
    SHOOT_SETTINGS: combineStats([
      g.swarm,
      g.battle,
      g.carrier,
      g.swarmDread,
    ]),
    TYPE: exports.swarm,
    STAT_CALCULATOR: gunCalcNames.swarm
    }
    return {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Appeaser Infiltrator",
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
       },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        //// LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY
        POSITION: [4, 4, 0.8, 9, 3, 60, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 60, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 60, 0],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, 3, 180, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 180, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 180, 0],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, 3, 300, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 300, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 300, 0],
        PROPERTIES: props
      },
    ],
  };
})();
  exports.peacekeeperInquisitor = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Peacekeeper Inquisitor",
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1.1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [7.5, 8.5, 1.2, 8, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
      {
        POSITION: [7.5, 8.5, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
      {
        POSITION: [7.5, 8.5, 1.2, 8, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
    ],
  };
  exports.peacekeeperAssailant = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Peacekeeper Assailant",
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1.1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        ////// LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [5, 8, 1, 9.5, 0, 60, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 60, 0],
      },
      {
        POSITION: [5, 8, 1, 9.5, 0, 180, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 180, 0],
      },
      {
        POSITION: [5, 8, 1, 9.5, 0, 300, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 300, 0],
      },
    ],
  };
  exports.peacekeeperInfiltrator = (() => {
    let props = {
    SHOOT_SETTINGS: combineStats([
      g.swarm,
      g.battle,
      g.carrier,
      g.swarmDread,
    ]),
    TYPE: exports.swarm,
    STAT_CALCULATOR: gunCalcNames.swarm
    }
    return {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Peacekeeper Infiltrator",
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1.1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        //// LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY
        POSITION: [4, 4, 0.8, 9, 3, 60, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 60, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 60, 0],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, 3, 180, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 180, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 180, 0],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, 3, 300, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 300, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 300, 0],
        PROPERTIES: props
      },
    ],
  };
})();
  exports.diplomatInquisitor = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Diplomat Inquisitor",
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [7.5, 8.5, 1.2, 8, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
      {
        POSITION: [7.5, 8.5, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
      {
        POSITION: [7.5, 8.5, 1.2, 8, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.overDread, g.inquisitor]),
          TYPE: exports.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          MAX_CHILDREN: 6,
        },
      },
    ],
  };
  exports.diplomatAssailant = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Diplomat Assailant",
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        ////// LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [5, 8, 1, 9.5, 0, 60, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 60, 0],
      },
      {
        POSITION: [5, 8, 1, 9.5, 0, 180, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 180, 0],
      },
      {
        POSITION: [5, 8, 1, 9.5, 0, 300, 0],
      },
      {
        POSITION: [1.8, 10, 1, 14, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.spawner, g.factory]),
          TYPE: exports.minion,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          MAX_CHILDREN: 3,
        },
      },
      {
        POSITION: [3.5, 10, 1, 8, 0, 300, 0],
      },
    ],
  };
  exports.diplomatInfiltrator = (() => {
    let props = {
    SHOOT_SETTINGS: combineStats([
      g.swarm,
      g.battle,
      g.carrier,
      g.swarmDread,
    ]),
    TYPE: exports.swarm,
    STAT_CALCULATOR: gunCalcNames.swarm
    }
    return {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Diplomat Infiltrator",
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        //// LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY
        POSITION: [4, 4, 0.8, 9, 3, 60, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 60, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 60, 0],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, 3, 180, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 180, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 180, 0],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, 3, 300, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [4, 4, 0.8, 9, -3, 300, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [6, 4, 0.7, 9, 0, 300, 0],
        PROPERTIES: props
      },
    ],
  };
})();
  
  exports.pacifierCentaur = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "pacifier Centaur",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.15
    },
    GUNS: [
      {
        POSITION: [14, 7, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [3, 7, 1.55, 13, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [3, 7, 1.55, 13, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [3, 7, 1.55, 13, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
    ],
  };
  exports.appeaserCerberus = (() => {
    let props = {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.twintrap,
            g.gunntrap,
            g.cerberus,
          ]),
          TYPE: exports.trap,
        }
    return {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Appeaser Cerberus",
    BODY: {
      FOV: 1.15
    },
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
       },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 60+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 60+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 60-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 60-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 60, 0],
        PROPERTIES: props
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 180+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 180+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 180-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 180-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 180, 0],
        PROPERTIES: props
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 300+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 300+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 300-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 300-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 300, 0],
        PROPERTIES: props
      },
    ],
  };
})();
  exports.appeaserMinotaur = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Appeaser Minotaur",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
       },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14, 8, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 8, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 8, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
    ],
  };
  exports.appeaserSiren = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Appeaser Siren",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
       },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14.5, 9, 1.3, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
    ],
  };
  exports.peacekeeperCerberus = (() => {
    let props = {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.twintrap,
            g.gunntrap,
            g.cerberus,
          ]),
          TYPE: exports.trap,
        }
    return {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Peacekeeper Cerberus",
    BODY: {
      FOV: 1.15
    },
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1.1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 60+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 60+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 60-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 60-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 60, 0],
        PROPERTIES: props
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 180+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 180+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 180-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 180-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 180, 0],
        PROPERTIES: props
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 300+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 300+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 300-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 300-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 300, 0],
        PROPERTIES: props
      },
    ],
  };
})();
  exports.peacekeeperMinotaur = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Peacekeeper Minotaur",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1.1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14, 8, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 8, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 8, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
    ],
  };
  exports.peacekeeperSiren = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Peacekeeper Siren",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1.1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
    ],
  };
  exports.diplomatCerberus = (() => {
    let props = {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.twintrap,
            g.gunntrap,
            g.cerberus,
          ]),
          TYPE: exports.trap,
        }
    return {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Diplomat Cerberus",
    BODY: {
      FOV: 1.15
    },
    STAT_NAMES: statnames.generic,
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 60+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 60+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 60-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 60-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 60, 0],
        PROPERTIES: props
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 180+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 180+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 180-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 180-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 180, 0],
        PROPERTIES: props
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 3.25, 1, 0, 1.8, 300+10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, 1.8, 300+10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [13.5, 3.25, 1, 0, -1.8, 300-10, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 13, -1.8, 300-10, 0.5],
        PROPERTIES: props
      },
      {
        POSITION: [15, 3.25, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [2, 3.25, 1.55, 14.5, 0, 300, 0],
        PROPERTIES: props
      },
    ],
  };
})();
  exports.diplomatMinotaur = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Diplomat Minotaur",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14, 8, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 8, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 8, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [3, 8, 1.65, 13, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread, g.blockDread]),
          TYPE: exports.blockRogueArmada,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
    ],
  };
  exports.diplomatSiren = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Diplomat Siren",
    STAT_NAMES: statnames.generic,
    BODY: {
      FOV: 1.25
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 60, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [14, 7, 1, 0, 0, 300, 0],
      },
      {
        POSITION: [3, 7, 1.8, 13, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.trapDread]),
          TYPE: exports.Autotrap,
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
    ],
  };
  
  exports.pacifierAutomation = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Pacifier Automation",
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread]),
          TYPE: exports.bullet,
        },
      },
    ],
    TURRETS: [
      {
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [4, 6, 0, 30, 110, 1],
        TYPE: [exports.autoTurretDread, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 90, 110, 1],
        TYPE: [exports.autoTurretDread, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 150, 110, 1],
        TYPE: [exports.autoTurretDread, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 210, 110, 1],
        TYPE: [exports.autoTurretDread, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 270, 110, 1],
        TYPE: [exports.autoTurretDread, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 330, 110, 1],
        TYPE: [exports.autoTurretDread, { INDEPENDENT: true}],
      },
      {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: [exports.heavyGunDread, { INDEPENDENT: true}],
      },
    ],
  };
  exports.appeaserMechanism = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Appeaser Mechanism",
    BODY: {
      FOV: 1.15
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [14.5, 9, 1.3, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [10, 9, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser, g.appeaser2, g.appeaser3]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [16.5, 8, 1.2, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.appeaser]),
          TYPE: exports.bullet,
        },
      },
    ],
    TURRETS: [
      {
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [4, 6, 0, 30, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 90, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 150, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 210, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 270, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 330, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: [exports.heavyGunDread, { INDEPENDENT: true}],
      },
    ],
  };
  exports.diplomatMechanism = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Diplomat Mechanism",
    BODY: {
      FOV: 1.15
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [13.5, 5, 1, 0, 3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 120, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, 3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [13.5, 5, 1, 0, -3, 240, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.25, 5, 1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twinDread, g.diplomat]),
          TYPE: exports.bullet,
        },
      },
    ],
    TURRETS: [
      {
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [4, 6, 0, 30, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 90, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 150, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 210, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 270, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 330, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: [exports.heavyGunDread, { INDEPENDENT: true}],
      },
    ],
  };
  exports.peacekeeperMechanism = {
    PARENT: [exports.dreadnougthOld],
    LABEL: "Peacekeeper Mechanism",
    BODY: {
      FOV: 1.15
    },
    GUNS: [
      {
        // LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [15.5, 9, 1.1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
      {
        POSITION: [15.5, 9, 1.1, 0, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.poundDread, g.destroyDread]),
          TYPE: exports.bullet,
        },
      },
    ],
    TURRETS: [
      {
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [4, 6, 0, 30, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 90, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 150, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 210, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 270, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [4, 6, 0, 330, 110, 1],
        TYPE: [exports.autoTurretMechanism, { INDEPENDENT: true}],
      },
      {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: [exports.heavyGunDread, { INDEPENDENT: true}],
      },
    ],
  };
  ```