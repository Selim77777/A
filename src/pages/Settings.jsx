import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { User, Save, AlertTriangle, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';

const Settings = () => {
  const { user, updateUserName, resetProgress } = useUser();
  const [name, setName] = useState(user.name);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      updateUserName(name.trim());
      toast.success('Your name has been updated!');
    }
  };

  const handleReset = () => {
    resetProgress();
    setIsResetModalOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-lg text-gray-600 mb-8">Manage your account settings and preferences.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-8"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your name"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="submit"
              className="btn-primary inline-flex items-center space-x-2"
              disabled={name === user.name || !name.trim()}
            >
              <Save className="h-5 w-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Danger Zone
        </h2>
        <div className="card p-6 border-red-200 bg-red-50">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900">Reset Your Progress</h3>
              <p className="text-sm text-red-700 mt-1">This action is irreversible. All your points, achievements, and lesson history will be permanently deleted.</p>
            </div>
            <button
              onClick={() => setIsResetModalOpen(true)}
              className="btn-primary bg-red-600 hover:bg-red-700 mt-4 sm:mt-0 sm:ml-4 flex-shrink-0"
            >
              Reset Progress
            </button>
          </div>
        </div>
      </motion.div>

      <Modal isOpen={isResetModalOpen} onClose={() => setIsResetModalOpen(false)} title="Are you absolutely sure?">
        <p className="text-gray-600 mb-6">This will permanently delete all your progress. This action cannot be undone.</p>
        <div className="flex justify-end gap-4">
          <button onClick={() => setIsResetModalOpen(false)} className="btn-secondary">Cancel</button>
          <button onClick={handleReset} className="btn-primary bg-red-600 hover:bg-red-700 inline-flex items-center space-x-2">
            <RotateCcw className="h-4 w-4" />
            <span>Yes, reset my progress</span>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;