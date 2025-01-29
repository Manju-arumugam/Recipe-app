import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  cuisines: string[];
  dishTypes: string[];
}

interface RecipeState {
  recipes: Recipe[];
  favorites: number[];
  loading: boolean;
  error: string | null;
  filters: {
    cuisine: string;
    mealType: string;
  };
  apiKey: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  favorites: JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'),
  loading: false,
  error: null,
  filters: {
    cuisine: '',
    mealType: '',
  },
  apiKey: localStorage.getItem('spoonacularApiKey'),
};

export const fetchRecipes = createAsyncThunk(
  'recipe/fetchRecipes',
  async (searchTerm: string = '', { getState, rejectWithValue }) => {
    const state = getState() as { recipe: RecipeState };
    const apiKey = state.recipe.apiKey;
    
    if (!apiKey) {
      return rejectWithValue('API key is required. Please enter your Spoonacular API key.');
    }

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerm}&addRecipeInformation=true&number=12`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch recipes');
      }
      
      const data = await response.json();
      return data.results;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch recipes');
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = state.favorites.indexOf(action.payload);
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
      localStorage.setItem('favoriteRecipes', JSON.stringify(state.favorites));
    },
    setFilters: (state, action: PayloadAction<{ cuisine: string; mealType: string }>) => {
      state.filters = action.payload;
    },
    setApiKey: (state, action: PayloadAction<string>) => {
      state.apiKey = action.payload;
      localStorage.setItem('spoonacularApiKey', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch recipes';
      });
  },
});

export const { toggleFavorite, setFilters, setApiKey } = recipeSlice.actions;
export default recipeSlice.reducer;