var Constructor = function()
{
    this.getMaxUnitCount = function()
    {
        return 1;
    };

    this.loadStandingAnimation = function(sprite, unit, defender, weapon)
    {
        BATTLEANIMATION_ZCOUNIT_KIROV.loadSprite(sprite, unit, defender, weapon, Qt.point(0, 0), 0);
    };

    this.loadSprite = function(sprite, unit, defender, weapon, movement, moveTime)
    {
        sprite.loadMovingSprite("zeppelin",  false,
                                BATTLEANIMATION_ZCOUNIT_KIROV.getMaxUnitCount(), Qt.point(0, 80), movement, moveTime);
        sprite.loadMovingSpriteV2("zeppelin+mask", GameEnums.Recoloring_Table,
                                  BATTLEANIMATION_ZCOUNIT_KIROV.getMaxUnitCount(), Qt.point(0, 80), movement, moveTime);
    };

    this.loadFireAnimation = function(sprite, unit, defender, weapon)
    {
        BATTLEANIMATION_ZCOUNIT_KIROV.loadStandingAnimation(sprite, unit, defender, weapon);
        var count = sprite.getUnitCount(5);
        // 21 4
        for (var i = 0; i < count; i++)
        {
            sprite.loadSingleMovingSprite("bombs_projectile", false, Qt.point(13, 84),
                                          Qt.point(0, -110), 400, false,
                                          1, 1, -1, i * 150);
            sprite.loadSound("falling_bomb.wav", 1, "resources/sounds/", i * 150);
        }
    };

    this.loadImpactUnitOverlayAnimation = function(sprite, unit, defender, weapon)
    {
        sprite.loadColorOverlayForLastLoadedFrame("#969696", 1000, 1, 300);
    };

    this.loadImpactAnimation = function(sprite, unit, defender, weapon)
    {
        var count = sprite.getUnitCount(5);
        sprite.loadSprite("unit_explosion",  false, 5, Qt.point(0, 60),
                          1, 1.0, 0, 300);
        sprite.addSpriteScreenshake(8, 0.95, 800, 500);
        sprite.loadMovingSprite("bomb_falling", false, 5, Qt.point(0, 150),
                                Qt.point(0, -130), 400, true,
                                1, 1, 0, 0, true);
        for (var i = 0; i < count; i++)
        {
            sprite.loadSound("impact_explosion.wav", 1, "resources/sounds/", i * BATTLEANIMATION.defaultFrameDelay);
        }
    };

    this.hasDyingAnimation = function()
    {
        // return true if the unit has an implementation for loadDyingAnimation
        return true;
    };

    this.loadDyingAnimation = function(sprite, unit, defender, weapon)
    {
        BATTLEANIMATION_ZCOUNIT_KIROV.loadSprite(sprite, unit, defender, weapon, Qt.point(-140, -140), 1800);
        sprite.loadSound("airunit_dying.wav", 1, "resources/sounds/");
    };

    this.getFireDurationMS = function(sprite, unit, defender, weapon)
    {
        // the time will be scaled with animation speed inside the engine
        return 1250;
    };

    this.getImpactDurationMS = function(sprite, unit, defender, weapon)
    {
        // should be a second or longer.
        // the time will be scaled with animation speed inside the engine
        return 1500 + BATTLEANIMATION.defaultFrameDelay * 5;
    };

    this.getDyingDurationMS = function(sprite, unit, defender, weapon)
    {
        // the time will be scaled with animation speed inside the engine
        return 2000;
    };
};

Constructor.prototype = BATTLEANIMATION;
var BATTLEANIMATION_ZCOUNIT_KIROV = new Constructor();
