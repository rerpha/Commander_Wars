var Constructor = function()
{
    this.init = function(unit)
    {
        unit.setAmmo1(5);
        unit.setMaxAmmo1(5);
        unit.setWeapon2ID("WEAPON_ROCKET_MISSILE");
        unit.setAmmo2(0);
        unit.setMaxAmmo2(0);
        unit.setWeapon2ID("");
        unit.setFuel(50);
        unit.setMaxFuel(50);
        unit.setBaseMovementPoints(5);
        unit.setCosts(15000);
        unit.setMinRange(3);
        unit.setMaxRange(5);
        unit.setVision(3);
    };
    // called for loading the main sprite
    this.loadSprites = function(unit)
    {
        // load sprites
        unit.loadSprite("rocketthrower", false);
        unit.loadSprite("rocketthrower+mask", true);
    };
    this.getMovementType = function()
    {
        return "MOVE_TIRE_A";
    };
}

Constructor.prototype = UNIT;
var ROCKETTHROWER = new Constructor();
