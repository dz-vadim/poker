import type { RoomCard as RoomCardType, RoomStatus } from "../interfaces/Room.ts";

interface RoomCardProps {
    room: RoomCardType;
}

const STATUS_CONFIG: Record<RoomStatus, { label: string; bgColor: string; dotColor: string; animate: boolean }> = {
    active: { label: 'Active', bgColor: 'bg-green-500', dotColor: 'bg-white', animate: true },
    full: { label: 'Full', bgColor: 'bg-red-500', dotColor: '', animate: false },
    waiting: { label: 'Waiting', bgColor: 'bg-yellow-500', dotColor: 'bg-white', animate: true }
};

const GRADIENT_VARIANTS: Record<string, string> = {
    'Texas Hold\'em': 'from-blue-500 to-purple-600',
    'No Limit': 'from-red-500 to-orange-600',
    'Low Stakes': 'from-green-500 to-teal-600',
    'Tournament': 'from-indigo-500 to-purple-600'
};

export default function RoomCard({ room }: RoomCardProps) {
    if (!room) return (
        <div>
            <h1 className="text-center text-red-500">Room info loading error</h1>
        </div>
    );

    const statusConfig = STATUS_CONFIG[room.status];
    const gradientClass = GRADIENT_VARIANTS[room.gameType] || 'from-gray-500 to-gray-700';
    const capacityPercent = (room.currentPlayers / room.maxPlayers) * 100;
    const isFull = room.status === 'full';

    return (
        <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:scale-105 hover:-translate-y-1">

            {/* Status Badge */}
            <div className="relative">
                <div className="absolute top-4 right-4 z-10">
          <span className={`${statusConfig.bgColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1`}>
            {statusConfig.animate && (
                <span className={`w-2 h-2 ${statusConfig.dotColor} rounded-full animate-pulse`}></span>
            )}
              {statusConfig.label}
          </span>
                </div>

                {/* Header with gradient */}
                <div className={`bg-gradient-to-br ${gradientClass} p-6 pb-12`}>
                    <h2 className="text-2xl font-bold text-white">{room.name}</h2>
                    <p className="text-white/80 text-sm mt-1">{room.gameType}</p>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-6 -mt-6 relative">

                {/* Players Avatars (Overlapping) */}
                {room.players && room.players.length > 0 && (
                    <div className="flex -space-x-3 mb-4">
                        {room.players.slice(0, 3).map((player) => (
                            <div
                                key={player.id}
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white font-bold text-sm shadow-lg"
                                title={player.name}
                            >
                                {player.name.substring(0, 2).toUpperCase()}
                            </div>
                        ))}
                        {room.currentPlayers > 3 && (
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold text-xs shadow-lg">
                                +{room.currentPlayers - 3}
                            </div>
                        )}
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Min Blind</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">${room.minBlind}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Players</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{room.currentPlayers}/{room.maxPlayers}</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>Table Capacity</span>
                        <span>{Math.round(capacityPercent)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                            className={`bg-gradient-to-r ${gradientClass} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${capacityPercent}%` }}
                        ></div>
                    </div>
                </div>

                {/* Join Button */}
                <button
                    disabled={isFull}
                    className={`w-full font-bold py-3 rounded-lg shadow-lg transform transition-all duration-200 ${
                        isFull
                            ? 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400 cursor-not-allowed'
                            : `bg-gradient-to-r ${gradientClass} hover:opacity-90 text-white group-hover:scale-105`
                    }`}
                >
                    {isFull ? 'Room Full' : 'Join Room'}
                </button>
            </div>
        </div>
    );
}