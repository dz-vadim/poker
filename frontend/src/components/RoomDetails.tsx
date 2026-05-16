import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api.ts";
import type {RoomDetails as RoomDetailsType} from "../interfaces/Room.ts";

export default function RoomDetails() {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<RoomDetailsType | null>(null);

  useEffect(() => {
    api.get(`/rooms/${id}`)
      .then(res => setRoom(res.data))
      .catch(err => console.error("Room not found", err));
  }, [id]);

  if (!room) return <div>Loading...</div>;

  return (
    <div>
      <h1>Room №{id}</h1>
      <p>Name: {room.name}</p>
      {/* треба додати більше інфи в інтерфейс, адже тут буде парситись інфа про учасників і тд */}
    </div>
  );
}