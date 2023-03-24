import React, {
  createContext,
  PropsWithChildren,
  useReducer,
  Dispatch,
  Reducer,
} from "react";

import { Workout } from "../types";
import { createWorkout, deleteWorkout } from "../api";

// creating and typing initial state

type State = {
  workouts: Workout[];
  selectedWorkout: Workout | undefined;
  filterText: string;
  detailPanelDisplay: "WorkoutDetail" | "WorkoutForm";
};

const initialState: State = {
  workouts: [],
  selectedWorkout: undefined,
  filterText: "",
  detailPanelDisplay: "WorkoutDetail",
};

// creating and typing reducer
type Payload = any;
type Action = { type: string; payload?: Payload };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "fetch_workouts":
      return { ...state, workouts: action.payload };
    case "select_workout":
      return { ...state, selectedWorkout: action.payload };
    case "show_add_workout_form":
      console.log("need to display form here");
      return { ...state, detailPanelDisplay: "WorkoutForm" };
    case "hide_add_workout_form":
      return { ...state, detailPanelDisplay: "WorkoutDetail" };
    case "add_workout":
      console.log("add workout");
      createWorkout(action.payload);
      return { ...state, workouts: [...state.workouts, action.payload] };
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
    case "update_filter_text":
      return { ...state, filterText: action.payload };
    case "filter_workouts":
      return { ...state, workouts: action.payload };
    default:
      console.error("Unknown action dispatched to reducer.");
      return state;
  }
};

// instantiating createContext components
export const StateContext = createContext(initialState);
export const DispatchContext = createContext<Dispatch<any>>(() => null);

// defining StateProvider component, with createContext components and useReducer()
export default function StateProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer<Reducer<any, any>>(
    reducer,
    initialState
  );
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
