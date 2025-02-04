import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Loader2, Facebook, Twitter, Linkedin, Youtube, Instagram, Printer, MapPin, Chrome, NotebookPen } from 'lucide-react';
import { basedUrl } from '../utils/basedUrl';
import { Link } from 'react-router';
import Layout from './Layout/Layout';

const socialIcons = {
    Facebook: Facebook,
    Twitter: Twitter,
    LinkedIn: Linkedin,
    YouTube: Youtube,
    Instagram: Instagram,
    Pinterest: Printer,
    Google: MapPin,
    Blog: NotebookPen,
};


function TableSection() {
    const [category, setCategory] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [selectedField, setSelectedField] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownSearch, setDropdownSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${basedUrl}categories`);
            const data = await response.json();
            setCategory(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = async () => {
        if (!selectedField) return;
        setLoading(true);
        try {
            const response = await fetch(`${basedUrl}get_category/${selectedField}`);
            const data = await response.json();
            setTableData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const filteredCategories = category?.filter(item =>
        item.toLowerCase().includes(dropdownSearch?.toLowerCase())
    );


    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex space-x-4 mb-8">
                        <div className="relative w-96" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="w-full flex items-center justify-between px-4 py-3 border rounded-lg bg-white hover:bg-gray-50"
                            >
                                <span className="capitalize">{selectedField || 'Select The Industry'}</span>
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            </button>

                            {showDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                                    <div className="p-2 border-b">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={dropdownSearch}
                                                onChange={(e) => setDropdownSearch(e.target.value)}
                                                placeholder="Search fields..."
                                                className="w-full px-8 py-2 border rounded-md text-sm"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>

                                    <div className="max-h-48 overflow-y-auto">
                                        {filteredCategories?.length === 0 ? (
                                            <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
                                        ) : (
                                            filteredCategories?.map((field) => (
                                                <button
                                                    key={field}
                                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 capitalize text-sm"
                                                    onClick={() => {
                                                        setSelectedField(field);
                                                        setShowDropdown(false);
                                                        setDropdownSearch("");
                                                    }}
                                                >
                                                    {field}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={loading || !selectedField}
                            className={`px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 ${loading || !selectedField
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                            <span>Find Companies</span>
                        </button>
                    </div>


                    {tableData?.length > 0 && (
                        <div>
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                                    <p className="text-gray-600 animate-pulse">Loading data...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="rounded-lg border p-2">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        className="w-52 h-12 px-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                                                    >
                                                        country
                                                    </th>
                                                    <th
                                                        className="w-52 h-12 px-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                                                    >
                                                        company_name
                                                    </th>
                                                    <th
                                                        className="w-52 h-12 px-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                                                    >
                                                        website_url
                                                    </th>
                                                    <th
                                                        className="w-52 h-12 px-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                                                    >
                                                        Socila Media
                                                    </th>
                                                    <th
                                                        className="w-52 h-12 px-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                                                    >
                                                        View Detail
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {tableData?.map((row, index) => (
                                                    <tr key={index} className="hover:bg-gray-50">
                                                        <td
                                                            className="w-52 h-12 px-2 text-sm text-gray-900 whitespace-nowrap"
                                                        >
                                                            {row?.country}
                                                        </td>
                                                        <td
                                                            className="w-52 h-12 px-2 text-sm text-gray-900 text-wrap"
                                                        >
                                                            {row?.company_name}
                                                        </td>
                                                        <td
                                                            className="w-52 h-12 px-2 text-sm text-gray-900 whitespace-nowrap"
                                                        >
                                                            <a
                                                                href={row?.website_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="items-center space-x-3 w-8 h-8 rounded-full border hover:bg-gray-50 transition-colors flex justify-center"
                                                            >
                                                                <Chrome className="h-5 w-5 text-gray-600" />
                                                            </a>
                                                        </td>
                                                        <td
                                                            className="flex items-center gap-2 w-60 h-12 px-2 text-sm text-gray-900 whitespace-nowrap"
                                                        >
                                                            {row?.social_media_handles && Object.entries(row.social_media_handles)?.map(([platform, url]) => {
                                                                const Icon = socialIcons[platform] || null;
                                                                return (
                                                                    <a
                                                                        key={platform}
                                                                        href={url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="items-center space-x-3 w-8 h-8 rounded-full border hover:bg-gray-50 transition-colors flex justify-center"
                                                                    >
                                                                        {Icon && <Icon className="h-5 w-5 text-gray-600" />}
                                                                    </a>
                                                                );
                                                            })}
                                                        </td>
                                                        <td
                                                            className="gap-2 px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
                                                        >
                                                            <Link
                                                                to="/details"
                                                                state={{ rowData: row }}
                                                            >
                                                                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer">
                                                                    View Detail
                                                                </button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {tableData?.length === 0 && (
                                            <div className="text-center py-8 text-gray-500">
                                                No results found
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default TableSection;

