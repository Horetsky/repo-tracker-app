import { HaveAnAccount, LoginForm } from "@/app/(auth)/_components";

export default function Page() {
    return (
        <div className={"min-w-1/4"}>
            <div className={"mb-8"}>
                <h1 className={"text-5xl font-bold mb-2"}>
                    Welcome back 👋
                </h1>
                <p className={"text-muted-foreground"}>
                    Enter your personal information to login the platform.
                </p>
            </div>
            <LoginForm className={"mb-8"} />
            <HaveAnAccount actionText={"Sign up"} href={"/signup"}>
                Don’t have an account?
            </HaveAnAccount>
        </div>
    );
}