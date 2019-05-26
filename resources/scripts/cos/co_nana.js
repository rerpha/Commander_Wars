var Constructor = function()
{
    this.init = function(co)
    {
        co.setPowerStars(4);
        co.setSuperpowerStars(5);
    };

    this.activatePower = function(co)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);

        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);
            var animation = GameAnimationFactory.createAnimation(unit.getX(), unit.getY());
            if (animations.length < 5)
            {
                animation.addSprite("power9", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 1.5, globals.randInt(0, 400));
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else
            {
                animation.addSprite("power9", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 1.5);
                animations[counter].queueAnimation(animation);
                animations[counter] = animation;
                counter++;
                if (counter >= animations.length)
                {
                    counter = 0;
                }
            }
        }
        units.remove();

        audio.clearPlayList();
        CO_NANA.loadCOMusic(co);
        audio.playRandom();
    };

    this.activateSuperpower = function(co, powerMode)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(powerMode);
        dialogAnimation.queueAnimation(powerNameAnimation);

        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);
            var animation = GameAnimationFactory.createAnimation(unit.getX(), unit.getY());
            if (animations.length < 5)
            {
                animation.addSprite("power12", -map.getImageSize() * 2, -map.getImageSize() * 2, 0, 1.5, globals.randInt(0, 400));
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else
            {
                animation.addSprite("power12", -map.getImageSize() * 2, -map.getImageSize() * 2, 0, 1.5);
                animations[counter].queueAnimation(animation);
                animations[counter] = animation;
                counter++;
                if (counter >= animations.length)
                {
                    counter = 0;
                }
            }
        }
        units.remove();

        audio.clearPlayList();
        CO_NANA.loadCOMusic(co);
        audio.playRandom();
    };

    this.loadCOMusic = function(co)
    {
        // put the co music in here.
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Power:
                audio.addMusic("resources/music/cos/power.mp3");
                break;
            case GameEnums.PowerMode_Superpower:
                audio.addMusic("resources/music/cos/superpower.mp3");
                break;
            case GameEnums.PowerMode_Tagpower:
                audio.addMusic("resources/music/cos/tagpower.mp3");
                break;
            default:
                audio.addMusic("resources/music/cos/nana.mp3")
                break;
        }
    };

    this.postBattleActions = function(co, attacker, atkDamage, defender, gotAttacked)
    {
        if (!gotAttacked)
        {
            var owner = co.getOwner();
            var powerMode = co.getPowerMode();
            var damage = 0;
            var explosionRange = 1;
            var friendlyFire = true;
            var i = 0;
            var defX = defender.getX();
            var defY = defender.getY();
            var unit = null;
            var point = Qt.point(0, 0);
            var hp = 0;
            switch (powerMode)
            {
                case GameEnums.PowerMode_Superpower:
                    damage = 2;
                    explosionRange = 2;
                    friendlyFire = false;
                    break;
                case GameEnums.PowerMode_Power:
                    friendlyFire = false;
                    damage = 1;
                    if (attacker.getBaseMaxRange() === 1 && damage > 0)
                    {
                        damage = 2;
                        var width = map.getMapWidth();
                        var heigth = map.getMapHeight();
                        var maxRange = width;
                        if (heigth > width)
                        {
                            maxRange = heigth;
                        }
                        var found = false;
                        // deal direct chain damage to nearest enemy
                        for (var curRange = 1; curRange < maxRange; curRange++)
                        {
                            var directCircle = globals.getCircle(curRange, curRange);
                            for (i = 0; i < directCircle.size(); i++)
                            {
                                point = directCircle.at(i);
                                if (map.onMap(defX + point.x, defY + point.y))
                                {
                                    unit = map.getTerrain(defX + point.x, defY + point.y).getUnit();
                                    if (unit !== null &&
                                        owner.isEnemyUnit(unit))
                                    {
                                        hp = unit.getHpRounded();
                                        if (hp <= damage)
                                        {
                                            // set hp to very very low
                                            unit.setHp(0.001);
                                        }
                                        else
                                        {
                                            unit.setHp(hp - damage);
                                        }
                                        found = true;
                                        break;
                                    }
                                }
                            }
                            directCircle.remove()
                            if (found === true)
                            {
                                break;
                            }
                        }
                    }
                    break;
                default:
                    if (co.inCORange(Qt.point(attacker.getX(), attacker.getY()), attacker))
                    {
                        damage = 1;
                    }
                    break;
            }

            // deal indirect unit splash damage
            if (attacker.getBaseMaxRange() > 1 && damage > 0)
            {
                var circle = globals.getCircle(1, explosionRange);
                for (i = 0; i < circle.size(); i++)
                {
                    point = circle.at(i);
                    if (map.onMap(defX + point.x, defY + point.y))
                    {
                        unit = map.getTerrain(defX + point.x, defY + point.y).getUnit();
                        if (unit !== null)
                        {
                            if (owner !== unit.getOwner() || friendlyFire === true)
                            {
                                hp = unit.getHpRounded();
                                if (hp <= damage)
                                {
                                    // set hp to very very low
                                    unit.setHp(0.001);
                                }
                                else
                                {
                                    unit.setHp(hp - damage);
                                }
                            }
                        }
                    }
                }
                circle.remove()
            }
        }
    };

    this.getCOUnitRange = function(co)
    {
        return 2;
    };
    this.getCOArmy = function()
    {
        return "PF";
    };

    // CO - Intel
    this.getBio = function()
    {
        return qsTr("The lovable, cute, and amazingly talented granddaughter of Hachi. Known to be incredibly scary when angry.");
    };
    this.getHits = function()
    {
        return qsTr("Artemis");
    };
    this.getMiss = function()
    {
        return qsTr("Ozzy");
    };
    this.getCODescription = function()
    {
        return qsTr("Indirect attacks deal one HP of damage to all nearby units, no matter their allegiance.");
    };
    this.getPowerDescription = function()
    {
        return qsTr("Direct attacks deal one HP of damage to the nearest enemy unit. Nana's units are no longer affected by collateral damage.");
    };
    this.getPowerName = function()
    {
        return qsTr("Chain Reaction");
    };
    this.getSuperPowerDescription = function()
    {
        return qsTr("Indirect attacks deal two HP of damage to all units within a large blast radius. Nana's units are no longer affected by collateral damage.");
    };
    this.getSuperPowerName = function()
    {
        return qsTr("Explosive Tantrum");
    };
    this.getPowerSentences = function()
    {
        return [qsTr("Let's go, boys!"),
                qsTr("You made me mad!"),
                qsTr("Stop annoying me!"),
                qsTr("I'm gonna kick your butt!"),
                qsTr("A battle with me is a greater honor than you deserve!"),
                qsTr("I want to end this fast!"),
                qsTr("Don't be such a meanie!")];
    };
    this.getVictorySentences = function()
    {
        return [qsTr("Aww, you put up a good fight though!"),
                qsTr("Hehe! You're funny!"),
                qsTr("You look so cute when you lose!")];
    };
    this.getDefeatSentences = function()
    {
        return [qsTr("Now i'm mad..."),
                qsTr("This should have been easy!")];
    };
    this.getName = function()
    {
        return qsTr("Nana");
    };
}

Constructor.prototype = CO;
var CO_NANA = new Constructor();