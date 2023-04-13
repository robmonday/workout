import { useReducer, Reducer } from "react";

import { dateToWeekdayDate } from "../util";
import { Plus, Edit2, Trash2 } from "react-feather";

// creating and typing initial state

type State = {
  filter: string;
  items: any[];
};

const initialState: State = {
  filter: "",
  items: [],
};

// creating and typing reducer

type Payload = any;
type Action = { type: string; payload?: Payload };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "set_items":
      return { ...state };
    case "update_filter":
      return { ...state };
    case "select_item":
      return { ...state };
    case "remove_item":
      return { ...state };
    default:
      console.error("Unknown action dispatched to reducer.");
      return state;
  }
};

type FilterListProps = {
  deleteReqFn: (id: string) => any;
};

export default function FilterList({ deleteReqFn }: FilterListProps) {
  const [state, dispatch] = useReducer<Reducer<any, any>>(
    reducer,
    initialState
  );

  const handleDelete = (id: string) => {
    deleteReqFn(id);
    dispatch({ type: `delete_item`, payload: id });
    dispatch({ type: `select_item` });
  };

  const filteredList = state.items.filter((i: any) => {
    return i.notes?.toLowerCase().includes(state.filter.toLowerCase()); // use || to add multiple filter fields
  });

  return (
    <>
      <div className="flex w-full flex-col rounded-lg border-2 border-purple-400 py-1 px-3">
        <form>
          <input
            type="text"
            value={state.filterText}
            onChange={(e) =>
              dispatch({
                type: `update_filter`,
                payload: e.target.value,
              })
            }
            placeholder="Start typing to filter..."
            className="input mt-2 w-full text-gray-500"
          />
        </form>

        <div
          onClick={() => dispatch({ type: "show_form_blank" })}
          className="text-gray-00 ml-1 inline-block rounded hover:bg-purple-500 hover:text-white active:bg-purple-700"
        >
          <Plus strokeWidth={0.75} />
        </div>
        <div className="h-72 overflow-y-auto">
          {filteredList?.map((w: any) => (
            <div
              key={w.id}
              className={`my-2 flex justify-between rounded-lg border border-purple-500 p-2 hover:bg-purple-300 focus:bg-purple-500 active:translate-y-0.5 active:bg-purple-400 ${
                w.id === state.itemSelected && "bg-purple-400 font-semibold"
              }`}
            >
              <span
                className="flex-grow"
                onClick={() => dispatch({ type: "select_item", payload: w.id })}
              >
                <div className="inline-block">{w.workoutType?.name}</div>
                <div className="hidden font-light text-purple-700 sm:inline-block">
                  <div className="ml-3 inline">
                    {w.start && dateToWeekdayDate(w.start)}
                  </div>
                </div>
              </span>
              <span className="flex-none">
                <div
                  onClick={() =>
                    dispatch({
                      type: "show_workout_form_populated",
                      payload: w,
                    })
                  }
                  className="text-gray-00 ml-1 inline-block rounded hover:bg-purple-500 hover:text-white active:bg-purple-700"
                >
                  <Edit2 className="inline" strokeWidth={0.75} />
                </div>
                <div
                  onClick={() => handleDelete(w.id)}
                  className="text-gray-00 ml-1 inline-block rounded hover:bg-purple-500 hover:text-white active:bg-purple-700"
                >
                  <Trash2 className="inline-block" strokeWidth={0.75} />
                </div>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
