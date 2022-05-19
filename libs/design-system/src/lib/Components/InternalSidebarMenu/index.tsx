import {
  Menu,
  MenuButton,
  MenuItems,
  MenuLink,
  MenuList,
} from '@reach/menu-button';
import { useRef } from 'react';
import { ReactComponent as Close } from '../../Images/action/close.svg';
import { ReactComponent as ChevronDown } from '../../Images/arrows/chevron-down.svg';
import { ReactComponent as CadenceIcon } from '../../Images/tools/tool-cadence.svg';
import { ReactComponent as CliIcon } from '../../Images/tools/tool-cli.svg';
import { ReactComponent as EmulatorIcon } from '../../Images/tools/tool-emulator.svg';
import { ReactComponent as FclIcon } from '../../Images/tools/tool-fcl.svg';
import { ReactComponent as PortIcon } from '../../Images/tools/tool-port.svg';
import { ReactComponent as TestingIcon } from '../../Images/tools/tool-testing.svg';
import { ReactComponent as VsCodeIcon } from '../../Images/tools/tool-vscode.svg';

type SectionType =
  | 'emulator'
  | 'vscode'
  | 'port'
  | 'cli'
  | 'testing'
  | 'fcl'
  | 'cadence';

type Section = {
  name: string;
  icon: React.FunctionComponent;
};

export type Version = {
  name: string;
  href: string;
};

type SectionGroup = { name: string; sections: SectionType[] };

export type InternalSidebarMenuProps = {
  selectedSectionType: SectionType;
};

const SIDEBAR_SECTIONS: Record<SectionType, Section> = {
  emulator: { name: 'Emulator', icon: EmulatorIcon },
  vscode: { name: 'VS Code Extension', icon: VsCodeIcon },
  port: { name: 'Port', icon: PortIcon },
  cli: { name: 'CLI', icon: CliIcon },
  testing: { name: 'Testing Library', icon: TestingIcon },
  fcl: { name: 'Flow Client Library', icon: FclIcon },
  cadence: { name: 'Cadence', icon: CadenceIcon },
};

const SIDEBAR_SECTION_GROUPS: SectionGroup[] = [
  {
    name: 'Switch tool',
    sections: ['emulator', 'vscode', 'port', 'cli', 'testing'],
  },
  {
    name: 'Concepts',
    sections: ['fcl', 'cadence'],
  },
];

function Group({ group }: { group: SectionGroup }) {
  return (
    <>
      {group.sections.map((section: SectionType) => {
        const SelectedGroupSectionIcon = SIDEBAR_SECTIONS[section].icon;
        return (
          <div className="border-b border-b-primary-gray-100 last:border-none md:border-none md:p-0">
            <MenuLink
              key={section}
              onSelect={() => null}
              href="#"
              className="flex items-center px-1 py-2 text-center text-sm dark:shadow-2xl-dark md:h-[7.5rem] md:w-[7rem] md:flex-col md:rounded-lg md:px-4 md:py-5 md:shadow-2xl"
            >
              <div className="mr-2 scale-75 md:mr-0 md:-mt-2">
                <SelectedGroupSectionIcon />
              </div>
              <div className="flex items-center justify-center font-bold text-primary-gray-400 dark:text-primary-gray-100 md:h-[2rem] md:text-sm md:font-normal">
                {SIDEBAR_SECTIONS[section].name}{' '}
              </div>
            </MenuLink>
          </div>
        );
      })}
    </>
  );
}

export function InternalSidebarMenu({
  selectedSectionType,
}: InternalSidebarMenuProps) {
  const parentRef = useRef<HTMLButtonElement | null>(null);
  const SelectedIcon = SIDEBAR_SECTIONS[selectedSectionType].icon;
  return (
    <div className="flex items-center">
      <Menu>
        <MenuButton
          ref={parentRef}
          className="mb-4 flex min-w-[15rem] items-center rounded-lg pr-3 text-sm shadow-2xl  hover:text-primary-gray-300 dark:bg-black dark:text-white dark:text-primary-gray-200 dark:shadow-2xl-dark dark:hover:text-primary-gray-100"
        >
          <div className="scale-50">
            <SelectedIcon />
          </div>
          <div className="font-bold text-small">
            {SIDEBAR_SECTIONS[selectedSectionType].name}
          </div>
          <div className="pl-2 ml-auto">
            <ChevronDown />
          </div>
        </MenuButton>
        <MenuList className="relative mt-4 mr-2 min-w-[17rem] max-w-[34rem] overflow-y-auto rounded-lg bg-white px-4 py-2 shadow-2xl dark:bg-misc-off-black-bg dark:shadow-2xl-dark md:px-6 md:py-4">
          {SIDEBAR_SECTION_GROUPS.map((group, index) => (
            <div key={group.name}>
              <MenuItems className="mb-2 md:mb-6 md:divide-y md:divide-solid dark:md:divide-primary-gray-300">
                <div className="flex items-center my-2">
                  <div className="mr-auto font-bold leading-none dark:text-primary-gray-100 md:text-xl md:font-semibold">
                    {group.name}
                  </div>
                  {index === 0 && (
                    <button
                      className="hover:opacity-75"
                      onClick={() => parentRef.current?.focus()}
                      aria-label="Close"
                    >
                      <Close />
                    </button>
                  )}
                </div>
                <div className="flex flex-col py-4 md:flex-row md:flex-wrap md:gap-4 md:py-6">
                  <Group group={group} />
                </div>
              </MenuItems>
            </div>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}
