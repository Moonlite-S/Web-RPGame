//Check to see if the player is in combat
var inCombat = false;
//Check to see if it's the player's turn
var playerTurn = false;
//Toggles Battle Log
var toggleBattleLog = false;
//Toggles Enemy Information
var toggleEnemyStats = false;

//Combat Mechanics:
//Some mechanical definitions for our combat system
//Physical Damage Calculation:
//Attacker = 1.0*STR + 
function calcPhysDamage(attacker, defender) {
    return attacker.physDamage() - defender.phy
}

//Show Combat GUI:
//Create a div which is where our combat will take place
function canvasBattle() {
    //If we are already in a battle, leave as we cannot make another one!
    if (inCombat == true)
        return

    var canvas = "<div style=\"background-color: orange;>Hey I'm here</div>";
}

//Show Battle log:


//Show enemy stats: