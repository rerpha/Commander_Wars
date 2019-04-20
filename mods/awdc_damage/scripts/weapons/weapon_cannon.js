var Constructor = function()
{
    this.getName = function()
    {
        return qsTr("Cannon");
    };
    this.getEnviromentDamage = function(enviromentId)
    {
        return 45;
    };
    this.getBaseDamage = function(unit)
    {
        switch(unit.getUnitID())
        {
			// infantry
			case "INFANTRY":
                return 90;
			case "MECH":
                return 85;
			case "MOTORBIKE":
                return 85;
			case "SNIPER":
                return 85;

			// supporter
			case "APC":
                return 70;
			case "FLARE":
				return 75;
			case "RECON":
				return 75;

			// tanks
			case "FLAK":
                return 65;
			case "HOVERFLAK":
                return 65;
			case "LIGHT_TANK":
                return 60;
            case "HOVERTANK":
                return 60;
				
			// heavy tanks
			case "HEAVY_HOVERCRAFT":
                return 45;
			case "HEAVY_TANK":
                return 45;
			case "NEOTANK":
                return 45;
				
			// very heavy tanks
			case "MEGATANK":
                return 35;
				
			// ranged land units
			case "ARTILLERY":
                return 75;
			case "ANTITANKCANNON":
                return 55;
			case "MISSILE":
                return 80;
            case "ROCKETTHROWER":
                return 80;
			
			// ships
			case "BATTLESHIP":
                return 45;
			case "CANNONBOAT":
				return 100;
			case "CRUISER":
                return 55;
			case "DESTROYER":
                return 55;
			case "SUBMARINE":
                return 55;
			case "LANDER":
                return 65;
			case "AIRCRAFTCARRIER":
                return 45;
			default:
				return -1;
        }
    };
};

Constructor.prototype = WEAPON;
var WEAPON_CANNON = new Constructor();
