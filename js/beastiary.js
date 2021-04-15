$(document).ready(function () {
    //A list of all possible enemies the player can face
    //all organized depending on various means

    //Starting stats for an enemy
    class enemy {
        constructor(name, level, gold, rarity, isBoss) {
            this.name = name;
            this.level = level;
            this.gold = gold;
            this.rarity = rarity;
            this.isBoss = isBoss;

            //Base Stats
            var STR = 0; var RES = 0;
            var DEF = 0; var AGI = 0;
            var MAG = 0; var LCK = 0;

            //Equipment
            var helmet = "";
            var chestplate = "";
            var leggings = "";
            var necklace = "";
            var ring = "";
            var weapon = "";

            //Enemy's total HP and MP
            var totalHP = 0;
            var totalMP = 0;

            //Anything that alters stats
            var alteredHP = 0;
            var alteredMP = 0;
            var alteredSTR = 0;
            var alteredDEF = 0;
            var alteredMAG = 0;
            var alteredRES = 0;
            var alteredAGI = 0;
            var alteredLCK = 0;

            //Physical Lifesteal / Magic Lifesteal
            var lifesteal = 0;
            var magicSiphon = 0;
        }
    }

    //(Name pending) List of enemies from the first area of the game
    var area1List = [
        "slime",
        "bat"]
});