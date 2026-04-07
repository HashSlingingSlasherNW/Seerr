import CollectionRequestModal from '@app/components/RequestModal/CollectionRequestModal';
import MovieRequestModal from '@app/components/RequestModal/MovieRequestModal';
import TvRequestModal from '@app/components/RequestModal/TvRequestModal';
import SuccessAnimation from '@app/components/Common/SuccessAnimation';
import { Transition } from '@headlessui/react';
import type { MediaStatus } from '@server/constants/media';
import type { MediaRequest } from '@server/entity/MediaRequest';
import type { NonFunctionProperties } from '@server/interfaces/api/common';
import { useCallback, useState } from 'react';

interface RequestModalProps {
  show: boolean;
  type: 'movie' | 'tv' | 'collection';
  tmdbId: number;
  is4k?: boolean;
  editRequest?: NonFunctionProperties<MediaRequest>;
  onComplete?: (newStatus: MediaStatus) => void;
  onCancel?: () => void;
  onUpdating?: (isUpdating: boolean) => void;
}

const RequestModal = ({
  type,
  show,
  tmdbId,
  is4k,
  editRequest,
  onComplete,
  onUpdating,
  onCancel,
}: RequestModalProps) => {
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleComplete = useCallback(
    (newStatus: MediaStatus) => {
      // Only show success animation for new requests that are pending or processing
      if (!editRequest) {
        setShowSuccessAnimation(true);
      }
      onComplete?.(newStatus);
    },
    [editRequest, onComplete]
  );

  const handleAnimationComplete = useCallback(() => {
    setShowSuccessAnimation(false);
  }, []);

  return (
    <>
      <Transition
        as="div"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={show}
      >
        {type === 'movie' ? (
          <MovieRequestModal
            onComplete={handleComplete}
            onCancel={onCancel}
            tmdbId={tmdbId}
            onUpdating={onUpdating}
            is4k={is4k}
            editRequest={editRequest}
          />
        ) : type === 'tv' ? (
          <TvRequestModal
            onComplete={handleComplete}
            onCancel={onCancel}
            tmdbId={tmdbId}
            onUpdating={onUpdating}
            is4k={is4k}
            editRequest={editRequest}
          />
        ) : (
          <CollectionRequestModal
            onComplete={handleComplete}
            onCancel={onCancel}
            tmdbId={tmdbId}
            onUpdating={onUpdating}
            is4k={is4k}
          />
        )}
      </Transition>

      <SuccessAnimation
        show={showSuccessAnimation}
        onComplete={handleAnimationComplete}
      />
    </>
  );
};

export default RequestModal;
