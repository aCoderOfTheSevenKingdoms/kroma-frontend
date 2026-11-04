import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { RootState } from "@/app/app.store"
import type { UserType } from "../auth.types"
import { useAuth } from "../hook/useAuth"

export function AuthCard({isLogin}: {isLogin: boolean}) {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<UserType>("buyer")
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const { handleLogin, handleRegister, handleGoogleLogin } = useAuth()
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSuccessMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    if (isLogin) {
      const result = await handleLogin({email, password})
      if (result.success) {
        navigate("/home")
      }
      return
    }

    const fullname = String(formData.get("fullname") ?? "").trim()
    const contact = String(formData.get("contact") ?? "").trim()

    const result = await handleRegister({
      email,
      password,
      fullname,
      contact,
      isSeller: userType === "seller",
    })

    if (result.success) {
      setSuccessMessage("Account created. Check your email to verify your account.")
      form.reset()
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{isLogin ? "Log in to your account" : "Create an account"}</CardTitle>
        {isLogin && (<CardDescription className="font-light text-xs">
          Enter your email below to login to your account
        </CardDescription>)}
        <CardAction>
          <Button
            type="button"
            variant="link"
            onClick={() => navigate(isLogin ? "/register" : "/login")}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="auth-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {!isLogin && (<div className="grid gap-2">
              <RadioGroup
                className={"mb-4 flex"}
                value={userType}
                onValueChange={(value) => setUserType(value as UserType)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buyer" id="r1" />
                  <Label htmlFor="r1">Buyer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="seller" id="r2" />
                  <Label htmlFor="r2">Seller</Label>
                </div>
              </RadioGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                className="font-thin text-sm"
                id="name"
                name="fullname"
                type="text"
                placeholder="Your name"
                required
              />
            </div>)}
            {!isLogin && (<div className="grid gap-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                className="font-thin text-sm"
                id="contact"
                name="contact"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="10-digit phone number"
                required
              />
            </div>)}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="font-thin text-sm"
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="font-light ml-auto inline-block text-xs underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="pr-10 font-thin text-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="absolute inset-y-0 right-1 my-auto transition-none active:not-aria-[haspopup]:translate-y-0"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            {successMessage && (
              <p role="status" className="text-sm text-secondary-text-color">
                {successMessage}
              </p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="auth-form"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Create"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
