var Constructor = function()
{
    this.getName = function()
    {
        return qsTr("Missile");
    };
    this.getBaseDamage = function(unit)
    {
        switch(unit.getUnitID())
        {
			// infantry
			case "INFANTRY":
				return WEAPON.HighDamage;
			case "MECH":
				return WEAPON.HighDamage;
			case "MOTORBIKE":
				return WEAPON.HighDamage;
			case "SNIPER":
				return WEAPON.HighDamage;

			// supporter
			case "APC":
				return WEAPON.HighDamage;
			case "FLARE":
				return WEAPON.HighDamage;
			case "RECON":
				return WEAPON.HighDamage;

			// tanks
			case "FLAK":
                return 25;
			case "HOVERFLAK":
                return 25;
			case "LIGHT_TANK":
                return WEAPON.mediumDamage;
			case "HOVERTANK":
                return WEAPON.mediumDamage;
				
			// heavy tanks
			case "HEAVY_HOVERCRAFT":
				return WEAPON.softCounterDamage;
			case "HEAVY_TANK":
				return WEAPON.softCounterDamage;
			case "NEOTANK":
				return WEAPON.softCounterDamage;
				
			// very heavy tanks
			case "MEGATANK":
                return WEAPON.lowDamage;
				
			// ranged land units
			case "ARTILLERY":
				return WEAPON.softDamage;
			case "ANITANKCANNON":
				return WEAPON.mediumDamage;
			case "MISSILE":
				return WEAPON.softDamage;
			case "ROCKETTRHOWER":
				return WEAPON.softDamage;				
			
			// ships
			case "BATTLESHIP":
				return WEAPON.mediumDamage;
			case "CANNONBOAT":
				return 75;				
			case "CRUISER":
				return WEAPON.lowDamage;
			case "DESTROYER":
				return WEAPON.lowDamage;
			case "SUBMARINE":
				return WEAPON.mediumDamage;				
			case "LANDER":
				return WEAPON.mediumDamage;
			case "AIRCRAFTCARRIER":
                return WEAPON.mediumDamage;
			default:
				return -1;
        }
    };
};

Constructor.prototype = WEAPON;
var WEAPON_STEALTHROCKET = new Constructor();