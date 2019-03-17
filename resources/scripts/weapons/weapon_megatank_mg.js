var Constructor = function()
{
    this.getName = function()
    {
        return qsTr("MG");
    };
    this.getBaseDamage = function(unit)
    {
        switch(unit.getUnitID())
        {
			// infantry
			case "INFANTRY":
				return 130;
			case "MECH":
				return 130;
			case "MOTORBIKE":
				return 130;
			case "SNIPER":
				return 130;

			// supporter
			case "APC":
				return 50;
			case "FLARE":
				return 50;
			case "RECON":
				return 50;

			// tanks
			case "FLAK":
				return 10;
			case "HOVERFLAK":
				return 10;
			case "LIGHT_TANK":
				return 10;
            case "HOVERTANK":
				return 10;
				
			// heavy tanks
			case "HEAVY_HOVERCRAFT":
				return 10;
			case "HEAVY_TANK":
				return 10;
			case "NEOTANK":
				return 10;
				
			// very heavy tanks
			case "MEGATANK":
				return 1;
				
			// heli copter
			case "T_HELI":
				return 45;
			case "K_HELI":
				return 35;
				
			// ranged land units
			case "ARTILLERY":
				return 50;
			case "ANITANKCANNON":
                return 1;
			case "MISSILE":
                return 45;
			case "ROCKETTRHOWER":
				return 45;
			default:
				return -1;
        }
    };
};

Constructor.prototype = WEAPON;
var WEAPON_MEGATANK_MG = new Constructor();