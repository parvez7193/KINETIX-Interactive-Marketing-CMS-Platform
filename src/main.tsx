import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class AppErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error?.message || 'An unexpected application error occurred.' };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('KINETIX application render failed:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#f5f5f5', padding: '48px 24px', fontFamily: 'system-ui, sans-serif' }}>
          <section style={{ maxWidth: 680, margin: '10vh auto', padding: 32, border: '1px solid #404040', borderRadius: 16, background: '#171717' }}>
            <p style={{ color: '#fbbf24', fontSize: 12, letterSpacing: 2, fontWeight: 700 }}>KINETIX · APPLICATION ERROR</p>
            <h1 style={{ fontSize: 28, margin: '12px 0' }}>The page could not be rendered.</h1>
            <p style={{ color: '#a3a3a3', lineHeight: 1.6 }}>A browser-side error interrupted the application. Reload the page to try again. If the problem continues, share this error message with support.</p>
            <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', color: '#fca5a5', background: '#0a0a0a', padding: 16, borderRadius: 8, marginTop: 20 }}>{this.state.message}</pre>
            <button onClick={() => window.location.reload()} style={{ marginTop: 20, padding: '10px 16px', borderRadius: 8, background: '#fbbf24', color: '#171717', fontWeight: 700, cursor: 'pointer' }}>Reload website</button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('KINETIX root element was not found in index.html.');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>
);
