import { useContext } from "react";
import { StateContext } from "./StateProvider";

import Badges from "./Badges";
import TempToastMessage from "./TempToastMessage";

export default function Main() {
  return (
    <>
      <div className="flex justify-between">
        <div className="w-1/3">
          <div className="p-2 text-2xl">Announcements</div>
          <div className="panel min-h-[150px]">
            <Announcements />
          </div>
        </div>
        <div className="w-1/3">
          <div className="p-2 text-2xl">Featured Products</div>
          <div className="panel min-h-[150px]">
            <div className="p-3">
              <p className="mb-3 text-xl">...</p>
              ...
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <Badges />
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
