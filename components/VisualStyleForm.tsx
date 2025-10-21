
import React, { useState, useRef, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { UploadIcon, PhotoIcon } from './icons';

interface VisualStyleFormProps {
    onSubmit: (files: File[]) => void;
    isLoading: boolean;
}

export const VisualStyleForm: React.FC<VisualStyleFormProps> = ({ onSubmit, isLoading }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // FIX: Add useEffect to revoke object URLs and prevent memory leaks.
    // This cleanup function will be called when the component unmounts or when
    // the `previews` array is replaced, ensuring old URLs are released.
    useEffect(() => {
        return () => {
            previews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previews]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).slice(0, 5);
            setFiles(selectedFiles);

            // FIX: Explicitly type 'file' as File to resolve TypeScript error on the next line.
            // The error "Argument of type 'unknown' is not assignable to parameter of type 'Blob | MediaSource'"
            // suggests a type inference issue with `Array.from(e.target.files)`.
            const newPreviews = selectedFiles.map((file: File) => URL.createObjectURL(file));
            setPreviews(newPreviews);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (files.length > 0) {
            onSubmit(files);
        }
    };
    
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const isSubmitDisabled = files.length === 0 || isLoading;

    return (
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <PhotoIcon className="h-6 w-6 mr-2 text-green-400" />
                Фаза 1Б: Генерация визуального стиля
            </h2>
            <p className="text-gray-400 mb-4 text-sm">
                Загрузите до 5 скриншотов с видео, стиль которых вам нравится. AI опишет стиль и создаст промт для генерации изображений.
            </p>
            
            <div 
                onClick={triggerFileSelect}
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition"
            >
                <div className="space-y-1 text-center">
                    <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
                    <div className="flex text-sm text-gray-400">
                        <span className="relative font-medium text-indigo-400 hover:text-indigo-300">
                           Выберите файлы
                        </span>
                        <input 
                            ref={fileInputRef}
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            multiple 
                            accept="image/*"
                            onChange={handleFileChange} 
                            disabled={isLoading}
                        />
                        <p className="pl-1">или перетащите их сюда</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF до 10MB</p>
                </div>
            </div>

            {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {previews.map((src, index) => (
                        <img key={index} src={src} alt={`Preview ${index}`} className="h-20 w-20 object-cover rounded-md" />
                    ))}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="mt-6">
                <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? <LoadingSpinner /> : 'Далее'}
                </button>
            </form>
        </div>
    );
};