export interface Card {
    suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
    rank: string;
}

export interface Player {
    id: string;
    name: string;
    chips: number;
    cards: Card[];
    position: number;
    isFolded: boolean;
    currentBet: number;
    isActive: boolean;
}

export interface GameState {
    roomId: string;
    players: Player[];
    communityCards: Card[];
    pot: number;
    currentBet: number;
    currentPlayer: string;
    phase: 'waiting' | 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';
}

export const mockGameState: GameState = {
    roomId: '123456',
    players: [
        {
            id: 'player-1',
            name: 'You',
            chips: 1250,
            cards: [
                { suit: 'clubs', rank: 'A' },
                { suit: 'spades', rank: 'K' }
            ],
            position: 0,
            isFolded: false,
            currentBet: 50,
            isActive: true
        },
        {
            id: 'player-2',
            name: 'Alex',
            chips: 890,
            cards: [],
            position: 1,
            isFolded: false,
            currentBet: 50,
            isActive: false
        },
        {
            id: 'player-3',
            name: 'Maria',
            chips: 1450,
            cards: [],
            position: 2,
            isFolded: false,
            currentBet: 50,
            isActive: false
        },
        {
            id: 'player-4',
            name: 'John',
            chips: 720,
            cards: [],
            position: 3,
            isFolded: true,
            currentBet: 0,
            isActive: false
        },
        {
            id: 'player-5',
            name: 'Sarah',
            chips: 980,
            cards: [],
            position: 4,
            isFolded: false,
            currentBet: 50,
            isActive: false
        }
    ],
    communityCards: [
        { suit: 'spades', rank: 'A' },
        { suit: 'hearts', rank: 'K' },
        { suit: 'diamonds', rank: 'Q' }
    ],
    pot: 450,
    currentBet: 50,
    currentPlayer: 'player-1',
    phase: 'flop'
};

// Додаткові мокові стани для різних фаз гри
export const mockGameStates: { [key: string]: GameState } = {
    '123456': mockGameState,

    'preflop': {
        roomId: '123456',
        players: mockGameState.players.map(p => ({ ...p, currentBet: 0 })),
        communityCards: [],
        pot: 30,
        currentBet: 20,
        currentPlayer: 'player-2',
        phase: 'preflop'
    },

    'turn': {
        roomId: '123456',
        players: mockGameState.players,
        communityCards: [
            { suit: 'spades', rank: 'A' },
            { suit: 'hearts', rank: 'K' },
            { suit: 'diamonds', rank: 'Q' },
            { suit: 'clubs', rank: 'J' }
        ],
        pot: 680,
        currentBet: 100,
        currentPlayer: 'player-3',
        phase: 'turn'
    },

    'river': {
        roomId: '123456',
        players: mockGameState.players,
        communityCards: [
            { suit: 'spades', rank: 'A' },
            { suit: 'hearts', rank: 'K' },
            { suit: 'diamonds', rank: 'Q' },
            { suit: 'clubs', rank: 'J' },
            { suit: 'hearts', rank: '10' }
        ],
        pot: 1200,
        currentBet: 200,
        currentPlayer: 'player-1',
        phase: 'river'
    }
};
