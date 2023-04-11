import { useContext, useEffect, useState } from "react";
import { getAllBadges, getBadgeGallery } from "../api";
import { DispatchContext, StateContext } from "./StateProvider";
import { Badge } from "../types";

export default function Badges() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getAllBadges().then((badges) => {
      // console.log(badges);
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

export const BadgeRender = ({ type = "Badge" }) => {
  return (
    <div className="m-3 rounded-full  bg-orange-200 p-4 text-center hover:shadow-lg active:translate-y-1">
      {type}
    </div>
  );
};

export const BadgeGallery = () => {
  const [galleryBadges, setGalleryBadges] = useState<Badge[]>([]);

  useEffect(() => {
    getBadgeGallery().then((badges) => setGalleryBadges(badges));
  }, []);

  return (
    <>
      <div className="p-2 text-2xl">Badge Gallery</div>
      <div className="panel">
        <div className="m-2 flex flex-wrap place-content-evenly rounded-lg bg-gradient-to-br from-purple-200 to-purple-300 px-2">
          {galleryBadges?.length > 0 &&
            galleryBadges?.map((b) => (
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
      <div className="p-2 text-2xl">My Friends' Badges</div>
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
