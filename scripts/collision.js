// ===================
//   COLLISION BOX
// ===================
var collisionBox = {
  ifHasContact: function(collisionBoxOne, collisionBoxTwo) {
    var collisionBox1 = $(collisionBoxOne);
    var collisionBox2 = $(collisionBoxTwo);

    //collisionBox1 contact dimenstions
    var collisionBox1x = collisionBox1.offset().left;
    var collisionBox1y = collisionBox1.offset().top;
    var collisionBox1w = collisionBox1.width();
    var collisionBox1h = collisionBox1.height();

    //collisionBox2 contact dimensions
    var collisionBox2x = collisionBox2.offset().left;
    var collisionBox2y = collisionBox2.offset().top;
    var collisionBox2w = collisionBox2.width();
    var collisionBox2h = collisionBox2.height();

    if (
      collisionBox1y + collisionBox1h < collisionBox2y ||
      collisionBox1y > collisionBox2y + collisionBox2h ||
      collisionBox1x > collisionBox2x + collisionBox2w ||
      collisionBox1x + collisionBox1w < collisionBox2x
    ) {
      return false;
    } else {
      return true;
    }
  }
};

// ====================
// COLLISION QA TESTING
// ====================
//Comment out what you want to see: colors, logs, or both
var collisionQA = {
  logGokuCollision: function() {
    $(".goku").css({ backgroundColor: "green" });
    // console.log('Goku hitbox: ', hitbox);
  },
  logGokuSafe: function() {
    $(".goku").css({ backgroundColor: "red" });
  },
  logRyuCollision: function() {
    $(".ryu").css({ backgroundColor: "yellow" });
    // console.log('Ryu hitbox: ', hitbox);
  },
  logRyuSafe: function() {
    $(".ryu").css({ backgroundColor: "blue" });
  },
  hitBoxCheck: $(window).keydown(function() {
    if (collision === true) {
      console.log("collision confirmed: ", collision);
      return collision;
    }
  })
};

// ==========================
//   COLLISION CONFIRMATION
// ==========================
var collision = false;
var hitbox = false;

var collisionQuery = {
  gokuCollisionPositive: function() {
    collision = true;
    hitbox = true;
    collisionQA.logGokuCollision();
  },
  gokuCollisionNegative: function() {
    collision = false;
    hitbox = false;
    collisionQA.logGokuSafe();
  },
  ryuCollisionPositive: function() {
    collision = true;
    hitbox = true;
    collisionQA.logRyuCollision();
  },
  ryuCollisionNegative: function() {
    collision = false;
    hitbox = false;
    collisionQA.logRyuSafe();
  },
  checkContact: function() {
    $(".collision-p1").each(function() {
      if (collisionBox.ifHasContact(".collision-p2", $(this))) {
        collisionQuery.gokuCollisionPositive();
      } else {
        collisionQuery.gokuCollisionNegative();
      }
    });
    $(".collision-p2").each(function() {
      if (collisionBox.ifHasContact(".collision-p1", $(this))) {
        collisionQuery.ryuCollisionPositive();
      } else {
        collisionQuery.ryuCollisionNegative();
      }
    });
  }
};

//this is to test a pseudo integration of health damage
var healthCounter = {
  gokuHealth: 100,
  ryuHealth: 100,
  damage: 10,

  applyDamageRyu: function() {
    this.ryuHealth = this.ryuHealth - this.damage;
    return this.ryuHealth;
  },
  applyDamageGoku: function() {
    this.gokuHealth = this.gokuHealth - this.damage;
    return this.gokuHealth;
  }
};
console.log("Starting RYU health: ", healthCounter.ryuHealth);
console.log("Starting GOKU health: ", healthCounter.gokuHealth);
console.log("Damage = ", healthCounter.damage);

// ==================
// HITBOX QA TESTING
// ==================

var hitboxQA = {
  gokuPunch: function() {
    $(".goku").css("background-color", "orange");
    console.log("Current RYU health: ", healthCounter.ryuHealth);
  },
  gokuKick: function() {
    $(".goku").css("background-color", "orange");
    console.log("Current RYU health: ", healthCounter.ryuHealth);
  },
  ryuPunch: function() {
    $(".ryu").css("background-color", "purple");
    console.log("Current GOKU haelth: ", healthCounter.gokuHealth);
  },
  ryuKick: function() {
    $(".ryu").css("background-color", "purple");
    console.log("Current GOKU haelth: ", healthCounter.gokuHealth);
  }
};

//HEALTHBAR
let maxHitPoints = 0,
  curHitPoints = maxHitPoints;
var healthbar = {
  generateHitPoints: function() {
    maxHitPoints = 100;
    $(".maxHitPoints").text(maxHitPoints);
  },
  assignDamageValue: function() {
    $(".gamePad").each(function() {
      var damageValue = 10;
      $(this).val(damageValue);
    });
  },
  countDamage: function(userSelection) {
    damage = +$(userSelection).val();
    $(".damage").text(damage);
  },
  applyDamageRyu: function(curHitPoints) {
    //Removes a correct percentage ratio of hitpoints when
    //applying different amounts of damage
    var hpToPercentRatio = curHitPoints * (100 / maxHitPoints);
    $(".health-bar-text-p2").html(curHitPoints + " HP");
    $(".health-bar-red-p2").animate(
      {
        width: hpToPercentRatio + "%"
      },
      700
    );
    $(".health-bar-p2").animate(
      {
        width: hpToPercentRatio + "%"
      },
      500
    );
  },
  applyDamageGoku: function(curHitPoints) {
    //Removes a correct percentage ratio of hitpoints when
    //applying different amounts of damage
    var hpToPercentRatio = curHitPoints * (100 / maxHitPoints);
    $(".health-bar-text").html(curHitPoints + " HP");
    $(".health-bar-red").animate(
      {
        width: hpToPercentRatio + "%"
      },
      700
    );
    $(".health-bar").animate(
      {
        width: hpToPercentRatio + "%"
      },
      500
    );
  },
  resetHealthBar: function() {
    curHitPoints = maxHitPoints;
    //Goku
    $(".health-bar-text").html(curHitPoints + " HP");
    $(".health-bar-red").css("width", "100%");
    $(".health-bar").css("width", "100%");
    //RYU
    $(".health-bar-text-p2").html(curHitPoints + " HP");
    $(".health-bar-red-p2").css("width", "100%");
    $(".health-bar-p2").css("width", "100%");
  },
  resetGame: function() {
    this.generateHitPoints();
    this.assignDamageValue();
    $(".damage").text(" ");
    this.resetHealthBar();
  }
};

var eventHandlers = {
  damageMonitor: function() {
    healthbar.countDamage(this);
  },
  applyDamageRyu: function(damage) {
    curHitPoints = curHitPoints - damage;
    healthbar.applyDamageRyu(curHitPoints);
    //reset fight arena based on timer running out, declare a winner and don't reset arena
    if(curHitPoints <= 0){resetFightArena("Goku Wins!", "goku", false);}
  },
  applyDamageGoku: function(damage) {
    curHitPoints = curHitPoints - damage;
    healthbar.applyDamageGoku(curHitPoints);
    //reset fight arena based on timer running out, declare a winner and don't reset arena
    if(curHitPoints <= 0){resetFightArena("Ryu Wins!", "ryu", false);}
  },
  intializeGameClick: $(".newGame").click(function() {
    healthbar.resetGame();
    $(".health-bar-text").html(curHitPoints + " HP");
    $(".health-bar-text-p2").html(curHitPoints + " HP");
  }),
  intializeGame: function() {
    healthbar.resetGame();
    $(".health-bar-text").html(curHitPoints + " HP");
    $(".health-bar-text-p2").html(curHitPoints + " HP");
  }
};
eventHandlers.intializeGame();

// =============
//    HIT BOX
// =============
$(document).keydown(function(event) {
  switch (event.which) {
    //GOKU HIT DETECT
    //user presses the "A" PUNCH key
    case 65:
      if (collision && hitbox) {
        hitboxQA.gokuPunch();
        healthCounter.applyDamageRyu();
        eventHandlers.applyDamageRyu(5);
        //if punch lands, an ouch sound effect plays
      }
      break;
    // user presses the "S" KICK key
    case 83:
      if (collision && hitbox) {
        hitboxQA.gokuKick();
        healthCounter.applyDamageRyu();
        eventHandlers.applyDamageRyu(10);
      }
      break;

    //RYU HIT DETECT
    //user presses the "J" PUNCH key
    case 74:
      if (collision && hitbox) {
        hitboxQA.ryuPunch();
        healthCounter.applyDamageGoku();
        eventHandlers.applyDamageGoku(5);
      }
      break;
    // user presses the "K" KICK key
    case 75:
      if (collision && hitbox) {
        hitboxQA.ryuKick();
        healthCounter.applyDamageGoku();
        eventHandlers.applyDamageGoku(10);
      }
      break;
  }
});
