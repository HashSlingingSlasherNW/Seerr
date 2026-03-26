import DiscoverFamily from '@app/components/Discover/DiscoverFamily';
import type { NextPage } from 'next';

const DiscoverFamilyPage: NextPage = () => {
  return (
    <div className="relative -mx-4 overflow-hidden px-4 pb-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-fuchsia-500/30 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute left-[-6rem] top-1/3 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl animate-[bounce_9s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-6rem] right-[-5rem] h-80 w-80 rounded-full bg-amber-400/20 blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/70 via-purple-900/50 to-blue-950/80" />
      </div>
      <DiscoverFamily />
    </div>
  );
};

export default DiscoverFamilyPage;
