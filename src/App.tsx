import { useState } from 'react';
import { ProjectCatalog } from './components/ProjectCatalog';
import { ProjectDetails } from './components/ProjectDetails';
import { ApplicationForm } from './components/ApplicationForm';
import { ApplicationSuccess } from './components/ApplicationSuccess';
import { Dashboard } from './components/Dashboard';
import { Documents } from './components/Documents';
import { DocumentViewer } from './components/DocumentViewer';
import { DocumentSign } from './components/DocumentSign';
import { VideoStream } from './components/VideoStream';
import { Chat } from './components/Chat';
import { FinalReport } from './components/FinalReport';
import { FinalSign } from './components/FinalSign';
import { Completion } from './components/Completion';

export type Screen = 
  | 'dashboard'
  | 'catalog'
  | 'project-details'
  | 'application-form'
  | 'application-success'
  | 'documents'
  | 'document-viewer'
  | 'document-sign'
  | 'video-stream'
  | 'chat'
  | 'final-report'
  | 'final-sign'
  | 'completion';

export type ProjectStatus = 
  | 'idle'
  | 'application-processing'
  | 'preparation'
  | 'construction'
  | 'acceptance'
  | 'warranty';

export interface Project {
  id: string;
  name: string;
  area: number;
  floors: number;
  bedrooms: number;
  price: number;
  image: string;
  description: string;
  features: string[];
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('catalog');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>('idle');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const selectProject = (project: Project) => {
    setSelectedProject(project);
    navigateTo('project-details');
  };

  const submitApplication = () => {
    setProjectStatus('application-processing');
    navigateTo('application-success');
  };

  const updateStatus = (status: ProjectStatus) => {
    setProjectStatus(status);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'catalog':
        return <ProjectCatalog onSelectProject={selectProject} onNavigateToDashboard={() => navigateTo('dashboard')} />;
      case 'project-details':
        return (
          <ProjectDetails
            project={selectedProject}
            onBack={() => navigateTo('catalog')}
            onOrder={() => navigateTo('application-form')}
            onChat={() => navigateTo('chat')}
          />
        );
      case 'application-form':
        return (
          <ApplicationForm
            project={selectedProject}
            onBack={() => navigateTo('project-details')}
            onSubmit={submitApplication}
          />
        );
      case 'application-success':
        return (
          <ApplicationSuccess
            onBackToCatalog={() => navigateTo('catalog')}
            onGoToDashboard={() => navigateTo('dashboard')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            status={projectStatus}
            onNavigateTo={navigateTo}
            onUpdateStatus={updateStatus}
          />
        );
      case 'documents':
        return (
          <Documents
            onBack={() => navigateTo('dashboard')}
            onSelectDocument={(docId) => {
              setSelectedDocument(docId);
              navigateTo('document-viewer');
            }}
          />
        );
      case 'document-viewer':
        return (
          <DocumentViewer
            documentId={selectedDocument}
            onBack={() => navigateTo('documents')}
            onSign={() => navigateTo('document-sign')}
            onChat={() => navigateTo('chat')}
          />
        );
      case 'document-sign':
        return (
          <DocumentSign
            onBack={() => navigateTo('document-viewer')}
            onSuccess={() => {
              updateStatus('construction');
              navigateTo('dashboard');
            }}
          />
        );
      case 'video-stream':
        return (
          <VideoStream
            onBack={() => navigateTo('dashboard')}
          />
        );
      case 'chat':
        return (
          <Chat
            onBack={() => {
              if (projectStatus === 'construction') {
                navigateTo('dashboard');
              } else {
                navigateTo('project-details');
              }
            }}
          />
        );
      case 'final-report':
        return (
          <FinalReport
            onBack={() => navigateTo('dashboard')}
            onSign={() => navigateTo('final-sign')}
          />
        );
      case 'final-sign':
        return (
          <FinalSign
            onBack={() => navigateTo('final-report')}
            onSuccess={() => navigateTo('completion')}
          />
        );
      case 'completion':
        return (
          <Completion
            onUpdateStatus={() => {
              updateStatus('warranty');
              navigateTo('dashboard');
            }}
          />
        );
      default:
        return <ProjectCatalog onSelectProject={selectProject} onNavigateToDashboard={() => navigateTo('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;
