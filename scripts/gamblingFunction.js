export class gamblingFunction
{
    constructor(lootTableVar)
    {
        this.lootTable = lootTableVar;
    };

    convertRelativeRarityToAbsolute()
    {
        let totalWeight = 0;
        for (let j in this.lootTable)
        {
            totalWeight += this.lootTable[j]['rarity'];
        };

        for (let k in this.lootTable)
        {
            this.lootTable[k]['rarity'] /= totalWeight;
        };
    };

    roll()
    {
        let randomNumber = Math.random();
        for (let i in this.lootTable)
        {
            const tier = this.lootTable[i];
            if (randomNumber - tier['rarity'] < 0)
            {
                return tier;
            }
            randomNumber -= tier['rarity'];
        }
        console.log("You've managed to not get anything, wow how is that possible")
        return {
            "name": "Nonexistent",
            "rarity": 0,
            "colour": "#000000"
        };
    };
};