import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { api } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

interface Props {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export function DragDropImageUploader({ value, onChange, className = '' }: Props) {
  const { token } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      
      if (response.data && response.data.url) {
        onChange(response.data.url);
      }
    } catch (err: unknown) {
      console.error('Upload failed:', err);
      setError('Erreur lors du téléchargement. Vérifiez vos clés Cloudinary.');
    } finally {
      setIsUploading(false);
    }
  }, [onChange, token]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className={`w-full ${className}`}>
      {!value ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5' : 'border-white/20 hover:border-white/40 bg-[hsl(var(--surface-neutral))]'}
            ${isUploading ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          {isUploading ? (
            <>
              <Loader2 className="w-10 h-10 mb-4 text-[hsl(var(--primary))] animate-spin" />
              <p className="text-stone-300 font-medium">Téléchargement en cours...</p>
            </>
          ) : (
            <>
              <UploadCloud className={`w-10 h-10 mb-4 ${isDragActive ? 'text-[hsl(var(--primary))]' : 'text-stone-400'}`} />
              <p className="text-stone-300 font-medium mb-1">
                {isDragActive ? 'Relâchez pour uploader' : 'Glissez-déposez une image ici'}
              </p>
              <p className="text-stone-500 text-sm">ou cliquez pour parcourir</p>
            </>
          )}
          
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        </div>
      ) : (
        <div className="relative w-full max-h-64 rounded-xl border border-white/20 overflow-hidden bg-stone-900 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Aperçu" className="w-full h-full object-contain" />
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={handleRemove}
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105"
              title="Supprimer l'image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
