//Place of mechanics, items and abilities
/*LEGEND:
*  T = Turns (i.e.: 3T = 3 Turns)
*/

//  Debuffs    //
var debuffs = {
    "Blind": 0,        //Chance to miss (40%) {3T}
    "Silence": 0,      //Cannot use skills {2T}
    "Panic": 0,        //Cannot Act; loses money {2T}
    "Burn": 0,         //Damage over time {Highly scales off STR} {2T}
    "Frostburn": 0,    //Damage over time {Highly scales off MAG} {2T}
    "Poison": 0,       //Damage over time {fixed percent damage; lasts a long time} {5T}
    "Bleed": 0,        //Damage over time {Cannot regenerate life from any source; slightly scales off STR} {3T}
    "Stun": 0,         //Cannot Act {1T}
    "Confused": 0,     //Chance to not act (40%) {2T}
    "Worry": 0,        //STR stat is lowered by 30% {2T}
    "Broken": 0,       //DEF stat is lowered by 40% {2T}
    "Weak": 0,         //MAG stat is lowered by 30% {2T}
    "Will Broken": 0,  //RES stat is lowered by 40% {2T}
    "Slowed": 0,       //AGI stat is lowered by 30% {2T}
}

//  BUFFS   //
var buffs = {
    "Sooth": 0,        //Heals HP over time (10% of max HP) {3T}
    "Regen": 0,        //Heals MP over time (10% of max MP) {2T}
    "Holy Shield": 0,  //Next Physical attack is nullified
    "Warding": 0,      //Next Magic attack is nullified
    "STR UP": 0,       //STR increases (30%) {2T}
    "DEF UP": 0,       //DEF increases (30%) {2T}
    "MAG UP": 0,       //MAG increases (30%) {2T}
    "RES UP": 0,       //RES increases (30%) {2T}
    "AGI UP": 0,       //AGI increases (30%) {2T}
}

//	SKILLS	//
var skills = {

};

//	PASSIVES	//
var passives = {

};

//	EQUIPMENT	//
//Separated in sections
//NAME : [SKILL OR PASSIVE GIVEN (can be none but only 1), description, rarity modifier,
//[stat increase, stat in question], [optional stat increase, stat in question]]
var helmets = {
    "Leather Cap": ["Protection I", "desc", 0, [3, "DEF"], [0, ""]],
    "Iron Helmet": ["", 0, "desc", [0, ""], [5, "DEF"]],
    "Magia Hood": ["", 0, "desc", [3, "MAG"], [4, "RES"]]
};

var chestplates = {

};

var leggings = {

};

var necklace = {

};

var ring = {

};

var weapons = {

};

//Functions so that I can retrieve equipment stats easily:
//stat is the index of the stat sheet
//REMINDER:
//NAME : [SKILL OR PASSIVE GIVEN (can be none but only 1), rarity modifier,
//[stat increase, stat in question], [optional stat increase, stat in question]]
function getEquipmentInfo(slot, name) {
    return slot[name];
}

//	ITEMS	//
var items = {

};

//  STORY-RELATED FLAGS     //
var storyFlags = {

};