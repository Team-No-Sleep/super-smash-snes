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
// //Comment out what you want to see: colors, logs, or both
// var collisionQA = {
//   logGokuCollision: function() {
//     // $(".goku").css({ backgroundColor: "green" });
//     $(".goku").css({ backgroundColor: "none" });
//     // console.log('Goku hitbox: ', hitbox);
//   },
//   logGokuSafe: function() {
//     // $(".goku").css({ backgroundColor: "red" });
//     $(".goku").css({ backgroundColor: "none" });
//   },
//   logRyuCollision: function() {
//     // $(".ryu").css({ backgroundColor: "yellow" });
//     $(".ryu").css({ backgroundColor: "none" });
//     // console.log('Ryu hitbox: ', hitbox);
//   },
//   logRyuSafe: function() {
//     // $(".ryu").css({ backgroundColor: "blue" });
//     $(".ryu").css({ backgroundColor: "none" });
//   },
//   hitBoxCheck: $(window).keydown(function() {
//     if (collision === true) {
//       console.log("collision confirmed: ", collision);
//       return collision;
//     }
//   })
// };

// ==========================
//   COLLISION CONFIRMATION
// ==========================
var collision = false;
var hitbox = false;

var collisionQuery = {
  gokuCollisionPositive: function() {
    collision = true;
    hitbox = true;
    // collisionQA.logGokuCollision();
  },
  gokuCollisionNegative: function() {
    collision = false;
    hitbox = false;
    // collisionQA.logGokuSafe();
  },
  ryuCollisionPositive: function() {
    collision = true;
    hitbox = true;
    // collisionQA.logRyuCollision();
  },
  ryuCollisionNegative: function() {
    collision = false;
    hitbox = false;
    // collisionQA.logRyuSafe();
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

//==================
//    HEALTHBAR
//==================
let maxHitPoints = 0, curHitPoints = maxHitPoints;
// let maxHitPoints = 0, curHitPoints = maxHitPoints;
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
  // countDamage: function(userSelection) {
  //   damage = +$(userSelection).val();
  //   $(".damage").text(damage);
  // },
  applyDamageRyu: function(curHitPoints) {
    //Removes a correct percentage ratio of hitpoints when
    //applying different amounts of damage
    var hpToPercentRatio = curHitPoints * (100 / maxHitPoints);
    $(".health-bar-text-p2").html(curHitPoints + " HP");
    $(".health-bar-red-p2").animate(
      {width: hpToPercentRatio + "%"
      },700
    );
    $(".health-bar-p2").animate(
      {width: hpToPercentRatio + "%"
      },500
    );
  },
  applyDamageGoku: function(curHitPoints) {
    //Removes a correct percentage ratio of hitpoints when
    //applying different amounts of damage
    var hpToPercentRatio = curHitPoints * (100 / maxHitPoints);
    $(".health-bar-text").html(curHitPoints + " HP");
    $(".health-bar-red").animate(
      {width: hpToPercentRatio + "%"
      },700
    );
    $(".health-bar").animate(
      {width: hpToPercentRatio + "%"
      },500
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
  // damageMonitor: function() {
  //   healthbar.countDamage(this);
  // },
  applyDamageRyu: function(damage) {
    curHitPoints = curHitPoints - damage;
    healthbar.applyDamageRyu(curHitPoints);
    //reset the fighting arena when ryu has been defeated
    if(curHitPoints <= 0){resetFightArena("Goku Wins!", "goku", false);}
  },
  applyDamageGoku: function(damage) {
    curHitPoints = curHitPoints - damage;
    healthbar.applyDamageGoku(curHitPoints);
    //reset the fighting arena when goku has been defeated
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

// ==================
// HITBOX QA TESTING
// ==================

var hitboxQA = {
  gokuPunch: function() {
    // $(".goku").css("background-color", "orange");
    $(".goku").css("background-color", "none");
  },
  gokuKick: function() {
    // $(".goku").css("background-color", "orange");
    $(".goku").css("background-color", "none");
  },
  ryuPunch: function() {
    // $(".ryu").css("background-color", "purple");
    $(".ryu").css("background-color", "none");
  },
  ryuKick: function() {
    // $(".ryu").css("background-color", "purple");
    $(".ryu").css("background-color", "none");
  }
};

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
        eventHandlers.applyDamageRyu(5);
				$(".ryu").addClass("ryu-damaged damaged-p2");
      }
      break;
    // user presses the "S" KICK key
    case 83:
      if (collision && hitbox) {
        hitboxQA.gokuKick();
        eventHandlers.applyDamageRyu(10);
				$(".ryu").addClass("ryu-damaged damaged-p2");
      }
      break;

    //RYU HIT DETECT
    //user presses the "J" PUNCH key
    case 74:
      if (collision && hitbox) {
        hitboxQA.ryuPunch();
        eventHandlers.applyDamageGoku(5);
				$(".goku").addClass("goku-damaged damaged-p1");
      }
      break;
    // user presses the "K" KICK key
    case 75:
      if (collision && hitbox) {
        hitboxQA.ryuKick();
        eventHandlers.applyDamageGoku(10);
				$(".goku").addClass("goku-damaged damaged-p1");
      }
      break;
  }
});

$(document).keyup(function (event) {
	switch (event.which) {
		//GOKU DAMAGE DETECT
		//user presses the "A" PUNCH key
		case 65:
			if (collision && hitbox) {
				setTimeout(function (event) {
					$(".ryu").removeClass("ryu-damaged damaged-p2");
				}, 150);
				break;
			}
			break;
			// user presses the "S" KICK key
		case 83:
			if (collision && hitbox) {
				setTimeout(function (event) {
					$(".ryu").removeClass("ryu-damaged damaged-p2");
				}, 150);
				break;
			}
			break;

			//RYU DAMAGE DETECT
			//user presses the "J" PUNCH key
		case 74:
			if (collision && hitbox) {
				setTimeout(function (event) {
					$(".goku").removeClass("goku-damaged damaged-p1");
				}, 100);
			}
			break;
			// user presses the "K" KICK key
		case 75:
			if (collision && hitbox) {
				setTimeout(function (event) {
					$(".goku").removeClass("goku-damaged damaged-p1");
				}, 100);
			}
			break;
	}
});
