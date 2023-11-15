import LinkItem from './LinkItem';
import links from './links';

const Home = () => {

    const handleClick = () => {
        // Click f12 in browser to see this console.log
        console.log('Do Something1');
    }

    return ( 
        <div className="home"> 
            <div className="link-list">
                {links.map(link => (
                <LinkItem key={link.id} title={link.title} url={link.url} />
                ))}
            </div>
            <button onClick={() => handleClick()} >DoIt</button>
        </div>
     );
}
 
export default Home;