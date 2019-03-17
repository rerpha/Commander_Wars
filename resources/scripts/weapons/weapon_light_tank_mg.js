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
				return WEAPON.softDamage;
			case "MECH":
				return WEAPON.softDamage;
			case "MOTORBIKE":
				return WEAPON.softDamage;
			case "SNIPER":
				return WEAPON.softDamage;

			// supporter
			case "APC":
				return 45;
			case "FLARE":
				return 45;
			case "RECON":
				return 45;

			// tanks
			case "FLAK":
				return 8;
			case "HOVERFLAK":
				return 8;
			case "LIGHT_TANK":
				return 8;
            case "HOVERTANK":
				return 8;
				
			// heavy tanks
			case "HEAVY_HOVERCRAFT":
				return 5;
			case "HEAVY_TANK":
				return 5;
			case "NEOTANK":
				return 5;
				
			// very heavy tanks
			case "MEGATANK":
				return 1;
				
			// heli copter
			case "T_HELI":
				return WEAPON.softCounterDamage;
			case "K_HELI":
				return WEAPON.lowDamage;
				
			// ranged land units
			case "ARTILLERY":
				return 45;
			case "ANITANKCANNON":
                return 1;
			case "MISSILE":
                return WEAPON.softCounterDamage;
			case "ROCKETTRHOWER":
				return WEAPON.softCounterDamage;
			default:
				return -1;
        }
    };
};

Constructor.prototype = WEAPON;
var WEAPON_LIGHT_TANK_MG = new Constructor();