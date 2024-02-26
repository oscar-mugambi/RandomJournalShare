import { Link } from 'react-router-dom';

const LayoutHeader = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <nav className='bg-gray-800'>
      <div className='px-10'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link
              to='/home'
              className='text-2xl font-bold text-white hover:text-gray-300 transition duration-150 ease-in-out'
            >
              Random Journal
            </Link>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                <Link
                  to='/home/journals/new'
                  className='px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 transition duration-150 ease-in-out'
                >
                  New Entry
                </Link>
                <Link
                  to='/home'
                  className='px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 transition duration-150 ease-in-out'
                >
                  My Entries
                </Link>
                <Link
                  to='/home/journal/random-entry'
                  className='px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 transition duration-150 ease-in-out'
                >
                  Random Entry
                </Link>
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            <button
              onClick={handleLogout}
              className='ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LayoutHeader;
