import { Link, useNavigate } from "react-router"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const Error = () => {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-svh w-full flex-col items-center justify-center bg-background px-6 text-center">
      <p className="text-xs font-medium tracking-[0.4em] text-tertiary-bg-color uppercase">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm font-light text-secondary-text-color">
        The page you are looking for doesn't exist or may have been moved.
      </p>
      <div className="mt-8 flex items-center gap-2">
        <Button render={<Link to="/home" />}>Back to home</Button>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft />
          Go back
        </Button>
      </div>
    </main>
  )
}

export default Error
