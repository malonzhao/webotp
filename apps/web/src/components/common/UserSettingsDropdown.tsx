import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ArrowRightOnRectangleIcon, KeyIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../../stores/auth.store';

interface UserSettingsDropdownProps {
  onShowUserSettings: () => void;
  onShowPlatformsManagement: () => void;
}

const UserSettingsDropdown: React.FC<UserSettingsDropdownProps> = ({ onShowUserSettings, onShowPlatformsManagement }) => {
  const { t } = useTranslation();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600">
          {t('common.settings')}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onShowPlatformsManagement}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'
                  } flex w-full items-center px-4 py-2 text-sm`}
                >
                  <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  {t('dashboard.platformManagement')}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onShowUserSettings}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'
                  } flex w-full items-center px-4 py-2 text-sm`}
                >
                  <KeyIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  {t('auth.userSettings')}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'
                  } flex w-full items-center px-4 py-2 text-sm`}
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  {t('auth.logout')}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserSettingsDropdown;
