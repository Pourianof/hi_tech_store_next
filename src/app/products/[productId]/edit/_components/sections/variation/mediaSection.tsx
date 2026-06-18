import { FormProductVideoThumbnailPicker } from "@/app/dashboard/add-product/_components/mediaSelector/formProductVideoThumbnailPicker";
import { MediaSelectInput } from "@/app/dashboard/add-product/_components/mediaSelector/mediaSelectInput";
import { FormProductMedia } from "@/app/dashboard/add-product/_components/mediaSelector/types";
import { ProductMedia } from "@/core/models/product";
import { ResultModel } from "@/core/models/resultModel";
import { productVariationNewMediaSchema } from "@/core/schemas/productVariationNewMediaSchema";
import { removeVariationsMediaAction } from "@/lib/server_actions/productActions";
import { useChangeConsumer } from "@/ui/changeNotifiers/consumer";
import { ProductVariationChangeNotifier } from "@/ui/changeNotifiers/productVariationChangeNotifier";
import { FilledButton, OutlinedButton } from "@/ui/form/AppButtons";
import Icon from "@/ui/icons/icon";
import { CustomImage } from "@/ui/image/customImage";
import { FileImage } from "@/ui/image/fileImage";
import { FileVideo } from "@/ui/image/fileVideo";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Modal } from "@/ui/modal/modal";
import { Body } from "@/ui/theme/text/body";
import { Caption } from "@/ui/theme/text/caption";
import { H3, H5 } from "@/ui/theme/text/headers";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiCamera } from "react-icons/fi";
import { MediaThumbnail } from "./mediaThumbnail";

export function MediaSection({
  media,
  variationId,
}: {
  media: ProductMedia[];
  variationId: number;
}) {
  const productVariation = useChangeConsumer(ProductVariationChangeNotifier);
  const [selectedMedia, setSelectedMedia] = useState<ProductMedia>(
    media.find((m) => m.isMain) || media[0],
  );

  const [pendingAddedMedia, setPendingAddedMedia] =
    useState<FormProductMedia | null>(null);

  const [deletingMedia, setDeletingMedia] = useState<ProductMedia | null>(null);

  function toastResult(
    result: ResultModel,
    failTitle: string,
    succussMessage: string,
  ) {
    if (result.status == "failed") {
      toast.error(
        <Column>
          <Caption size="xl">{failTitle}</Caption>
          <Caption size="lg">{result.data.title}</Caption>
          {result.data.detail && (
            <Caption size="md">{result.data.detail}</Caption>
          )}
        </Column>,
      );
    } else {
      toast.success(succussMessage);
    }
  }

  async function registerMedia(media: FormProductMedia) {
    const newMediaFormData = productVariationNewMediaSchema.safeParse(media);

    if (!newMediaFormData.success) {
      toast.error(newMediaFormData.error.message);

      return;
    }

    const result = await productVariation.addNewMedia(newMediaFormData.data);

    toastResult(result, "Adding new media failed", "Media added successfully");

    setPendingAddedMedia(null);
  }

  async function removeMedia() {
    const result = await removeVariationsMediaAction(
      variationId,
      deletingMedia!.productMediaId,
    );
    toastResult(result, "Removing media failed", "Media removed succussfully");
    setDeletingMedia(null);
  }

  return (
    <div className="p-6 border-b border-gray-100">
      {pendingAddedMedia && (
        <MediaRegisterConfirmationModal
          pendingAddedMedia={pendingAddedMedia}
          onCancel={() => setPendingAddedMedia(null)}
          onConfirm={registerMedia}
        />
      )}
      {!!deletingMedia && (
        <Modal containerClassName="w-1/2">
          <Row centerV className="gap-2">
            <div className="w-40 aspect-video rounded-lg overflow-clip">
              <MediaPreview media={deletingMedia} />
            </div>
            <Column>
              <H3>Removing media</H3>
              <Caption size="lg">Confirm this action if you sure</Caption>
            </Column>
            <Column className="ms-auto gap-1">
              <FilledButton onClick={() => removeMedia()}>Remove</FilledButton>
              <OutlinedButton
                onClick={() => {
                  setDeletingMedia(null);
                }}
              >
                Cancel
              </OutlinedButton>
            </Column>
          </Row>
        </Modal>
      )}
      <div className="flex items-center gap-2 mb-3">
        <FiCamera className="w-4 h-4 text-gray-400" />
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Media Preview
        </span>
        <span className="text-xs text-gray-400">({media.length} items)</span>
      </div>

      {/* Main Media Display */}
      <div className="relative mb-4 bg-gray-50 rounded-xl overflow-hidden aspect-video">
        <div className="absolute left-2 top-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              setDeletingMedia(selectedMedia);
            }}
            className="flex items-center gap-1 text-sm bg-red-300 hover:bg-red-600 hover:text-gray-300 text-gray-800 px-2 py-1 rounded hover:cursor-pointer"
          >
            <Icon name="trash" />
            Remove media
          </button>
        </div>
        <MediaPreview media={selectedMedia} />
      </div>

      <Row>
        {media.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {media.map((media) => (
              <MediaThumbnail
                key={media.productMediaId}
                media={media}
                isActive={selectedMedia.productMediaId === media.productMediaId}
                onClick={() => setSelectedMedia(media)}
              />
            ))}
          </div>
        )}
        <MediaSelectInput
          onNewMedia={async (newMedia) => {
            setPendingAddedMedia(newMedia);
          }}
          addButton={
            <button className="border border-dashed border-gray-400 rounded-lg hover:cursor-pointer hover:bg-gray-200">
              <Column center>
                <Icon name="add" />
                <Body size="sm">Add new media</Body>
              </Column>
            </button>
          }
        />
      </Row>
    </div>
  );
}

function MediaPreview({ media }: { media: ProductMedia }) {
  return media.type === "Image" ? (
    <CustomImage
      src={media.url}
      alt="Preview"
      className="w-full h-full object-cover"
    />
  ) : (
    <video src={media.url} controls={true} className="w-full h-full" />
    //   <div className="w-full h-full flex items-center justify-center bg-gray-900">
    //     <div className="text-center">
    //       <FiVideo className="w-12 h-12 text-white/30 mx-auto mb-2" />
    //       <p className="text-white/50 text-sm">Video Preview</p>
    //       <a
    //         href={media.url}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-xs text-blue-400 hover:text-blue-300 mt-1 inline-block"
    //       >
    //         Open video →
    //       </a>
    //     </div>
    //   </div>)
  );
}

function MediaRegisterConfirmationModal({
  pendingAddedMedia,
  onCancel,
  onConfirm,
}: {
  pendingAddedMedia: FormProductMedia;
  onCancel(): void;
  onConfirm(finalMedia: FormProductMedia): void;
}) {
  const [showThumbnailEditModal, setIsShowingThumbnailEditModal] =
    useState(false);

  const [currentMedia, setCurrentMedia] = useState({ ...pendingAddedMedia });

  if (showThumbnailEditModal) {
    return (
      <FormProductVideoThumbnailPicker
        video={pendingAddedMedia}
        isEditMode
        onClose={() => setIsShowingThumbnailEditModal(false)}
        onCapture={(thumbnailFile) => {
          setCurrentMedia((cm) => ({ ...cm, thumbnail: thumbnailFile }));
          setIsShowingThumbnailEditModal(false);
        }}
      />
    );
  }

  function confirm() {
    onConfirm(currentMedia);
  }

  return (
    <Modal containerClassName="w-1/2">
      <Column className="w-full gap-4">
        <div className="w-full">
          {currentMedia.type == "image" ? (
            <FileImage
              file={currentMedia.file}
              className="object-cover w-full h-full aspect-video"
            />
          ) : (
            <Row className="gap-4">
              {currentMedia.thumbnail && (
                <Column className="gap-2">
                  <H5>Thumbnail:</H5>
                  <FileImage
                    file={currentMedia.thumbnail}
                    className="rounded-lg overflow-clip"
                  />
                  <button
                    className="hover:cursor-pointer group"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsShowingThumbnailEditModal(true);
                    }}
                  >
                    <Row
                      className="gap-1 w-fit text-primary-blue-27 fill-primary-blue-27 group-hover:text-primary-blue-05 group-hover:fill-primary-blue-05"
                      centerV
                    >
                      <Icon name="edit" />
                      <Caption size="xl">Edit</Caption>
                    </Row>
                  </button>
                </Column>
              )}
              <Column className="gap-2">
                <H5>Video:</H5>
                <FileVideo
                  file={currentMedia.file}
                  controls
                  autoPlay={false}
                  className="aspect-video"
                />
              </Column>
            </Row>
          )}
        </div>
        <Row>
          <OutlinedButton onClick={onCancel}>Cancel</OutlinedButton>
          <FilledButton noFullWidth onClick={confirm}>
            Submit
          </FilledButton>
        </Row>
      </Column>
    </Modal>
  );
}
