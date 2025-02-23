import { lootTable } from "./scripts/lootTable.js";
import { gamblingFunction } from "./scripts/gamblingFunction.js";

const gamblingText = document.getElementById("gamingText");
const chance = document.getElementById("gamingProbability");
const beforeText = document.getElementById("before");
const afterText = document.getElementById("after");

let rollCounter = 0;

const hakari = new gamblingFunction(lootTable);

const button = document.getElementById('gamingRoll');

const delay = ms => new Promise(res => setTimeout(res, ms));

let tierTracker = [lootTable[0], lootTable[1], lootTable[0]];

hakari.convertRelativeRarityToAbsolute();

function changeText(tier)
{
    gamblingText.innerText = tier['name'];
    gamblingText.style.color = tier['colour'];
    document.body.style.backgroundColor = tier['colour'];
    chance.innerText = `1 in ${Math.round(1/tier['rarity'])}`
}

async function animateRoll()
{
    button.disabled = true;
    const beforeElements = Math.floor((Math.random() + 0.5) * 10);
    const beforeElementsTiers = [];
    for (let i = 0; i < beforeElements + 2; i++)
    {
        beforeElementsTiers.push(hakari.roll())
    };
    tierTracker = beforeElementsTiers;

    for (let j = 1; j < beforeElements; j++)
    {
        beforeText.innerText = tierTracker[j - 1]['name']
        changeText(tierTracker[j]);
        afterText.innerText = tierTracker[j + 1]['name']
        await delay(1000);
    };
    button.disabled = false;
}

function main()
{   
    beforeText.innerText = tierTracker[0]['name'];
    changeText(tierTracker[1]);
    afterText.innerText = tierTracker[2]['name'];

    button.addEventListener('click', (event) => {
        animateRoll();
        rollCounter += 1;
        console.log(`Roll Counter: ${rollCounter}`);
    })
}

window.onload = () => {
    main();
};