import { ReactComponent as Bug } from '../../../../images/page/bug.svg';
import { ReactComponent as Community } from '../../../../images/page/community.svg';
import { ReactComponent as Concepts } from '../../../../images/page/concepts.svg';
import { ReactComponent as Funding } from '../../../../images/page/funding.svg';
import { ReactComponent as GettingStarted } from '../../../../images/page/get-started.svg';
import { ReactComponent as Learn } from '../../../../images/page/learn.svg';
import { ReactComponent as Tools } from '../../../../images/page/tools.svg';

export type ContentNavigationIconProps = {
  icon:
    | 'bug'
    | 'community'
    | 'concepts'
    | 'funding'
    | 'get-started'
    | 'learn'
    | 'tools';
};

export function ContentNavigationIcon({ icon }: ContentNavigationIconProps) {
  switch (icon) {
    case 'bug':
      return <Bug />;
    case 'community':
      return <Community />;
    case 'concepts':
      return <Concepts />;
    case 'funding':
      return <Funding />;
    case 'get-started':
      return <GettingStarted />;
    case 'learn':
      return <Learn />;
    case 'tools':
      return <Tools />;
    default:
      throw new Error('Icon type not recognized');
  }
}
