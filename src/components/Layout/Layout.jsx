/* eslint-disable react/prop-types */
import Header from "../Header"
import Footer from "./Footer"

const Layout = ({ children }) => {

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <Header />
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Layout



