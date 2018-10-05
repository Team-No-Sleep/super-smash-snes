$(document).ready(function() {
    let maxHitPoints = 0, curHitPoints = maxHitPoints;
    var healthbar = {
        generateHitPoints: function() {
            maxHitPoints = 100;
            $('.maxHitPoints').text(maxHitPoints);
        },
        assignDamageValue: function() {
            $('.gamePad').each(function() {
                var damageValue = 10;
                $(this).val(damageValue);
            });
        },
        countDamage: function(userSelection) {
            damage = +$(userSelection).val();
            $('.damage').text(damage);
        },
        applyDamage: function(curHitPoints) {
            //Removes a correct percentage ratio of hitpoints when 
            //applying different amounts of damage
            var hpToPercentRatio = curHitPoints * (100 / maxHitPoints);
            $(".health-bar-text").html(curHitPoints + ' HP');
            $(".health-bar-red").animate({
                'width': hpToPercentRatio + "%"
            }, 700);
            $(".health-bar").animate({
                'width': hpToPercentRatio + "%"
            }, 500);
        },
        resetHealthBar: function () {
            curHitPoints = maxHitPoints;
            $(".health-bar-text").html(curHitPoints + ' HP');
            $('.health-bar-red').css('width', '100%');
            $('.health-bar').css('width', '100%');
        },
        resetGame: function() {
            this.generateHitPoints();
            this.assignDamageValue();
            $('.damage').text(' ');
            this.resetHealthBar();
        },
    };

    var eventHandlers = {
        damageMonitor: $('.gamePad').click(function() {
            healthbar.countDamage(this);
        }),
        applyDamage: $('.add-damage').click(function() {
            curHitPoints = curHitPoints - damage;
            healthbar.applyDamage(curHitPoints);
        }),
        intializeGame: $('.newGame').click(function() {
            healthbar.resetGame();
            $(".health-bar-text").html(curHitPoints + ' HP');
        }),
    };
});

