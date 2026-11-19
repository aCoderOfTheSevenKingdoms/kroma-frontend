import { IconFolderCode } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { useNavigate } from "react-router";

export function EmptyState({redirectPath, title, description}: {redirectPath: string; title: string; description: string}) {
  const navigate = useNavigate();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle className={`text-md`}>{title}</EmptyTitle>
        <EmptyDescription className={`text-xs`}>
          {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button 
          className={`size-fit py-2 px-4 text-xs cursor-pointer`}
          onClick={() => {navigate(redirectPath)}}
        >
          Create Project
        </Button>
      </EmptyContent>
    </Empty>
  )
}
