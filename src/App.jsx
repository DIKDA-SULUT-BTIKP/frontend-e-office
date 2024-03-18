import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AddLetterPage from "./pages/fo/AddLetterPage";
import Dashboard from "./pages/Dashboard";
import ProcessKadisPage from "./pages/kadis/ProcessKadisPage";
import NotFound from "./pages/NotFound";
import LettersPageFO from "./pages/fo/LettersPage";
import DashboardFOPage from "./pages/fo/DashboardFOPage";
import DashboardKadisPage from "./pages/kadis/DashboardKadisPage";
import LettersNotDispositionPage from "./pages/kadis/LettersNotDispositionPage";
import LettersNotProcessPage from "./pages/kadis/LettersNotProcessPage";
import LettersProcessPage from "./pages/kadis/LettersProcessPage";
import LettersCompletedPage from "./pages/kadis/LettersCompletedPage";
import LettersDispositionedKadisPage from "./pages/kadis/LettersDispositionedKadisPage";
import PTKPage from "./pages/kadis/ptk/PTKPage";
import PTKDetailPage from "./pages/kadis/ptk/PTKDetailPage";
import PTKRejectedPage from "./pages/kadis/ptk/PTKRejectedPage";
import PTKWaitingPage from "./pages/kadis/ptk/PTKWaitingPage";
//Sekretaris
import DashboardSecretaryPage from "./pages/secretary/DashboardSecretaryPage";
import LetterDetailKadis from "./pages/kadis/LetterDetailKadis";
import ProcessSecretaryPage from "./pages/secretary/ProcessSecretaryPage";
import LettersNotProcessSecretaryPage from "./pages/secretary/LettersNotProcessSecretaryPage";
import LettersProcessSecretaryPage from "./pages/secretary/LettersProcessSecretaryPage";
import LettersCompletedSecretaryPage from "./pages/secretary/LettersCompletedSecretaryPage";
import LettersDispositionedSecretaryPage from "./pages/secretary/LettersDispositionedSecretaryPage";
//Division
import DashboardDivisionPage from "./pages/division/DashboardDivisionPage";
import LettersNotProcessDivisionPage from "./pages/division/LettersNotProcessDivisionPage";
import LettersProcessDivisionPage from "./pages/division/LettersProcessDivisionPage";
import LettersCompletedDivisionPage from "./pages/division/LettersCompletedDivisionPage";
import LettersDetailDivisionPage from "./pages/division/LettersDetailDivisionPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Front Office */}
        <Route path="/fo/dashboard" element={<DashboardFOPage />} />
        <Route path="/fo/letter/add" element={<AddLetterPage />} />
        <Route path="/fo/letters" element={<LettersPageFO />} />
        {/* Kadis */}
        <Route path="/kadis/dashboard" element={<DashboardKadisPage />} />
        <Route
          path="/kadis/letters/not-dispositioned"
          element={<LettersNotDispositionPage />}
        />
        <Route
          path="/kadis/letters/not-process"
          element={<LettersNotProcessPage />}
        />
        <Route
          path="/kadis/letters/in-process"
          element={<LettersProcessPage />}
        />
        <Route
          path="/kadis/letters/completed"
          element={<LettersCompletedPage />}
        />
        <Route
          path="/kadis/letter/process/:id"
          element={<ProcessKadisPage />}
        />
        <Route
          path="/kadis/letter/detail/:id"
          element={<LetterDetailKadis />}
        />
        <Route
          path="/kadis/letters/dispositioned"
          element={<LettersDispositionedKadisPage />}
        />
        <Route path="/kadis/ptk/waiting" element={<PTKWaitingPage />} />
        <Route path="/kadis/ptk/rejected" element={<PTKRejectedPage />} />
        <Route path="/kadis/ptk/accepted" element={<PTKPage />} />

        <Route path="/kadis/ptk/detail/:id" element={<PTKDetailPage />} />
        {/* Secretary */}
        <Route
          path="/secretary/dashboard"
          element={<DashboardSecretaryPage />}
        />
        <Route
          path="/secretary/letter/process/:id"
          element={<ProcessSecretaryPage />}
        />
        <Route
          path="/secretary/letters/not-process"
          element={<LettersNotProcessSecretaryPage />}
        />
        <Route
          path="/secretary/letters/process"
          element={<LettersProcessSecretaryPage />}
        />
        <Route
          path="/secretary/letters/completed"
          element={<LettersCompletedSecretaryPage />}
        />
        <Route
          path="/secretary/letters/dispositioned"
          element={<LettersDispositionedSecretaryPage />}
        />
        {/* Division */}
        <Route path="/division/dashboard" element={<DashboardDivisionPage />} />
        <Route
          path="/division/letter/process/:id"
          element={<LettersDetailDivisionPage />}
        />
        <Route
          path="/division/letters/not-process"
          element={<LettersNotProcessDivisionPage />}
        />
        <Route
          path="/division/letters/in-process"
          element={<LettersProcessDivisionPage />}
        />
        <Route
          path="/division/letters/completed"
          element={<LettersCompletedDivisionPage />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
