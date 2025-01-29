import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchRecipes, setApiKey } from '@/store/recipeSlice';
import { RecipeCard } from '@/components/RecipeCard';
import { SearchBar } from '@/components/SearchBar';
import { Filters } from '@/components/Filters';
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import '@fontsource/playfair-display';
import '@fontsource/inter';

const DEFAULT_API_KEY = "fea7cee0a1344ce3b3a7078077123c50";

const Index = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error, filters, apiKey } = useSelector((state: RootState) => state.recipe);
  const [tempApiKey, setTempApiKey] = useState('');

  useEffect(() => {
    if (!apiKey) {
      dispatch(setApiKey(DEFAULT_API_KEY));
    } else {
      dispatch(fetchRecipes('') as any);
    }
  }, [dispatch, apiKey]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setApiKey(tempApiKey));
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCuisine = !filters.cuisine || recipe.cuisines?.includes(filters.cuisine);
    const matchesMealType = !filters.mealType || recipe.dishTypes?.includes(filters.mealType.toLowerCase());
    return matchesCuisine && matchesMealType;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="container py-8">
        <h1 className="font-display text-4xl font-bold text-gray-900">
          Discover Delicious Recipes
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Find and save your favorite recipes
        </p>
        
        <div className="mt-8 flex flex-col gap-6">
          <SearchBar />
          <Filters />
        </div>

        {loading ? (
          <div className="mt-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="mt-12 text-center text-red-500">{error}</div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
