var Constructor = function()
{
    this.init = function(unit)
    {
        unit.setAmmo1(6);
        unit.setMaxAmmo1(6);
        unit.setWeapon1ID("WEAPON_BOMB");

        unit.setAmmo2(0);
        unit.setMaxAmmo2(0);
        unit.setWeapon2ID("");

        unit.setFuel(100);
        unit.setMaxFuel(100);
        unit.setBaseMovementPoints(5);
        unit.setMinRange(1);
        unit.setMaxRange(1);
        unit.setVision(2);
    };
    // called for loading the main sprite
    this.loadSprites = function(unit)
    {
        // load sprites
        unit.loadSprite("zeppelin", false);
        unit.loadSprite("zeppelin+mask", true);
    };
    this.getMovementType = function()
    {
        return "MOVE_AIR";
    };
    this.getBaseCost = function()
    {
        return 20000;
    };
    this.getName = function()
    {
        return qsTr("Kirov");
    };
    this.startOfTurn = function(unit)
    {
    };
    this.createExplosionAnimation = function(x, y, unit)
    {
        var animation = GameAnimationFactory.createAnimation(x, y);
        animation.addSprite("explosion+air", -map.getImageSize() / 2, -map.getImageSize(), 0, 1.5);
        audio.playSound("explosion+air.wav");
        return animation;
    };
    this.doWalkingAnimation = function(action)
    {
        var unit = action.getTargetUnit();
        var animation = GameAnimationFactory.createWalkingAnimation(unit, action);
        animation.loadSprite("zeppelin+walk+mask", true, 1.5);
        animation.loadSprite("zeppelin+walk", false, 1.5);
        animation.setSound("moveair.wav", -2);
        return animation;
    };
    this.canMoveAndFire = function()
    {
        return true;
    };
    this.useTerrainDefense = function()
    {
        return false;
    };

    this.getTerrainAnimationBase = function(unit, terrain)
    {
        return "base_air";
    };

    this.getTerrainAnimationForeground = function(unit, terrain)
    {
        return "";
    };

    this.getTerrainAnimationBackground = function(unit, terrain)
    {
        return "";
    };

    this.getDescription = function()
    {
        return qsTr("Kirov reporting. Special Air Unit with extrem high defense but low mobility and no fuel comsumtion at the start of a turn. Can attack ground and naval units. Exceptional power.");
    };
    this.getUnitType = function()
    {
        return GameEnums.UnitType_Air;
    };
}

Constructor.prototype = UNIT;
var ZCOUNIT_KIROV = new Constructor();
