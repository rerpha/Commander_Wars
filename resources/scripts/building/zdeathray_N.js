var Constructor = function()
{
    this.init = function (building)
    {
        building.setHp(100);
    };
    // called for loading the main sprite
    this.loadSprites = function(building)
    {
        building.loadSprite("deathray+N", false);
        building.loadSprite("deathray+N+mask", true);
    };
    this.getBaseIncome = function()
    {
        return 0;
    };
    this.getActions = function()
    {
        // returns a string id list of the actions this building can perform
        return "ACTION_DEATHRAY_FIRE";
    };
    this.startOfTurn = function(building)
    {
        building.setFireCount(building.getFireCount() + 1);
    };
    this.getActionTargetFields = function(building)
    {
		var targets = globals.getEmptyPointArray();
        // laser to not fire infinitly but the range is still fucking huge :)
        for (var i = 1; i < 60; i++)
        {
            targets.append(Qt.point(-1, -i));
            targets.append(Qt.point(0, -i));
            targets.append(Qt.point(1, -i));
        }
        return targets;
    };
    this.getActionTargetOffset = function(building)
    {
        // offset for large buildings since there reference point is bound to the lower right corner.
        return Qt.point(-1, -2);
    };
    this.getBuildingWidth = function()
    {
        // one field width default for most buildings
        return 3;
    };
    this.getBuildingHeigth = function()
    {
        // one field heigth default for most buildings
        return 3;
    };
    this.canBuildingBePlaced = function(terrain)
    {
        return BUILDING.canLargeBuildingPlaced(terrain, ZDEATHRAY_S.getBuildingWidth(), ZDEATHRAY_S.getBuildingHeigth());
    };
    this.getMiniMapIcon = function()
    {
        return "minimap_blackholebuilding";
    };
    this.getIsAttackable = function(building, x, y)
    {
        var buildX = building.getX();
        var buildY = building.getY();
        if (y === buildY && buildX - 1 === x)
        {
            return true;
        }
        return false;
    };
    this.onDestroyed = function(building)
    {
        // called when the terrain is destroyed and replacing of this terrain starts
        var x = building.getX();
        var y = building.getY();
        var animation2 = GameAnimationFactory.createAnimation(0, 0);
        animation2.addSprite2("white_pixel", 0, 0, 3200, map.getMapWidth(), map.getMapHeight());
        animation2.addTweenColor(0, "#00FFFFFF", "#FFFFFFFF", 3000, true);
        audio.playSound("explosion+land.wav");
        map.getTerrain(x, y).loadBuilding("ZBLACK_BUILDING_DESTROYED");
    };

    this.createRayAnimation = function(building, x, y, fields)
    {
        var animation = GameAnimationFactory.createAnimation(x + 2, y + 1);
        animation.addSprite("deathray_start_loading", 0, 0, 0, 1.5);
        animation.setRotation(180);
        var animation2 = GameAnimationFactory.createAnimation(x + 2, y + 1);
        animation2.addSprite("deathray_start", 0, 0, 0, 1.5);
        animation2.setRotation(180);
        animation.queueAnimation(animation2);

        for (var i = 0; i < fields.size(); i++)
        {
            var point = fields.at(i);
            if (map.onMap(x + point.x, y + point.y))
            {
                if ((point.x === -1) && ((point.y) % 2 === 0))
                {
                    animation2 = GameAnimationFactory.createAnimation(x + point.x + 3, y + point.y);
                    animation2.addSprite("deathray", 0, -map.getImageSize() * 0.085, 0, 1.5);
                    animation2.setRotation(180);
                    animation.queueAnimation(animation2);

                }
            }
        }
        return animation2;
    }
}

Constructor.prototype = BUILDING;
var ZDEATHRAY_N = new Constructor();