import LinkList from './components/LinkItem';

const Home = () => {

    const handleClick = () => {
        // Click f12 in browser to see this console.log
        console.log('Do Something1');
    }

    return ( 
        <div className="home"> 
            <LinkList />
            <div className="addLinkBtn">
                <button onClick={() => handleClick()} >
                    <img src="/images/AddSign.png" alt="Add A link" />
                </button>
            </div>
        </div>
     );
}
 
export default Home;