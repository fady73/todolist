import { createSlice, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    currentIndex: 0,
  },
  reducers: {
    addTask: (state, action) => {
      console.log(state);
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, description } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.description = description;
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks.splice(index, 1);
      }
    },
    toggleComplete: (state, action) => {
      const id = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },

    navigateTo: (state, action) => {
      state.currentIndex = action.payload;
    },

    navigatePrevious: (state, action) => {
      state.currentIndex = state.currentIndex - 1;
    },
    navigateNext: (state, action) => {
      state.currentIndex = state.currentIndex + 1;
    },
  },
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, tasksSlice.reducer);

export const {
  addTask,
  editTask,
  deleteTask,
  toggleComplete,
  navigateTo,
  navigatePrevious,
  navigateNext,
} = tasksSlice.actions;

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
