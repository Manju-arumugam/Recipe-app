import { Search } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '@/store/recipeSlice';
import { AppDispatch } from '@/store/store';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchRecipes(searchTerm));
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for recipes..."
        className="w-full rounded-full border border-gray-300 bg-white px-6 py-3 pr-12 text-gray-700 shadow-sm transition-shadow focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-400 transition-colors hover:text-primary"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
};