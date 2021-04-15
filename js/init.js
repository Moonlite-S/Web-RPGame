$(document).ready(function () {
    //Player initial stats
    class player {
        constructor(firstName, lastName, userClass) {
            //Initial things
            this.firstName = firstName;
            this.lastName = lastName;
            this.userClass = userClass;
            var level = 0;
            var gold = 0;
            var experience = 0;
            var alignment = 0;          //Moralilty

            //Base Stats
            var STR = 0;    var RES = 0;
            var DEF = 0;    var AGI = 0;
            var MAG = 0;    var LCK = 0;

            //Player's total HP and MP
            var totalHP = 0;
            var totalMP = 0;

            //Player's current HP and MP
            var currentHP = 0;
            var currentMP = 0;

            //Physical Lifesteal / Magic Lifesteal
            var lifesteal = 0;
            var magicSiphon = 0;

            //Critical Chance / Critical Damage
            var crit = 0;
            var critDamage = 1.5;

            //Equipment
            var helmet = "";
            var chestplate = "";
            var leggings = "";
            var necklace = "";
            var ring = "";
            var weapon = "";

            //Relationhips with the player
            var tutTown = 0;
            var town2 = 0;
            var town3 = 0;
        }


                //      Accessors       //

        //Get Base Stat, Lifesteal / Siphon, Crit Chance / Crit Damage, or Total HP and MP
        getBaseStat(stat) { return player[stat]; }
        //Get Equipment
        getEquipment(equipment) { return player[equipment]; }
        //Get Relations
        getEquipment(relations) { return player[relations]; }
        //Get Name (Either first or last)
        getName(name) { return player[name]; }
        //Get Class
        getClass() { return player.userClass; }

                //      Mutators       //

        //Set Base Stat, Lifesteal / Siphon, Crit Chance / Crit Damage, or Total HP and MP
        setBaseStat(stat, value) { player[stat] = value; }
        //Set Equipment (equipment is any body piece of equipment [i.e.:helmet]
        setEquipment(equipment, value) { player.equipment = value; }
        //Set Relations (relation is any faction or group)
        setEquipment(relations, value) { player.relations = value; }
        //Set Class (Can only be any of the available classes)
        setClass(userClass) { player.userClass = userClass; }
        //Set Name (placement is either firstname or lastname)
        setName(placement, name) { player[placement] = name; }
        //Sets Initial Base Stats (all in one)
        setInitialStats(STR, DEF, MAG, RES, AGI, LCK) {
            //Create an array with keys
            var statMap = { 'STR': STR, 'DEF' : DEF, 'MAG' : MAG, 'RES' : RES, 'AGI' : AGI, 'LCK' : LCK };

            //Iterates through the object array, filling in the stats one by one.
            for (let [name, stat] of Object.entries(statMap))
                this.setBaseStat(name, stat);
        }
    }

    //Various Debuffs throughout the game
    var debuff = [
        "Blind",        //Chance to miss
        "Silence",      //Cannot use skills
        "Panic",        //Cannot Act; loses money
        "Burn",         //Damage over time [Highly scales off STR]
        "Frostburn",    //Damage over time [Highly scales off MAG]
        "Poison",       //Damage over time [fixed percent damage; lasts a long time]
        "Bleed",        //Damage over time [Cannot regenerate life; slightly scales off STR]
        "Stun",         //Cannot Act;
        "Confused",     //Chance to not act
        "Worry",        //STR stat is lowered by 30%
        "Broken",       //DEF stat is lowered by 40%
        "Weak",         //MAG stat is lowered by 30%
        "Will Broken",  //RES stat is lowered by 40%
        "Slowed",       //AGI stat is lowered by 30%
    ]

    var buff = [
        "Sooth",        //Heals HP over time
        "Regen",        //Heals MP over time
        "Holy Shield",  //Next Physical attack is nullified
        "Warding",      //Next Magic attack is nullified
        "STR UP",       //STR increases
        "DEF UP",       //DEF increases
        "MAG UP",       //MAG increases
        "RES UP",       //RES increases
    ]

    ///////////////      Title and Character Creation       ///////////////

    //Player object
    let userPlayer = new player("", "", "");

    var userFirstName;
    var userLastName;

    var title = "<h1>RPGame by Moonlite-S</h1>"+
        "<p3>(Name not final)</p3> " + 
        "<h3>Embark on a journey filled with adventure and fun.</h3>" +
        "<a id=\"charCreationName\" href=\"#\"><h2> Create a character </h2></a>";

    var charaName = "<h1>Character Creation</h1> <br/>" +
        "<h3> Please define your character.</h3> " +
        "<form id=\"charCreate\" onsubmit=\"return false;\"> " +
            "<label for=\"userFirstName\">First Name: </label> " +
            "<input type=\"text\" id=\"userFirstName\" name=\"userFirstName\"> " +
            "<label for=\"userLastName\">Last Name: </label>" +
            "<input type=\"text\" id=\"userLastName\" name=\"userFirstName\"> " +
        "</form>" +
        "<a id=\"charCreationClass\" href=\"#\"><h2>To Class Selection</h2></a>" +
        "<a id=\"frontScreen\" href=\"#\"><h2>Return to title screen</h2></a>";

    var charaClass = "<h1>Character Creation</h1> <br/>" +
        "<h3> What is your specialty?</h3>" +
        "<form id=\"charCreate\" onsubmit=\"return false;\">" +
            "<input  type=\"radio\" id=\"userClass\" name=\"userClass\" value=\"Knight\">" +
            "<label for=\"userClass\">Knight</label>" +
            "<input  type=\"radio\" id=\"userClass\" name=\"userClass\" value=\"Rogue\">" +
            "<label for=\"userClass\">Rogue</label>" +
            "<input  type=\"radio\" id=\"userClass\" name=\"userClass\" value=\"Healer\">" +
            "<label for=\"userClass\">Healer</label>" +
            "<input  type=\"radio\" id=\"userClass\" name=\"userClass\" value=\"Archer\">" +
            "<label for=\"userClass\">Archer</label>" +
        "</form>" +
        "<a id=\"charReview\" href=\"#\"><h2>Review</h2></a>" +
        "<a id=\"charCreationName\" href=\"#\"><h2>To Name Selection</h2></a>" +
        "<a id=\"frontScreen\" href=\"#\"><h2>Return to title screen</h2></a>";

    var charaReview = "<h1>Character Creation</h1> <br/>" +
        "<h3> Let's Review: </h3>" +
        "<p2> First Name: <span id=\"userFirstNameReview\"></span></p2><br/>" +
        "<p2> Last Name: <span id=\"userLastNameReview\"></span></p2><br/>" +
        "<p2> Class: <span id=\"userClassReview\"></span></p2><br/>" +
        "<p2> STR: <span id=\"userSTR\"></span> \t DEF: <span id=\"userDEF\"></span></p2><br/>" +
        "<p2> MAG: <span id=\"userMAG\"></span> \t RES: <span id=\"userRES\"></span></p2><br/>" +
        "<p2> AGI: <span id=\"userAGI\"></span> \t LCK: <span id=\"userLCK\"></span></p2><br/><br/>" +
        "<p2> HP: <span id=\"userHP\"></span> \t MP: <span id=\"userMP\"></span></p2><br/>";

    //Set Title Screen first
    $(".main.title").html(title);

    //Transition To Title_Screen
    $(document).on("click", "#frontScreen", function () {
        $(".main.title").animate({ 'opacity': 0 }, 500, function () {
            $(".main.title").html(title);
        }).animate({ 'opacity': 1 }, 500);
    });

    //Transition To Character_Creation_Name
    $(document).on("click", "#charCreationName", function () {
        $(".main.title").animate({ 'opacity': 0 }, 500, function () {
            $(".main.title").html(charaName);
        }).animate({ 'opacity': 1 }, 500);
    });

    //Transition To Character_Creation_Class
    $(document).on("click", "#charCreationClass", function () {
        //Alert the player if they do not input either a First or Last Name
        userFirstName = document.getElementById("userFirstName");
        userLastName = document.getElementById("userLastName");
        if (userFirstName == "" || userLastName == "")
            return alert("Please specifiy your name.");

        //Save this information to the object of the userPlayer
        userPlayer.setName("firstName", userFirstName.value);
        userPlayer.setName("lastName", userLastName.value);

        console.log(userPlayer.getName("firstName"));
        console.log(userPlayer.getName("lastName"));

        $(".main.title").animate({ 'opacity': 0 }, 500, function () {
            $(".main.title").html(charaClass);
        }).animate({ 'opacity': 1 }, 500);
    });

    //Transition To Character_Review_Page
    $(document).on("click", "#charReview", function () {
        //SWITCH CASE
        //Set's the inital stats depending on the player's class
        userPlayer.setInitialStats(50, 20, 30, 10, 20, 30);
        userPlayer.setClass("");

        $(".main.title").animate({ 'opacity': 0 }, 500, function () {
            $(".main.title").html(charaReview);
            console.log(userPlayer.getBaseStat("STR"));
            document.getElementById("userFirstNameReview").innerHTML = userPlayer.getName("firstName");
            document.getElementById("userLastNameReview").innerHTML = userPlayer.getName("lastName");
            document.getElementById("userClassReview").innerHTML = userPlayer.getClass();
            document.getElementById("userSTR").innerHTML = userPlayer.getBaseStat("STR");
            document.getElementById("userDEF").innerHTML = userPlayer.getBaseStat("DEF");
            document.getElementById("userMAG").innerHTML = userPlayer.getBaseStat("MAG");
            document.getElementById("userRES").innerHTML = userPlayer.getBaseStat("RES");
            document.getElementById("userAGI").innerHTML = userPlayer.getBaseStat("AGI");
            document.getElementById("userLCK").innerHTML = userPlayer.getBaseStat("LCK");
        }).animate({ 'opacity': 1 }, 500);
    });
 
     
});