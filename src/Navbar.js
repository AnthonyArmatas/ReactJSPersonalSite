const Navbar = () => {
    const title = "Anthony's Links";
    return ( 
        <nav className="navbar">
            <h1>{title}</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/create" style={{ 
                color: 'white', 
                backgroundColor: '#517dd6',
                borderRadius: '8px' 
                }}>Second Site (TBD)</a>
            </div>

        </nav>
     );
}
 
export default Navbar;