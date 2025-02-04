import { useLocation, useNavigate } from 'react-router';
import {
    ArrowLeft, Facebook, Twitter, Linkedin, Youtube, Instagram, MapPin, Clock, Phone,
    Globe, Building2, Mail, Users, Calendar, Award, Briefcase, Building, DollarSign,
    FileText, Newspaper,
} from 'lucide-react';

const socialIcons = {
    Facebook: Facebook,
    Twitter: Twitter,
    LinkedIn: Linkedin,
    YouTube: Youtube,
    Instagram: Instagram,
    Pinterest: Twitter
};

function DetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { rowData } = location.state || {};

    const renderInfoItem = (icon, label, value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        return (
            <div className="flex items-start space-x-3">
                <div className="mt-1">{icon}</div>
                <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    {Array.isArray(value) ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                            {value.map((item, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
                                    {item}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-900">{value}</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center space-x-2">
                        <Building2 className="h-6 w-6 text-blue-600" />
                        <h1 className="text-xl font-semibold text-gray-800">Company Details</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex cursor-pointer items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Companies</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4">
                                    {rowData?.images?.[0] && (
                                        <img
                                            src={rowData?.images[0]}
                                            alt={rowData?.company_name}
                                            className="w-40 h-24 object-contain rounded-lg bg-white"
                                        />
                                    )}
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">{rowData?.company_name}</h1>
                                        <p className="text-gray-600 mt-1 flex items-center">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            {rowData?.country}
                                        </p>
                                        {rowData?.contact_information?.address && (
                                            <p className="text-gray-600 mt-2 text-sm">
                                                {rowData?.contact_information.address}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="px-4 py-2 text-nowrap bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Send Message
                                    </button>
                                    {rowData?.contact_information?.phone && (
                                        <button className="px-4 py-2 text-nowrap bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                            Call Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
                            {rowData?.social_media_handles?.Google && (
                                <div className="grid grid-cols-1 gap-6">
                                    <iframe
                                        className="w-full h-72"
                                        src={`https://www.google.com/maps/embed?pb=${rowData?.social_media_handles?.Google}`}
                                        allowFullScreen=""
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderInfoItem(<Clock className="h-5 w-5 text-gray-400" />, "Operating Hours", rowData?.operating_hours)}
                                {renderInfoItem(<Calendar className="h-5 w-5 text-gray-400" />, "Year Established", rowData?.year_established)}
                                {renderInfoItem(<Users className="h-5 w-5 text-gray-400" />, "Number of Employees", rowData?.number_of_employees)}
                                {renderInfoItem(<Building className="h-5 w-5 text-gray-400" />, "Business Size", rowData?.business_size)}
                                {renderInfoItem(<DollarSign className="h-5 w-5 text-gray-400" />, "Annual Revenue", rowData?.annual_revenue)}
                                {renderInfoItem(<Briefcase className="h-5 w-5 text-gray-400" />, "Industry", rowData?.industry)}
                                {renderInfoItem(<FileText className="h-5 w-5 text-gray-400" />, "Registration Number", rowData?.registration_number)}
                                {renderInfoItem(<Award className="h-5 w-5 text-gray-400" />, "Certifications", rowData?.certifications)}
                            </div>
                        </div>

                        {(rowData?.key_products?.length > 0 || rowData?.key_services?.length > 0) && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Products & Services</h2>
                                <div className="space-y-4">
                                    {rowData?.key_products?.length > 0 && (
                                        <div>
                                            <h3 className="text-md font-medium text-gray-700 mb-2">Key Products</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {rowData?.key_products.map((product, index) => (
                                                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                                        {product}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {rowData?.key_services?.length > 0 && (
                                        <div>
                                            <h3 className="text-md font-medium text-gray-700 mb-2">Key Services</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {rowData?.key_services.map((service, index) => (
                                                    <span key={index} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {rowData?.recent_news_articles?.length > 0 && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent News</h2>
                                <div className="space-y-4">
                                    {rowData?.recent_news_articles.map((article, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <Newspaper className="h-5 w-5 text-gray-400 mt-1" />
                                            <div>
                                                <p className="text-gray-900">{article}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                            <div className="space-y-4">
                                {rowData?.contact_information?.phone && (
                                    <div className="flex items-center space-x-3">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Phone</p>
                                            <p className="text-gray-900">{rowData?.contact_information.phone}</p>
                                        </div>
                                    </div>
                                )}
                                {rowData?.contact_information?.email && (
                                    <div className="flex items-center space-x-3">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Email</p>
                                            <p className="text-gray-900">{rowData?.contact_information.email}</p>
                                        </div>
                                    </div>
                                )}
                                {rowData?.website_url && (
                                    <div className="flex items-center space-x-3">
                                        <Globe className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Website</p>
                                            <a
                                                href={rowData?.website_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 break-all"
                                            >
                                                {rowData?.website_url}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {rowData?.social_media_handles && Object.keys(rowData?.social_media_handles).length > 0 && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h2>
                                <div className="space-y-3">
                                    {Object.entries(rowData?.social_media_handles).map(([platform, url]) => {
                                        const Icon = socialIcons[platform] || null;
                                        return (
                                            <a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors w-full group"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    {Icon && <Icon className="h-5 w-5 text-gray-600" />}
                                                    <span className="text-gray-900">{platform}</span>
                                                </div>
                                                <span className="text-sm text-gray-500 group-hover:text-blue-600">Visit →</span>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {(rowData?.csr_initiatives || rowData?.sustainability_practices || rowData?.technological_adoption) && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
                                <div className="space-y-4">
                                    {renderInfoItem(<Award className="h-5 w-5 text-gray-400" />, "CSR Initiatives", rowData?.csr_initiatives)}
                                    {renderInfoItem(<Award className="h-5 w-5 text-gray-400" />, "Sustainability Practices", rowData?.sustainability_practices)}
                                    {renderInfoItem(<Award className="h-5 w-5 text-gray-400" />, "Technological Adoption", rowData?.technological_adoption)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;