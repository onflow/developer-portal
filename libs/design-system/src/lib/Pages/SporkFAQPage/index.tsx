import React from 'react';

import { ReactComponent as LeftChevron} from '../../../../images/arrows/chevron-left.svg'
import { Footer } from '../../Components';
import { Attribution } from '../../Components/Attribution/Attribution';
import { FAQ } from '../../Components/FAQ/FAQ';
import { InternalSubnav } from '../../Components/InternalSubnav';

const faqList = [
  {
    question: 'What is a spork',
    answer:
      'In the mature Flow, new nodes can be staked and un-staked as the protocol advances from epoch to epoch. However, we are not there yet. Hence, currently every couple of weeks we turn-off the network, update the identity list to include (and exclude) nodes and then turn the network back on again. We call this process a Spork.\n\nAlso, as Flow evolves, we are continuously adding new features and discovering and fixing bugs in the Flow node software. We also utilize a Spork as an opportunity to update the nodes with the latest releases.',
  },
  {
    question: 'How frequently do we spork',
    answer:
      'Lorem ipsum dolor sit amet. Et officia Quis sed vero corrupti hic fuga asperiores? Qui provident dolor hic pariatur deserunt cum mollitia rerum et tempore sint non fugiat dolor a molestiae deserunt.\n\nAut cumque internos et accusantium Quis aut obcaecati minus vel esse dolores? Sed molestiae unde a nulla amet et debitis laborum aut quidem tempora. Id fugit quia id quia distinctio in minima internos quo laboriosam possimus.\n\nCum optio autem ut velit rerum sed culpa omnis ut deleniti deleniti. Et amet quos labore quia ut ullam dolor et consequatur sint! Ut minus nostrum ea eius voluptates quo minima itaque At repellendus saepe et quasi vitae sit quia illo eos cumque omnis.',
  },
  {
    question: 'This is another question',
    answer:
      'Lorem ipsum dolor sit amet. Et officia Quis sed vero corrupti hic fuga asperiores? Qui provident dolor hic pariatur deserunt cum mollitia rerum et tempore sint non fugiat dolor a molestiae deserunt.\n\nAut cumque internos et accusantium Quis aut obcaecati minus vel esse dolores? Sed molestiae unde a nulla amet et debitis laborum aut quidem tempora. Id fugit quia id quia distinctio in minima internos quo laboriosam possimus.\n\nCum optio autem ut velit rerum sed culpa omnis ut deleniti deleniti. Et amet quos labore quia ut ullam dolor et consequatur sint! Ut minus nostrum ea eius voluptates quo minima itaque At repellendus saepe et quasi vitae sit quia illo eos cumque omnis.',
  },
  {
    question: 'This is another question',
    answer:
      'Lorem ipsum dolor sit amet. Et officia Quis sed vero corrupti hic fuga asperiores? Qui provident dolor hic pariatur deserunt cum mollitia rerum et tempore sint non fugiat dolor a molestiae deserunt.\n\nAut cumque internos et accusantium Quis aut obcaecati minus vel esse dolores? Sed molestiae unde a nulla amet et debitis laborum aut quidem tempora. Id fugit quia id quia distinctio in minima internos quo laboriosam possimus.\n\nCum optio autem ut velit rerum sed culpa omnis ut deleniti deleniti. Et amet quos labore quia ut ullam dolor et consequatur sint! Ut minus nostrum ea eius voluptates quo minima itaque At repellendus saepe et quasi vitae sit quia illo eos cumque omnis.',
  },
];

export function SporkFAQPage() {
  return (
    <div className='bg-zinc-50 md:bg-white'>
      <div className="relative z-20 h-24 w-full shadow-lg">header nav</div>
      <InternalSubnav current='Spork FAQ'/>
      <main className="container mx-auto md:pt-16 pb-48">
        <div className="grid grid-cols-1 md:flex items-start pb-6 md:pb-12">
          <div className="grow order-2">
            <h1 className='text-h1 leading-snug font-bold font-termina pb-14 md:pb-6'>Spork FAQ</h1>
            <Attribution
              updatedDate="23/3/2022"
              authorIcon="https://avatars.githubusercontent.com/u/62387156?s=64&v=4"
              authorName="@maxxP"
              otherAuthorsCount={12}
              readMinutes={4}
              difficulty='Beginners'
            />
          </div>
          <div className='order-1 md:order-2'>
            <button className='flex items-center md:border border-primary-blue py-4 md:px-5 rounded-lg text-primary-blue'><span><LeftChevron className='stroke-primary-blue'/></span>Back to Network</button>
          </div>
        </div>
        <FAQ faqList={faqList} variation="large" />
      </main>
      <Footer/>
    </div>
  );
}
