//Player initial stats
class player {
    constructor(firstName, lastName, userClass) {
        //Initial things
        this.firstName = firstName;
        this.lastName = lastName;
        this.userClass = userClass;
    }

    //Basic Stats
        level = 0;
        gold = 0;
        experience = 0;
        alignment = 0;          //Moralilty

    //Base Stats
        STR = 0;     RES = 0;
        DEF = 0;     AGI = 0;
        MAG = 0;     LCK = 0;

    //Player's total HP and MP
        totalHP = 0;
        totalMP = 0;

    //Player's current HP and MP
        currentHP = 0;
        currentMP = 0;

    //Physical Lifesteal / Magic Lifesteal
        lifesteal = 0;
        magicSiphon = 0;

    //Critical Chance / Critical Damage
        crit = 0;
        critDamage = 1.5;

    //Equipment
        helmets = "";
        chestplates = "";
        leggings = "";
        necklace = "";
        rings = "";
        weapons = "";

    //Relationhips with the player
        tutTown = 0;
        town2 = 0;
        town3 = 0;

            //      Accessors       //

    //Get Base Stat, Lifesteal / Siphon, Crit Chance / Crit Damage, or Total HP and MP
    getBaseStat(stat) { this.stat = stat; return player[stat]; }
    //Get Equipment
    getEquipment(equipment) { this.equipment = equipment; return player[equipment]; }
    //Get Relations
    getEquipment(relations) { this.relation = relations; return player[relations]; }
    //Get Name (Either first or last or full if specified)
    getName(name) {
        this.name = name;

        if (name == "full")
            return player.firstName + " " + player.lastName;
        return player[name];
    }
    //Get Class
    getClass() { return player.userClass; }

            //      Mutators       //

    //Set Base Stat, Lifesteal / Siphon, Crit Chance / Crit Damage, or Total HP and MP
    setBaseStat(stat, value) {
        this.stat = stat;
        this.value = value;

        //If empty, then leave
        if (stat == "")
            return;
        player[stat] = value;
    }
    //Modifies stat to Base Stat
    modBaseStat(stat, value) {
        //If empty, then leave
        if (stat == "")
            return;
        player[stat] += value;
    }
    //Set Equipment (equipment is any body piece of equipment [i.e.:helmets])
    //equipmentGroup: object reference; equipmentSlot: String input; name: String input;
    setEquipment(equipmentGroup, equipmentSlot, name) {
        this.equipmentGroup = equipmentGroup;
        this.equipmentSlot = equipmentSlot;
        this.name = name;

        //Assign the piece to the player
        player[equipmentGroup] = name;

        //Then set any stat increases to the player
        var statDEF = getEquipmentInfo(equipmentGroup, name)[3];
        var statRES = getEquipmentInfo(equipmentGroup, name)[4];
        this.modBaseStat(statDEF[1], statDEF[0]);
        this.modBaseStat(statRES[1], statRES[0]);
    }
    //Remove Equipment from the player
    setRemoveEquipment(equipmentGroup, equipmentSlot) {
        this.equipmentGroup = equipmentGroup;
        this.equipmentSlot = equipmentSlot;

        //Detract any stat bonuses granted from equipment
        var statDEF = getEquipmentInfo(equipmentGroup, name)[3];
        var statRES = getEquipmentInfo(equipmentGroup, name)[4];
        this.modBaseStat(statDEF[1], -statDEF[0]);
        this.modBaseStat(statRES[1], -statRES[0]);

        //Then remove the piece from the player
        player[equipmentGroup] = "";
    }
    //Set Relations (relation is any faction or group)
    setRelations(relations, value) { player[relations] = value; }
    //Set Class (Can only be any of the available classes)
    setClass(userClass) { player.userClass = userClass; }
    //Set Name (placement is either firstname or lastname)
    setName(placement, name) { player[placement] = name; }
    //Sets Initial Base Stats (all in one installation)
    setInitialStats(STR, DEF, MAG, RES, AGI, LCK) {
        //Create an array with keys
        var statMap = { 'STR': STR, 'DEF' : DEF, 'MAG' : MAG, 'RES' : RES, 'AGI' : AGI, 'LCK' : LCK };

        //Iterates through the object array, filling in the stats one by one.
        for (let [name, stat] of Object.entries(statMap))
            this.setBaseStat(name, stat);

        //Sets the Inital HP and MP depending on stat distribution
        var statHPMP = { 'totalHP': (0.5 * STR + 1.2 * DEF), 'totalMP': (0.5 * MAG + 1.2 * RES) };

        for (let [name, stat] of Object.entries(statHPMP))
            this.setBaseStat(name, stat);
    }

           //   Calculations and Misc.    //
    physDamage() {
        return (1.0 * this.getBaseStat("STR"));
    }
}

///////////////      Global Stuff                         ///////////////

//GLOBAL Player object
const userPlayer = new player("", "", "");

//GLOBAL Simple Next Button
//Simply switch between slides.
//Cannot do anything else.
//Good for slides which have no dependant functions needed
function nextButton(HTMLclassTransition, varTransferTo){
    $(document).on("click", HTMLclassTransition, function () {
        $(".main.title").animate({ 'opacity': 0 }, 500, function () {
            $(".main.title").html(varTransferTo);
        }).animate({ 'opacity': 1 }, 500);
    });
}

///////////////      Title and Character Creation       ///////////////

$(document).ready(function () {
    //Used for holding certain values
    var userFirstName, userLastName, userClass;

    var title = "<h1>RPGame by Moonlite-S</h1>"+
        "<p3>(Name not final)</p3> " + 
        "<h3>Embark on a journey filled with adventure and fun.</h3>" +
        "<a class=\"to_charCreationName\" href=\"#\"><h2> Create a character </h2></a>";

    var charaName = "<h1>Character Creation</h1> <br/>" +
        "<h3> Please define your character.</h3> " +
        "<label for=\"userFirstName\">First Name: </label> " +
        "<input type=\"text\" id=\"userFirstName\" name=\"userFirstName\"> " +
        "<label for=\"userLastName\">Last Name: </label>" +
        "<input type=\"text\" id=\"userLastName\" name=\"userFirstName\"> " +
        "<a class=\"to_charCreationClass\" href=\"#\"><h2>To Class Selection</h2></a>" +
        "<a class=\"to_frontScreen\" href=\"#\"><h2>Return to title screen</h2></a>";

    var charaClass = "<h1>Character Creation</h1> <br/>" +
        "<h3> What is your specialty?</h3>" +
        "<input  type=\"radio\" name=\"userClass\" value=\"Knight\">" +
        "Knight<br/>" +
        "<input  type=\"radio\" name=\"userClass\" value=\"Rogue\">" +
        "Rogue<br/>" +
        "<input  type=\"radio\" name=\"userClass\" value=\"Healer\">" +
        "Healer<br/>" +
        "<input  type=\"radio\" name=\"userClass\" value=\"Archer\">" +
        "Archer<br/>" +
        "<a class=\"to_charReview\" href=\"#\"><h2>Review</h2></a>" +
        "<a class=\"to_charCreationName\" href=\"#\"><h2>To Name Selection</h2></a>" +
        "<a class=\"to_frontScreen\" href=\"#\"><h2>Return to title screen</h2></a>";

    var charaReview = "<h1>Character Creation</h1> <br/>" +
        "<h3> Let's Review: </h3>" +
        "<p2> First Name: <span id=\"userFirstNameReview\"></span></p2><br/>" +
        "<p2> Last Name: <span id=\"userLastNameReview\"></span></p2><br/>" +
        "<p2> Class: <span id=\"userClassReview\"></span></p2><br/>" +
        "<p2> STR: <span id=\"userSTR\"></span> \t DEF: <span id=\"userDEF\"></span></p2><br/>" +
        "<p2> MAG: <span id=\"userMAG\"></span> \t RES: <span id=\"userRES\"></span></p2><br/>" +
        "<p2> AGI: <span id=\"userAGI\"></span> \t LCK: <span id=\"userLCK\"></span></p2><br/><br/>" +
        "<p2> HP: <span id=\"userHP\"></span> \t MP: <span id=\"userMP\"></span></p2><br/>" +
        "<a class=\"to_prologue\" href=\"#\"><h2>Finish</h2></a>" +
        "<a class=\"to_charCreationName\" href=\"#\"><h2>Restart Creation</h2></a>" +
        "<a class=\"to_frontScreen\" href=\"#\"><h2>Return to title screen</h2></a>";

    //Set Title Screen first
    $(".main.title").html(title);

    //Transistion to the Title Screen
    nextButton(".to_frontScreen", title);

    //Transition To Character_Creation_Name
    nextButton(".to_charCreationName", charaName);

    //Transition To Character_Creation_Class
    $(document).on("click", ".to_charCreationClass", function () {
        //Alert the player if they do not input either a First or Last Name
        userFirstName = document.getElementById("userFirstName");
        userLastName = document.getElementById("userLastName");
        if (userFirstName.value == "" || userLastName.value == "")
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
    $(document).on("click", ".to_charReview", function () {
        //Sets player Class
        userClass = $("input[name=userClass]:checked").val();
        userPlayer.setClass(userClass);

        //Sets stat distribution depending on class
        switch (userClass) {
            case "Knight": userPlayer.setInitialStats(50, 50, 50, 50, 50, 50); break;
            case "Rogue":  userPlayer.setInitialStats(40, 40, 40, 40, 40, 40); break;
            case "Healer": userPlayer.setInitialStats(30, 30, 30, 30, 30, 30); break;
            case "Archer": userPlayer.setInitialStats(10, 10, 10, 10, 10, 10); break;
        }

        console.log(userPlayer.getBaseStat("STR"));

        $(".main.title").animate({ 'opacity': 0 }, 500, function () {
            $(".main.title").html(charaReview);
            $("#userFirstNameReview").html(userPlayer.getName("firstName"));
            $("#userLastNameReview").html(userPlayer.getName("lastName"));
            $("#userClassReview").html(userPlayer.getClass());
            $("#userSTR").html(userPlayer.getBaseStat("STR"));
            $("#userDEF").html(userPlayer.getBaseStat("DEF"));
            $("#userMAG").html(userPlayer.getBaseStat("MAG"));
            $("#userRES").html(userPlayer.getBaseStat("RES"));
            $("#userAGI").html(userPlayer.getBaseStat("AGI"));
            $("#userLCK").html(userPlayer.getBaseStat("LCK"));
            $("#userHP").html(userPlayer.getBaseStat("totalHP"));
            $("#userMP").html(userPlayer.getBaseStat("totalMP"));
        }).animate({ 'opacity': 1 }, 500);
    });

    //to story.js
});