rooms = [];

let MAXROOMS = 6;
let COMPLEXITY = 4;
let START = 4;
let END = 3;


class Location
{

    constructor()
    {
        this.adjectives = [
            "dull",
            "glossy",
            "youthful",
            "icy",
            "thin",
            "unsightly",
            "entertaining",
            "consistent",
            "informal",
            "questionable",
            "thirsty",
            "wise",
            "unequaled",
            "painful",
            "frail",
            "elastic",
            "woozy",
            "alike",
            "agonizing",
            "abrasive",
            "extra-small",
            "quaint",
            "deadpan",
            "thick",
            "understood",
            "aberrant",
            "old",
            "immense",
            "obvious",
            "sweltering",
            "short",
            "talented",
            "boorish",
            "futuristic",
            "ablaze",
            "tan",
            "amusing",
            "mammoth",
            "reasonable",
            "scandalous",
            "somber",
            "shallow",
            "wet",
            "unhealthy",
            "acceptable",
            "oceanic",
            "separate",
            "aloof"
        ];
        this.nouns = [
            "cemetery",
            "hospital",
            "station",
            "library",
            "zoo",
            "castle",
            "Millennium Falcon",
            "halway",
            "airport",
            "church",
            "school",
            "theatre"

        
        
        ];
        this.nouns2 = [
            "fingers",
            "Karens",
            "frogs",
            "dogs",
            "cats",
            "men",
            "advice",
            "uncles",
            "insects",
            "monkeys",
            "memers",
            "gamers",
            "ninjas",
            "monks",
            "zombies",
            "vampires",
            "undead",
            "hamsters",
            "feet",
            "bigfoots",
            "feminists"


        ];
        this.environment = [
            "Stone",
            "Grass",
            "Gravel",
            "Dirt",
            "Sand",
            "Pits",
            "Creek",
            "Cold",
            "Hot",
            "Windy"
        ];
        this.exits = [];

        this.roomID = 0;
        this.roomName = this.NameGen();
        this.environment = this.Environment();
    }



    NameGen()
    {
        let string = "The " + this.nouns[Math.floor(Math.random() * this.nouns.length)] + " " + 
        "of " + this.adjectives[Math.floor(Math.random() * this.adjectives.length)] + " " +
        this.nouns2[Math.floor(Math.random() * this.nouns2.length)];


        return string;
    }

    Environment()
    {
        let string = "Environment: " + this.environment[Math.floor(Math.random() * this.environment.length)]
        return string;
    }

    Exits()
    {
        switch (this.roomID) 
        {
            case 0:
                this.exits[0] = MAXROOMS-1;
                this.exits[1] = 1;
                break;
        
            case MAXROOMS-1:
                this.exits[0] = MAXROOMS-2;
                this.exits[1] = 0;
             break;

            default:
                this.exits[0] = this.roomID-1;
                this.exits[1] = this.roomID+1;
                break;
        }
    }
    
}


// Generates a new room with ID, Name and Exits + Alternative Exits
function RoomGen(amountOfRooms, amountOfExtraPaths, roomArray)
{
    for (let i = 0; i < amountOfRooms; i++) 
    {        
        roomArray[i] = new Location;
        roomArray[i].roomID = i;
        roomArray[i].Exits();
    }
    let conectedRooms = [];
    for (let i = 0; i < roomArray.length; i++) 
    {
        conectedRooms[i] = roomArray[i].exits;
    }
    
    console.log((((roomArray.length-3) * roomArray.length) / 2) - 1);
    
    
    if(amountOfExtraPaths > 0 && amountOfExtraPaths <= (((roomArray.length-3) * roomArray.length) / 2) - 1)  
    {  
        let num1 = 0;
        let num2 = 0;

        for (let i = 0; i < amountOfExtraPaths; i++) 
        {           
            
            num1 = Math.floor(Math.random() * roomArray.length);
            num2 = Math.floor(Math.random() * roomArray.length);

            while (num1 == num2 || num1 - num2 == 1 || num2 - num1 == 1 || conectedRooms[num1].includes(num2) == true || conectedRooms[num2].includes(num1) == true) 
            {
                num1 = Math.floor(Math.random() * roomArray.length);
                num2 = Math.floor(Math.random() * roomArray.length);    
            }
            roomArray[num1].exits.push(num2);
            roomArray[num2].exits.push(num1);

            console.log(num1 + " " + num2);
            conectedRooms.push([num1, num2]);
        }
    }
    return conectedRooms;
}


function AllPaths(source, destination, roomArray)
{
    let completePaths = [];
    let pathsTaken = [source];
    let iterations = 0;

    while (true) 
    {
        
        for (let i = pathsTaken.length; i >= pathsTaken.length - iterations; i--) 
        {
            for (let j = 0; j < pathsTaken[i-1].exits.length; j++) 
            {
                pathsTaken.push(pathsTaken[i-1].exits[j]);
            }

            iterations++;
        }

        if (pathsTaken.includes(destination)) 
        {
            completePaths.push(pathsTaken[temp]);
            break;
        }
    }

    for (let i = 0; i < pathsTaken.length; i++) 
    {
        console.log(pathsTaken[i])
    }
}





console.log(RoomGen(MAXROOMS, COMPLEXITY, rooms));

AllPaths(rooms[START], rooms[END], rooms);



// For Debugging prints out values from rooms[]
function Print(roomArray)
{
    for (let i = 0; i < rooms.length; i++) 
    {
        console.log("Room: " + i);
        console.log(roomArray[i].roomName);
        console.log(roomArray[i].environment);
        console.log(roomArray[i].exits);
        console.log();
    }
}

Print(rooms);
