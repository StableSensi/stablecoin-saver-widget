    import { createRoot } from 'react-dom/client';
import './index.css';
import SavingsCalculator from './components/SavingsCalculator';

// Create a minimal wrapper that only includes what's necessary for the widget
function WidgetRoot() {
  return (
    <div className="w-full h-full bg-widget-bg p-4">
      <SavingsCalculator />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<WidgetRoot />);
