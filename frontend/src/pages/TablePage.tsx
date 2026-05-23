import {useParams} from "react-router-dom";
import {useState} from "react";
import {type Card, type GameState, mockGameStates} from "../data/mockGameState.ts";

function TablePage() {
    const { id } = useParams<{ id: string }>();

    const [gameState, setGameState] = useState<GameState | undefined>(
        id ? mockGameStates[id] : undefined
    );

    // ОБОВ'ЯЗКОВО: Перевірка на випадок, якщо id не знайдено
    if (!gameState) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <h1>Кімнату {id} не знайдено! Перевірте ID в URL.</h1>
            </div>
        );
    }
    const [raiseAmount, setRaiseAmount] = useState(50);

    const handleFold = () =>{
        console.log("fold");
        const updatedPlayers = gameState.players.map(p =>
        p.id ===gameState.currentPlayer ? {...p, isFolded: true} : p
        )
        setGameState({...gameState, players: updatedPlayers});
    }

    const handleCheck = () => {
        console.log("check");
    }
    const handleRaise = () => {
        console.log("raises", raiseAmount);
        setGameState({...gameState, currentBet: raiseAmount, pot: gameState.pot + raiseAmount});
    }
    const handleCall  = () => {
        console.log("call", gameState.currentBet);
    }
    // const handleAllIn = () => {
    //     console.log("all-in");
    // }

    const getCardSymbol = (card: Card) => {
        const suits: {[key: string]: string} = {
            'hearts': '❤️',
            'diamonds': '♦️',
            'clubs': '♣️',
            'spades': '♠️'
        };
        return `${card.rank}${suits[card.suit]}`;
    }

    const getCardColor = (card: Card) => {
        return card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-600' : 'text-black';
    }

    const getPlayerPosition = (position: number) => {
        const positions = [
            'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2',
            'top-4 left-8',
            'top-4 right-8',
            'top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2',
            'top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2',
        ]
        return positions[position] || positions[0]
    }

    const currentPlayer = gameState.players
        .find(p => p.id === gameState.currentPlayer)

    const isMyTurn = currentPlayer?.id ==='player-1'

    return (
        <div className="bg-gradient-to-br from-green-800 via-green-900 to-black min-h-screen flex items-center justify-center p-8">
            <div className="relative w-full max-w-5xl">

                {/* Mock Mode Indicator */}
                <div className="absolute top-4 right-4 z-10">
                    <div className="px-4 py-2 rounded-full bg-purple-500 text-white text-sm font-bold">
                        🧪 MOCK MODE
                    </div>
                </div>

                {/* Game Phase */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-bold uppercase">
                        {gameState.phase}
                    </div>
                </div>

                {/* Room ID */}
                <div className="absolute top-16 left-4 z-10">
                    <div className="px-4 py-2 rounded-full bg-gray-700 text-white text-xs font-bold">
                        Room: {gameState.roomId}
                    </div>
                </div>

                {/* Poker Table */}
                <div className="relative bg-gradient-to-br from-green-700 to-green-900 rounded-full border-8 border-amber-900 shadow-2xl p-12" style={{aspectRatio: '16/10'}}>

                    {/* Community Cards */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2">
                        {gameState.communityCards.map((card, idx) => (
                            <div key={idx} className={`w-16 h-24 bg-white rounded-lg shadow-lg border-2 border-gray-300 flex items-center justify-center text-4xl font-bold hover:animate-[flip_0.6s_ease-in-out] ${getCardColor(card)}`}>
                                {getCardSymbol(card)}
                            </div>
                        ))}
                        {[...Array(5 - gameState.communityCards.length)].map((_, idx) => (
                            <div key={`empty-${idx}`} className="w-16 h-24 bg-gray-400 rounded-lg shadow-lg border-2 border-gray-500"></div>
                        ))}
                    </div>

                    {/* Pot Amount */}
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-black/50 backdrop-blur-sm px-6 py-2 rounded-full border-2 border-yellow-500">
                            <p className="text-yellow-400 font-bold text-xl">Pot: ${gameState.pot}</p>
                        </div>
                    </div>

                    {/* Players */}
                    {gameState.players.map((player, idx) => (
                        <div key={player.id} className={`absolute ${getPlayerPosition(player.position)}`}>
                            <div className={`bg-gray-800 rounded-xl p-3 shadow-xl border-2 ${
                                player.id === gameState.currentPlayer ? 'border-yellow-400 border-4 animate-pulse' : 'border-gray-600'
                            } ${player.isFolded ? 'opacity-50' : ''}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-10 h-10 bg-gradient-to-br ${
                                        idx === 0 ? 'from-blue-400 to-blue-600' :
                                            idx === 1 ? 'from-purple-400 to-purple-600' :
                                                idx === 2 ? 'from-orange-400 to-orange-600' :
                                                    idx === 3 ? 'from-pink-400 to-pink-600' :
                                                        'from-teal-400 to-teal-600'
                                    } rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                                        {player.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold">{player.name}</p>
                                        <p className="text-green-400 text-xs font-bold">${player.chips}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {player.cards.length > 0 ? (
                                        player.cards.map((card, cardIdx) => (
                                            <div key={cardIdx} className={`w-10 h-14 bg-white rounded border-2 border-gray-300 flex items-center justify-center text-lg font-bold ${getCardColor(card)}`}>
                                                {getCardSymbol(card)}
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div className="w-10 h-14 bg-red-600 rounded border-2 border-red-800"></div>
                                            <div className="w-10 h-14 bg-red-600 rounded border-2 border-red-800"></div>
                                        </>
                                    )}
                                </div>
                                {player.currentBet > 0 && (
                                    <div className="mt-1 text-center">
                                        <span className="text-yellow-400 text-xs font-bold">Bet: ${player.currentBet}</span>
                                    </div>
                                )}
                                {player.isFolded && (
                                    <div className="mt-1 text-center">
                                        <span className="text-red-400 text-xs font-bold">FOLDED</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Chips (decorative) */}
                    <div className="absolute bottom-1/3 left-1/3 flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-2 border-white shadow-lg"></div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-2 border-white shadow-lg"></div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-700 border-2 border-white shadow-lg"></div>
                    </div>

                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={handleFold}
                        disabled={!isMyTurn}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                        Fold
                    </button>
                    <button
                        onClick={handleCheck}
                        disabled={!isMyTurn || gameState.currentBet > 0}
                        className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                        Check
                    </button>
                    <button
                        onClick={handleCall}
                        disabled={!isMyTurn || gameState.currentBet === 0}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                        Call ${gameState.currentBet}
                    </button>
                    <button
                        onClick={handleRaise}
                        disabled={!isMyTurn}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                        Raise
                    </button>
                </div>

                {/* Raise Slider */}
                <div className="mt-4 max-w-md mx-auto bg-gray-800 p-4 rounded-lg">
                    <label className="text-white font-semibold mb-2 block">Raise Amount:</label>
                    <input
                        type="range"
                        min={gameState.currentBet + 10}
                        max={currentPlayer?.chips || 500}
                        value={raiseAmount}
                        onChange={(e) => setRaiseAmount(Number(e.target.value))}
                        disabled={!isMyTurn}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className="flex justify-between text-white text-sm mt-2">
                        <span>${gameState.currentBet + 10}</span>
                        <span className="font-bold text-yellow-400">${raiseAmount}</span>
                        <span>${currentPlayer?.chips || 500}</span>
                    </div>
                </div>

                {/* Mock Controls */}
                <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-white font-bold mb-3">🎮 Mock Controls (для тестування)</h3>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setGameState(mockGameStates['preflop'])}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded">
                            Preflop
                        </button>
                        <button
                            onClick={() => setGameState(mockGameStates['123456'])}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded">
                            Flop
                        </button>
                        <button
                            onClick={() => setGameState(mockGameStates['turn'])}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded">
                            Turn
                        </button>
                        <button
                            onClick={() => setGameState(mockGameStates['river'])}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded">
                            River
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TablePage
