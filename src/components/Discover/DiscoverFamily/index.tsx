import Button from '@app/components/Common/Button';
import ListView from '@app/components/Common/ListView';
import PageTitle from '@app/components/Common/PageTitle';
import type { FilterOptions } from '@app/components/Discover/constants';
import {
  countActiveFilters,
  prepareFilterValues,
} from '@app/components/Discover/constants';
import FilterSlideover from '@app/components/Discover/FilterSlideover';
import useDiscover from '@app/hooks/useDiscover';
import { useUpdateQueryParams } from '@app/hooks/useUpdateQueryParams';
import ErrorPage from '@app/pages/_error';
import defineMessages from '@app/utils/defineMessages';
import { BarsArrowDownIcon, FunnelIcon } from '@heroicons/react/24/solid';
import { SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';
import type { SortOptions as TMDBSortOptions } from '@server/api/themoviedb';
import type { MovieResult } from '@server/models/Search';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';

const messages = defineMessages('components.Discover.DiscoverFamily', {
  discoverfamily: 'Family Media Request Center',
  subtitle: 'Discover amazing family-friendly movies and shows for everyone!',
  activefilters:
    '{count, plural, one {# Active Filter} other {# Active Filters}}',
  sortPopularityAsc: 'Popularity Ascending',
  sortPopularityDesc: 'Popularity Descending',
  sortReleaseDateAsc: 'Release Date Ascending',
  sortReleaseDateDesc: 'Release Date Descending',
  sortTmdbRatingAsc: 'TMDB Rating Ascending',
  sortTmdbRatingDesc: 'TMDB Rating Descending',
  sortTitleAsc: 'Title (A-Z) Ascending',
  sortTitleDesc: 'Title (Z-A) Descending',
});

const SortOptions: Record<string, TMDBSortOptions> = {
  PopularityAsc: 'popularity.asc',
  PopularityDesc: 'popularity.desc',
  ReleaseDateAsc: 'release_date.asc',
  ReleaseDateDesc: 'release_date.desc',
  TmdbRatingAsc: 'vote_average.asc',
  TmdbRatingDesc: 'vote_average.desc',
  TitleAsc: 'original_title.asc',
  TitleDesc: 'original_title.desc',
} as const;

const DiscoverFamily = () => {
  const intl = useIntl();
  const router = useRouter();
  const updateQueryParams = useUpdateQueryParams({});

  const preparedFilters = prepareFilterValues(router.query);

  // Add family-friendly certification filter
  const familyFilters = {
    ...preparedFilters,
    certifications: 'G,PG,TV-Y,TV-Y7,TV-G,TV-PG',
  };

  const {
    isLoadingInitialData,
    isEmpty,
    isLoadingMore,
    isReachingEnd,
    titles,
    fetchMore,
    error,
  } = useDiscover<MovieResult, unknown, FilterOptions>(
    '/api/v1/discover/movies',
    familyFilters
  );
  const [showFilters, setShowFilters] = useState(false);

  if (error) {
    return <ErrorPage statusCode={500} />;
  }

  const title = intl.formatMessage(messages.discoverfamily);
  const subtitle = intl.formatMessage(messages.subtitle);

  return (
    <>
      <PageTitle title={title} />

      {/* Vibrant gradient header */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Animated sparkles */}
        <div className="absolute right-8 top-8 animate-pulse">
          <SparklesIcon className="h-12 w-12 text-yellow-300" />
        </div>
        <div className="absolute left-8 top-12 animate-bounce">
          <HeartIcon className="h-8 w-8 text-pink-300" />
        </div>
        <div className="absolute bottom-8 right-24 animate-pulse delay-100">
          <SparklesIcon className="h-8 w-8 text-cyan-300" />
        </div>

        <div className="relative z-10">
          <h1 className="mb-3 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl font-medium text-white/90 drop-shadow-md">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-4 flex flex-col justify-between lg:flex-row lg:items-end">
        <div className="mb-4 lg:mb-0">
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            <h2 className="text-2xl font-bold text-white">Browse Content</h2>
          </div>
        </div>

        <div className="mt-2 flex flex-grow flex-col sm:flex-row lg:flex-grow-0">
          <div className="mb-2 flex flex-grow sm:mb-0 sm:mr-2 lg:flex-grow-0">
            <span className="inline-flex cursor-default items-center rounded-l-md border border-r-0 border-purple-500 bg-gradient-to-br from-purple-900 to-pink-900 px-3 text-white shadow-lg sm:text-sm">
              <BarsArrowDownIcon className="h-6 w-6" />
            </span>
            <select
              id="sortBy"
              name="sortBy"
              className="rounded-r-only border-purple-500 bg-gray-800 text-white shadow-lg transition-all duration-200 hover:border-pink-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
              value={preparedFilters.sortBy || SortOptions.PopularityDesc}
              onChange={(e) => updateQueryParams('sortBy', e.target.value)}
            >
              <option value={SortOptions.PopularityDesc}>
                {intl.formatMessage(messages.sortPopularityDesc)}
              </option>
              <option value={SortOptions.PopularityAsc}>
                {intl.formatMessage(messages.sortPopularityAsc)}
              </option>
              <option value={SortOptions.ReleaseDateDesc}>
                {intl.formatMessage(messages.sortReleaseDateDesc)}
              </option>
              <option value={SortOptions.ReleaseDateAsc}>
                {intl.formatMessage(messages.sortReleaseDateAsc)}
              </option>
              <option value={SortOptions.TmdbRatingDesc}>
                {intl.formatMessage(messages.sortTmdbRatingDesc)}
              </option>
              <option value={SortOptions.TmdbRatingAsc}>
                {intl.formatMessage(messages.sortTmdbRatingAsc)}
              </option>
              <option value={SortOptions.TitleAsc}>
                {intl.formatMessage(messages.sortTitleAsc)}
              </option>
              <option value={SortOptions.TitleDesc}>
                {intl.formatMessage(messages.sortTitleDesc)}
              </option>
            </select>
          </div>
          <FilterSlideover
            type="movie"
            currentFilters={preparedFilters}
            onClose={() => setShowFilters(false)}
            show={showFilters}
          />
          <div className="mb-2 flex flex-grow sm:mb-0 lg:flex-grow-0">
            <Button
              onClick={() => setShowFilters(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg transition-all duration-300 hover:from-purple-500 hover:to-pink-500 hover:shadow-xl"
            >
              <FunnelIcon />
              <span>
                {intl.formatMessage(messages.activefilters, {
                  count: countActiveFilters(preparedFilters),
                })}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Media grid with enhanced styling */}
      <div className="rounded-xl bg-gray-900/50 p-4 shadow-xl backdrop-blur-sm">
        <ListView
          items={titles}
          isEmpty={isEmpty}
          isLoading={
            isLoadingInitialData || (isLoadingMore && (titles?.length ?? 0) > 0)
          }
          isReachingEnd={isReachingEnd}
          onScrollBottom={fetchMore}
        />
      </div>
    </>
  );
};

export default DiscoverFamily;
