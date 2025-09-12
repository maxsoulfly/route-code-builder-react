// src/data/dictionaries.js
export const MODES = [
    ["GT", "Ground Transit"],
    ["RT", "Rail Transit"],
    ["WT", "Water Transit"],
    ["AT", "Air Transit"],
];
export const CLIMATES = [
    ["temperate", "Temperate"],
    ["sub-arctic", "Sub-Arctic"],
    ["sub-tropical", "Sub-Tropical"],
    ["toyland", "Toyland"],
];

export const CARGO_BY_CLIMATE = {
    temperate: [
        ["PASS", "Passengers"],
        ["MAIL", "Mail"],
        ["COAL", "Coal"],
        ["OIL", "Oil"],
        ["GOODS", "Goods"],
        ["GRAIN", "Grain"],
        ["LIVEST", "Livestock"],
        ["WOOD", "Wood"],
        ["ORE", "Iron Ore"],
        ["STEEL", "Steel"],
        ["VAL", "Valuables"],
    ],
    "sub-arctic": [
        ["FOOD", "Food"],
        ["PAPER", "Paper"],
        ["GOLD", "Gold"],
        ["WHEAT", "Wheat"],
        ["COAL", "Coal"],
        ["OIL", "Oil"],
        ["GOODS", "Goods"],
        ["WOOD", "Wood"],
        ["MAIL", "Mail"],
        ["PASS", "Passengers"],
    ],
    "sub-tropical": [
        ["COPPER", "Copper Ore"],
        ["DIAMONDS", "Diamonds"],
        ["FRUIT", "Fruit"],
        ["MAIZE", "Maize"],
        ["RUBBER", "Rubber"],
        ["WATER", "Water"],
        ["WOOD", "Wood (Lumber Mill)"],
        ["FOOD", "Food"],
        ["GOODS", "Goods"],
        ["OIL", "Oil"],
        ["MAIL", "Mail"],
        ["PASS", "Passengers"],
    ],
    toyland: [
        ["BATTERIES", "Batteries"],
        ["BUBBLES", "Bubbles"],
        ["CANDYFLOSS", "Candyfloss"],
        ["COLA", "Cola"],
        ["FIZZYDRINKS", "Fizzy Drinks"],
        ["PLASTIC", "Plastic"],
        ["SUGAR", "Sugar"],
        ["SWEETS", "Sweets"],
        ["TOFFEE", "Toffee"],
        ["TOYS", "Toys"],
        ["MAIL", "Mail"],
        ["PASS", "Passengers"],
    ],
};

export const STATIONS = [
    ["RZV32", "RZV-32 Junk Yard"],
    ["SLG", "Slagmere Steel Mill"],
    ["NP", "Nova Prospekt"],
    ["SV", "Sevastopol"],
];
