//A list of all possible enemies the player can face
//all organized depending on various means
//Starting stats for an enemy
class enemy {
    constructor(name, level, gold, rarity, isBoss) {
        //Name of the enemy
        this.name = name;
        //Current level of the enemy
        this.level = level;
        //Amount of gold awarded to player when defeated
        this.gold = gold;
        //Rarity of the enemy
        /* HOW IT WORKS:
            *    Rarity influences stats slightly, giving higher stat boosts the higher the rarity.
            *      Rarity Spectrum and chance to encounter one:
            *    0 - Common (77%), 1 - Uncommon (10%), 2 - Threatening (8%), 3 - Baleful (4%), 4 - Menacing (1%), 5 - Boss (Scripted)
            *  When the player defeats a higher rarity enemy, more exp, loot, and gold they obtain.
            *  *Note that bosses have their own rarity value
            */
        this.rarity = rarity;
        this.isBoss = isBoss;
    }

    //Enemy's total HP and MP
    totalHP = 0;
    totalMP = 0;

    //Base Stats
    STR = 0; RES = 0;
    DEF = 0; AGI = 0;
    MAG = 0; LCK = 0;

    //Crit Rate and Crit Damage [Most enemies will not have this]
    crit = 0;
    critDamage = 1.5;

    //Equipment
    helmet = "";
    chestplate = "";
    leggings = "";
    necklace = "";
    ring = "";
    weapon = "";

    //Physical Lifesteal / Magic Lifesteal
    lifesteal = 0;
    magicSiphon = 0;

    //Rarity Modifier

    ////    ACCESSORS       ////

    ////    MUTATORS        ////

}

//Prefixes (To make enemy names a bit more unique, every enemy will have one at random)
var prefixes = [
    "Wandering", "Lonely", "Amazed", "Sulky", "Energetic", "Dumb", "Great", "Boring", "Sad",
    "Social"
]

//Array format for enemy data:
//[[BASE STATS (HP, MP, STR, DEF, MAG, RES, AGI, LCK, RARITY, EXPERIENCE GIVEN)],
//[ABILITIES(array string of skills)],
//[PASSIVES(array string of passives)],
//[LOOT DROPS (array string of drops)],

//(Name pending) List of enemies from the first area of the game
var area1List = {
"slime": [[20, 0, 10, 10, 20, 10, 5, 10, 0, 5], ["ram", "acidify", "wander"], ["slime body"], ["slime sample"]],
"bat": [[25, 0, 15, 10, 10, 10, 10, 10, 0, 10], ["slash", "ram", "bite"], ["flying"], ["bat wings", "blood"]],
}