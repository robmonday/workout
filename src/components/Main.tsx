import { useContext } from "react";
import { StateContext } from "./StateProvider";

import { MyBadges } from "./Badges";
import TempToastMessage from "./TempToastMessage";
import Timer from "./Timer";

export default function Main() {
  return (
    <>
      <div className="flex flex-wrap justify-around">
        <div className="min-w-[30rem]">
          <div className="p-2 text-2xl">Announcements</div>
          <div className="panel h-52">
            <Announcements />
          </div>
        </div>
        <div className="w-[30rem] flex-grow">
          <div className="p-2 text-2xl">Recent Activity Feed</div>
          <div className="panel h-96">
            <div className="p-3">
              <p className="mb-3 text-xl">...</p>
              ...
            </div>
          </div>
        </div>
        <div className="w-[15rem]">
          <Timer />
          <MyBadges />
        </div>
      </div>
      <TempToastMessage>
        The workout app team will be conducting routine maintenance tomorrow
        from 1:00am EST to 3:00am EST. Server response times may be slightly
        delayed at this time. Thank you for bearing with us as we are
        continually working to improve the Workout App experience!
      </TempToastMessage>
    </>
  );
}

export function Announcements() {
  return (
    <>
      <div className="p-3">
        <p className="mb-3 text-xl">Upcoming Events</p>
        <p className="line">
          Plank Challenge! coming up on April 27th. &nbsp;&nbsp;
          <a className="body-link" href="#">
            Register
          </a>
        </p>
      </div>
    </>
  );
}
