import LinkList from './components/LinkItem';

const Home = () => {

    const handleClick = async () => {
        try {
            // Click F12 in the browser to see the console.log
            const response = await fetch('http://localhost:3001/api/delete-image/image.jpg', {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            console.log('Do Something1');
        } catch (error) {
            console.error('Error:', error);
        }
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
