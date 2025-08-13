import { Filter } from 'lucide-react';
import type { FilterType, SortType } from '../types/Task';

interface FilterControlsProps {
    filterType: FilterType;
    onFilterChnage: (type: FilterType) => void;
    sortType: SortType;
    onSortChange: (type: SortType) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
    filterType,
    onFilterChnage,
    sortType,
    onSortChange,
}) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 m-10">
            <div className="flex items-center space-x-2 mb-4">
                <Filter className='h-5 w-5 text-slate-500' />
                <h3 className="font-medium text-slate-800">Filter Option</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="">
                    <label htmlFor="filter" className='block text-sm font-medium text-slate-700 mb-2'>
                        Status Filter
                    </label>
                    <select
                        id="filter"
                        value={filterType}
                        onChange={(e) => onFilterChnage(e.target.value as FilterType)} // On Chnage Value show value as Filter value (like Click Event)
                        className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200'
                    >
                        <option value="all">All Task</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="">
                    <label htmlFor="sort" className="block text-sm font-medium text-slate-700 mb-2">
                        Sort By
                    </label>
                    <select
                        id="sort"
                        value={sortType}
                        onChange={(e) => onSortChange(e.target.value as SortType)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                        <option value="date">Date Created</option>
                        <option value="priority">Priority</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>
        </div>
    )
}