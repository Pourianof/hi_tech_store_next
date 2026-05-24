"use client";
import { updateUserAvatarAction } from "@/lib/server_actions/userActions";
import { useAuth } from "@/ui/contexts/authContext";
import { FilledButton, OutlinedButton } from "@/ui/form/AppButtons";
import Icon from "@/ui/icons/icon";
import { ApiImage } from "@/ui/image/ApiImage";
import AvatarCropper from "@/ui/image/avatarCropper";
import { FileImage } from "@/ui/image/fileImage";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Modal } from "@/ui/modal/modal";
import { Caption } from "@/ui/theme/text/caption";
import { H6 } from "@/ui/theme/text/headers";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ReactNode, useRef, useState } from "react";
import toast from "react-hot-toast";

export function ProfileInput() {
  const ref = useRef<HTMLInputElement>(null);

  const session = useAuth();

  const [selectedProfile, setSelectedProfile] = useState<File | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  function close() {
    setSelectedProfile(null);
    setShowConfirmModal(false);
  }

  return (
    <div className=" w-[100px] h-[100px] relative">
      {showConfirmModal && (
        <ProfileSelectConfimation
          imageFile={selectedProfile!}
          image={
            <FileImage
              file={selectedProfile!}
              className="w-full object-cover h-full"
            />
          }
          onClose={close}
        />
      )}
      {session.isLoading ? (
        <Column center className="h-full w-full">
          <CircularProgress size={15} />
        </Column>
      ) : session.data?.user.avatarUrl ? (
        <ApiImage
          alt="user profile"
          src={session.data.user.avatarUrl}
          className="rounded-full overflow-clip w-full h-full"
        />
      ) : (
        <Image
          alt="user profile"
          src="/images/user.jpg"
          width={100}
          height={100}
          className="rounded-full overflow-clip"
        />
      )}

      <input
        hidden
        type="file"
        ref={ref}
        accept="image/*,video/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            if (file.type.startsWith("image")) {
              setSelectedProfile(file);
              setShowConfirmModal(true);
            }

            if (ref.current) {
              ref.current.value = "";
            }
          }
        }}
      />
      <button
        className="absolute right-1 bottom-1 z-10 hover:bg-primary-blue-09 bg-primary-blue-27 fill-white rounded-lg  w-6 h-6 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();

          ref.current?.click();
        }}
      >
        <Icon name="edit" />
      </button>
    </div>
  );
}

function ProfileSelectConfimation({
  image,
  onClose,
  imageFile,
}: {
  onClose(): void;
  imageFile: File;
  image: ReactNode;
}) {
  const session = useSession();
  const [isUploading, setIsUploading] = useState(false);
  return (
    <Modal containerClassName="h-fit">
      <Column className="gap-2">
        <div className=" h-[calc(100dvh/2)] aspect-square overflow-hidden rounded-lg">
          <AvatarCropper image={image} />
        </div>
        <Row>
          <FilledButton
            noFullWidth
            disabled={isUploading}
            onClick={async () => {
              setIsUploading(true);
              const formData = new FormData();
              formData.set("avatar", imageFile);

              const result = await updateUserAvatarAction(formData);

              if (result.status == "failed") {
                toast.error(
                  <Column>
                    <H6>Uploading avatar failed</H6>
                    <Caption size="md">{result.data.title}</Caption>
                  </Column>,
                );
              } else {
                toast.success("Avatar Updated Succussfully");
                session.update({
                  user: {
                    avatarUrl: result.data.avatarUrl,
                  },
                });
              }

              setIsUploading(false);
              onClose();
            }}
          >
            {isUploading ? <CircularProgress size={12} /> : "Submit"}
          </FilledButton>
          <OutlinedButton onClick={onClose}>Cancel</OutlinedButton>
        </Row>
      </Column>
    </Modal>
  );
}
