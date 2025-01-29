import { Heart } from 'lucide-react';
import { Recipe } from '@/store/recipeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleFavorite } from '@/store/recipeSlice';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.recipe.favorites);
  const isFavorite = favorites.includes(recipe.id);

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
      <div className="aspect-w-16 aspect-h-9 relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => dispatch(toggleFavorite(recipe.id))}
          className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
        >
          <Heart
            className={cn("h-5 w-5 transition-colors", 
              isFavorite ? "fill-accent text-accent" : "text-gray-400"
            )}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-gray-800">{recipe.title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {recipe.cuisines?.slice(0, 2).map((cuisine) => (
            <span
              key={cuisine}
              className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
            >
              {cuisine}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
          <span>🕒 {recipe.readyInMinutes} mins</span>
          <span>👥 {recipe.servings} servings</span>
        </div>
      </div>
    </div>
  );
};