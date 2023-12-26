import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
    providers: [
        GithubProvider({
            profile(profile) {
                console.log("github profile", profile);

                let userRole = "GitHub User";

                if (profile?.email === "rahulbanik98@gmail.com") {
                    userRole = "admin";
                }

                return {
                    ...profile,
                    role: userRole,
                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_Secret,
        }),
        GoogleProvider({
            profile(profile) {
                console.log("Google profile", profile);

                return {
                    ...profile,
                    role: userRole,
                    id: profile.sub,
                };
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_Secret,
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        // FOR CLIENTSIDE
        async session({ session, token }) {
            if (session?.user) session.user.role = token.user;
            return session;
        }
    }
}

// return {
//     ...profile,
//     id: profile.sub,
//     role: userRole
// }