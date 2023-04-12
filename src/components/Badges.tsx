import { useContext, useEffect, useState } from "react";
import { getAllBadges, getBadgeGallery } from "../api";
import { DispatchContext, StateContext } from "./StateProvider";
import { Badge } from "../types";

export default function Badges() {
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getAllBadges().then((badges) => {
      console.log("badges from parent element request", badges);
      dispatch({ type: "set_badges", payload: badges });
    });
  }, []);

  return (
    <>
      <div className="flex">
        <div className="w-1/2">
          <MyBadges />
        </div>
        <div className="w-1/2">
          <FriendsBadges />
        </div>
      </div>

      <BadgeGallery />
    </>
  );
}

export const BadgeGallery = () => {
  const [galleryBadges, setGalleryBadges] = useState<Badge[]>([]);

  useEffect(() => {
    getBadgeGallery().then((badges) => setGalleryBadges(badges));
  }, []);

  const colors = [
    "bg-red-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-orange-200",
    "bg-fuchsia-200",
    "bg-pink-200",
  ];

  return (
    <>
      <div className="p-2 text-2xl">Badge Gallery</div>
      <div className="panel">
        <div className="m-2 flex flex-wrap place-content-evenly rounded-lg bg-gradient-to-br from-purple-200 to-purple-300 px-2">
          {galleryBadges?.length > 0 &&
            galleryBadges?.map((b) => {
              const bgColor = colors[Math.floor(Math.random() * colors.length)];
              return (
                <div
                  key={b.id}
                  className={`m-3 rounded-full   p-4 text-center hover:shadow-lg active:translate-y-1 ${bgColor}`}
                >
                  {b.type}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export const MyBadges = () => {
  const state = useContext(StateContext);
  return (
    <>
      <div className="p-2 text-2xl">My Badges</div>
      <div className="panel">
        <div className="m-2 flex flex-wrap place-content-evenly rounded-lg bg-gradient-to-br from-purple-200 to-purple-300 px-2">
          {state.badges?.length > 0 &&
            state.badges?.map((b) => (
              <div
                key={b.id}
                className="m-3 rounded-full  bg-orange-200 p-4 text-center hover:shadow-lg active:translate-y-1"
              >
                {b.type}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export const FriendsBadges = () => {
  const state = useContext(StateContext);
  return (
    <>
      <div className="p-2 text-2xl">Friends' Badges</div>
      <div className="panel">
        <div className="m-2 flex flex-wrap place-content-evenly rounded-lg bg-gradient-to-br from-purple-200 to-purple-300 px-2">
          {state.badges?.length > 0 &&
            state.badges?.map((b) => (
              <div
                key={b.id}
                className="m-3 rounded-full  bg-orange-200 p-4 text-center hover:shadow-lg active:translate-y-1"
              >
                {b.type}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
