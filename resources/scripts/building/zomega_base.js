var Constructor = function()
{
    this.init = function (building)
    {
        building.setHp(-1);
    };
    // called for loading the main sprite
    this.loadSprites = function(building)
    {
        if (building.getOwnerID() >= 0)
        {
            building.loadSprite("omega+base", false);
            building.loadSprite("omega+base+mask", true);
        }
        else
        {
            building.loadSprite("omega+base+neutral", false);
        }
    };
    this.getBaseIncome = function()
    {
        return 0;
    };
    this.getBuildingWidth = function()
    {
        // one field width default for most buildings
        return 4;
    };
    this.getBuildingHeigth = function()
    {
        // one field heigth default for most buildings
        return 4;
    };
    this.canBuildingBePlaced = function(terrain)
    {
        return BUILDING.canLargeBuildingPlaced(terrain, ZOMEGA_BASE.getBuildingWidth(), ZOMEGA_BASE.getBuildingHeigth());
    };
    this.getMiniMapIcon = function()
    {
        return "minimap_blackholebuilding";
    };
}

Constructor.prototype = BUILDING;
var ZOMEGA_BASE = new Constructor();