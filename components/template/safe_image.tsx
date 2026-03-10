"use client";

import { ImgHTMLAttributes, useState } from "react";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

export default function SafeImage({ src, fallbackSrc = "https://placehold.co/600x400?text=Gambar+Tidak+Ada", alt, ...props }: SafeImageProps) {
    const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

    return (
        <img
            {...props}
            src={imgSrc}
            alt={alt || "Gambar"}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
}
