import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateWorkflow from './components/CreateWorkflow';
import { WorkflowList } from './components/WorkflowList';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ExecutionHistory from './pages/ExecutionHistory';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/workflows" element={<WorkflowList />} />
          <Route path="/workflow/new" element={<CreateWorkflow />} />
          <Route path="/workflow/:workflowId" element={<CreateWorkflow />} />
          <Route path="/workflow/:workflowId/execution" element={<ExecutionHistory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;