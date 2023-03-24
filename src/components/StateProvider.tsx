import { createContext, PropsWithChildren, useReducer, Dispatch } from "react";

import { Workout } from "../types";
import { createWorkout, deleteWorkout } from "../api";

type State = {
  workouts: Workout[];
  selectedWorkout: Workout | undefined;
};

const initialState: State = {
  workouts: [],
  selectedWorkout: undefined,
};

type Payload = any;
type Action = { type: string; payload?: Payload };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "set_workouts":
      return { ...state, workouts: action.payload };
    case "select_workout":
      return { ...state, selectedWorkout: action.payload };
    case "add_workout":
      console.log("add workout");
      createWorkout(action.payload).then((newWorkout) => {
        return { ...state, workouts: [...state.workouts, newWorkout] };
      });
      return state;
    case "delete_workout":
      console.log(`delete workout id #${action.payload}`);
      deleteWorkout(action.payload);

      const workoutsAfterDelete = state.workouts.filter(
        (w) => w.id !== action.payload
      );
      return { ...state, workouts: workoutsAfterDelete };
    case "edit_workout":
      console.log(`edit workout id #${action.payload}`);
      return state;
    default:
      console.error("Unknown action dispatched to reducer.");
      return state;
  }
};

// instantiating createContext components
export const StateContext = createContext(initialState);
export const DispatchContext = createContext<Dispatch<any>>(() => null);

export default function StateProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
