import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
    providers: [
        GithubProvider({
            profile(profile) {
                console.log("github profile", profile);

            }
        })
    ]
}
