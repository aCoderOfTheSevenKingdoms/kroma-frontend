import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { FileMetadata, FileWithPreview } from "@/hooks/use-file-upload"
import { UploadArea } from "./UploadArea"
import ImageUploadIcon from "./ImageUploadIcon"

type FileUploadDialogProps = {
  initialFiles?: FileMetadata[]
  onFilesChange?: (files: FileWithPreview[]) => void
}

export function FileUploadDialog({ initialFiles = [], onFilesChange }: FileUploadDialogProps) {
  return (
    <Dialog>
      <DialogTrigger render={<Button 
          variant="outline"
          className="h-9 px-4 text-sm md:h-10 md:px-5 md:text-base"
        >
        <ImageUploadIcon className="size-4 md:size-5" />
        Upload Images
      </Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Images</DialogTitle>
          {/* <DialogDescription>
            This is a dialog with scrollable content.
          </DialogDescription> */}
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          <UploadArea initialFiles={initialFiles} onFilesChange={onFilesChange} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
