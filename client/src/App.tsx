import { Route, Routes } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import PublicLayout from '@/components/PublicLayout';
import RegisterPage from '@/pages/auth/RegisterPage';
import Welcome from '@/pages/Welcome';
import JournalList from '@/pages/JournalList';
import Layout from '@/components/Layout';
import JournalEntry from '@/pages/JournalEntry';

function App() {
  return (
    <Routes>
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path='auth'>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>
      </Route>
      <Route path='/home' element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path='journals' element={<JournalList />} />
        <Route path='journals/new' element={<JournalEntry />} />
      </Route>
    </Routes>
  );
}

export default App;
