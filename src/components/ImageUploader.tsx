import { useState, useRef } from 'react'
import { supabase } from '../utils/supabase'
import './styles/ImageUploader.css'

interface ImageUploaderProps {
    value: string
    onChange: (url: string) => void
}

function ImageUploader({ value, onChange }: ImageUploaderProps) {
    const [dragging, setDragging] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    async function uploadFile(file: File) {
        setUploading(true)
        setError('')

        const fileExt = file.name.split('.').pop()
        const fileName = `${crypto.randomUUID()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('Images')
            .upload(fileName, file)

        if (uploadError) {
            setError(uploadError.message)
            setUploading(false)
            return
        }

        const { data } = supabase.storage.from('Images').getPublicUrl(fileName)
        onChange(data.publicUrl)
        setUploading(false)
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault()
        setDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) uploadFile(file)
    }

    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) uploadFile(file)
    }

    return (
        <div className="image-uploader">
            <div
                className={`image-drop-zone ${dragging ? 'dragging' : ''}`}
                onDragOver={(e) => {
                    e.preventDefault()
                    setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                {uploading ? (
                    <p>Uploading...</p>
                ) : value ? (
                    <img src={value} alt="Preview" className="image-preview" />
                ) : (
                    <p>Drag & drop an image, or click to select</p>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />

            {value && (
                <button type="button" className="image-clear-btn" onClick={() => onChange('')}>
                    Remove image
                </button>
            )}

            {error && <p className="image-upload-error">{error}</p>}
        </div>
    )
}

export default ImageUploader