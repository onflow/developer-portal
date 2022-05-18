import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuList,
} from '@reach/menu-button';
import clsx from 'clsx';
import { ReactComponent as Check } from '../../Images/action/check.svg';
import { ReactComponent as ChevronDown } from '../../Images/arrows/chevron-down.svg';

export type Version = {
  name: string;
  href: string;
};

export type InternalVersionSelectProps = {
  selectedVersionName: string;
  versions: Version[];
};

export function InternalVersionSelect({
  selectedVersionName,
  versions,
}: InternalVersionSelectProps) {
  return (
    <div className="flex items-center">
      <Menu>
        <MenuButton className="flex items-center text-sm text-primary-gray-300 hover:text-primary-gray-400 dark:text-primary-gray-200 dark:hover:text-primary-gray-100">
          Version {selectedVersionName}
          <div className="scale-75">
            <ChevronDown />
          </div>
        </MenuButton>
        <MenuList className="z-10 max-h-[15rem] min-w-[12rem] overflow-y-auto rounded-lg bg-white shadow-2xl">
          <MenuItems className="divide-y divide-solid">
            {versions.map((version) => {
              const isSelected = selectedVersionName === version.name;
              return (
                <MenuItem
                  as="a"
                  key={version.name}
                  onSelect={() => null}
                  href="#"
                  className={clsx(
                    'flex flex-1 flex-row items-center px-4 py-5 text-sm',
                    isSelected
                      ? 'text-primary-gray-400'
                      : 'text-primary-gray-300'
                  )}
                >
                  Version {version.name}
                  {isSelected && (
                    <div className="ml-auto scale-75 text-primary-green">
                      <Check />
                    </div>
                  )}
                </MenuItem>
              );
            })}
          </MenuItems>
        </MenuList>
      </Menu>
    </div>
  );
}
