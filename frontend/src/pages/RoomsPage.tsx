// import { useEffect, useState } from "react";
// import { api } from "../api/api.ts";
import type { RoomCard as RoomCardType } from "../interfaces/Room.ts";
import RoomCard from "../components/RoomCard.tsx";
import {MOCK_ROOMS} from "../data/mockRooms.ts";
import {useState} from "react";

export default function RoomsPage() {
  // const [rooms, setRooms] = useState<RoomCardType[] | null>(null);

  // useEffect(() => {
  //   api.get("/rooms")
  //     .then(res => setRooms(res.data))
  //     .catch(err => {
  //       console.error("Rooms not found", err);
  //       setRooms([]);
  //     });
  // }, []);

const [rooms] = useState<RoomCardType[]>(MOCK_ROOMS)

  // Поки апішки немає, я юзав тестові дані, зараз вони закоментовані

  if (!rooms) return <div className="text-center p-10">Loading rooms...</div>;

  return (
      <div className="bg-gray-50 min-h-screen dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto p-4 ">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Available Rooms</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rooms.length > 0 ? (
              rooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))
            ) : (
              <div className="col-span-full text-center text-red-500 dark:text-red-300">
                No rooms available at the moment.
              </div>
            )}
          </div>
        </div>
      </div>
  );
}