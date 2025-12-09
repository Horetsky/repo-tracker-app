import { HaveAnAccount, SignUpForm } from "@/app/(auth)/_components";

export default function Page() {
    return (
        <div className={"min-w-1/4"}>
            <div className={"mb-8"}>
                <h1 className={"text-5xl font-bold mb-2"}>
                    Hey there 👋
                </h1>
                <p className={"text-muted-foreground"}>
                    Enter your personal information to register the platform.
                </p>
            </div>
            <SignUpForm className={"mb-8"} />
            <HaveAnAccount actionText={"Login"} href={"/login"}>
                Already have an account?
            </HaveAnAccount>
        </div>
    );
}