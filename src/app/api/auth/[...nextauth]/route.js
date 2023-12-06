const { default: NextAuth } = require("next-auth/next");
import connectDB from "@backend/index";
import User from "@backend/models/userModel";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session, token }) {

            session.user.id = token.id;
            session.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async signIn({ profile }) {

            try {
                await connectDB();
                const userExist = await User.findOne({ email: profile.email });

                if (!userExist) {
                    await User.create({
                        name: profile.name,
                        email: profile.email,
                    });
                }

                return true;

            } catch (e) {
                console.log(e);
                return false;
            }
        }
    },
    pages: {
        signIn: "/login",
        // signOut: "/logout",
        // error: "/auth/error",
        // verifyRequest: "/auth/verify-request",
        // newUser: "/auth/new-user"
    }
})

export { handler as GET, handler as POST };