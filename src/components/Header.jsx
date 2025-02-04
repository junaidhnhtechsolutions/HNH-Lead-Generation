import { Building2 } from "lucide-react";
import { Link } from "react-router";

const Header = () => {

    return (
        <>
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Link to={'/'} className="flex items-center space-x-2">
                        <Building2 className="h-6 w-6 text-blue-600" />
                        <h1 className="text-xl font-semibold text-gray-800">HNH Lead Generation Portal</h1>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Header
