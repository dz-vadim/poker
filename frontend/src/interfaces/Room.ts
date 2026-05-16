export interface RoomDetails {
  id: number;
  name: string;
  minBlind: number;
  isActive: boolean;
  activePlayers: number;
}

export type RoomStatus = 'active' | 'full' | 'waiting';

export interface Player {
  id: number;
  name: string;
  avatar?: string;
}

export interface RoomCard {
  id: number;
  name: string;
  minBlind: number;
  status: RoomStatus;
  gameType: string;
  currentPlayers: number;
  maxPlayers: number;
  players?: Player[];
}
  