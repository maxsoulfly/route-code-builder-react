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
        ["COPPR", "Copper Ore"],
        ["DIAMD", "Diamonds"],
        ["FRUIT", "Fruit"],
        ["MAIZE", "Maize"],
        ["RUBB", "Rubber"],
        ["WATR", "Water"],
        ["WOOD", "Wood (Lumber Mill)"],
        ["FOOD", "Food"],
        ["GOODS", "Goods"],
        ["OIL", "Oil"],
        ["MAIL", "Mail"],
        ["PASS", "Passengers"],
    ],
    toyland: [
        ["BATT", "Batteries"],
        ["BUBB", "Bubbles"],
        ["CNDY", "Candyfloss"],
        ["COLA", "Cola"],
        ["FIZZ", "Fizzy Drinks"],
        ["PLST", "Plastic"],
        ["SUGR", "Sugar"],
        ["SWTS", "Sweets"],
        ["TOFF", "Toffee"],
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
