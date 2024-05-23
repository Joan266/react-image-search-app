import { createAppSlice } from "./createAppSlice"

const searchSlice = createAppSlice({
  name: 'search',
  initialState: {
    loading: false,
    searchResult: [],
  },
  reducers: (create) => ({
    deleteSearchResult: create.reducer((state, action) => {
      state.searchResult.splice(action.payload, 1)
    }),
    fetchTodo: create.asyncThunk(
      async (id, thunkApi) => {
        const res = await fetch(`myApi/search?id=${id}`)
        return await res.json()
      },
      {
        pending: (state) => {
          state.loading = true
        },
        rejected: (state, action) => {
          state.loading = false
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.search.push(action.payload)
        },
      }
    ),
  }),
})

export const { addTodo, deleteTodo, fetchTodo } = searchSlice.actions