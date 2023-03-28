import React, {
  createContext,
  PropsWithChildren,
  useReducer,
  Dispatch,
  Reducer,
} from "react";

import { Workout, Badge } from "../types";

// creating and typing initial state

type State = {
  workouts: Workout[];
  selectedWorkout: string | undefined;
  filterText: string;
  detailPanelDisplay: "WorkoutDetail" | "WorkoutFormAdd" | "WorkoutFormEdit";
  workoutToEdit: Workout | undefined;
  updatedWorkout: Workout | undefined;
  badges: Badge[];
};

const initialState: State = {
  workouts: [],
  selectedWorkout: undefined,
  filterText: "",
  detailPanelDisplay: "WorkoutDetail",
  workoutToEdit: undefined,
  updatedWorkout: undefined,
  badges: [],
};

// creating and typing reducer
type Payload = any;
type Action = { type: string; payload?: Payload };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "set_workouts":
      return {
        ...state,
        workouts: action.payload,
      };
    case "set_badges":
      return { ...state, badges: action.payload };
    case "select_workout":
      return {
        ...state,
        selectedWorkout: action.payload || state.workouts[0].id,
      };
    case "show_workout_form_blank":
      return { ...state, detailPanelDisplay: "WorkoutFormAdd" };
    case "show_workout_form_populated":
      return {
        ...state,
        detailPanelDisplay: "WorkoutFormEdit",
        workoutToEdit: action.payload,
      };
    case "hide_workout_form":
      return { ...state, detailPanelDisplay: "WorkoutDetail" };
    case "add_workout":
      return {
        ...state,
        selectedWorkout: action.payload.id,
        updatedWorkout: action.payload, // causes re-render
        // workouts: [...state.workouts, action.payload],
      };
    case "edit_workout":
      // const workoutsOldRemoved = state.workouts.filter(
      //   (w) => w.id !== action.payload
      // );
      return {
        ...state,
        selectedWorkout: action.payload,
        updatedWorkout: action.payload, // causes re-render
        // workouts: [...workoutsOldRemoved, action.payload],
      };
    case "delete_workout":
      const workoutsAfterDelete = state.workouts.filter(
        (w) => w.id !== action.payload
      );
      return {
        ...state,
        workouts: workoutsAfterDelete,
      };
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
