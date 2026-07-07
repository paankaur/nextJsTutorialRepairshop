import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="h-dvh flex flex-col items-center justify-center gap-6">
      <h1>Log in</h1>
      
        <Button asChild>
          <LoginLink>
            Sign In
          </LoginLink>
        </Button>
      
    </main>
  );
}
