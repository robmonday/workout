import {
  createContext,
  PropsWithChildren,
  useReducer,
  Dispatch,
  Reducer,
} from "react";

import { Workout, Badge, WorkoutType, Notification, Friend } from "../types";

// creating and typing initial state

type State = {
  workouts: Workout[];
  selectedWorkout: string;
  workoutFilterText: string;
  detailPanelDisplay: "WorkoutDetail" | "WorkoutFormAdd" | "WorkoutFormEdit";
  workoutToEdit: Workout | undefined;
  updatedWorkout: Workout | undefined;
  badges: Badge[];
  workoutTypes: WorkoutType[] | undefined;
  openNotifications: Notification[] | undefined;
  user: any;
  potentialFriends: Friend[];
  incomingFriendRequests: Friend[];
  friends: Friend[];
  findFriendsFilterText: string;
  token: string;
};

const initialState: State = {
  workouts: [],
  selectedWorkout: "",
  workoutFilterText: "",
  detailPanelDisplay: "WorkoutDetail",
  workoutToEdit: undefined,
  updatedWorkout: undefined,
  badges: [],
  workoutTypes: undefined,
  openNotifications: undefined,
  user: undefined,
  potentialFriends: [],
  incomingFriendRequests: [],
  friends: [],
  findFriendsFilterText: "",
  token: "",
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
        selectedWorkout: action.payload || state.workouts[0]?.id,
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
      };
    case "edit_workout":
      return {
        ...state,
        selectedWorkout: action.payload,
        updatedWorkout: action.payload, // causes re-render
      };
    case "delete_workout":
      const workoutsAfterDelete = state.workouts.filter(
        (w) => w.id !== action.payload
      );
      return {
        ...state,
        workouts: workoutsAfterDelete,
      };
    case "update_workout_filter":
      return { ...state, workoutFilterText: action.payload };
    case "filter_workouts":
      return { ...state, workouts: action.payload };
    case "update_account_details":
      return { ...state, user: action.payload };
    case "get_workout_types":
      return { ...state, workoutTypes: action.payload };
    case "set_open_notifications":
      return { ...state, openNotifications: action.payload };
    case "dismiss_notification":
      return {
        ...state,
        openNotifications:
          state.openNotifications &&
          state.openNotifications.filter((n) => n.id !== action.payload.id),
      };
    case "log_in_set_user":
      return { ...state, user: action.payload };
    case "log_in_set_token":
      return { ...state, token: action.payload };
    case "log_out":
      return initialState;
    case "set_potential_friends":
      return { ...state, potentialFriends: action.payload };
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
