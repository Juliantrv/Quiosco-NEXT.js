"use client";

import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb"

type ImageUploadProps = {
    image: string | undefined
}

export default function ImageUpload({ image }: Readonly<ImageUploadProps>) {
    const [ imageUrl, setImageUrl] = useState(null)
  return (
    <CldUploadWidget
    onSuccess={(result, { widget }) => {
        if(result.event == 'success'){
            widget.close()
            // @ts-ignore
            setImageUrl(result.info.secure_url)
        }
    }}
        uploadPreset="stemdh8b"
        options={{
            maxFiles: 1
        }}
    >
        { ({ open }) => (
            <>
                <div className="space-y-2">
                    <label htmlFor="uploadImage" className="text-slate-800" > Imagen Producto </label>
                    <button
                        id="uploadImage"
                        type="button"
                        onClick={() => open()}
                        className="w-full relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
                    >
                        <TbPhotoPlus 
                            size={50}
                        />
                        <p className="text-lg font-semibold">Agregar imagen</p>
                    
                        { imageUrl && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image 
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    src={imageUrl}
                                    alt="Imagen de Producto"
                                />
                            </div>
                        )}
                    </button>
                </div>
                { image && (
                    <div className="space-y-2">
                        <label htmlFor="image">Imagen Actual:</label>
                        <div 
                            id="image"
                            className="relative w-64 h-64"
                        >
                            <Image 
                                fill
                                src={getImagePath(image)}
                                alt="Imagen del producto"
                                style={{
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    </div>
                )}
                <input type="hidden" name="image" defaultValue={imageUrl ?? image} />
            </>
        )}
    </CldUploadWidget>
  )
}
