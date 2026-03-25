import PageTitle from '@app/components/Common/PageTitle';
import MediaSlider from '@app/components/MediaSlider';
import { HeartIcon, SparklesIcon, StarIcon } from '@heroicons/react/24/solid';
import type { NextPage } from 'next';
import { useIntl } from 'react-intl';
import defineMessages from '@app/utils/defineMessages';

const messages = defineMessages('pages.FamilyCenter', {
  familycenter: 'Family Media Request Center',
  description: 'Discover and request family-friendly content for everyone to enjoy!',
  popularfamily: 'Popular Family Movies',
  familytv: 'Popular Family TV Shows',
  animatedmovies: 'Animated Movies',
  animatedseries: 'Animated Series',
  kidsfavorites: 'Kids Favorites',
});

const FamilyCenter: NextPage = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle title={intl.formatMessage(messages.familycenter)} />

      {/* Hero Header with Vibrant Gradient */}
      <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="relative z-10">
          <div className="mb-4 flex items-center space-x-3">
            <HeartIcon className="h-12 w-12 animate-pulse text-white drop-shadow-lg" />
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              {intl.formatMessage(messages.familycenter)}
            </h1>
            <SparklesIcon className="h-10 w-10 animate-pulse text-yellow-300 drop-shadow-lg" />
          </div>
          <p className="text-xl text-white/90 drop-shadow">
            {intl.formatMessage(messages.description)}
          </p>
        </div>

        {/* Decorative animated elements */}
        <div className="absolute right-8 top-8 animate-bounce">
          <StarIcon className="h-16 w-16 text-yellow-300 opacity-60" />
        </div>
        <div className="absolute bottom-8 right-24 animate-pulse">
          <HeartIcon className="h-12 w-12 text-pink-300 opacity-60" />
        </div>
      </div>

      {/* Content Sliders */}
      <div className="space-y-6">
        <MediaSlider
          sliderKey="family-movies"
          title={intl.formatMessage(messages.popularfamily)}
          url="/api/v1/discover/movies"
          extraParams="genre=10751&sortBy=popularity.desc"
          linkUrl="/discover/movies?genre=10751"
        />

        <MediaSlider
          sliderKey="family-tv"
          title={intl.formatMessage(messages.familytv)}
          url="/api/v1/discover/tv"
          extraParams="genre=10751&sortBy=popularity.desc"
          linkUrl="/discover/tv?genre=10751"
        />

        <MediaSlider
          sliderKey="animated-movies"
          title={intl.formatMessage(messages.animatedmovies)}
          url="/api/v1/discover/movies"
          extraParams="genre=16&sortBy=popularity.desc"
          linkUrl="/discover/movies?genre=16"
        />

        <MediaSlider
          sliderKey="animated-series"
          title={intl.formatMessage(messages.animatedseries)}
          url="/api/v1/discover/tv"
          extraParams="genre=16&sortBy=popularity.desc"
          linkUrl="/discover/tv?genre=16"
        />

        <MediaSlider
          sliderKey="kids-movies"
          title={intl.formatMessage(messages.kidsfavorites)}
          url="/api/v1/discover/movies"
          extraParams="genre=10762&sortBy=popularity.desc"
          linkUrl="/discover/movies?genre=10762"
        />
      </div>
    </>
  );
};

export default FamilyCenter;
