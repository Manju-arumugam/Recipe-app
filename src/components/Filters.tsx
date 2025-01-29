import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '@/store/recipeSlice';
import { RootState } from '@/store/store';

const cuisines = ['All', 'Italian', 'Mexican', 'Asian', 'Mediterranean'];
const mealTypes = ['All', 'Breakfast', 'Main Course', 'Dessert', 'Snack'];

export const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.recipe.filters);

  const handleFilterChange = (type: 'cuisine' | 'mealType', value: string) => {
    dispatch(setFilters({
      ...filters,
      [type]: value === 'All' ? '' : value,
    }));
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Cuisine:</label>
        <select
          value={filters.cuisine || 'All'}
          onChange={(e) => handleFilterChange('cuisine', e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {cuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Meal Type:</label>
        <select
          value={filters.mealType || 'All'}
          onChange={(e) => handleFilterChange('mealType', e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {mealTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};