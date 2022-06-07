import { Dialog } from '@headlessui/react';
import clsx from 'clsx';
import { useState, ReactNode } from 'react';
import { ReactComponent as CollapseIcon } from '../../../../images/content/collapse.svg';
import { ReactComponent as FileCodeIcon } from '../../../../images/content/file-code.svg';
import { ReactComponent as FileCopyIcon } from '../../../../images/content/file-copy.svg';
import { ReactComponent as HashIcon } from '../../../../images/content/hash.svg';
import { ReactComponent as ScreenFullIcon } from '../../../../images/content/screen-full.svg';

// TODO: Cadence and dark mode MDX code highlighting

export type InternalCodeblockProps = {
  tall?: boolean;
  rawText: string;
  children: React.ReactNode;
};

function Header({
  isOpen,
  closeDialog,
  openDialog,
  onCopy,
}: {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  onCopy: () => void;
}) {
  return (
    <div className="flex min-h-[50px] items-center rounded-tl-lg rounded-tr-lg bg-white px-2 text-primary-gray-300 dark:bg-primary-gray-dark dark:text-primary-gray-200">
      <div className="p-2">
        <HashIcon />
      </div>
      <div className="p-2">
        <FileCodeIcon />
      </div>
      <div className="ml-auto text-primary-blue">
        <button
          type="button"
          className="p-2 ml-auto hover:opacity-75"
          title="Copy to clipboard"
          aria-label="Copy to clipboard"
          onClick={onCopy}
        >
          <FileCopyIcon />
        </button>
        <button
          className="p-2 cursor-pointer hover:opacity-75"
          title={isOpen ? 'Collapse' : 'Expand'}
          onClick={isOpen ? closeDialog : openDialog}
        >
          {isOpen ? <CollapseIcon /> : <ScreenFullIcon />}
        </button>
      </div>
    </div>
  );
}

function Code({
  innerClasses,
  children,
}: {
  innerClasses: string;
  children: ReactNode;
}) {
  return (
    <pre
      className="flex h-full w-full overflow-hidden rounded-bl-lg rounded-br-lg bg-[#FDFDFD] font-mono text-xs dark:bg-[#111111] dark:!text-white"
      style={{
        boxShadow: 'rgb(0 0 0 / 3%) 0px 11px 15px 0px inset',
      }}
    >
      <div className={clsx('overflow-auto p-3', innerClasses)}>{children}</div>
    </pre>
  );
}

export function InternalCodeblock({
  tall,
  rawText,
  children,
}: InternalCodeblockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onCopy = () => navigator.clipboard.writeText(rawText);

  return (
    <div>
      <div className="text-xs border rounded-lg border-primary-gray-100 dark:border-0">
        <Header
          isOpen={isOpen}
          closeDialog={() => setIsOpen(false)}
          openDialog={() => setIsOpen(true)}
          onCopy={onCopy}
        />
        <Code
          children={children}
          innerClasses={tall ? 'max-h-[280px]' : 'max-h-[130px]'}
        />
      </div>
      <div>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <Dialog.Panel>
            <Dialog.Title>Deactivate account</Dialog.Title>
            <Dialog.Description>
              This will permanently deactivate your account
            </Dialog.Description>

            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>

            <button onClick={() => setIsOpen(true)}>Deactivate</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </Dialog.Panel>
        </Dialog>
      </div>
    </div>
  );
}
