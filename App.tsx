import React, { useState, createContext, useContext, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { LoadingScreen } from './components/LoadingScreen';
import { PageTransition, SlideTransition, ScaleTransition } from './components/PageTransition';
import { Landing } from './components/Landing';
import { AuthPages } from './components/AuthPages';
import { FreelancerDashboard } from './components/FreelancerDashboard';
import { ClientDashboard } from './components/ClientDashboard';
import { FindProjects } from './components/FindProjects';
import { PostProject } from './components/PostProject';
import { ViewApplications } from './components/ViewApplications';
import { AppliedProjects } from './components/AppliedProjects';
import { ProfilePages, Settings, PaymentFlow, Messages, AIAssistant, ProjectDetails } from './components/AdditionalPages';

// Context for app state management
interface AppState {
  currentPage: string;
  user: {
    isLoggedIn: boolean;
    role: 'freelancer' | 'client' | null;
    name: string;
    email: string;
    avatar: string;
  };
  isLoading: boolean;
  setCurrentPage: (page: string) => void;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export default function App() {
  const [currentPage, setCurrentPageState] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [user, setUser] = useState({
    isLoggedIn: false,
    role: null as 'freelancer' | 'client' | null,
    name: '',
    email: '',
    avatar: ''
  });

  // Handle initial loading
  useEffect(() => {
    const loadApp = async () => {
      // Simulate app initialization
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsLoading(false);
    };

    loadApp();
  }, []);

  // Enhanced page transition with loading state
  const setCurrentPage = async (page: string) => {
    if (page === currentPage) return;
    
    setIsPageTransitioning(true);
    
    // Simulate page loading time
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCurrentPageState(page);
    setIsPageTransitioning(false);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const appState: AppState = {
    currentPage,
    user,
    isLoading: isPageTransitioning,
    setCurrentPage,
    setUser,
    setLoading
  };

  // Get appropriate transition component based on page type
  const getTransitionComponent = () => {
    const authPages = ['auth', 'login', 'register', 'forgot-password', 'otp-verification'];
    const modalPages = ['ai-assistant', 'messages'];
    const slidePages = ['post-project', 'find-projects'];

    if (authPages.includes(currentPage)) {
      return SlideTransition;
    } else if (modalPages.includes(currentPage)) {
      return ScaleTransition;
    } else if (slidePages.includes(currentPage)) {
      return SlideTransition;
    } else {
      return PageTransition;
    }
  };

  const renderPage = () => {
    const TransitionComponent = getTransitionComponent();
    
    const pageContent = (() => {
      switch (currentPage) {
        case 'landing':
          return <Landing />;
        case 'auth':
        case 'login':
        case 'register':
        case 'forgot-password':
        case 'otp-verification':
          return <AuthPages />;
        case 'freelancer-dashboard':
          return <FreelancerDashboard />;
        case 'client-dashboard':
          return <ClientDashboard />;
        case 'find-projects':
          return <FindProjects />;
        case 'post-project':
          return <PostProject />;
        case 'view-applications':
          return <ViewApplications />;
        case 'applied-projects':
          return <AppliedProjects />;
        case 'profile':
        case 'public-profile':
        case 'profile-settings':
          return <ProfilePages />;
        case 'settings':
          return <Settings />;
        case 'payment':
        case 'payment-success':
        case 'payment-failure':
          return <PaymentFlow />;
        case 'messages':
          return <Messages />;
        case 'ai-assistant':
          return <AIAssistant />;
        case 'project-details':
          return <ProjectDetails />;
        default:
          return <Landing />;
      }
    })();

    return (
      <TransitionComponent pageKey={currentPage}>
        {pageContent}
      </TransitionComponent>
    );
  };

  return (
    <AppContext.Provider value={appState}>
      <div className="min-h-screen bg-background">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <div key="app">
              {renderPage()}
              
              {/* Page transition loading indicator */}
              <AnimatePresence>
                {isPageTransitioning && (
                  <div className="fixed top-0 left-0 right-0 z-50">
                    <div className="h-1 bg-gradient-to-r from-[#4DAFFF] to-[#FF4D6D] animate-pulse" />
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}