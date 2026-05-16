import type { RoomCard } from "../interfaces/Room.ts";

export const MOCK_ROOMS: RoomCard[] = [
    {
        id: 1,
        name: "High Rollers",
        minBlind: 100,
        status: 'active',
        gameType: "Texas Hold'em",
        currentPlayers: 5,
        maxPlayers: 8,
        players: [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Alice Miller" },
            { id: 3, name: "Sam King" },
            { id: 4, name: "Emma Wilson" },
            { id: 5, name: "Mike Brown" }
        ]
    },
    {
        id: 2,
        name: "VIP Lounge",
        minBlind: 500,
        status: 'full',
        gameType: "No Limit",
        currentPlayers: 8,
        maxPlayers: 8,
        players: [
            { id: 6, name: "Peter Kim" },
            { id: 7, name: "Lisa Moore" },
            { id: 8, name: "Tom Reed" },
            { id: 9, name: "Nina Fox" }
        ]
    },
    {
        id: 3,
        name: "Beginners Table",
        minBlind: 10,
        status: 'waiting',
        gameType: "Low Stakes",
        currentPlayers: 1,
        maxPlayers: 6,
        players: [
            { id: 10, name: "New Player" }
        ]
    },
    {
        id: 4,
        name: "Friday Night",
        minBlind: 250,
        status: 'active',
        gameType: "Tournament",
        currentPlayers: 10,
        maxPlayers: 20,
        players: [
            { id: 11, name: "Tournament 1" },
            { id: 12, name: "Tournament 2" }
        ]
    },
    {
        id: 5,
        name: "Quick Play",
        minBlind: 50,
        status: 'active',
        gameType: "Texas Hold'em",
        currentPlayers: 3,
        maxPlayers: 6,
        players: [
            { id: 13, name: "Quick 1" },
            { id: 14, name: "Quick 2" },
            { id: 15, name: "Quick 3" }
        ]
    },
    {
        id: 6,
        name: "Pro League",
        minBlind: 1000,
        status: 'active',
        gameType: "No Limit",
        currentPlayers: 6,
        maxPlayers: 8,
        players: [
            { id: 16, name: "Pro 1" },
            { id: 17, name: "Pro 2" },
            { id: 18, name: "Pro 3" },
            { id: 19, name: "Pro 4" }
        ]
    },
    {
        id: 7,
        name: "Casual Corner",
        minBlind: 25,
        status: 'waiting',
        gameType: "Low Stakes",
        currentPlayers: 2,
        maxPlayers: 8,
        players: [
            { id: 20, name: "Casual 1" },
            { id: 21, name: "Casual 2" }
        ]
    },
    {
        id: 8,
        name: "Elite Championship",
        minBlind: 5000,
        status: 'full',
        gameType: "Tournament",
        currentPlayers: 12,
        maxPlayers: 12,
        players: [
            { id: 22, name: "Elite 1" },
            { id: 23, name: "Elite 2" },
            { id: 24, name: "Elite 3" }
        ]
    }
];