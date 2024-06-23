import { ListPostProps } from "@/constant";
import Image from "next/image";
import React from "react";

const ListPost: React.FC<ListPostProps> = ({ index, item }) => {
  const convertDateToIndonesian = (dateString: string) => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    return `${dateString.slice(8, 10)} ${month} ${dateString.slice(0, 4)}`;
  };

  const defaultImgUrl = () => {
    const imageUrls = [
      "https://suitmedia.static-assets.id/storage/files/tinymce/z6bjvcKt95MATzkirUUfeRj0YFysXB93vTyHueKv.png",
      "https://suitmedia.static-assets.id/storage/files/tinymce/rJHOrYAJ4RYDHJkhw63uZNp3vJ0R8UqR7MxYaErE.png",
      "https://suitmedia.static-assets.id/storage/files/tinymce/EtGsEGO37bwBVW7LSiaehTYtznXOUGFsHJHhRAz8.png",
      "https://suitmedia.static-assets.id/storage/files/tinymce/9rLogRihmojEGWWK8a7ZW2I3arYHNECLN3Afpr1n.png",
      "https://suitmedia.static-assets.id/storage/files/tinymce/hU0DKBzjx6BkcQNr5RaHKhwo8se1YpTnRSKXnLEG.png",
      "https://suitmedia.static-assets.id/storage/files/tinymce/irghWlNZ9IWWJ2V9cnRlYiNjs3g9cN0LSBEwjhJg.png",
      "https://suitmedia.static-assets.id/storage/files/tinymce/eUDzUmUxKMcRGCIIKgAFYYtMCHUQATMdzWyQQPiq.png",
      "https://suitmedia.static-assets.id/storage/files/tinymce/ekkZmUYJbSke5i91QI1Pff8unTShBTEQLgbaez8O.png",
      "https://suitmedia.static-assets.id/storage/files/tinymce/6fuFonaPf1GLuil8mQsNh04xjeiDqYin9RlWmBgW.png",
      "https://suitmedia.static-assets.id/storage/files/tinymce/o3dCSnOAro27SdseMfcBT5vh17sC0kOsF9tfLEtz.png",
    ];
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  return (
    <div
      key={index}
      className="grid grid-rows-[175px,125px] rounded-lg shadow-lg overflow-hidden"
    >
      <Image
        loading="lazy"
        height={120}
        width={120}
        alt="suitmedia-image"
        src={item.content.length !== 0 ? item.content[0] : defaultImgUrl()}
        className="w-full h-full object-cover"
        decoding="auto"
      />
      <div className="flex flex-col gap-1 p-4 self-start">
        <h1 className="text-sm opacity-50">
          {convertDateToIndonesian(item?.published_at)}
        </h1>
        <h3 className="text-base font-bold line-clamp-3">{item?.title}</h3>
      </div>
    </div>
  );
};

export default ListPost;
