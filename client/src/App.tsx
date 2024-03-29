import { Route, Routes } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import PublicLayout from '@/components/PublicLayout';
import RegisterPage from '@/pages/auth/RegisterPage';
import Welcome from '@/pages/Welcome';
import Layout from '@/components/Layout';
import JournalEntry from '@/pages/JournalEntry';
import { ProtectedRoute } from './components/protected-route';
import ViewJournal from './pages/ViewJournal';
import RandomEntry from './pages/RandomEntry';

function App() {
  return (
    <Routes>
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path='auth'>
          <Route path='' element={<LoginPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/home' element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path='journal/:journalId' element={<ViewJournal />} />
          <Route path='journal/random-entry' element={<RandomEntry />} />
          <Route path='journals/new' element={<JournalEntry />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
